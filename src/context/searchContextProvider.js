import React, { createContext, useMemo, useReducer } from "react";

const initialState = "";

export const SearchContext = createContext({
  search: initialState,
  dispatch: () => {},
});

const ContextProvider = ({ children }) => {
  const reducer = (search, action) => {
    console.log("type", action.type);
    switch (action.type) {
      case "SEARCH": {
        return action.data;
      }

      default: {
        return search || "";
      }
    }
  };

  const [search, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => ({ search, dispatch }), [search]);

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export const UserContextConsumer = SearchContext.Consumer;

export default ContextProvider;
