const pool = require("../config/database");

exports.getTeam = async (req, res) => {
  try {
    const bossId = req.user.id;

    const result = await pool.query(
      `
      SELECT 
        u.id,
        u.name,
        COUNT(t.id) AS asignadas,
        COUNT(CASE WHEN t.status = 'EN_PROCESO' THEN 1 END) AS en_curso,
        COUNT(CASE WHEN t.status = 'APROBADA' THEN 1 END) AS listas
      FROM users u
      LEFT JOIN tasks t ON u.id = t.assigned_to
      WHERE u.role = 'employee' AND u.boss_id = $1
      GROUP BY u.id
      ORDER BY u.name
      `,
      [bossId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error obteniendo equipo" });
  }
};