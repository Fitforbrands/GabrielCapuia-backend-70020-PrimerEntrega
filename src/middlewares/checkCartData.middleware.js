import cartManager from "../managers/cartManager.js";
import cartDao from "../dao/cart.dao.js";

export const checkCartData = async (req, res, next) => {
  try {
    const { cid } = req.params;
    // const carts = await cartManager.getCarts(); // version anterior
    const cart = await cartDao.getById(cid);
    if (!cart)
      return res
        .status(404)
        .json({ status: "error", msg: "Carrito no encontrado" });

    // const cart = carts.find((c) => c.id === cid);
    // if (!cart)
    //   return res
    //     .status(404)
    //     .json({ status: "error", msg: "Carrito no encontrado" });

    next();

    //   const { title, description, price, thumbnail, code, stock, category } =
    //     req.body;
    //   const newProduct = {
    //     title,
    //     description,
    //     price,
    //     thumbnail,
    //     code,
    //     stock,
    //     category,
    //   };

    //   // verificar que el producto tenga todas las propiedades
    //   if (Object.values(newProduct).includes(undefined)) {
    //     return res
    //       .status(400)
    //       .json({ status: "error", msg: "Todos los campos son obligatorios" });
    //   }

    // Next permite que continué la ejecución del endpoint
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
};
