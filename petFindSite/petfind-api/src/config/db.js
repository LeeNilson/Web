const { Pool } = require("pg");

const pool = new Pool({
  user: "petfind_user",
  host: "localhost",
  database: "pet_find_db",
  password: "root",
  port: 5432
});

module.exports = pool;