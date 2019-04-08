import React from "react";
import { Consumer } from "../context";
import GoBack from "./GoBack";

export default function Backbar(props) {
  return (
    <Consumer>
      {value => {
        return (
          <nav className="navbar">
            <img className="logo" src="img/logo.png" alt="" />
            <ul className="menu">
              <li className="menu__item">
                <GoBack />
              </li>
            </ul>
          </nav>
        );
      }}
    </Consumer>
  );
}
