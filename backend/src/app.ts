import express from "express";
import cors from "cors";

import documentRoutes from "./routes/document.routes.js"

const app = express();

const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    credentials: true
};

app.use(express.json());
app.use(cors(corsOptions));

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "ExplainThisAI backend is running..."
    })
});

app.use("/api/document", documentRoutes);

export default app;