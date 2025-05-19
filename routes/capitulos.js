const express = require('express');
const router = express.Router();
const db = require('../database');

router.post('/', (req, res) => {
  const { historia_id, titulo, conteudo, capa_url, ultimo_capitulo } = req.body;
  db.run('INSERT INTO capitulos (historia_id, titulo, conteudo, capa_url, ultimo_capitulo) VALUES (?, ?, ?, ?, ?)',
    [historia_id, titulo, conteudo, capa_url, ultimo_capitulo],
    function(err) {
      if (err) return res.status(400).json({ error: err.message });
      if (ultimo_capitulo) {
        db.run('UPDATE historias SET status = "Concluída" WHERE id = ?', [historia_id]);
      }
      res.status(201).json({ id: this.lastID });
    });
});

router.get('/:historia_id', (req, res) => {
  db.all('SELECT * FROM capitulos WHERE historia_id = ?', [req.params.historia_id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

module.exports = router;
