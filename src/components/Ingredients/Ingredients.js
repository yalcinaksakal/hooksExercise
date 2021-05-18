import React, { useCallback, useEffect, useState } from "react";
import idGen from "../../helper/idGenerator";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";
const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);

  const fetchNewList = useCallback((newList = null, filterText = null) => {
    console.log("fetching");
    fetch(
      "https://order-meal-a2f7a-default-rtdb.firebaseio.com/ingredients.json",
      newList
        ? {
            method: "PUT",
            body: JSON.stringify(newList),
            headers: { "Content-Type": "application/json" },
          }
        : null
    )
      .then(repsonse => repsonse.json())
      .then(data => {
        if (!newList) newList = data ? data : [];
        setUserIngredients(
          !filterText
            ? newList
            : newList.filter(ingredient =>
                ingredient.title.includes(filterText)
              )
        );
      });
  }, []);
  //after and every render cycle useEffect runs
  // empty dependency array []=componentDidMount
  useEffect(() => {
    fetchNewList();
  }, []);

  useEffect(() => {
    console.log("rendering ingredients", userIngredients);
  }, [userIngredients]);

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

  const filterIngredientHandler = useCallback(
    filterText => {
      fetchNewList(null, filterText);
    },
    [fetchNewList]
  );

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onSearch={filterIngredientHandler} />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
};

export default Ingredients;
