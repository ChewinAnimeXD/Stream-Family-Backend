import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import platformRoutes from "./routes/platform.routes.js"
import sellPlatformRoutes from "./routes/sellPlatform.routes.js"
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();


app.use(cors({
  origin: true,
  credentials: true
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", platformRoutes);
app.use("/api", sellPlatformRoutes);

export default app;
