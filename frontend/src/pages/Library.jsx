import { useEffect, useState } from "react";
import {
  getGenerations,
  deleteGeneration,
} from "../services/storage";

export default function Library() {
  const [generations, setGenerations] = useState([]);

  useEffect(() => {
    loadGenerations();
  }, []);

  const loadGenerations = () => {
    const savedGenerations =
      getGenerations();

    setGenerations(savedGenerations);
  };

  const handleDelete = (id) => {
    const confirmDelete =
      window.confirm(
        "Deseja excluir este conteúdo?"
      );

    if (!confirmDelete) return;

    deleteGeneration(id);
    loadGenerations();
  };

  const handleCopy = async (
    content
  ) => {
    try {
      await navigator.clipboard.writeText(
        content
      );

      alert(
        "Conteúdo copiado com sucesso!"
      );
    } catch {
      alert(
        "Não foi possível copiar."
      );
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>📚 Biblioteca</h1>

      <p>
        Histórico completo dos conteúdos
        gerados pela SellerAI.
      </p>

      {generations.length === 0 ? (
        <div
          style={{
            marginTop: "30px",
          }}
        >
          <p>
            Nenhum conteúdo gerado ainda.
          </p>
        </div>
      ) : (
        <div
          style={{
            marginTop: "30px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {generations.map(
            (generation) => (
              <div
                key={generation.id}
                style={{
                  background: "#fff",
                  padding: "20px",
                  borderRadius:
                    "10px",
                  boxShadow:
                    "0 2px 8px rgba(0,0,0,0.08)",
                }}
              >
                <h3>
                  {generation.product}
                </h3>

                <p>
                  <strong>
                    Tipo:
                  </strong>{" "}
                  {generation.type}
                </p>

                <p>
                  <strong>
                    Data:
                  </strong>{" "}
                  {new Date(
                    generation.createdAt
                  ).toLocaleString()}
                </p>

                <hr />

                <pre
                  style={{
                    whiteSpace:
                      "pre-wrap",
                    fontFamily:
                      "inherit",
                  }}
                >
                  {
                    generation.content
                  }
                </pre>

                <div
                  style={{
                    display:
                      "flex",
                    gap: "10px",
                    marginTop:
                      "15px",
                  }}
                >
                  <button
                    onClick={() =>
                      handleCopy(
                        generation.content
                      )
                    }
                    style={{
                      background:
                        "#198754",
                      color: "#fff",
                      border:
                        "none",
                      padding:
                        "8px 14px",
                      borderRadius:
                        "6px",
                      cursor:
                        "pointer",
                    }}
                  >
                    Copiar
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(
                        generation.id
                      )
                    }
                    style={{
                      background:
                        "#dc3545",
                      color: "#fff",
                      border:
                        "none",
                      padding:
                        "8px 14px",
                      borderRadius:
                        "6px",
                      cursor:
                        "pointer",
                    }}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}