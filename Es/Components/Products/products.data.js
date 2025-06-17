import ErrorWithStatus from "../../error-with-status.js";
import poolPromise from "../../Config/mssql.config.js";

export const getProductById = async (id) => {
  const pool = await poolPromise;
  const sql = `SELECT
              id,
              name,
              description,
              price,
              inStock
              FROM products
              WHERE id = @id`;

  const queryResult = await pool.request().query(sql);
  const product = queryResult.recordset[0];

  if (!product) {
    throw new ErrorWithStatus(404, `Prodotto con id ${id} non trovato`);
  }

  return product;
};

export const createProduct = async (product) => {
  const pool = await poolPromise;
  const sql = `INSERT INTO products (name, description, price, inStock)
               OUTPUT INSERTED.id,
               VALUES (@name, @description, @price, @inStock)`;
  const queryResult = await pool
  .request()
  .input("name", product.name)
  .input("description", product.description)
  .input("price", product.price)
  .input("inStock", product.inStock)
  .query(sql)
  return queryResult.recordset[0];
};
  // const maxId =
  //   dbProducts.length > 0 ? Math.max(...dbProducts.map((p) => p.id)) : 0;
  // const newProduct = {
  //   ...product,
  //   id: maxId + 1,
  // };

  // dbProducts.push({
  //   ...product,
  //   id: maxId + 1,
  // });
  // return newProduct;

export const updateProduct = async (product) => {
  const pool = await poolPromise;
  const sql = `UPDATE products
               SET name = @name,
                   description = @description,
                   price = @price,
                   inStock = @inStock
               OUTPUT INSERTED.id, INSERTED.name, INSERTED.description, INSERTED.price, INSERTED.inStock
               WHERE id = @id`;
  await pool
    .request()
    .input("id", product.id)
    .input("name", product.name)
    .input("description", product.description)
    .input("price", product.price)
    .input("inStock", product.inStock)
    .query(sql);
}
  // const index = dbProducts.findIndex((p) => p.id === product.id);
  // if (index === -1) {
  //   throw new ErrorWithStatus(404, `Prodotto con id ${product.id} non trovato`);
  // }
  // dbProducts[index] = { ...product };
  // return dbProducts[index];

export const deleteProduct = async (id) => {
  const pool = await poolPromise;
  const sql = `DELETE FROM products
               WHERE id = @id`;
  await pool.request().input("id", id).query(sql);
}
  // const index = dbProducts.findIndex((p) => p.id === id);

  // if (index === -1) {
  //   throw new ErrorWithStatus(404, `Prodotto con id ${id} non trovato`);
  // }
  // dbProducts.splice(index, 1);
  // return true;