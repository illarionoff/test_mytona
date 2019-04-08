import React from "react";
import axios from "axios";
import { Consumer } from "../context";

export default function Item({ project, onEditClick }) {
  const onDeleteClick = async (dispatch, e) => {
    axios
      .delete(`/projects/${project.id}`, {
        params: { imagePath: project.imagePath }
      })
      .then(res => {
        dispatch({ type: "DELETE_PROJECT", payload: project.id });
      })

      .catch(err => console.log(err));
  };

  return (
    <Consumer>
      {value => {
        const { dispatch } = value;
        let shortDescr;
        if (project.description.length > 100) {
          shortDescr = `${project.description.slice(0, 100)} ...`;
        } else {
          shortDescr = project.description;
        }
        return (
          <div className="item">
            <div className="item__img">
              <img src={`/${project.imagePath}`} alt="" />
            </div>

            <div className="item__description">
              <h2>
                <a href={`${project.id}`}>{project.title}</a>
              </h2>
              <p>{shortDescr}</p>
              <p>
                Link: <a href={`${project.link}`}>{project.link}</a>
              </p>
              <div className="item__action">
                <button
                  className="btn btn--warning"
                  onClick={() => onEditClick(project)}
                >
                  Edit
                </button>
                <button
                  className="btn btn--danger"
                  onClick={onDeleteClick.bind(this, dispatch)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      }}
    </Consumer>
  );
}
