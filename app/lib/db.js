import mysql from "mysql2/promise";

let connection;

export const createConnection = async (database) => {
  if (!connection) {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: "mdam",
      password: "NotaSecurePassword!",
      database: database,
    });
  }
  return connection;
};
