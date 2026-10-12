import { Link } from "react-router-dom";

function DishCard({ dish }) {
  return (
    <div className={`dish-card ${!dish.available ? "dish-card--unavailable" : ""}`}>
      <div className="dish-card-header">
        <span className="dish-category">{dish.category}</span>
        <span className={`dish-status ${dish.available ? "status-available" : "status-soldout"}`}>
          {dish.available ? "Available" : "Sold Out"}
        </span>
      </div>
      <h3 className="dish-name">{dish.name}</h3>
      <div className="dish-card-footer">
        <span className="dish-price">Rs. {Number(dish.price).toFixed(2)}</span>
        <Link to={`/dish/${dish.id}`} className="dish-detail-btn">
          Details →
        </Link>
      </div>
    </div>
  );
}

export default DishCard;