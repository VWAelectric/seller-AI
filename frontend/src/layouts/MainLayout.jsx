import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function MainLayout() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "var(--background)",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <header
          style={{
            height: "70px",
            background: "#ffffff",

            borderBottom:
              "1px solid var(--border)",

            display: "flex",
            alignItems: "center",
            justifyContent:
              "space-between",

            padding: "0 24px",
          }}
        >
          <div>
            <strong>
              SellerAI Platform
            </strong>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <span>
              🚀 Versão 0.1.0
            </span>

            <div
              style={{
                width: "40px",
                height: "40px",

                borderRadius: "50%",

                background:
                  "var(--primary)",

                color: "#fff",

                display: "flex",
                alignItems: "center",
                justifyContent:
                  "center",

                fontWeight: "bold",
              }}
            >
              W
            </div>
          </div>
        </header>

        <main
          style={{
            flex: 1,
            padding: "25px",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}