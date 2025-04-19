import { useEffect, useState } from 'react';

export default function Home() {
  const [produtos, setProdutos] = useState([]);
  const [form, setForm] = useState({ id: '', produto: '', valor: '', qtd: '' });

  const carregarProdutos = async () => {
    const res = await fetch('/api/produtos');
    const data = await res.json();
    setProdutos(data);
  };

  const adicionarProduto = async (e) => {
    e.preventDefault();
    await fetch('/api/produtos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    setForm({ id: '', produto: '', valor: '', qtd: '' });
    carregarProdutos();
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  return (
    <div>
      <h1>📦 Estoque de Produtos</h1>

      <form onSubmit={adicionarProduto}>
        <input type="number" value={form.id} placeholder="ID" required onChange={e => setForm({ ...form, id: +e.target.value })} />
        <input type="text" value={form.produto} placeholder="Produto" required onChange={e => setForm({ ...form, produto: e.target.value })} />
        <input type="number" value={form.valor} placeholder="Valor" step="0.01" required onChange={e => setForm({ ...form, valor: +e.target.value })} />
        <input type="number" value={form.qtd} placeholder="Qtd" required onChange={e => setForm({ ...form, qtd: +e.target.value })} />
        <button type="submit">Adicionar</button>
      </form>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th><th>Produto</th><th>Valor</th><th>Qtd</th><th>Total</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.produto}</td>
              <td>{p.valor}</td>
              <td>{p.qtd}</td>
              <td>{p.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
