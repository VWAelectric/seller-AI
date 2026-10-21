import { useEffect, useState } from "react";
import {
  getProducts,
  getGenerations,
} from "../services/storage";

export default function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    generations: 0,
    hoursSaved: 0,
    successRate: 98,
  });

  const [recentProducts, setRecentProducts] =
    useState([]);

  const [recentGenerations, setRecentGenerations] =
    useState([]);

  useEffect(() => {
    const products = getProducts();
    const generations = getGenerations();

    const hoursSaved = (
      (generations.length * 5) /
      60
    ).toFixed(1);

    setStats({
      products: products.length,
      generations: generations.length,
      hoursSaved,
      successRate: 98,
    });

    setRecentProducts(
      [...products].reverse().slice(0, 5)
    );

    setRecentGenerations(
      [...generations].slice(0, 5)
    );
  }, []);

  const cardStyle = {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "24px",
    boxShadow:
      "0 4px 12px rgba(0,0,0,0.08)",
  };

  return (
    <div style={{ padding: "30px" }}>
      <div
        style={{
          marginBottom: "30px",
        }}
      >
        <h1>🚀 SellerAI Dashboard</h1>

        <p
          style={{
            color: "#666",
            marginTop: "10px",
          }}
        >
          Visão geral da operação da sua
          plataforma.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        <div style={cardStyle}>
          <h3>📦 Produtos</h3>
          <h1>{stats.products}</h1>
          <p>Produtos cadastrados</p>
        </div>

        <div style={cardStyle}>
          <h3>🤖 Conteúdos</h3>
          <h1>{stats.generations}</h1>
          <p>Conteúdos gerados</p>
        </div>

        <div style={cardStyle}>
          <h3>⏱ Tempo Economizado</h3>
          <h1>{stats.hoursSaved}h</h1>
          <p>Estimativa baseada em IA</p>
        </div>

        <div style={cardStyle}>
          <h3>📈 Performance</h3>
          <h1>{stats.successRate}%</h1>
          <p>Eficiência da plataforma</p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr 1fr",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <div style={cardStyle}>
          <h2>
            📦 Últimos Produtos
          </h2>

          {recentProducts.length === 0 ? (
            <p>
              Nenhum produto cadastrado.
            </p>
          ) : (
            <ul>
              {recentProducts.map(
                (product) => (
                  <li
                    key={product.id}
                    style={{
                      marginBottom:
                        "10px",
                    }}
                  >
                    <strong>
                      {product.name}
                    </strong>
                    <br />
                    {product.category}
                  </li>
                )
              )}
            </ul>
          )}
        </div>

        <div style={cardStyle}>
          <h2>
            🤖 Últimas Gerações
          </h2>

          {recentGenerations.length ===
          0 ? (
            <p>
              Nenhum conteúdo
              gerado.
            </p>
          ) : (
            <ul>
              {recentGenerations.map(
                (item) => (
                  <li
                    key={item.id}
                    style={{
                      marginBottom:
                        "10px",
                    }}
                  >
                    <strong>
                      {item.type}
                    </strong>
                    <br />
                    {item.product}
                  </li>
                )
              )}
            </ul>
          )}
        </div>
      </div>

      <div
        style={{
          ...cardStyle,
          marginTop: "30px",
        }}
      >
        <h2>
          📊 Resumo Operacional
        </h2>

        <p>
          Atualmente a SellerAI possui{" "}
          <strong>
            {stats.products}
          </strong>{" "}
          produtos cadastrados e{" "}
          <strong>
            {stats.generations}
          </strong>{" "}
          conteúdos gerados.
        </p>

        <p>
          A plataforma já possui um fluxo
          completo entre Produtos,
          Generator, Library e Dashboard.
        </p>

        <p>
          Próxima etapa: integração com
          backend e OpenAI.
        </p>
      </div>
    </div>
  );
}
