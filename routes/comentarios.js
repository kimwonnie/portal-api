const express = require('express');
const router = express.Router();
const db = require('../database');

router.post('/', (req, res) => {
  const { historia_id, usuario_id, comentario } = req.body;
  db.run('INSERT INTO comentarios (historia_id, usuario_id, comentario) VALUES (?, ?, ?)',
    [historia_id, usuario_id, comentario],
    function(err) {
      if (err) return res.status(400).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    });
});

router.get('/:historia_id', (req, res) => {
  db.all(`
    SELECT c.comentario, u.nome 
    FROM comentarios c 
    JOIN usuarios u ON c.usuario_id = u.id 
    WHERE historia_id = ?
  `, [req.params.historia_id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

module.exports = router;
