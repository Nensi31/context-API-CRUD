import React, { useContext, useMemo } from "react";
import { UserContext } from "./context/contextProvider";
import { SearchContext } from "./context/searchContextProvider";

const UserTable = ({ handleDelete, handleEdit }) => {
  const { state } = useContext(UserContext);
  const { search } = useContext(SearchContext);

  const getData = useMemo(() => {
    if (search) {
      return state.filter((item) =>
        item.fName.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );
    } else return state;
  }, [search, state]);

  return (
    <div>
      <table>
        <thead>
          <th>fname</th>
          <th>pass</th>
          <th>gender</th>
          <th>language</th>
          <th>Delete</th>
          <th>edit</th>
        </thead>
        <tbody>
          {getData.map((item, index) => (
            <tr>
              <td>{item.fName}</td>
              <td>{item.pass}</td>
              <td>{item.gender}</td>
              <td>{item.lang.join(",")}</td>
              <td>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
              <td>
                <button
                  onClick={() => {
                    handleEdit(index);
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
