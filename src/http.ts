import express from "express";
import { routes } from "./routes";
import { Server, Socket } from "socket.io";
import { createServer } from "http";
import path from "path";
import "./database";

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));
app.set("views", path.join(__dirname, "..", "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.get('/pages/client', (req, res) => {
  res.render('html/client.html');
})


app.get('/pages/admin', (req, res) => {
  res.render('html/admin.html');
})

const http = createServer(app);
const io = new Server(http);

io.on("connection", (socket: Socket) => {});

app.use(express.json());
app.use(routes);

export { http, io }