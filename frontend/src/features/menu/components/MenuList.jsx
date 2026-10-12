import DishCard from "./DishCard";

function MenuList({ dishes }) {
  if (!dishes.length) {
    return <p style={{ color: "#9ca3af" }}>No dishes match your search.</p>;
  }

  return (
    <div style={{ marginTop: "24px" }}>
      {dishes.map((dish) => (
        <DishCard key={dish.id} dish={dish} />
      ))}
    </div>
  );
}

export default MenuList;