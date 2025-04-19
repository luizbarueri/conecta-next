import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
  const { method } = req;

  try {
    if (method === 'GET') {
      const { rows } = await pool.query('SELECT * FROM estoque ORDER BY id');
      res.status(200).json(rows);
    } else if (method === 'POST') {
      const { id, produto, valor, qtd } = req.body;
      const total = valor * qtd;
      await pool.query(
        'INSERT INTO estoque (id, produto, valor, qtd, total) VALUES ($1, $2, $3, $4, $5)',
        [id, produto, valor, qtd, total]
      );
      res.status(201).send('Produto inserido!');
    } else {
      res.status(405).send({ error: 'Método não permitido' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Erro no servidor: ' + err.message });
  }
}
