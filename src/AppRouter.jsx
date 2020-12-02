import React from "react";
import Traace from './Traace'
import { BrowserRouter as Router, Route } from "react-router-dom";

export default function AppRouter(){
  return (
    <Router>
        <Route exact path="/" component={Traace} />
        <Route path="/:userID" component={Traace} />
    </Router>
  );
};