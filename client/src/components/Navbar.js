import React from "react";
import { Consumer } from "../context";

export default function Navbar() {
  return (
    <Consumer>
      {value => {
        const { dispatch } = value;
        return (
          <nav className="navbar">
            <img className="logo" src="img/logo.png" alt="" />
            <ul className="menu">
              <li className="menu__item">
                <button
                  className="btn btn--add"
                  onClick={e => {
                    dispatch({ type: "OPEN_ADD_MODAL" });
                    document
                      .getElementsByTagName("BODY")[0]
                      .setAttribute("style", "overflow: hidden;");
                  }}
                >
                  Add Files
                </button>
              </li>
            </ul>
          </nav>
        );
      }}
    </Consumer>
  );
}
