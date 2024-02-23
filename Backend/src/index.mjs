import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import http from "http";
import cookieParser from "cookie-parser";


const app = express();
const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

const port = 3001;

const server = http.createServer(app);

server.listen(port, () => {
  console.log("hai berjalan di " + port);
});
