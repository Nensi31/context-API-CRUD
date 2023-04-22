import { useState, useContext } from "react";
import "./App.css";
import { UserContext } from "./context/contextProvider";
import UserTable from "./userTable";
import { SearchContext } from "./context/searchContextProvider";

function App() {
  const [person, setPerson] = useState({
    fName: "",
    pass: "",
    gender: "",
    lang: [],
  });
  // const [searchValue, setSearchValue] = useState("");
  const [isEdit, setIsEdit] = useState(-1);
  const { state, dispatch: stateDispatch } = useContext(UserContext);
  console.log("currentUser", state);
  const { search, dispatch: searchDispatch } = useContext(SearchContext);
  console.log("search", search);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerson({ ...person, [name]: value });
  };
  const handleChecked = (e) => {
    if (person.lang.includes(e.target.value)) {
      setPerson({
        ...person,
        lang: person.lang.filter((value) => value !== e.target.value),
      });
    } else setPerson({ ...person, lang: [...person.lang, e.target.value] });
  };

  const handleSubmit = () => {
    if (isEdit !== -1) {
      stateDispatch({
        type: "UPDATE",
        data: { editIndex: isEdit, record: person },
      });
    } else
      stateDispatch({
        type: "ADD",
        data: person,
      });
  };
  const handleDelete = (idx) => {
    stateDispatch({
      type: "DELETE",
      data: idx,
    });
  };
  const handleEdit = (idx) => {
    setIsEdit(idx);
    setPerson(state.find((item, indexx) => indexx === idx));
  };

  // console.log(person);
  return (
    <div className="App">
      {/*<div style={{ display: "flex" }}>*/}
      {/*  <Link to="/pages/home">*/}
      {/*    <h2>Home</h2>*/}
      {/*  </Link>*/}
      {/*  <Link to="pages/dashboard">*/}
      {/*    {" "}*/}
      {/*    <h2>Dashboard</h2>*/}
      {/*  </Link>*/}
      {/*</div>*/}
      <div>
        <label>Enter name</label>
        <input
          type="text"
          value={person.fName}
          onChange={handleChange}
          name="fName"
        />
      </div>
      <div>
        <label>Enter password</label>
        <input
          type="password"
          value={person.pass}
          onChange={handleChange}
          name="pass"
        />
      </div>

      <div>
        <label>Select gender:</label>
        <label htmlFor="m">male</label>
        <input
          id="m"
          type="radio"
          value="male"
          onChange={handleChange}
          name="gender"
          checked={person.gender === "male"}
        />
        <label htmlFor="f">female</label>
        <input
          id="f"
          type="radio"
          value="female"
          onChange={handleChange}
          name="gender"
          checked={person.gender === "female"}
        />
      </div>

      <div>
        <label>Select language:</label>
        <label>css</label>
        <input
          type="checkbox"
          value="css"
          name="css"
          onChange={handleChecked}
          checked={person?.lang?.includes("css")}
        />
        <label>javascript</label>
        <input
          type="checkbox"
          value="javascript"
          name="javascript"
          onChange={handleChecked}
          checked={person?.lang?.includes("javascript")}
        />
        <label>react</label>
        <input
          type="checkbox"
          value="react"
          name="react"
          onChange={handleChecked}
          checked={person?.lang?.includes("react")}
        />
      </div>
      <div>
        <button className="button-85" onClick={handleSubmit}>
          submit
        </button>
      </div>
      <div style={{ marginTop: "25px" }}>
        <label>Search Record:</label>
        <input
          type="text"
          onChange={(e) => {
            console.log(e.target.value);
            searchDispatch({ type: "SEARCH", data: e.target.value });
          }}
          // value={search}
          name="searchValue"
        />
      </div>
      <UserTable handleDelete={handleDelete} handleEdit={handleEdit} />
    </div>
  );
}

export default App;
