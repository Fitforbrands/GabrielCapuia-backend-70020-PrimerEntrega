import { Router } from "express";
import productManager from "../managers/productManager.js";
import { checkProductData } from "../middlewares/checkProductData.middleware.js";
const router = Router();

// PRODUCTS

// GET All Products

router.get("/products", async (req, res) => {
  const { limit } = req.query;
  const products = await productManager.getProducts(limit);

  res.send(products);
});

// GET Products by ID

router.get("/product/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const products = await productManager.getProductById(pid);

    if (!products)
      return res
        .status(404)
        .json({ status: "error", msg: "Producto no encontrado" });

    res.status(200).json({ status: "ok", products });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error 500", msg: "Error interno del servidor" });
  }
});

// ADD Products

router.post("/products", checkProductData, async (req, res) => {
  try {
    const body = req.body;
    const product = await productManager.addProduct(body);

    res.status(201).json({ status: "ok", product });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
});

// UPDATE product

router.put("/product/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const body = req.body;
    const product = await productManager.updateProduct(pid, body);

    if (!product.id)
      return res
        .status(404)
        .json({ status: "error", msg: "Producto no encontrado" });

    res.send(product);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
});

// DELETE product

router.delete("/product/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getProductById(pid);

    if (!product)
      return res
        .status(404)
        .json({ status: "error", msg: "Producto no encontrado" });

    await productManager.deleteProduct(pid);

    res.status(200).json({
      status: "ok",
      msg: `Producto con el ID ${pid} eliminado con éxito`,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
});

export default router;
