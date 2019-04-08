import React from "react";
import classNames from "classnames";
import { Consumer } from "../context";

export default function EditModal(props) {
  const editModalClass = classNames({
    "modal modal--open": props.editModalOpen,
    "modal modal--closed": !props.editModalOpen
  });
  return (
    <Consumer>
      {value => {
        const { dispatch } = value;
        return (
          <div className={editModalClass}>
            <div className="modal__form">
              <h3>Edit your project</h3>
              <form onSubmit={props.onEditSubmit.bind(this, dispatch)}>
                {props.msgEditTitle ? (
                  <label htmlFor="title" className="text--red">
                    Title is required
                  </label>
                ) : (
                  <label htmlFor="link">
                    Please enter title
                    <span className="text--red">(Required)</span>
                  </label>
                )}
                <input
                  type="text"
                  name="currenTitle"
                  onChange={props.onChange}
                  value={props.state.currenTitle}
                />
                <label htmlFor="description">
                  Please add details about project
                </label>
                <textarea
                  name="currentDescription"
                  onChange={props.onChange}
                  value={props.state.currentDescription}
                />
                {props.msgEditLink ? (
                  <label htmlFor="link" className="text--red">
                    Link is required
                  </label>
                ) : (
                  <label htmlFor="link">
                    Please enter link
                    <span className="text--red">(Required)</span>
                  </label>
                )}
                <input
                  type="text"
                  name="currentLink"
                  onChange={props.onChange}
                  value={props.state.currentLink}
                />
                <label htmlFor="file">Please add screenshot</label>
                <input
                  type="file"
                  name="projectImage"
                  id=""
                  onChange={props.updateselectedFile}
                />
                <button className="btn btn--add" type="submit">
                  Update
                </button>
              </form>
              <button
                className="btn btn--warning"
                onClick={props.closeEditModal}
              >
                Close
              </button>
            </div>
          </div>
        );
      }}
    </Consumer>
  );
}
