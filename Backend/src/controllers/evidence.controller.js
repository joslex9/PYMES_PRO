const pool = require("../config/database");

exports.uploadEvidence = async (req,res)=>{

  try{

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    console.log("FILES:", req.files);

    const { task_id, comment } = req.body;

    const file = req.file;

    if(!file){
      return res.status(400).json({message:"Archivo requerido"});
    }

    const uploaded_by = req.user.id;

    const result = await pool.query(
      `INSERT INTO evidences
      (task_id,file_name,file_path,comment,uploaded_by)
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *`,
      [
        task_id,
        file.filename,
        file.path,
        comment,
        uploaded_by
      ]
    );

    res.json(result.rows[0]);

  }catch(error){
    console.log(error)
    res.status(500).json(error);
  }

}


exports.getTaskEvidences = async (req,res)=>{

  try{

    const { taskId } = req.params;

    const result = await pool.query(
      `SELECT * FROM evidences
       WHERE task_id = $1`,
      [taskId]
    );

    res.json(result.rows);

  }catch(error){

    res.status(500).json(error);

  }

}
