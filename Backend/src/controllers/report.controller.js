const ExcelJS = require("exceljs");
const pool = require("../config/database");

exports.exportTasksReport = async (req,res)=>{

try{

const result = await pool.query(`
SELECT 
tasks.id,
tasks.title,
tasks.priority,
tasks.status,
tasks.deadline,
users.name as empleado
FROM tasks
LEFT JOIN users
ON tasks.assigned_to = users.id
ORDER BY tasks.created_at DESC
`);

const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet("Reporte Tareas");

worksheet.columns = [

{ header:"ID", key:"id", width:10 },
{ header:"Titulo", key:"title", width:30 },
{ header:"Empleado", key:"empleado", width:25 },
{ header:"Prioridad", key:"priority", width:15 },
{ header:"Estado", key:"status", width:20 },
{ header:"Fecha limite", key:"deadline", width:20 }

];

result.rows.forEach(row=>{
worksheet.addRow(row);
});

res.setHeader(
"Content-Type",
"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
);

res.setHeader(
"Content-Disposition",
"attachment; filename=reporte_tareas.xlsx"
);

await workbook.xlsx.write(res);

res.end();

}catch(error){

res.status(500).json(error);

}

};