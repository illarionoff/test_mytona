import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./scss/App.scss";

// Components
import Index from "./components/Index";
import Projects from "./components/Projects";

import { Provider } from "./context";

class App extends Component {
  render() {
    return (
      <Provider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Index} />
            <Route path="/:id" component={Projects} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
