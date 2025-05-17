const express = require('express');
const cors = require('cors');
const app = express();
const usuariosRouter = require('./routes/usuarios');

app.use(cors());
app.use(express.json());
app.use('/api/usuarios', usuariosRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
