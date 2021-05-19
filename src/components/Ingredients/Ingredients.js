import React, { useCallback, useEffect, useMemo } from "react";
import idGen from "../../helper/idGenerator";
import useHttp from "../../hooks/useFetch";
import ErrorModal from "../UI/ErrorModal";
import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

const Ingredients = () => {
  const {
    hasIngredient,
    ingredients: userIngredients,
    isLoading,
    err,
    sendRequest: fetchNewList,
    clearErrorHandler,
  } = useHttp();

  useEffect(() => {
    fetchNewList();
  }, [fetchNewList]);

  const addIngredientHandler = useCallback(
    ingredient => {
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
    },
    [fetchNewList, userIngredients]
  );
  const removeIngredientHandler = useCallback(
    id => {
      const newList = userIngredients.filter(
        ingredient => ingredient.id !== id
      );
      fetchNewList(newList);
    },
    [fetchNewList, userIngredients]
  );

  const filterIngredientHandler = useCallback(
    filterText => {
      if (!hasIngredient) return;
      fetchNewList(null, filterText);
    },
    [fetchNewList, hasIngredient]
  );

  const ingredientListEl = useMemo(() => {
    return (
      <IngredientList
        ingredients={userIngredients}
        onRemoveItem={removeIngredientHandler}
        loading={isLoading}
      />
    );
  }, [userIngredients, removeIngredientHandler, isLoading]);
  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onSearch={filterIngredientHandler} />
        {err ? (
          <ErrorModal onClose={clearErrorHandler}>{err}</ErrorModal>
        ) : (
          ingredientListEl
        )}
      </section>
    </div>
  );
};

export default Ingredients;
