const pool = require("../config/database");

exports.getDashboardStats = async (req, res) => {

  try {

    const totalTasks = await pool.query(
      "SELECT COUNT(*) FROM tasks"
    );

    const completedTasks = await pool.query(
      "SELECT COUNT(*) FROM tasks WHERE status = 'APROBADA'"
    );

    const inProgressTasks = await pool.query(
      "SELECT COUNT(*) FROM tasks WHERE status = 'EN_PROCESO'"
    );

    const pendingTasks = await pool.query(
      "SELECT COUNT(*) FROM tasks WHERE status = 'PENDIENTE'"
    );

    const employees = await pool.query(
      "SELECT COUNT(*) FROM users WHERE role = 'employee'"
    );

    res.json({
      totalTasks: totalTasks.rows[0].count,
      completedTasks: completedTasks.rows[0].count,
      inProgressTasks: inProgressTasks.rows[0].count,
      pendingTasks: pendingTasks.rows[0].count,
      employees: employees.rows[0].count
    });

  } catch (error) {

    res.status(500).json(error);

  }

}
exports.getEmployeeDashboard = async (req,res)=>{

  try{

    const userId = req.user.id;

    const total = await pool.query(
      `SELECT COUNT(*) FROM tasks
       WHERE assigned_to = $1`,
      [userId]
    );

    const completed = await pool.query(
      `SELECT COUNT(*) FROM tasks
       WHERE assigned_to = $1
       AND status = 'APROBADA'`,
      [userId]
    );

    const pending = await pool.query(
      `SELECT COUNT(*) FROM tasks
       WHERE assigned_to = $1
       AND status != 'APROBADA'`,
      [userId]
    );

    res.json({
      totalTasks: total.rows[0].count,
      completedTasks: completed.rows[0].count,
      pendingTasks: pending.rows[0].count
    });

  }catch(error){

    res.status(500).json(error);

  }

};
