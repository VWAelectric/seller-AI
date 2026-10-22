import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkStyle = ({ isActive }) => ({
    display: "flex",
    alignItems: "center",
    gap: "10px",

    padding: "12px 14px",
    marginBottom: "8px",

    borderRadius: "10px",

    textDecoration: "none",

    color: isActive ? "#ffffff" : "#cbd5e1",

    backgroundColor: isActive
      ? "#2563eb"
      : "transparent",

    fontWeight: isActive ? "600" : "500",

    transition: "all .2s ease",
  });

  return (
    <aside
      style={{
        width: "260px",
        minHeight: "100vh",

        background: "#0f172a",

        padding: "24px",

        borderRight:
          "1px solid rgba(255,255,255,.06)",
      }}
    >
      <div
        style={{
          marginBottom: "30px",
        }}
      >
        <h2
          style={{
            color: "#ffffff",
            marginBottom: "10px",
          }}
        >
          🚀 SellerAI
        </h2>

        <p
          style={{
            color: "#94a3b8",
            fontSize: "14px",
          }}
        >
          Plataforma inteligente para
          criação de anúncios.
        </p>

        <hr
          style={{
            marginTop: "20px",
            border: "none",
            borderTop:
              "1px solid rgba(255,255,255,.08)",
          }}
        />
      </div>

      <nav>
        <NavLink
          to="/"
          style={linkStyle}
        >
          📊 Dashboard
        </NavLink>

        <NavLink
          to="/products"
          style={linkStyle}
        >
          📦 Produtos
        </NavLink>

        <NavLink
          to="/generator"
          style={linkStyle}
        >
          🤖 Gerador IA
        </NavLink>

        <NavLink
          to="/library"
          style={linkStyle}
        >
          📚 Biblioteca
        </NavLink>

        <NavLink
          to="/settings"
          style={linkStyle}
        >
          ⚙️ Configurações
        </NavLink>
      </nav>
    </aside>
  );
}