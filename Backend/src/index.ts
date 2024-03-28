import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import http from "http";
import cookieParser from "cookie-parser";
import { userRoutes } from "./Firebase/Routes/userRoutes";
import { chatRoutes } from "./Firebase/Routes/chatRoutes";

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

app.use("/chat", chatRoutes);
const server = http.createServer(app);

server.listen(port, () => {
  console.log("hai berjalan di " + port);
});
