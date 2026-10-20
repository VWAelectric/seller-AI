import { useEffect, useState } from "react";
import {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
} from "../services/storage";

export default function Products() {
  const [products, setProducts] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [sku, setSku] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    const savedProducts = getProducts();
    setProducts(savedProducts);
  };

  const clearForm = () => {
    setName("");
    setCategory("");
    setPrice("");
    setSku("");
    setEditingId(null);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Deseja realmente excluir este produto?"
    );

    if (!confirmDelete) return;

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

  return (
    <div style={{ padding: "30px" }}>
      <h1>📦 Produtos</h1>

      <p>
        Cadastre e gerencie os produtos que serão
        utilizados pela inteligência artificial.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          maxWidth: "500px",
          marginTop: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Nome do produto"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="number"
          placeholder="Preço"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="text"
          placeholder="SKU"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
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

      <div style={{ marginTop: "40px" }}>
        <h2>📋 Produtos Cadastrados</h2>

        {products.length === 0 ? (
          <p>Nenhum produto cadastrado.</p>
        ) : (
          <ul
            style={{
              listStyle: "none",
              padding: 0,
            }}
          >
            {products.map((product) => (
              <li
                key={product.id}
                style={{
                  background: "#fff",
                  padding: "15px",
                  marginBottom: "15px",
                  borderRadius: "10px",
                  boxShadow:
                    "0 2px 8px rgba(0,0,0,0.08)",
                }}
              >
                <strong>
                  {product.name}
                </strong>

                <p>
                  Categoria:{" "}
                  {product.category}
                </p>

                <p>
                  Preço: R${" "}
                  {product.price}
                </p>

                <p>
                  SKU: {product.sku}
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <button
                    onClick={() =>
                      handleEdit(
                        product
                      )
                    }
                    style={{
                      background:
                        "#0d6efd",
                      color: "#fff",
                      border: "none",
                      padding:
                        "8px 14px",
                      borderRadius:
                        "6px",
                      cursor:
                        "pointer",
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
                    style={{
                      background:
                        "#dc3545",
                      color: "#fff",
                      border: "none",
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
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}