import { useEffect, useState } from "react";
import {
  getProducts,
  addGeneration,
  getSettings,
} from "../services/storage";

export default function Generator() {
  const [products, setProducts] = useState([]);
  const [settings, setSettings] =
    useState(null);

  const [selectedProduct, setSelectedProduct] =
    useState("");

  const [contentType, setContentType] =
    useState("title");

  const [generatedContent, setGeneratedContent] =
    useState("");

  useEffect(() => {
    setProducts(getProducts());
    setSettings(getSettings());
  }, []);

  const generateContent = () => {
    if (!selectedProduct) {
      alert("Selecione um produto.");
      return;
    }

    const product = products.find(
      (p) =>
        p.id === Number(selectedProduct)
    );

    if (!product) return;

    const tone =
      settings?.tone || "Persuasivo";

    let content = "";
    let typeLabel = "";

    // ==================================
    // TÍTULO
    // ==================================

    if (contentType === "title") {
      typeLabel = "Título";

      switch (tone) {
        case "Premium":
          content = `${product.name} Premium | Exclusividade e Alta Performance`;
          break;

        case "Técnico":
          content = `${product.name} - Categoria ${product.category} | SKU ${product.sku}`;
          break;

        case "Profissional":
          content = `${product.name} | Solução Profissional para ${product.category}`;
          break;

        case "Objetivo":
          content = `${product.name} | R$ ${product.price}`;
          break;

        default:
          content = `${product.name} | Melhor custo-benefício para sua necessidade`;
      }
    }

    // ==================================
    // DESCRIÇÃO
    // ==================================

    if (
      contentType === "description"
    ) {
      typeLabel = "Descrição";

      switch (tone) {
        case "Premium":
          content = `
Descubra ${product.name}, uma solução premium da categoria ${product.category}.

Criado para quem exige qualidade superior, desempenho consistente e uma experiência diferenciada.

Adquira exclusividade por apenas R$ ${product.price}.
`;
          break;

        case "Técnico":
          content = `
Produto: ${product.name}

Categoria: ${product.category}

SKU: ${product.sku}

Preço: R$ ${product.price}

Desenvolvido para oferecer desempenho confiável e utilização eficiente.
`;
          break;

        case "Profissional":
          content = `
${product.name} é uma solução da categoria ${product.category}, ideal para operações que exigem qualidade e confiabilidade.

Com preço aproximado de R$ ${product.price}, oferece excelente retorno sobre investimento.
`;
          break;

        case "Objetivo":
          content = `
${product.name}

Categoria: ${product.category}

Preço: R$ ${product.price}

SKU: ${product.sku}
`;
          break;

        default:
          content = `
Conheça ${product.name}, um produto da categoria ${product.category}.

Com valor aproximado de R$ ${product.price}, oferece excelente custo-benefício e qualidade para o dia a dia.
`;
      }
    }

    // ==================================
    // BULLETS
    // ==================================

    if (contentType === "bullets") {
      typeLabel = "Bullet Points";

      switch (tone) {
        case "Premium":
          content = `
• Produto premium
• Acabamento diferenciado
• Excelente exclusividade
• Alta qualidade
• Experiência superior
`;
          break;

        case "Técnico":
          content = `
• SKU: ${product.sku}
• Categoria: ${product.category}
• Preço: R$ ${product.price}
• Estrutura otimizada
• Especificações consistentes
`;
          break;

        case "Profissional":
          content = `
• Solução profissional
• Excelente desempenho
• Confiável para operações
• Ótima relação custo-benefício
• Fácil gestão
`;
          break;

        case "Objetivo":
          content = `
• ${product.name}
• ${product.category}
• SKU ${product.sku}
• R$ ${product.price}
`;
          break;

        default:
          content = `
• Produto de alta qualidade
• Excelente custo-benefício
• Fácil utilização
• Alta durabilidade
• Ótima escolha para o dia a dia
`;
      }
    }

    setGeneratedContent(content);

    addGeneration({
      product: product.name,
      type: typeLabel,
      content,
      tone,
    });
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>🤖 Gerador de Conteúdo</h1>

      <p>
        Conteúdo personalizado de acordo
        com as configurações da SellerAI.
      </p>

      {settings && (
        <div
          style={{
            marginBottom: "20px",
            padding: "12px",
            background: "#f3f4f6",
            borderRadius: "8px",
          }}
        >
          <strong>Tom Atual:</strong>{" "}
          {settings.tone}
        </div>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          maxWidth: "600px",
        }}
      >
        <select
          value={selectedProduct}
          onChange={(e) =>
            setSelectedProduct(
              e.target.value
            )
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

        <select
          value={contentType}
          onChange={(e) =>
            setContentType(
              e.target.value
            )
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

        <button
          onClick={generateContent}
        >
          Gerar Conteúdo
        </button>
      </div>

      {generatedContent && (
        <div
          style={{
            marginTop: "30px",
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow:
              "0 2px 8px rgba(0,0,0,.08)",
          }}
        >
          <h2>
            Conteúdo Gerado
          </h2>

          <pre
            style={{
              whiteSpace:
                "pre-wrap",
              fontFamily:
                "inherit",
            }}
          >
            {generatedContent}
          </pre>
        </div>
      )}
    </div>
  );
}