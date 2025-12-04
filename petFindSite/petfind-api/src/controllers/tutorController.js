const tutor = require("../models/tutorModel");

exports.getAll = async (req, res) => {
  try {
    res.json(await tutor.getAll());
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getById = async (req, res) => {
  try {
    res.json(await tutor.getById(req.params.id));
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.create = async (req, res) => {
  try {
    const { nomeTutor, senha, email } = req.body;
    res.json(await tutor.create(nomeTutor, senha, email));
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.update = async (req, res) => {
  try {
    const { nomeTutor, senha, email } = req.body;
    res.json(await tutor.update(req.params.id, nomeTutor, senha, email));
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.delete = async (req, res) => {
  try {
    await tutor.delete(req.params.id);
    res.send("Tutor removido com sucesso");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
