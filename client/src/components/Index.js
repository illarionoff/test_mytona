import React, { Component } from "react";
import axios from "axios";
import { Consumer } from "../context";
import ReactPaginate from "react-paginate";

// Components
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import Item from "./Item";
import Navbar from "./Navbar";

export default class Index extends Component {
  state = {
    currentId: "",
    addModalOpen: false,
    editModalOpen: false,
    currenTitle: "",
    currentDescription: "",
    currentLink: "",
    currentImagePath: "",
    currentSelectedFile: "",
    oldImage: "",
    pageNumber: 0
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  openEditModal = () => {
    this.setState({
      editModalOpen: true
    });
    document
      .getElementsByTagName("BODY")[0]
      .setAttribute("style", "overflow: hidden;");
  };

  closeEditModal = () => {
    this.setState({
      editModalOpen: false,
      currentId: "",
      currenTitle: "",
      currentDescription: "",
      currentLink: "",
      currentImagePath: "",
      msgEditTitle: false,
      msgEditLink: false,
      currentSelectedFile: ""
    });
    document
      .getElementsByTagName("BODY")[0]
      .setAttribute("style", "overflow: visible");
  };

  onEditSubmit = async (dispatch, e) => {
    e.preventDefault();

    let editedProject = new FormData();
    if (this.state.currenTitle === "") {
      this.setState({ msgEditTitle: true });
      return;
    }
    editedProject.append("title", this.state.currenTitle);
    editedProject.append("description", this.state.currentDescription);
    if (this.state.currentLink === "") {
      this.setState({ msgEditLink: true });
      return;
    }
    editedProject.append("link", this.state.currentLink);
    editedProject.append("oldImage", this.state.oldImage);

    if (
      this.state.currentSelectedFile !== "" ||
      this.state.currentImagePath !== "uploads/defult.png"
    ) {
      editedProject.append(
        "projectImage",
        this.state.currentSelectedFile,
        this.state.currentSelectedFile.name
      );
    }

    for (var value of editedProject.values()) {
      console.log(value);
    }
    axios
      .patch(`/projects/${this.state.currentId}`, editedProject)
      .then(res => {
        dispatch({ type: "UPDATE_PROJECT", payload: res.data });
        this.closeEditModal();
        this.setState({
          currentId: "",
          currenTitle: "",
          currentDescription: "",
          currentLink: "",
          currentImagePath: "",
          currentSelectedFile: "",
          oldImage: ""
        });
      })
      .catch(err => console.log(err));
  };

  handlePageClick = data => {
    this.setState({
      pageNumber: data.selected
    });
  };

  onEditClick = project => {
    this.setState({
      currentId: project.id,
      currenTitle: project.title,
      currentDescription: project.description,
      currentLink: project.link,
      currentImagePath: project.imagePath,
      oldImage: project.imagePath
    });
    this.openEditModal();
  };

  updateselectedFile = event => {
    this.setState({
      currentSelectedFile: event.target.files[0],
      currentImagePath: ""
    });
  };

  render() {
    return (
      <Consumer>
        {context => {
          return (
            <>
              <Navbar />
              <AddModal
                addModalOpen={context.addModalOpen}
                onChange={this.onChange}
                onSubmit={this.onSubmit}
                closeAddModal={this.closeAddModal}
                state={this.state}
              />
              <EditModal
                editModalOpen={this.state.editModalOpen}
                onChange={this.onChange}
                onEditSubmit={this.onEditSubmit}
                closeEditModal={this.closeEditModal}
                state={this.state}
                updateselectedFile={this.updateselectedFile}
                msgEditLink={this.state.msgEditLink}
                msgEditTitle={this.state.msgEditTitle}
              />
              <div className="wrap">
                <ReactPaginate
                  previousLabel={"previous"}
                  nextLabel={"next"}
                  breakLabel={"..."}
                  pageCount={Math.ceil(context.projects.length / 5)}
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={1}
                  onPageChange={this.handlePageClick}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}
                />
              </div>
              <div className="projects">
                {context.projects
                  .slice(
                    this.state.pageNumber * 5,
                    this.state.pageNumber * 5 + 5
                  )
                  .map(project => {
                    return (
                      <Item
                        key={project.id}
                        project={project}
                        onEditClick={this.onEditClick}
                      />
                    );
                  })}
              </div>
            </>
          );
        }}
      </Consumer>
    );
  }
}
