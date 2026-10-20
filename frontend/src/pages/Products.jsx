import { useEffect, useState } from "react";
import {
  getProducts,
  addProduct,
  deleteProduct,
} from "../services/storage";

export default function Products() {
  const [products, setProducts] = useState([]);

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

  const handleDelete = (id) => {
    deleteProduct(id);
    loadProducts();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !category || !price || !sku) {
      alert("Preencha todos os campos.");
      return;
    }

    addProduct({
      name,
      category,
      price,
      sku,
    });

    loadProducts();

    setName("");
    setCategory("");
    setPrice("");
    setSku("");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>📦 Produtos</h1>

      <p>
        Cadastre os produtos que serão utilizados
        pela inteligência artificial.
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
          Salvar Produto
        </button>
      </form>

      <div style={{ marginTop: "40px" }}>
        <h2>📋 Produtos Cadastrados</h2>

        {products.length === 0 ? (
          <p>Nenhum produto cadastrado.</p>
        ) : (
          <ul style={{ padding: 0, listStyle: "none" }}>
            {products.map((product) => (
              <li
                key={product.id}
                style={{
                  padding: "15px",
                  marginBottom: "12px",
                  background: "#fff",
                  borderRadius: "10px",
                  boxShadow:
                    "0 2px 6px rgba(0,0,0,0.08)",
                }}
              >
                <strong>{product.name}</strong>

                <p>
                  Categoria: {product.category}
                </p>

                <p>
                  Preço: R$ {product.price}
                </p>

                <p>
                  SKU: {product.sku}
                </p>

                <button
                  onClick={() =>
                    handleDelete(product.id)
                  }
                  style={{
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    border: "none",
                    padding:
                      "8px 14px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Excluir
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}