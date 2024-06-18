import express from "express";
import productManager from "./managers/productManager.js";
import cartManager from "./managers/cartManager.js";
import productRouter from "./router/product.router.js";
import cartRouter from "./router/cart.router.js";

const app = express();
app.use(express.json()); // este middleware perite obtener archivos JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api", productRouter);
app.use("/api", cartRouter);

const PORT = 8080;

// CART

// GET All Carts

app.get("/api/carts", async (req, res) => {
  const { limit } = req.query;

  const carts = await cartManager.getCarts(limit);

  res.send(carts);
});

// GET Carts by ID

app.get("/api/carts/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const carts = await cartManager.getCartById(Number(cid));
    console.log(carts);
    if (!carts)
      return res
        .status(404)
        .json({ status: "error", msg: "Carrito no encontrado" });

    res.status(200).json({ status: "ok", carts });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error 500", msg: "Error interno del servidor" });
  }
});

// ADD Cart

// falta hacer la logica de agregado del cart

// ADD Product to cartID

app.post("/api/cart", async (req, res) => {
  try {
    const body = req.body;
    if (
      !body.title ||
      !body.description ||
      !body.category ||
      !body.price ||
      !body.code ||
      !body.stock
    )
      return res
        .status(404)
        .json({ status: "error", msg: "Ver campos obligatorios" });

    const product = await productManager.addProduct(body);

    res.status(201).json({ status: "ok", product });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
});

// PORT listen

app.listen(PORT, () => {
  console.log("puerto conectado: 8080");
});
