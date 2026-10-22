import { useEffect, useState } from "react";
import { useToast } from "../context/ToastContext";
import {
  getSettings,
  saveSettings,
} from "../services/storage";

export default function Settings() {
  const [settings, setSettings] =
    useState({
      userName: "",
      companyName: "",
      email: "",
      tone: "Persuasivo",
      language: "Português",
      marketplace: "Mercado Livre",
    });

  useEffect(() => {
    setSettings(getSettings());
  }, []);

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    saveSettings(settings);

    showToast(
      "Configurações salvas com sucesso!"
    );
  };

  const { showToast } = useToast();

  return (
    <div style={{ padding: "30px" }}>
      <h1>⚙️ Configurações</h1>

      <p>
        Personalize a SellerAI para
        adequar a geração de conteúdo ao
        seu negócio.
      </p>

      <form
        onSubmit={handleSave}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          maxWidth: "600px",
          marginTop: "25px",
        }}
      >
        <h2>👤 Perfil</h2>

        <input
          type="text"
          name="userName"
          placeholder="Nome do usuário"
          value={settings.userName}
          onChange={handleChange}
        />

        <input
          type="text"
          name="companyName"
          placeholder="Nome da empresa"
          value={
            settings.companyName
          }
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={settings.email}
          onChange={handleChange}
        />

        <h2>🤖 Preferências da IA</h2>

        <label>
          Tom de escrita
        </label>

        <select
          name="tone"
          value={settings.tone}
          onChange={handleChange}
        >
          <option>
            Persuasivo
          </option>

          <option>
            Profissional
          </option>

          <option>
            Técnico
          </option>

          <option>
            Premium
          </option>

          <option>
            Objetivo
          </option>
        </select>

        <label>
          Idioma padrão
        </label>

        <select
          name="language"
          value={
            settings.language
          }
          onChange={handleChange}
        >
          <option>
            Português
          </option>

          <option>
            Inglês
          </option>

          <option>
            Espanhol
          </option>
        </select>

        <label>
          Marketplace Principal
        </label>

        <select
          name="marketplace"
          value={
            settings.marketplace
          }
          onChange={handleChange}
        >
          <option>
            Mercado Livre
          </option>

          <option>
            Shopee
          </option>

          <option>
            Amazon
          </option>

          <option>
            Magalu
          </option>
        </select>

        <button type="submit">
          Salvar Configurações
        </button>
      </form>
    </div>
  );
}