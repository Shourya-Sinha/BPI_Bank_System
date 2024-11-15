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
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://cdn.jsdelivr.net"],
      scriptSrcElem: ["'self'", "https://cdn.jsdelivr.net"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "https://res.cloudinary.com"], // Updated for Cloudinary
      fontSrc: ["'self'", "https://cdn.jsdelivr.net", "https://fonts.gstatic.com", "data:"],
      connectSrc: ["'self'", "https://fonts.googleapis.com", "https://fonts.gstatic.com", "https://api.iconify.design", "https://api.simplesvg.com", "https://api.unisvg.com","https://bpi-bank-system.onrender.com","http://localhost:7878"],
    },
  })
);
app.use(
  cors({
    origin: process.env.ORIGIN || '*',
    // origin: function (origin, callback) {
    //   if (!origin || /localhost/.test(origin) || origin === 'https://bpi-bank-system.onrender.com') {
    //     // Allow localhost and the production domain
    //     callback(null, true);
    //   } else {
    //     callback(new Error('CORS not allowed by this server'), false);
    //   }
    // },
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

app.use(process.env.ORIGIN, limiter);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(mongoSanitize());
app.use(cookieParser());

app.use(xss());

//Routes
app.use(routes);
console.log("Routes object: ", routes);
app.use(express.static(path.join(__dirname, '/MyBank/dist')));
console.log(path.join(__dirname, '/MyBank/dist')); // Path verification

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "MyBank", "dist", "index.html"));
});

export default app;
