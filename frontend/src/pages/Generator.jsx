import { useEffect, useState } from "react";
import {
  getProducts,
  addGeneration,
} from "../services/storage";

export default function Generator() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [contentType, setContentType] = useState("title");
  const [generatedContent, setGeneratedContent] = useState("");

  useEffect(() => {
    const savedProducts = getProducts();
    setProducts(savedProducts);
  }, []);

  const generateContent = () => {
    if (!selectedProduct) {
      alert("Selecione um produto.");
      return;
    }

    const product = products.find(
      (p) => p.id === Number(selectedProduct)
    );

    if (!product) return;

    let content = "";
    let typeLabel = "";

    switch (contentType) {
      case "title":
        typeLabel = "Título";

        content = `${product.name} | Categoria ${product.category} | Melhor relação custo-benefício por apenas R$ ${product.price}`;
        break;

      case "description":
        typeLabel = "Descrição";

        content = `
${product.name} é um produto da categoria ${product.category}, desenvolvido para oferecer qualidade, praticidade e excelente desempenho.

Com valor aproximado de R$ ${product.price}, é uma excelente escolha para consumidores que buscam confiabilidade e ótimo custo-benefício.

O produto possui identificação SKU ${product.sku}, facilitando a gestão e organização do catálogo da sua loja.

Invista em desempenho, qualidade e segurança com ${product.name}.
`;
        break;

      case "bullets":
        typeLabel = "Bullet Points";

        content = `
• Produto: ${product.name}
• Categoria: ${product.category}
• SKU: ${product.sku}
• Valor aproximado: R$ ${product.price}
• Excelente custo-benefício
• Produto ideal para uso diário
• Alta qualidade e durabilidade
• Pronto para utilização imediata
`;
        break;

      default:
        content = "Conteúdo não disponível.";
    }

    setGeneratedContent(content);

    addGeneration({
      product: product.name,
      type: typeLabel,
      content,
    });
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>🤖 Gerador de Conteúdo</h1>

      <p>
        Gere conteúdos inteligentes para seus anúncios.
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          maxWidth: "600px",
          marginTop: "20px",
        }}
      >
        <label>Produto</label>

        <select
          value={selectedProduct}
          onChange={(e) =>
            setSelectedProduct(e.target.value)
          }
        >
          <option value="">
            Selecione um produto
          </option>

          {products.map((product) => (
            <option
              key={product.id}
              value={product.id}
            >
              {product.name}
            </option>
          ))}
        </select>

        <label>Tipo de Conteúdo</label>

        <select
          value={contentType}
          onChange={(e) =>
            setContentType(e.target.value)
          }
        >
          <option value="title">
            Título
          </option>

          <option value="description">
            Descrição
          </option>

          <option value="bullets">
            Bullet Points
          </option>
        </select>

        <button onClick={generateContent}>
          Gerar Conteúdo
        </button>
      </div>

      {generatedContent && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            background: "#fff",
            borderRadius: "10px",
            boxShadow:
              "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <h2>Conteúdo Gerado</h2>

          <pre
            style={{
              whiteSpace: "pre-wrap",
              fontFamily: "inherit",
            }}
          >
            {generatedContent}
          </pre>
        </div>
      )}
    </div>
  );
}