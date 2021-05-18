import React, { useState } from "react";
import idGen from "../../helper/idGenerator";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";
const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);

  const fetchNewList = newList => {
    fetch(
      "https://order-meal-a2f7a-default-rtdb.firebaseio.com/ingredients.json",
      {
        method: "PUT",
        body: JSON.stringify(newList),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then(repsonse => repsonse.json())
      .then(data => {
        setUserIngredients(newList);
      });
  };
  const addIngredientHandler = ingredient => {
    if (!ingredient.amount) return;
    const index = userIngredients.findIndex(
      ing => ing.title === ingredient.title
    );
    const newList = [...userIngredients];
    if (index !== -1) {
      newList[index].amount += ingredient.amount;
    } else
      newList.push({
        ...ingredient,
        id: idGen.next().value,
      });
    fetchNewList(newList);
  };
  const removeIngredientHandler = id => {
    const newList = userIngredients.filter(ingredient => ingredient.id !== id);
    fetchNewList(newList);
  };
  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
};

export default Ingredients;
