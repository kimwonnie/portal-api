const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db/portal_de_historias.db');

// Listar todos os usuários
router.get('/', (req, res) => {
  db.all('SELECT id, nome, email FROM usuarios', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Cadastrar novo usuário
router.post('/', (req, res) => {
  const { nome, email, senha } = req.body;
  db.run('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [nome, email, senha], function(err) {
    if (err) return res.status(400).json({ error: err.message });
    res.status(201).json({ id: this.lastID });
  });
});

module.exports = router;
