const express = require('express');
const cors = require('cors');
const db = require('./db');
const todosRouter = require('./routes/todos');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/todos', todosRouter);

const PORT = process.env.PORT || 5000;

async function connectWithRetry() {
  while (true) {
    try {
      await db.query('SELECT 1');
      console.log('Database connected');
      break;
    } catch (err) {
      console.log('Waiting for database...');
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
}

async function init() {
  try {
    await connectWithRetry();

    await db.query(`
      CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
      )
    `);

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });

  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

init();