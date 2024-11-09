import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import routes from "./Routes/index.js";
import path from 'path'
const __dirname = path.resolve();

dotenv.config();
const app = express();

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3000,
  message: "Too many Requests from this IP, please try again in an hour!",
});
app.use(helmet());
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
      "X-Custom-Header",
    ],
  })
);

app.use(process.env.origin, limiter);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(mongoSanitize());
app.use(cookieParser());

app.use(xss());

//Routes
app.use(routes);

app.use(express.static(path.join(__dirname, '/MyBank/dist')));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "MyBank", "dist", "index.html"));
});

export default app;
