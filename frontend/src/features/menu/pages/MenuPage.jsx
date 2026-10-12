import { useState } from "react";
import MenuList from "../components/MenuList";
import { useDebounce } from "../hooks/useDebounce";
import { useFetch } from "../hooks/useFetch";

function MenuPage() {
  // Read API base URL from environment (Task 01)
  const API = import.meta.env.VITE_API_URL;
  const menuEndpoint = API ? `${API}/api/menu` : "/menu.json";

  const { 
    data: dishes, 
    isLoading, 
    error,
    source
  } = useFetch(menuEndpoint, "/menu.json");

  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 400);

  // Loading state
  if (isLoading) {
    return (
      <div className="state-container">
        <div className="spinner"></div>
        <p>Loading menu...</p>
      </div>
    );
  }

  // Error state
  if (error && (!dishes || dishes.length === 0)) {
    return (
      <div className="state-container error-box">
        <h3>Could not load menu</h3>
        <p>{error}</p>
        <small>Target endpoint: {menuEndpoint}</small>
      </div>
    );
  }

  // Filtered dishes
  const dishList = Array.isArray(dishes) ? dishes : [];
  const filtered = dishList.filter((dish) =>
    dish.name?.toLowerCase().includes(debounced.toLowerCase()) ||
    dish.category?.toLowerCase().includes(debounced.toLowerCase())
  );

  return (
    <div className="menu-page">
      <header className="page-header">
        <div>
          <h1 className="page-title">CampusEats Daily Menu</h1>
          <p className="page-subtitle">Freshly prepared meals available across campus canteens</p>
        </div>
        <div className="status-pill">
          <span className={`status-dot ${source === "api" ? "online" : "standby"}`}></span>
          {source === "api" ? "Live API Connected" : "Local Menu Catalog"}
        </div>
      </header>

      <div className="search-bar-wrap">
        <input
          type="text"
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="🔍 Search dishes by name or category (e.g. Kottu, Mains)..."
        />
        <span className="results-badge">{filtered.length} {filtered.length === 1 ? "dish" : "dishes"}</span>
      </div>

      <MenuList dishes={filtered} />
    </div>
  );
}

export default MenuPage;