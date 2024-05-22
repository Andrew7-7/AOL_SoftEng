import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import http from "http";
import cookieParser from "cookie-parser";
import { userRoutes } from "./Firebase/Routes/userRoutes";
import { tutorRoutes } from "./Firebase/Routes/tutorRoutes";
import { chatRoutes } from "./Firebase/Routes/chatRoutes";
import { adminRoutes } from "./Firebase/Routes/adminRoutes";
import { otpRoutes } from "./Firebase/Routes/otpRoutes";
import { coursesRoutes } from "./Firebase/Routes/courseRoutes";
import { homeRoutes } from "./Firebase/Routes/homeRoutes";

const app = express();

const port = 3002;

const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/otp", otpRoutes);
app.use("/tutor", tutorRoutes);
app.use("/course", coursesRoutes);
app.use("/home", homeRoutes);

app.use("/chat", chatRoutes);
const server = http.createServer(app);
app.use("/api", chatRoutes);


server.listen(port, () => {
  console.log("hai berjalan di " + port);
});
