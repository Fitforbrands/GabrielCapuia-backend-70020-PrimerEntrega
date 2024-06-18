import fs from "fs";
import { v4 as uuid } from "uuid";

const cartPath = "./src/managers/data/carritos.json";

let carts = [];

// CART

// GET CARTS

const getCarts = async () => {
  const cartJson = await fs.promises.readFile(cartPath, "utf-8");
  carts = JSON.parse(cartJson) || []; // si no encunetra devuelve array vacio

  return carts;
};

// GET carts by id

const getCartById = async (cid) => {
  await getCarts();

  const cart = carts.find((c) => c.id === cid);

  return cart;
};

// ADD Carts

const createCart = async () => {
  await getCarts();
  const newCart = {
    id: uuid(),
    products: [],
  };

  carts.push(newCart);

  await fs.promises.writeFile(cartPath, JSON.stringify(carts));

  return newCart;
};

// ADD Products to Cart

const addProductToCart = async (cid, pid) => {
  await getCarts();
  const cart = await getCartById(cid);
  // Modificar para chequear que el producto existe y aumentar la quantity

  const productInCart = cart.products.find((p) => p.pID === pid);
  if (!productInCart) {
    // si no existe el producto en ese carrito se crea con una unidad
    const product = {
      pID: pid,
      quantity: 1,
    };
    cart.products.push(product);
    await fs.promises.writeFile(cartPath, JSON.stringify(carts));
    return cart;
  } else {
    // si existe el producto en el carrito se incrementa la cantidad

    const index = cart.products.findIndex((i) => i.pID === pid);

    cart.products[index].quantity += 1;
    await fs.promises.writeFile(cartPath, JSON.stringify(carts));
    return cart;
  }
};

export default {
  createCart,
  getCartById,
  getCarts,
  addProductToCart,
};
