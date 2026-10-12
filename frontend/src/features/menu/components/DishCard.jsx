function DishCard({ dish }) {
  return (
    <div style={{ margin: "28px 0" }}>
      <h3 style={{ margin: "4px 0", fontSize: "1.3rem", fontWeight: 600 }}>{dish.name}</h3>
      <p style={{ margin: "4px 0", color: "#9ca3af", fontSize: "1rem" }}>
        Rs. {Number(dish.price).toFixed(2)}
      </p>
      <p style={{ margin: "4px 0", color: "#6b7280", fontSize: "0.9rem" }}>
        {dish.category}
      </p>
    </div>
  );
}

export default DishCard;