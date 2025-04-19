import { Client } from 'pg';
import dotenv from 'dotenv';
dotenv.config();



const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

client.connect();

export default async function handler(req, res) {
  const { method } = req;

  if (method === 'GET') {
    const result = await client.query('SELECT * FROM estoque ORDER BY id');
    res.status(200).json(result.rows);
  }

  else if (method === 'POST') {
    const { id, produto, valor, qtd } = req.body;
    const total = valor * qtd;
    await client.query(
      'INSERT INTO estoque (id, produto, valor, qtd, total) VALUES ($1, $2, $3, $4, $5)',
      [id, produto, valor, qtd, total]
    );
    res.status(200).send('Produto inserido!');
  }

  // PUT e DELETE podem ser adicionados depois
}
