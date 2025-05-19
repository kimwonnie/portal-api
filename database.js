const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const dbFile = './db/portal_de_historias.db';

if (!fs.existsSync('./db')) {
  fs.mkdirSync('./db');
}

const db = new sqlite3.Database(dbFile);

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS historias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    descricao TEXT,
    categorias TEXT,
    capa_url TEXT,
    status TEXT DEFAULT 'Em andamento',
    autor_id INTEGER,
    FOREIGN KEY (autor_id) REFERENCES usuarios(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS capitulos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    historia_id INTEGER,
    titulo TEXT,
    conteudo TEXT,
    capa_url TEXT,
    ultimo_capitulo BOOLEAN DEFAULT 0,
    FOREIGN KEY (historia_id) REFERENCES historias(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS comentarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    historia_id INTEGER,
    usuario_id INTEGER,
    comentario TEXT,
    FOREIGN KEY (historia_id) REFERENCES historias(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
  )`);

  console.log('✅ Banco criado ou já existia');
});

module.exports = db;
