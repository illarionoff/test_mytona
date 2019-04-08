import React, { Component } from "react";
import axios from "axios";
import { Consumer } from "../context";
import Backbar from "./Backbar";

export default class Project extends Component {
  state = {
    loading: false,
    title: "",
    description: "",
    id: "",
    link: ""
  };
  componentDidMount() {
    this.setState({
      loading: true
    });
    axios
      .get(`/projects/${this.props.match.params.id}`)
      .then(res => {
        this.setState({
          loading: false,
          title: res.data.title,
          description: res.data.description,
          link: res.data.link,
          imagePath: res.data.imagePath,
          id: this.props.match.params.id
        });
      })
      .catch(err => console.log(err));
  }

  onDeleteClick = async (dispatch, e) => {
    const ID = Number(this.state.id);
    axios
      .delete(`/projects/${this.state.id}`)
      .then(res => {
        dispatch({
          type: "DELETE_PROJECT",
          payload: ID
        });
        this.props.history.push("/");
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <>
              <Backbar />
              <div className="wrap">
                <div className="projectpage">
                  <div className="projectpage__left">
                    <img
                      className="projectpage__img"
                      src={this.state.imagePath}
                      alt=""
                    />
                  </div>
                  <div className="projectpage__right">
                    <h1>{this.state.title}</h1>
                    <p>{this.state.description}</p>
                    <h2>{this.state.link}</h2>
                    <button
                      className="btn btn--danger"
                      onClick={this.onDeleteClick.bind(this, dispatch)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </>
          );
        }}
      </Consumer>
    );
  }
}
