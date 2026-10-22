import {
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import Generator from "../pages/Generator";
import Library from "../pages/Library";
import Settings from "../pages/Settings";

export default function AppRoutes() {
  return (

    <Routes>
      <Route
        element={<MainLayout />}
      >
        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/generator"
          element={<Generator />}
        />

        <Route
          path="/library"
          element={<Library />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />
      </Route>
    </Routes>

  );
}