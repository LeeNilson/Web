const foto = require("../models/fotoModel");

exports.getAll = async (req, res) => {
  try {
    res.json(await foto.getAll());
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.create = async (req, res) => {
  try {
    const { urlImagem, dataUpload, animalID } = req.body;
    res.json(await foto.create(urlImagem, dataUpload, animalID));
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.delete = async (req, res) => {
  try {
    await foto.delete(req.params.id);
    res.send("Foto removida");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
