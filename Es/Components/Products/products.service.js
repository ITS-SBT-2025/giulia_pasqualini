import * as productsData from "./products.data.js";

export const getProductById = (id) => {
  const product = productsData.getProductById(id);

  return product;
};

export const getAllProducts = () => {
  const products = productsData.getAllProducts();

  return products;
};

export const createProduct = (product) => {
  const newProduct = productsData.createProduct(product);

  return newProduct;
};

export const updateProduct = (product) => {
  const updatedProduct = productsData.updateProduct(product);

  return updatedProduct;
};

export const deleteProduct = (id) => {
  const result = productsData.deleteProduct(id);

  return result;
};