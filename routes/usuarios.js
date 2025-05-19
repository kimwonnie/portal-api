const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', (req, res) => {
  db.all('SELECT id, nome, email FROM usuarios', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.post('/', (req, res) => {
  const { nome, email, senha } = req.body;
  db.run('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [nome, email, senha], function(err) {
    if (err) return res.status(400).json({ error: err.message });
    res.status(201).json({ id: this.lastID });
  });
});

module.exports = router;
