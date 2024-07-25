import productDao from "../dao/product.dao.js";
import productManager from "../managers/productManager.js";
import { request, response } from "express";

export const checkAddProduct = async (req = request, res = response, next) => {
  try {
    const { pid } = req.params;
    // const products = await productManager.getProducts(); // version anterior
    const product = await productDao.getById(pid);

    if (!product)
      return res
        .status(404)
        .json({ status: "error", msg: "Producto no encontrado" });

    // const productExist = products.find((p) => p.id === pid);

    // if (!productExist)
    //   return res
    //     .status(404)
    //     .json({ status: "error", msg: "ID de Producto no existente" });

    next();
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
};
