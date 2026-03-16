const pool = require("../config/database");

exports.getTask = async (req,res)=>{

  const {id} = req.params;

  const result = await pool.query(`
    SELECT 
      tasks.*,
      users.name as assigned_name,
      users.email as assigned_email
    FROM tasks
    LEFT JOIN users ON users.id = tasks.assigned_to
    WHERE tasks.id=$1
  `,[id]);

  res.json(result.rows[0]);

};

exports.createTask = async (req, res) => {
  try {

    const { title, description, assigned_to, deadline, priority } = req.body;

    if (!title || !assigned_to) {
      return res.status(400).json({
        message: "title y assigned_to son obligatorios"
      });
    }

    if (req.user.role !== "boss") {
      return res.status(403).json({
        message: "Solo los jefes pueden crear tareas"
      });
    }

    const created_by = req.user.id;

    // 🔥 CREAR TAREA
    const result = await pool.query(
      `INSERT INTO tasks
       (title, description, assigned_to, created_by, deadline, priority)
       VALUES ($1,$2,$3,$4,$5,$6)
       RETURNING *`,
      [title, description, assigned_to, created_by, deadline, priority]
    );

    const task = result.rows[0];

    // 🔥 BUSCAR EMPLEADO
    const userResult = await pool.query(
      `SELECT name, phone FROM users WHERE id=$1`,
      [assigned_to]
    );

    const user = userResult.rows[0];

    // 🔥 ENVIAR WHATSAPP (SIN ROMPER EL SISTEMA)
    if (user && user.phone) {

      const message = `
Hola ${user.name} 👋

Tienes una nueva tarea asignada:

📌 ${title}
📝 ${description || 'Sin descripción'}
📅 Fecha límite: ${deadline || 'No definida'}

Ingresa al sistema para revisarla.
      `;

      console.log("📲 Intentando enviar WhatsApp a:", user.phone);

      try {
        await sendWhatsApp(user.phone, message);
        console.log("✅ WhatsApp enviado correctamente");
      } catch (err) {
        console.log("⚠️ Error enviando WhatsApp:", err.message);
      }

    } else {
      console.log("⚠️ Usuario sin teléfono");
    }

    // 🔥 RESPUESTA SIEMPRE EXITOSA
    res.json(task);

  } catch (error) {
    console.error("❌ ERROR GENERAL:", error);
    res.status(500).json({
      message: "Error al crear la tarea",
      error: error.message
    });
  }
};

exports.getTasks = async (req,res)=>{
  try{

    const result = await pool.query(`
      SELECT tasks.*, users.name as employee
      FROM tasks
      JOIN users ON tasks.assigned_to = users.id
    `);

    res.json(result.rows);

  }catch(error){
    res.status(500).json(error);
  }
}
exports.getMyTasks = async (req,res)=>{

  try{

    const userId = req.user.id;

    const result = await pool.query(
      `SELECT * FROM tasks WHERE assigned_to=$1`,
      [userId]
    );

    res.json(result.rows);

  }catch(error){
    res.status(500).json(error);
  }

};
exports.updateStatus = async (req,res)=>{

  try{

    const { id } = req.params;
    const { status } = req.body;

    const result = await pool.query(
      `UPDATE tasks
       SET status=$1
       WHERE id=$2
       RETURNING *`,
      [status,id]
    );

    res.json(result.rows[0]);

  }catch(error){
    res.status(500).json(error);
  }
 
}