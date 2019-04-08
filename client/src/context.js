import React, { Component } from "react";
import axios from "axios";

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "DELETE_PROJECT":
      return {
        ...state,
        projects: state.projects.filter(
          project => project.id !== action.payload
        )
      };
    case "ADD_PROJECT":
      console.log(action.payload);
      return {
        ...state,
        projects: [...state.projects, action.payload]
      };

    case "OPEN_ADD_MODAL":
      console.log(action.payload);
      return {
        ...state,
        addModalOpen: true
      };

    case "CLOSE_ADD_MODAL":
      console.log(action.payload);
      return {
        ...state,
        addModalOpen: false
      };

    case "UPDATE_PROJECT":
      return {
        ...state,
        projects: state.projects.map(project =>
          project.id === action.payload.id
            ? (project = action.payload)
            : project
        )
      };

    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    addModalOpen: false,
    editModalOpen: false,
    loading: false,
    projects: [],

    dispatch: action => this.setState(state => reducer(state, action))
  };

  componentDidMount() {
    this.setState({
      loading: true
    });
    axios
      .get("/projects")
      .then(res => {
        this.setState({
          loading: false,
          projects: res.data
        });
      })

      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <Context.Provider value={this.state}>
          {this.props.children}
        </Context.Provider>
      </div>
    );
  }
}

export const Consumer = Context.Consumer;
