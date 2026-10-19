import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div
      style={{
        width: "250px",
        height: "100vh",
        background: "#111827",
        color: "white",
        padding: "20px",
      }}
    >
      <h2>Seller AI</h2>

      <hr />

      <p>
        <Link to="/dashboard">📊 Dashboard</Link>
      </p>

      <p>
        <Link to="/products">📦 Produtos</Link>
      </p>

      <p>
        <Link to="/generator">🤖 Gerador IA</Link>
      </p>

      <p>
        <Link to="/library">📚 Biblioteca</Link>
      </p>

      <p>
        <Link to="/settings">⚙️ Configurações</Link>
      </p>
    </div>
  );
}