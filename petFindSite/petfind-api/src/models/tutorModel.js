const db = require("../config/db");

exports.getAll = async () => {
  return (await db.query("SELECT * FROM tutor")).rows;
};

exports.getById = async (id) => {
  return (await db.query("SELECT * FROM tutor WHERE idTutor = $1", [id])).rows[0];
};

exports.create = async (nomeTutor, senha, email) => {
  return (
    await db.query(
      "INSERT INTO tutor (nomeTutor, senha, email) VALUES ($1, $2, $3) RETURNING *",
      [nomeTutor, senha, email]
    )
  ).rows[0];
};

exports.update = async (id, nomeTutor, senha, email) => {
  return (
    await db.query(
      "UPDATE tutor SET nomeTutor=$1, senha=$2, email=$3 WHERE idTutor=$4 RETURNING *",
      [nomeTutor, senha, email, id]
    )
  ).rows[0];
};

exports.delete = async (id) => {
  return await db.query("DELETE FROM tutor WHERE idTutor=$1", [id]);
};
