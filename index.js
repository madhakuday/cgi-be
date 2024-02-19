require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

// Routes
const authRoutes = require("./src/routes/auth.routes");
const adminRoutes = require("./src/routes/admin.routes");
const certificateRoutes = require("./src/routes/certificate.routes");

// DB
const sequelize = require("./src/database/db");

const app = express();

const PORT = process.env.PORT || 8000;

console.log("DB_NAME ::", process.env.DB_NAME);
console.log("DB_HOST ::", process.env.DB_HOST);

app.get('/happy',(req,res)=>{res.send('Happy!')})
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/certificate", certificateRoutes);

// Check if the environment is development (or any other condition you prefer)
if (process.env.SYNC_TABLE === "sync") {
  sequelize
    .sync({ alter: true }) // Use the 'alter' option to modify existing tables
    .then(() => {
      console.log("Database synchronized successfully.");
      app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    })
    .catch((error) => {
      console.error("Database synchronization failed:", error);
    });
} else {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}
