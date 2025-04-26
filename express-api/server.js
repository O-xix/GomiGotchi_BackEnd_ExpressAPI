import express from 'express';
import cors from 'cors';
import litter from "./api/litter.route.js"; // Corrected path


const app = express();

app.use(cors());
app.use(express.json());

//routes
app.use("/api/v1/litter", litter); // Corrected path

//default route
app.use("/*", (req, res) => res.status(404).json({ message: "Route not found" }));

export default app;