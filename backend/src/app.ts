import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import documentsRoutes from "./routes/document.routes.js";

const app = express();

const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    credentials: true
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser())

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "ExplainThisAI backend is running..."
    })
});

app.use("/api/auth", authRoutes);
app.use("/api/documents", documentsRoutes);

export default app;