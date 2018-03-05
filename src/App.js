import React, { Component } from "react";
import "./App.css";
import styled, { injectGlobal } from "styled-components";
import "./FiraCode/stylesheet.css";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Countdown from "./Countdown";

// const Keyframe = Layer;

injectGlobal`
  html,
  body,
  #root {
    height: 100%;
    background-color: transparent;
    overflow: hidden;
  }

  body {
    background-color: black;
    color: white;
  }
`;

const Centered = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

class App extends Component {
  render() {
    // return <div />;
    return (
      <Centered>
        <Router>
          <Switch>
            <Route
              path={"/(.*) (.*)"}
              component={props => (
                <Redirect to={props.match.url.replace(/ /g, "_")} />
              )}
            />
            <Route
              path={"/from/:from"}
              component={props => (
                <Countdown from={props.match.params.from.replace(/_/g, " ")} />
              )}
            />
            <Route
              path={"/:to"}
              component={props => (
                <Countdown to={props.match.params.to.replace(/_/g, " ")} />
              )}
            />
            <Route
              component={props => (
                <Countdown to={""} />
              )}
            />
          </Switch>
        </Router>
      </Centered>
    );
  }
}

export default App;
