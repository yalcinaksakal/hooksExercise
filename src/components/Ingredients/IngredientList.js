import React from "react";
import Spinner from "../UI/LoadingIndicator";
import "./IngredientList.css";

const IngredientList = props => {
  return (
    <section className="ingredient-list">
      <h2>Ingredients</h2>
      {props.loading ? (
        <Spinner />
      ) : props.ingredients.length ? (
        <ul>
          {props.ingredients.map(ig => (
            <li key={ig.id} onClick={props.onRemoveItem.bind(null, ig.id)}>
              <span>{ig.title}</span>
              <span>{ig.amount}x</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No ingredients found</p>
      )}
    </section>
  );
};

export default IngredientList;
