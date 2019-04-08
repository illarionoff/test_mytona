import React, { Component } from "react";
import classNames from "classnames";
import { Consumer } from "../context";
import axios from "axios";

class AddModal extends Component {
  state = {
    title: "",
    description: "",
    link: "",
    selectedFile: "",
    msgTitle: false,
    msgLink: false
  };

  handleselectedFile = event => {
    this.setState({
      selectedFile: event.target.files[0]
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    let newProject = new FormData();
    if (this.state.title === "") {
      this.setState({ msgTitle: true });
      return;
    }
    newProject.append("title", this.state.title);
    newProject.append("description", this.state.description);
    if (this.state.link === "") {
      this.setState({ msgLink: true });
      return;
    }
    newProject.append("link", this.state.link);

    if (this.state.selectedFile !== "") {
      newProject.append(
        "projectImage",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
    }

    axios
      .post("/projects", newProject)
      .then(res => {
        console.log(res);
        dispatch({ type: "ADD_PROJECT", payload: res.data });
        dispatch({ type: "CLOSE_ADD_MODAL", payload: res.data });
      })
      .catch(err => console.log(err));
    this.setState({
      title: "",
      description: "",
      link: "",
      selectedFile: "",
      msgTitle: false,
      msgLink: false
    });
  };

  render() {
    const addModalClass = classNames({
      "modal modal--open": this.props.addModalOpen,
      "modal modal--closed": !this.props.addModalOpen
    });

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className={addModalClass}>
              <div className="modal__form">
                <h3>Add new project</h3>
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  {this.state.msgTitle ? (
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
                    name="title"
                    onChange={this.onChange}
                    value={this.state.title}
                  />
                  <label htmlFor="description">
                    Please add details about project
                  </label>
                  <textarea
                    name="description"
                    onChange={this.onChange}
                    value={this.state.description}
                  />
                  {this.state.msgLink ? (
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
                    name="link"
                    onChange={this.onChange}
                    value={this.state.link}
                  />
                  <label htmlFor="file">Please add screenshot</label>
                  <input
                    type="file"
                    name="projectImage"
                    id=""
                    onChange={this.handleselectedFile}
                    style={{ size: "60" }}
                  />
                  <button className="btn btn--add">Submit</button>
                </form>
                <button
                  className="btn btn--warning"
                  onClick={e => {
                    dispatch({ type: "CLOSE_ADD_MODAL" });
                    document
                      .getElementsByTagName("BODY")[0]
                      .setAttribute("style", "overflow: visible");
                  }}
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
}

export default AddModal;
