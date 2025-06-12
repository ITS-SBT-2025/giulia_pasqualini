import dbProducts from "../../Database/products.js";

export const getProductById = (id) => {
  const product = dbProducts.find((p) => p.id === id);

  if (!product) {
    // TODO: gestire errore
    return null;
  }

  return product;
};

export const getAllProducts = () => {
  return dbProducts;
};

export const createProduct = (product) => {
  const maxId =
    dbProducts.length > 0 ? Math.max(...dbProducts.map((p) => p.id)) : 0;

  const newProduct = {
    ...product,
    id: maxId + 1,
  };

  dbProducts.push(newProduct);

  return newProduct;
};

export const updateProduct = (product) => {
  const index = dbProducts.findIndex((p) => p.id === product.id);

  if (index === -1) {
    // TODO: gestire errore
    return null;
  }

  dbProducts[index] = { ...product };

  return dbProducts[index];
};

export const deleteProduct = (id) => {
  const index = dbProducts.findIndex((p) => p.id === id);

  if (index === -1) {
    // TODO: gestire errore
    return false;
  }

  dbProducts.splice(index, 1);

  return true;
};