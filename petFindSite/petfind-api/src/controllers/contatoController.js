const contato = require("../models/contatoModel");

exports.getAll = async (req, res) => {
  try {
    res.json(await contato.getAll());
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.create = async (req, res) => {
  try {
    const { telefone, idTutor } = req.body;
    res.json(await contato.create(telefone, idTutor));
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.update = async (req, res) => {
  try {
    const { telefone, idTutor } = req.body;
    res.json(await contato.update(req.params.id, telefone, idTutor));
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.delete = async (req, res) => {
  try {
    await contato.delete(req.params.id);
    res.send("Contato deletado");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
