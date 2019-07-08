import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import logo from './logo.svg';
// import "./App.css";

import NavBar from "../../components/layout/NavBar";
import Home from "../../components/layout/Home";

import Register from "../../components/auth/Register";
import Login from "../../components/auth/Login";

import Container from "@material-ui/core/Container";

const App = () => {
   return (
      <Router>
         <Fragment>
            <NavBar />
            <Route exact path="/" component={Home} />
            <Container maxWidth="sm">
               <Switch>
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
               </Switch>
            </Container>
         </Fragment>
      </Router>
   );
};

export default App;
