import { useEffect, useState } from "react";
import {
  getGenerations,
  deleteGeneration,
} from "../services/storage";

export default function Library() {
  const [generations, setGenerations] =
    useState([]);

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] =
    useState("Todos");

  const [sortOrder, setSortOrder] =
    useState("recent");

  useEffect(() => {
    loadGenerations();
  }, []);

  const loadGenerations = () => {
    setGenerations(getGenerations());
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Deseja realmente excluir este conteúdo?"
    );

    if (!confirmed) return;

    deleteGeneration(id);
    loadGenerations();
  };

  const handleCopy = async (content) => {
    try {
      await navigator.clipboard.writeText(
        content
      );

      alert(
        "Conteúdo copiado com sucesso!"
      );
    } catch {
      alert(
        "Não foi possível copiar o conteúdo."
      );
    }
  };

  const filteredGenerations = generations
    .filter((generation) => {
      const matchesSearch =
        generation.product
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        generation.type
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        generation.content
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesType =
        filterType === "Todos"
          ? true
          : generation.type ===
            filterType;

      return (
        matchesSearch &&
        matchesType
      );
    })
    .sort((a, b) => {
      if (sortOrder === "recent") {
        return (
          new Date(b.createdAt) -
          new Date(a.createdAt)
        );
      }

      return (
        new Date(a.createdAt) -
        new Date(b.createdAt)
      );
    });

  return (
    <div style={{ padding: "30px" }}>
      <h1>📚 Biblioteca</h1>

      <p>
        Histórico completo de conteúdos
        gerados pela SellerAI.
      </p>

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Pesquisar conteúdo..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            padding: "10px",
            minWidth: "250px",
          }}
        />

        <select
          value={filterType}
          onChange={(e) =>
            setFilterType(
              e.target.value
            )
          }
        >
          <option>
            Todos
          </option>

          <option>
            Título
          </option>

          <option>
            Descrição
          </option>

          <option>
            Bullet Points
          </option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) =>
            setSortOrder(
              e.target.value
            )
          }
        >
          <option value="recent">
            Mais recentes
          </option>

          <option value="oldest">
            Mais antigos
          </option>
        </select>
      </div>

      <p>
        <strong>
          {
            filteredGenerations.length
          }
        </strong>{" "}
        conteúdo(s) encontrado(s)
      </p>

      {filteredGenerations.length ===
      0 ? (
        <div
          style={{
            marginTop: "20px",
          }}
        >
          Nenhum conteúdo encontrado.
        </div>
      ) : (
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {filteredGenerations.map(
            (generation) => (
              <div
                key={generation.id}
                style={{
                  background:
                    "#fff",
                  padding: "20px",
                  borderRadius:
                    "12px",
                  boxShadow:
                    "0 2px 8px rgba(0,0,0,.08)",
                }}
              >
                <h3>
                  {
                    generation.product
                  }
                </h3>

                <p>
                  <strong>
                    Tipo:
                  </strong>{" "}
                  {
                    generation.type
                  }
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
                  >
                    Copiar
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(
                        generation.id
                      )
                    }
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