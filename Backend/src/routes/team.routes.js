const router = require("express").Router();
const pool = require("../config/database");

router.get("/", async (req,res)=>{

const result = await pool.query(`
SELECT 
u.id,
u.name,
u.email,
COUNT(t.id) as total_tasks,
COUNT(CASE WHEN t.status='EN_REVISION' THEN 1 END) as in_progress,
COUNT(CASE WHEN t.status='APROBADA' THEN 1 END) as completed
FROM users u
LEFT JOIN tasks t
ON t.assigned_to = u.id
WHERE u.role='employee'
GROUP BY u.id
`);

res.json(result.rows);

});

module.exports = router;