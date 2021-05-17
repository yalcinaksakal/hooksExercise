import React, { useState } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";
const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);
  const addIngredientHandler = ingredient => {
    const index = userIngredients.findIndex(
      ing => ing.title === ingredient.title
    );
    const newList = [...userIngredients];
    if (index !== -1) {
      newList[index].amount += ingredient.amount;
    } else
      newList.push({
        ...ingredient,
        id: "" + userIngredients.length + Math.random(),
      });
    setUserIngredients(newList);
  };
  const removeIngredientHandler = id => {
    setUserIngredients(prevIngs =>
      prevIngs.filter(ingredient => ingredient.id !== id)
    );
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
