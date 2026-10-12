import { useState } from "react";
import MenuList from "../components/MenuList";
import { useDebounce } from "../hooks/useDebounce";
import { useFetch } from "../hooks/useFetch";

function MenuPage() {
  // Read API base URL from environment (Lab 11 Task 01)
  const API = import.meta.env.VITE_API_URL;
  const menuEndpoint = API ? `${API}/api/menu` : "/menu.json";

  const { 
    data: dishes, 
    isLoading, 
    error 
  } = useFetch(menuEndpoint, "/menu.json");

  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 400);

  // Loading state
  if (isLoading) {
    return <p style={{ color: "#9ca3af" }}>Loading menu...</p>;
  }

  // Error state
  if (error && (!dishes || dishes.length === 0)) {
    return <p style={{ color: "#f87171" }}>Could not load menu: {error}</p>;
  }

  const dishList = Array.isArray(dishes) ? dishes : [];
  const filtered = dishList
    .filter((dish) => dish.available !== false) // Only available dishes as shown in screenshot
    .filter((dish) =>
      dish.name?.toLowerCase().includes(debounced.toLowerCase())
    );

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", margin: "16px 0 20px" }}>
        CampusEats Menu
      </h1>

      <div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search dishes..."
          style={{
            padding: "6px 12px",
            background: "#1f2937",
            border: "1px solid #374151",
            color: "#f3f4f6",
            borderRadius: "4px",
            fontSize: "14px",
            width: "220px",
            outline: "none",
            textAlign: "center"
          }}
        />
      </div>

      <MenuList dishes={filtered} />
    </div>
  );
}

export default MenuPage;