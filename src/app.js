import express from "express";
import morgan from "morgan";
import taskRoutes from "./routes/takss.routes";

const app = express();

// settings
app.set("port", process.env.PORT || 3000);

// middlewares
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use(taskRoutes);

export default app;
