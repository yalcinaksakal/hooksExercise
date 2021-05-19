import React, { useCallback, useEffect, useReducer, useState } from "react";
import idGen from "../../helper/idGenerator";
import ErrorModal from "../UI/ErrorModal";
import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case "FETCH":
      return action.ingredients;

    default:
      throw new Error("shouldnt get there");
  }
};

const Ingredients = () => {
  // const [userIngredients, setUserIngredients] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [err, setErr] = useState();

  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  const fetchNewList = useCallback((newList = null, filterText = null) => {
    console.log("fetching");
    setIsloading(true);
    setErr(null);
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
        setIsloading(false);
        if (!newList) newList = data ? data : [];
        dispatch({
          type: "FETCH",
          ingredients: !filterText
            ? newList
            : newList.filter(ingredient =>
                ingredient.title.includes(filterText)
              ),
        });
      })
      // setUserIngredients(
      //   !filterText
      //     ? newList
      //     : newList.filter(ingredient =>
      //         ingredient.title.includes(filterText)
      //       )
      // );
      // })
      .catch(err => {
        setErr(`sth went wrong (${err.message})`);
        setIsloading(false);
      });
  }, []);
  //after and every render cycle useEffect runs
  // empty dependency array []=componentDidMount
  useEffect(() => {
    fetchNewList();
  }, [fetchNewList]);

  // useEffect(() => {
  //   console.log("rendering ingredients", userIngredients);
  // }, [userIngredients]);

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
        {err ? (
          <ErrorModal onClose={() => setErr(null)}>{err}</ErrorModal>
        ) : (
          <IngredientList
            ingredients={userIngredients}
            onRemoveItem={removeIngredientHandler}
            loading={isLoading}
          />
        )}
      </section>
    </div>
  );
};

export default Ingredients;
