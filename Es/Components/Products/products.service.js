import * as productsData from "./products.data.js";

export const getProductById = async (id) => {
  const product = await productsData.getProductById(id);

  return product;
};

export const getAllProducts = async () => {
  const products = await productsData.getAllProducts();

  return products;
};

export const createProduct = async (product) => {
  const newProduct = await productsData.createProduct(product);

  return newProduct;
};

export const updateProduct = async (product) => {
  const updatedProduct = await productsData.updateProduct(product);

  return updatedProduct;
};

export const deleteProduct = async (id) => {
  const result = await productsData.deleteProduct(id);

  return result;
};