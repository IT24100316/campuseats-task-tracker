import { Routes, Route, NavLink } from "react-router-dom";
import MenuPage from "./features/menu/pages/MenuPage";
import DishDetailPage from "./features/menu/pages/DishDetailPage";
import OrderPage from "./features/menu/pages/OrderPage";

export default function App() {
  return (
    <div style={{ textAlign: "center", paddingTop: "20px" }}>
      <nav style={{ marginBottom: "20px" }}>
        <NavLink 
          to="/" 
          style={({ isActive }) => ({
            color: "#818cf8",
            textDecoration: "underline",
            marginRight: "8px",
            fontWeight: isActive ? "bold" : "normal"
          })}
        >
          Menu
        </NavLink>
        <span style={{ color: "#9ca3af" }}>|</span>
        <NavLink 
          to="/order" 
          style={({ isActive }) => ({
            color: "#818cf8",
            textDecoration: "underline",
            marginLeft: "8px",
            fontWeight: isActive ? "bold" : "normal"
          })}
        >
          Place Order
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/dish/:id" element={<DishDetailPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="*" element={<p>404 — Page not found</p>} />
      </Routes>
    </div>
  );
}