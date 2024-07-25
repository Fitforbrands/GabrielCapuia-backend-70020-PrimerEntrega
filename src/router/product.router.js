import { Router } from "express";
import productManager from "../managers/productManager.js";
import { checkProductData } from "../middlewares/checkProductData.middleware.js";
import productDao from "../dao/product.dao.js";

const router = Router();

// PRODUCTS

// GET All Products

router.get("/", async (req, res) => {
  try {
    const { limit, page, sort, category, status } = req.query;

    const options = {
      limit: limit || 10,
      page: page || 1,
      sort: {
        price: sort === "asc" ? 1 : -1,
      },
      //  lean: true
    };

    if (status) {
      const products = await productDao.getAll({ status }, options);
      res.status(200).json({ status: "ok", products });
      return;
    }

    if (category) {
      const products = await productDao.getAll({ category }, options);
      res.status(200).json({ status: "ok", products });
      return;
    }

    // const { limit } = req.query; // version anterior
    // const products = await productManager.getProducts(limit); // version anterior
    const products = await productDao.getAll({}, options);
    res.status(200).json({ status: "ok", products });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error 500", msg: "Error interno del servidor" });
  }
});

// GET Products by ID

router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    // const products = await productManager.getProductById(pid); //version anterior
    const products = await productDao.getById(pid);

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

router.post("/", checkProductData, async (req, res) => {
  try {
    const body = req.body;
    // const product = await productManager.addProduct(body); // version anterior
    const product = await productDao.create(body);

    res.status(201).json({ status: "ok", product });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
});

// UPDATE product

router.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const body = req.body;
    // const product = await productManager.updateProduct(pid, body); // version anterior
    const product = await productDao.update(pid, body);

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

router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    // const product = await productManager.getProductById(pid); // version anterior
    const product = await productDao.deleteone(pid);

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
