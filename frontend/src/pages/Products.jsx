import { useEffect, useState } from "react";
import {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
} from "../services/storage";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const [editingId, setEditingId] = useState(null);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [sku, setSku] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    setProducts(getProducts());
  };

  const clearForm = () => {
    setEditingId(null);
    setName("");
    setCategory("");
    setPrice("");
    setSku("");
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Deseja realmente excluir este produto?"
    );

    if (!confirmed) return;

    deleteProduct(id);
    loadProducts();
  };

  const handleEdit = (product) => {
    setEditingId(product.id);

    setName(product.name);
    setCategory(product.category);
    setPrice(product.price);
    setSku(product.sku);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !category || !price || !sku) {
      alert("Preencha todos os campos.");
      return;
    }

    if (editingId) {
      updateProduct({
        id: editingId,
        name,
        category,
        price,
        sku,
      });
    } else {
      addProduct({
        name,
        category,
        price,
        sku,
      });
    }

    loadProducts();
    clearForm();
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(
        sortOrder === "asc"
          ? "desc"
          : "asc"
      );
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) {
      return "↕";
    }

    return sortOrder === "asc"
      ? "↑"
      : "↓";
  };

  const filteredProducts = products
    .filter(
      (product) =>
        product.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        product.category
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        product.sku
          .toLowerCase()
          .includes(search.toLowerCase())
    )
    .sort((a, b) => {
      let comparison = 0;

      if (sortField === "price") {
        comparison =
          Number(a.price) -
          Number(b.price);
      } else {
        comparison = String(
          a[sortField]
        ).localeCompare(
          String(b[sortField])
        );
      }

      return sortOrder === "asc"
        ? comparison
        : -comparison;
    });

  return (
    <div style={{ padding: "30px" }}>
      <h1>📦 Produtos</h1>

      <p>
        Cadastre e gerencie os produtos da
        SellerAI.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          maxWidth: "500px",
          marginTop: "20px",
          marginBottom: "40px",
        }}
      >
        <input
          type="text"
          placeholder="Nome do produto"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Categoria"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Preço"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="SKU"
          value={sku}
          onChange={(e) =>
            setSku(e.target.value)
          }
        />

        <button type="submit">
          {editingId
            ? "Atualizar Produto"
            : "Salvar Produto"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={clearForm}
          >
            Cancelar Edição
          </button>
        )}
      </form>

      <h2>📋 Produtos Cadastrados</h2>

      <input
        type="text"
        placeholder="Pesquisar produto..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "10px",
          marginTop: "15px",
          marginBottom: "20px",
        }}
      />

      <p>
        <strong>
          {filteredProducts.length}
        </strong>{" "}
        produto(s) encontrado(s)
      </p>

      <div
        style={{
          overflowX: "auto",
          marginTop: "20px",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "#fff",
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow:
              "0 2px 10px rgba(0,0,0,0.08)",
          }}
        >
          <thead>
            <tr
              style={{
                background: "#f3f4f6",
              }}
            >
              <th
                onClick={() =>
                  handleSort("name")
                }
                style={{
                  padding: "15px",
                  textAlign: "left",
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                Produto {getSortIcon("name")}
              </th>

              <th
                onClick={() =>
                  handleSort("category")
                }
                style={{
                  padding: "15px",
                  textAlign: "left",
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                Categoria {getSortIcon("category")}
              </th>

              <th
                onClick={() =>
                  handleSort("price")
                }
                style={{
                  padding: "15px",
                  textAlign: "left",
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                Preço {getSortIcon("price")}
              </th>

              <th
                style={{
                  padding: "15px",
                  textAlign: "left",
                }}
              >
                SKU
              </th>

              <th
                style={{
                  padding: "15px",
                  textAlign: "center",
                }}
              >
                Ações
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  style={{
                    padding: "20px",
                    textAlign: "center",
                  }}
                >
                  Nenhum produto encontrado.
                </td>
              </tr>
            ) : (
              filteredProducts.map(
                (product) => (
                  <tr
                    key={product.id}
                    style={{
                      borderTop:
                        "1px solid #e5e7eb",
                    }}
                  >
                    <td style={{ padding: "15px" }}>
                      {product.name}
                    </td>

                    <td style={{ padding: "15px" }}>
                      {product.category}
                    </td>

                    <td style={{ padding: "15px" }}>
                      R$ {product.price}
                    </td>

                    <td style={{ padding: "15px" }}>
                      {product.sku}
                    </td>

                    <td
                      style={{
                        padding: "15px",
                        textAlign: "center",
                      }}
                    >
                      <button
                        onClick={() =>
                          handleEdit(product)
                        }
                        style={{
                          marginRight: "10px",
                        }}
                      >
                        Editar
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            product.id
                          )
                        }
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}