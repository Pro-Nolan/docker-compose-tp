const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = 3000;

// Configuration de la connexion PostgreSQL via les variables d'environnement
const pool = new Pool({
  host: process.env.DB_HOST || 'db',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'appdb',
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'azerty',
});

// Route /api1 : Vérification de la connexion à PostgreSQL
app.get('/api1', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      message: "Réponse depuis l'API 1",
      db_time: result.rows[0].now
    });
  } catch (err) {
    console.error('Erreur BDD:', err.message);
    res.status(500).json({ error: "Erreur de connexion à la base de données" });
  }
});

// Route /api2 : Deuxième route de l'API
app.get('/api2', (req, res) => {
  res.json({ message: "Réponse depuis l'API 2" });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend Express démarré sur le port ${PORT}`);
});
