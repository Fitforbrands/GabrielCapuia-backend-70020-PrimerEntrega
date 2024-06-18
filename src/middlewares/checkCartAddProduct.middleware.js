import productManager from "../managers/productManager.js";

export const checkAddProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const products = await productManager.getProducts();

    const productExist = products.find((p) => p.id === pid);

    if (!productExist)
      return res
        .status(404)
        .json({ status: "error", msg: "ID de Producto no existente" });

    next();
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
};
