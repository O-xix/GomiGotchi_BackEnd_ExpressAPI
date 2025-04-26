import express from 'express';
import cors from 'cors';
//import litter from "./api/litter.route.js"; // Corrected path
import users from "./api/users.route.js"; // Corrected path


const app = express();

app.use(cors());
app.use(express.json());

//routes
//app.use("/api/v1/litter", litter); // Corrected path
app.use("/api/v1/users", users); // Corrected path

//default route
app.use("*", (req, res) => res.status(404).json({ error: "Route not found" }));

export default app;