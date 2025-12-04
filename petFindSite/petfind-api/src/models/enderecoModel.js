const db = require("../config/db");

exports.getAll = async () => {
  return (await db.query("SELECT * FROM endereco")).rows;
};

exports.create = async (cidade, estado, cep) => {
  return (
    await db.query(
      "INSERT INTO endereco (cidade, estado, cep) VALUES ($1, $2, $3) RETURNING *",
      [cidade, estado, cep]
    )
  ).rows[0];
};

exports.update = async (id, cidade, estado, cep) => {
  return (
    await db.query(
      "UPDATE endereco SET cidade=$1, estado=$2, cep=$3 WHERE idEndereco=$4 RETURNING *",
      [cidade, estado, cep, id]
    )
  ).rows[0];
};

exports.delete = async (id) => {
  return await db.query("DELETE FROM endereco WHERE idEndereco=$1", [id]);
};
