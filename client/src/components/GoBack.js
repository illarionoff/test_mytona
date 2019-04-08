import React from "react";
import { withRouter } from "react-router-dom";

const GoBack = ({ history }) => (
  <button className="btn btn--warning" onClick={() => history.goBack()}>
    Go Back{" "}
  </button>
);

export default withRouter(GoBack);
