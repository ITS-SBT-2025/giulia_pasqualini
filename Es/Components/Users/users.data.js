import { poolPromise } from '../../db.js';

export const getUserById = async (id) => {
  const pool = await poolPromise;
  const sql = `SELECT
                id,
                name,
                email,
                age,
                isActive
                FROM users
                WHERE id = @id`;

  const queryResult = await pool.request().query(sql);
  const user = queryResult.recordset[0];
  if (!user) {
    throw new ErrorWithStatus(404, `Prodotto con id ${id} non trovato`);
  }
  return user;
}

export const getAllUsers = () => {
  return dbUsers;
};

export const createUser = async (user) => {
  const pool = await poolPromise;
  const sql = `INSERT INTO users (name, email, age, isActive)
               OUTPUT INSERTED.id,
               VALUES (@name, @email, @age, @isActive)`;
  const queryResult = await pool
  .request()
  .input("name", user.name)
  .input("email", user.email)
  .input("agee", user.age)
  .input("isActive", user.isActive)
  .query(sql)
  return queryResult.recordset[0];
};

export const updateUser = async (user) => {
  const pool = await poolPromise;
  const sql = `UPDATE users
                SET name = @name,
                    email = @email,
                    age = @age,
                    isActive = @isActive
                OUTPUT INSERTED.id, INSERTED.name, INSERTED.email, INSERTED.age, INSERTED.isActive
                WHERE id = @id`;
  const queryResult = await pool
    .request()
    .input("id", user.id)
    .input("name", user.name)
    .input("email", user.email)
    .input("age", user.age)
    .input("isActive", user.isActive)
    .query(sql);
  const updatedUser = queryResult.recordset[0];
  if (!updatedUser) {
    throw new ErrorWithStatus(404, `Utente con id ${user.id} non trovato`);
  } 
};

export const deleteUser = async (id) => {
  const pool = await poolPromise;
  const sql = `DELETE FROM users
                WHERE id = @id`;
  const queryResult = await pool.request().input("id", id).query(sql);
  
  if (queryResult.rowsAffected[0] === 0) {
    throw new ErrorWithStatus(404, `Utente con id ${id} non trovato`);
  }
  
  return { message: `Utente con id ${id} eliminato con successo` };
};