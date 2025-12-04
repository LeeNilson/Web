const db = require("../config/db");

exports.getAll = async () => {
  return (await db.query("SELECT * FROM foto")).rows;
};

exports.create = async (urlImagem, dataUpload, animalID) => {
  return (
    await db.query(
      "INSERT INTO foto (urlImagem, dataUpload, animalID) VALUES ($1, $2, $3) RETURNING *",
      [urlImagem, dataUpload, animalID]
    )
  ).rows[0];
};

exports.delete = async (id) => {
  return await db.query("DELETE FROM foto WHERE idFoto=$1", [id]);
};
