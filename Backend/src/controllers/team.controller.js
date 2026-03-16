exports.getTeamStats = async (req,res)=>{

const result = await pool.query(`

SELECT 
users.id,
users.name,
users.email,

COUNT(tasks.id) as total_tasks,

COUNT(CASE WHEN tasks.status='EN_REVISION' THEN 1 END) as in_progress,

COUNT(CASE WHEN tasks.status='APROBADA' THEN 1 END) as completed,

COUNT(CASE WHEN tasks.status='RECHAZADA' THEN 1 END) as rejected

FROM users

LEFT JOIN tasks
ON tasks.assigned_to = users.id

WHERE users.role='employee'

GROUP BY users.id

ORDER BY users.name

`);

res.json(result.rows);

};