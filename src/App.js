import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

function App() {
  var date = new Date();

  if (localStorage.getItem("List") === null) {
    localStorage.setItem("List", "[]");
  }
  const [List, SetList] = useState(JSON.parse(localStorage.getItem("List")));
  localStorage.setItem("List", JSON.stringify(List));
  const [inpVal, setInpVal] = useState("");

  //Delete Item Funcion
  const handleDelete = (id) => {
    const NewList = List.filter((item) => item.id !== id);
    SetList(NewList);
  };

  //Adding an Item Function
  const handleAdding = (e) => {
    e.preventDefault();
    SetList((List) => [
      ...List,
      {
        name: inpVal,
        id: uuidv4(),
        state: "false",
        time: [
          date.getDate() + "/",
          date.getMonth() + "/",
          date.getFullYear() + " at. ",
          date.getHours(),
          ":" + date.getMinutes(),
        ],
      },
    ]);
    setInpVal("");
  };

  //Change the state of an item
  const handleState = (id) => {
    const itemState = List.filter((item) => item.id === id);
    if (itemState[0].state === "false") {
      itemState[0].state = "true";
    } else {
      itemState[0].state = "false";
    }
    localStorage.setItem("List", JSON.stringify(List));
    SetList(JSON.parse(localStorage.getItem("List")));
  };

  console.log(List);
  return (
    <div className="App">
      <div className="body">
        <div className="card">
          <h2>Your List 📝</h2>
          <form onSubmit={handleAdding} className="inputs">
            <input
              required
              value={inpVal}
              onChange={(e) => setInpVal(e.target.value)}
              type="text"
              placeholder="Add Item to Your List"
            />
            <button>Add</button>
          </form>
          <div className="list">
            {List.map((item) => (
              <ul key={item.id}>
                {item.state === "true" ? (
                  <div className="item">
                    <div className="btnAndLi">
                      <li
                        className="done"
                        onClick={() => {
                          handleState(item.id);
                        }}
                      >
                        {item.name}
                        {item.state === "true" ? (
                          <i className="fas fa-check"></i>
                        ) : (
                          ""
                        )}
                      </li>
                      <button onClick={() => handleDelete(item.id)}>
                        <i className="far fa-trash-alt"></i>
                      </button>
                    </div>
                    <div className="time">
                      {item.time[3] > 12
                        ? item.time + " PM"
                        : item.time + " AM"}
                    </div>
                  </div>
                ) : (
                  <div className="item">
                    <div className="btnAndLi">
                      <li
                        onClick={() => {
                          handleState(item.id);
                        }}
                      >
                        {item.name} <br />
                        {item.state === "true" ? (
                          <i className="fas fa-check"></i>
                        ) : (
                          ""
                        )}
                      </li>
                      <button onClick={() => handleDelete(item.id)}>
                        <i className="far fa-trash-alt"></i>
                      </button>
                    </div>
                    <div className="time">
                      {item.time[3] > 12
                        ? item.time + " PM"
                        : item.time + " AM"}
                    </div>
                  </div>
                )}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
