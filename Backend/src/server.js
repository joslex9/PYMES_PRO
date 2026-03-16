const express = require("express");
const cors = require("cors");
const teamRoutes = require('./routes/team.routes');
const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");
const evidenceRoutes = require("./routes/evidence.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const userRoutes = require("./routes/user.routes");
const reportRoutes = require("./routes/report.routes");
const app = express();

app.use(cors());
app.use(express.json());
app.use('/team', require('./routes/team.routes'));
app.use("/api", authRoutes);
app.use("/api", taskRoutes);
app.use("/api", evidenceRoutes);
app.use("/api", dashboardRoutes);
app.use("/api", userRoutes);
app.use("/uploads", express.static("src/uploads"));
app.use("/api",reportRoutes);
app.get("/", (req,res)=>{
    res.send("API Gestión Pyme funcionando");
});

require('dotenv').config();

const PORT = 4000;

app.listen(PORT,()=>{
    console.log("Servidor corriendo en puerto " + PORT);
});