import { Router } from "express";
import cartManager from "../managers/cartManager.js";
import { checkCartData } from "../middlewares/checkCartData.middleware.js";
import { checkAddProduct } from "../middlewares/checkCartAddProduct.middleware.js";

const router = Router();

// Crea Cart

router.post("/carts", async (req, res) => {
  try {
    const cart = await cartManager.createCart();

    res.status(201).json({ status: "ok", cart });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
});

// Busca por ID

router.get("/carts/:cid", async (req, res) => {
  try {
    const { cid } = req.params;

    const cart = await cartManager.getCartById(cid);
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
  "/carts/:cid/product/:pid",
  checkCartData,
  checkAddProduct,
  async (req, res) => {
    try {
      const { cid, pid } = req.params;
      // Chequear que el producto y el carrito existan y sino devolver un status 404 indicando los errores
      // if(!cart) return res.status(404).json({status: "error", msg: "Carrito no encontrado"})
      const cart = await cartManager.addProductToCart(cid, pid);

      res.status(201).json({ status: "ok", cart });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ status: "error", msg: "Error interno del servidor" });
    }
  }
);

export default router;
