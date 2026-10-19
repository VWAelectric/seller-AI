import Sidebar from "./components/Sidebar";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div
        style={{
          padding: "30px",
          flex: 1,
        }}
      >
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;