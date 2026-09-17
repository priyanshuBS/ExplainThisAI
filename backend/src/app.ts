import express from "express";
import cors from "cors";

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
})

export default app;