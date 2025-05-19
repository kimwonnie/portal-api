const express = require('express');
const cors = require('cors');
const app = express();

require('./database');

const usuariosRouter = require('./routes/usuarios');
const historiasRouter = require('./routes/historias');
const capitulosRouter = require('./routes/capitulos');
const comentariosRouter = require('./routes/comentarios');

app.use(cors());
app.use(express.json());

app.use('/api/usuarios', usuariosRouter);
app.use('/api/historias', historiasRouter);
app.use('/api/capitulos', capitulosRouter);
app.use('/api/comentarios', comentariosRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
