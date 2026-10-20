import { useState } from "react";

export default function Products() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [sku, setSku] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      name,
      category,
      price,
      sku,
    });

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
    </div>
  );
}