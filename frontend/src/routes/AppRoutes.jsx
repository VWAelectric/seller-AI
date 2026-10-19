import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import Generator from "../pages/Generator";
import Library from "../pages/Library";
import Settings from "../pages/Settings";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/products" element={<Products />} />
      <Route path="/generator" element={<Generator />} />
      <Route path="/library" element={<Library />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}