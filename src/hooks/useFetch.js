import { useCallback, useReducer } from "react";

const httpReducer = (state, action) => {
  switch (action.type) {
    case "SEND":
      return { ...state, err: null, isLoading: true };
    case "FETCH":
      return { ingredients: action.ingredients, err: null, isLoading: false };
    case "ERR":
      return { ...state, err: action.err, isLoading: false };
    case "CLR":
      return { ...state, err: null, isLoading: false };
    default:
      throw new Error("shouldnt get there");
  }
};

const useHttp = () => {
  const [httpState, dispatch] = useReducer(httpReducer, {
    ingredients: [],
    err: null,
    isLoading: false,
  });

  const sendRequest = useCallback((newList = null, filterText = null) => {
    dispatch({ type: "SEND" });

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
        dispatch({
          type: "FETCH",
          ingredients: !filterText
            ? newList
            : newList.filter(ingredient =>
                ingredient.title.includes(filterText)
              ),
        });
      })
      .catch(err => {
        dispatch({ type: "ERR", err: `sth went wrong (${err.message})` });
      });
  }, []);
  const clearErrorHandler = useCallback(() => {
    dispatch({ type: "CLR" });
  }, []);
  return { ...httpState, sendRequest, clearErrorHandler };
};

export default useHttp;
