import fs from "fs";
import { v4 as uuid } from "uuid";

const path = "./src/managers/data/productos.json";

let products = [];

// PRODUCTS

// GET products
const getProducts = async (limit) => {
  try {
    const fileJson = await fs.promises.readFile(path, "utf-8"); // leyendo el archivo JSON
    const parseFile = JSON.parse(fileJson);
    const prodlimit = parseFile.slice(0, limit);

    products = prodlimit || [];

    return products;
  } catch (error) {
    console.log(`${error}`);
  }
};

// Leer un product por id

const getProductById = async (id) => {
  try {
    await getProducts();

    const product = products.find((p) => p.id === id);

    return product;
  } catch (error) {
    console.log(`${error}`);
  }
};

// ADD Products

const addProduct = async (product) => {
  try {
    await getProducts();

    const { title, description, price, thumbnail, code, stock, category } =
      product;

    const newProduct = {
      id: uuid(),
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      category,
      status: true,
    };

    products.push(newProduct);

    await fs.promises.writeFile(path, JSON.stringify(products));

    return newProduct;
  } catch (error) {
    console.log(`${error}`);
  }
};

// UPDATE Product

const updateProduct = async (id, productData) => {
  try {
    await getProducts();

    const index = products.findIndex((p) => p.id === id);
    console.log(index);
    console.log("Producto...");
    console.log(products[index]);
    console.log("data...");
    console.log(productData);

    products[index] = {
      ...products[index],
      ...productData,
    };
    console.log("enviando...");
    console.log(products[index]);

    await fs.promises.writeFile(path, JSON.stringify(products));

    return products[index];
  } catch (error) {
    console.log(`${error}`);
  }
};

// DELETE Product

const deleteProduct = async (id) => {
  try {
    await getProducts();

    products = products.filter((p) => p.id !== id);
    await fs.promises.writeFile(path, JSON.stringify(products));
    return products;
  } catch (error) {
    console.log(`${error}`);
  }
};

export default {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
