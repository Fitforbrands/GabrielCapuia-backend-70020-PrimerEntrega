import express from "express";
import productRouter from "./router/product.router.js";
import cartRouter from "./router/cart.router.js";
import viewsRouter from "./router/views.router.js";
import handlebars from "express-handlebars";
import __dirname from "./dirname.js";
import { Server } from "socket.io";

const app = express();

// set up Handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.json()); // este middleware perite obtener archivos JSON

// Middleware para permitir CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Permitir solicitudes desde localhost:8080
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.urlencoded({ extended: true }));

app.use("/api", productRouter);
app.use("/api", cartRouter);
app.use("/", viewsRouter);
app.use(express.static("public")); //SI QUIERO VER DESDE PUBLIC CON STATIC va arriba

const PORT = 8080;

// PORT listen

const httpServer = app.listen(PORT, () => {
  console.log("puerto conectado: 8080");
});

export const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");
});
