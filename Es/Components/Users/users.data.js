import poolPromise from "../Config/mssql.config.js";

export const getUserById = async (id) => {
  const pool = await poolPromise;
  const sql = `SELECT
                id,
                name,
                email,
                age,
                is_active as isActive
                FROM users
                WHERE id = @id`;

  const queryResult = await pool.request().input("id", id).query(sql);
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
  const sql = `INSERT INTO users (name, password, email, age, is_active)
               OUTPUT INSERTED.id
               VALUES (@name, @password, @email, @age, @is_active)`;
  const queryResult = await pool
  .request()
  .input("name", user.name)
  .input("password", user.password)
  .input("email", user.email)
  .input("age", user.age)
  .input("is_active", user.isActive)
  .query(sql)
  return queryResult.recordset[0].id;
};

export const updateUser = async (user) => {
  const pool = await poolPromise;
  const sql = `UPDATE users
                SET name = @name,
                    password = @password,
                    email = @email,
                    age = @age,
                    is_active = @is_active
                WHERE id = @id`;
  const queryResult = await pool
    .request()
    .input("id", user.id)
    .input("name", user.name)
    .input("password", user.password)
    .input("email", user.email)
    .input("age", user.age)
    .input("is_active", user.isActive)
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