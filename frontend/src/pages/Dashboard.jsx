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

  const [activities, setActivities] = useState([]);

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

    const recentActivities = [
      ...products.map((product) => ({
        type: "Produto",
        message: `${product.name || "Produto"} cadastrado`,
      })),
      ...generations.map((generation) => ({
        type: "Conteúdo",
        message: `${generation.type || "Conteúdo"} gerado`,
      })),
    ];

    setActivities(
      recentActivities.reverse().slice(0, 5)
    );
  }, []);

  const cardStyle = {
    background: "#fff",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>📊 Dashboard</h1>

      <p
        style={{
          color: "#666",
          marginBottom: "30px",
        }}
      >
        Bem-vindo à SellerAI. Acompanhe seus
        resultados e produtividade.
      </p>

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
          <h3>⏱ Horas Economizadas</h3>
          <h1>{stats.hoursSaved}</h1>
          <p>Estimativa baseada em IA</p>
        </div>

        <div style={cardStyle}>
          <h3>🚀 Performance</h3>
          <h1>{stats.successRate}%</h1>
          <p>Eficiência da plataforma</p>
        </div>
      </div>

      <div
        style={{
          ...cardStyle,
          marginTop: "30px",
        }}
      >
        <h2>📋 Atividades Recentes</h2>

        {activities.length === 0 ? (
          <p>
            Nenhuma atividade registrada até o
            momento.
          </p>
        ) : (
          <ul>
            {activities.map(
              (activity, index) => (
                <li
                  key={index}
                  style={{
                    padding: "8px 0",
                  }}
                >
                  {activity.message}
                </li>
              )
            )}
          </ul>
        )}
      </div>

      <div
        style={{
          ...cardStyle,
          marginTop: "30px",
        }}
      >
        <h2>📈 Resumo Geral</h2>

        <p>
          <strong>
            Produtos cadastrados:
          </strong>{" "}
          {stats.products}
        </p>

        <p>
          <strong>
            Conteúdos gerados:
          </strong>{" "}
          {stats.generations}
        </p>

        <p>
          <strong>
            Horas economizadas:
          </strong>{" "}
          {stats.hoursSaved}
        </p>

        <p>
          <strong>Status:</strong> Plataforma
          operacional e pronta para integração
          com OpenAI e PostgreSQL.
        </p>
      </div>
    </div>
  );
}