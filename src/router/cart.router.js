import { Router } from "express";
import cartManager from "../managers/cartManager.js";
import { checkCartData } from "../middlewares/checkCartData.middleware.js";
import { checkAddProduct } from "../middlewares/checkCartAddProduct.middleware.js";
import cartDao from "../dao/cart.dao.js";

const router = Router();

// busca todos los cart

router.get("/", async (req, res) => {
  try {
    const cart = await cartDao.getAllCarts();
    res.status(201).json({ status: "ok", cart });
  } catch (error) {
    console.log(error);
  }
});

// Crea Cart

router.post("/", async (req, res) => {
  try {
    // const cart = await cartManager.createCart(); // Version anterior
    const cart = await cartDao.create();

    res.status(201).json({ status: "ok", cart });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
});

// Busca por ID

router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;

    // const cart = await cartManager.getCartById(cid); //version anterior
    const cart = await cartDao.getById(cid);
    if (!cart)
      return res
        .status(404)
        .json({ status: "error", msg: "Carrito no encontrado" });

    res.status(201).json({ status: "ok", cart });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
});

// Add product to cart

// Se crearon dos middleware para verificar si el ID de carrito y de prod existen
router.post(
  "/:cid/product/:pid",
  checkCartData,
  checkAddProduct,
  async (req, res) => {
    try {
      const { cid, pid } = req.params;
      // Chequear que el producto y el carrito existan y sino devolver un status 404 indicando los errores
      // if(!cart) return res.status(404).json({status: "error", msg: "Carrito no encontrado"})
      // const cart = await cartManager.addProductToCart(cid, pid); //version anterior
      const cart = await cartDao.addProductToCart(cid, pid);

      res.status(201).json({ status: "ok", cart });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ status: "error", msg: "Error interno del servidor" });
    }
  }
);

router.delete(
  "/:cid/product/:pid",
  checkCartData,
  checkAddProduct,
  async (req, res) => {
    try {
      const { cid, pid } = req.params;
      // Chequear que el producto y el carrito existan y sino devolver un status 404 indicando los errores
      // if(!cart) return res.status(404).json({status: "error", msg: "Carrito no encontrado"})
      // const cart = await cartManager.addProductToCart(cid, pid); //version anterior
      // const cart = await cartDao.addProductToCart(cid, pid);
      const cart = await cartDao.deleteProductInCart(cid, pid);
      res.status(201).json({ status: "ok", cart });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ status: "error", msg: "Error interno del servidor" });
    }
  }
);

// Update a quantity of specific Product in cart

router.put(
  "/:cid/product/:pid",
  checkCartData,
  checkAddProduct,
  async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;
      const cart = await cartDao.updateQuantityProductInCart(
        cid,
        pid,
        quantity
      );
      res.status(201).json({ status: "ok", cart });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ status: "error", msg: "Error interno del servidor" });
    }
  }
);

router.delete(
  "/:cid/product/:pid",
  checkCartData,
  checkAddProduct,
  async (req, res) => {
    try {
      const { cid, pid } = req.params;
      // Chequear que el producto y el carrito existan y sino devolver un status 404 indicando los errores
      // if(!cart) return res.status(404).json({status: "error", msg: "Carrito no encontrado"})
      // const cart = await cartManager.addProductToCart(cid, pid); //version anterior
      // const cart = await cartDao.addProductToCart(cid, pid);
      const cart = await cartDao.deleteProductInCart(cid, pid);
      res.status(201).json({ status: "ok", cart });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ status: "error", msg: "Error interno del servidor" });
    }
  }
);

// Delete products in cart

router.delete("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;

    const cart = await cartDao.getById(cid);
    if (!cart)
      return res
        .status(404)
        .json({ status: "error", msg: "Carrito no encontrado" });
    const cartResponse = await cartDao.deleteAllProductsInCart(cid);

    res.status(201).json({ status: "ok", cartResponse });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
});

export default router;
