const db = require("../config/db");

exports.getAll = async () => {
  return (await db.query("SELECT * FROM animal")).rows;
};

exports.create = async (
  nomeAnimal,
  tipoAnimal,
  idadeAnimal,
  dataDesaparecimento,
  descricao,
  status,
  tutorId,
  idEndereco
) => {
  return (
    await db.query(
      `INSERT INTO animal 
      (nomeAnimal, tipoAnimal, idadeAnimal, dataDesaparecimento, descricao, status, tutorId, idEndereco)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [
        nomeAnimal,
        tipoAnimal,
        idadeAnimal,
        dataDesaparecimento,
        descricao,
        status,
        tutorId,
        idEndereco,
      ]
    )
  ).rows[0];
};

exports.update = async (
  id,
  nomeAnimal,
  tipoAnimal,
  idadeAnimal,
  dataDesaparecimento,
  descricao,
  status,
  tutorId,
  idEndereco
) => {
  return (
    await db.query(
      `UPDATE animal
      SET nomeAnimal=$1, tipoAnimal=$2, idadeAnimal=$3, dataDesaparecimento=$4,
      descricao=$5, status=$6, tutorId=$7, idEndereco=$8
      WHERE animalID=$9 RETURNING *`,
      [
        nomeAnimal,
        tipoAnimal,
        idadeAnimal,
        dataDesaparecimento,
        descricao,
        status,
        tutorId,
        idEndereco,
        id,
      ]
    )
  ).rows[0];
};

exports.delete = async (id) => {
  return await db.query("DELETE FROM animal WHERE animalID=$1", [id]);
};
