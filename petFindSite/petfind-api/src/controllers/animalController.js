const animal = require("../models/animalModel");

exports.getAll = async (req, res) => {
  try {
    res.json(await animal.getAll());
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.create = async (req, res) => {
  try {
    const {
      nomeAnimal,
      tipoAnimal,
      idadeAnimal,
      dataDesaparecimento,
      descricao,
      status,
      tutorId,
      idEndereco
    } = req.body;

    res.json(
      await animal.create(
        nomeAnimal,
        tipoAnimal,
        idadeAnimal,
        dataDesaparecimento,
        descricao,
        status,
        tutorId,
        idEndereco
      )
    );
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.update = async (req, res) => {
  try {
    const {
      nomeAnimal,
      tipoAnimal,
      idadeAnimal,
      dataDesaparecimento,
      descricao,
      status,
      tutorId,
      idEndereco
    } = req.body;

    res.json(
      await animal.update(
        req.params.id,
        nomeAnimal,
        tipoAnimal,
        idadeAnimal,
        dataDesaparecimento,
        descricao,
        status,
        tutorId,
        idEndereco
      )
    );
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.delete = async (req, res) => {
  try {
    await animal.delete(req.params.id);
    res.send("Animal removido");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
