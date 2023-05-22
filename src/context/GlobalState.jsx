import { createContext, useContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  transactions: [],
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalState = () => {
  const context = useContext(Context);
  return context;
};

export const Context = createContext();

// eslint-disable-next-line react/prop-types
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState, () => {
    //Cada vez que cargue, vas a leer el valor del localStorage y lo asignes al state
    const localData = localStorage.getItem("transactions");
    return localData ? JSON.parse(localData) : initialState
  });
  useEffect(()=> {
    localStorage.setItem('transactions', JSON.stringify(state))
  },[state])

  const addTransaction = (trasaction) => {
    console.log("addTransaction");
    dispatch({
      type: "ADD_TRANSACTION",
      payload: trasaction,
    });
  };

  const deleteTransaction = (id) => {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });
  };

  return (
    <Context.Provider
      value={{
        transactions: state.transactions,
        addTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </Context.Provider>
  );
};
