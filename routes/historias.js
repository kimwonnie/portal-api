const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', (req, res) => {
  db.all('SELECT * FROM historias', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.post('/', (req, res) => {
  const { titulo, descricao, categorias, capa_url, autor_id } = req.body;
  db.run('INSERT INTO historias (titulo, descricao, categorias, capa_url, autor_id) VALUES (?, ?, ?, ?, ?)',
    [titulo, descricao, categorias, capa_url, autor_id],
    function(err) {
      if (err) return res.status(400).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    });
});

router.get('/autor/:autor_id', (req, res) => {
  db.all('SELECT * FROM historias WHERE autor_id = ?', [req.params.autor_id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

module.exports = router;
