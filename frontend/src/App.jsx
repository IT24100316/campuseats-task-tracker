import { Routes, Route, NavLink } from "react-router-dom";
import MenuPage from "./features/menu/pages/MenuPage";
import DishDetailPage from "./features/menu/pages/DishDetailPage";
import OrderPage from "./features/menu/pages/OrderPage";

export default function App() {
  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="navbar-brand">
          <span className="brand-logo">🍔</span>
          <span className="brand-name">CampusEats</span>
          <span className="badge-tag">Task Tracker • Lab 11</span>
        </div>
        <div className="nav-links">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            Menu
          </NavLink>
          <NavLink to="/order" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            Place Order
          </NavLink>
        </div>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/dish/:id" element={<DishDetailPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="*" element={<div className="state-container"><h2>404</h2><p>Page not found</p></div>} />
        </Routes>
      </main>

      <footer className="footer">
        <p>CampusEats • SE3090 Software Engineering Frameworks • Lab 11 DevOps & Cloud Hosting</p>
      </footer>
    </div>
  );
}