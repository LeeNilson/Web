const db = require("../config/db");

exports.getAll = async () => {
  return (await db.query("SELECT * FROM contato")).rows;
};

exports.create = async (telefone, idTutor) => {
  return (
    await db.query(
      "INSERT INTO contato (telefone, idTutor) VALUES ($1, $2) RETURNING *",
      [telefone, idTutor]
    )
  ).rows[0];
};

exports.update = async (id, telefone, idTutor) => {
  return (
    await db.query(
      "UPDATE contato SET telefone=$1, idTutor=$2 WHERE idContato=$3 RETURNING *",
      [telefone, idTutor, id]
    )
  ).rows[0];
};

exports.delete = async (id) => {
  return await db.query("DELETE FROM contato WHERE idContato=$1", [id]);
};
