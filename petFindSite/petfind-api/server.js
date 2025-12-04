const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/tutores", require("./src/routes/tutorRoutes"));
app.use("/contatos", require("./src/routes/contatoRoutes"));
app.use("/enderecos", require("./src/routes/enderecoRoutes"));
app.use("/animais", require("./src/routes/animalRoutes"));
app.use("/fotos", require("./src/routes/fotoRoutes"));
const authRoutes = require("./src/routes/authRoutes");
app.use("/auth", authRoutes);

app.listen(3000, () => console.log("API rodando na porta 3000 /  http://localhost:3000/animais"));
