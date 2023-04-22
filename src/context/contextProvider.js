import React, { createContext, useMemo, useReducer } from "react";

const initialState = [];

export const UserContext = createContext({
  state: initialState,
  dispatch: () => {},
});

const reducer = (state, action) => {
  console.log("type", action.type);
  switch (action.type) {
    case "ADD": {
      return [...state, action.data];
    }
    case "DELETE": {
      return state.filter((item, index) => index !== action.data);
    }
    case "UPDATE": {
      return state.map((item, index) => {
        if (action.data.editIndex === index) {
          return action.data.record;
        } else return item;
      });
    }
    case "SEARCH": {
      return state.filter((item) => item.fName.includes(action.data));
    }
    default: {
      return state || [];
    }
  }
};

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const UserContextConsumer = UserContext.Consumer;

export default ContextProvider;
