const endereco = require("../models/enderecoModel");

exports.getAll = async (req, res) => {
  try {
    res.json(await endereco.getAll());
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.create = async (req, res) => {
  try {
    const { cidade, estado, cep } = req.body;
    res.json(await endereco.create(cidade, estado, cep));
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.update = async (req, res) => {
  try {
    const { cidade, estado, cep } = req.body;
    res.json(await endereco.update(req.params.id, cidade, estado, cep));
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.delete = async (req, res) => {
  try {
    await endereco.delete(req.params.id);
    res.send("Endereço deletado");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
