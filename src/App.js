import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import SingleRecipe from "./pages/SingleRecipe";
import Default from "./pages/Default";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <main>
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/recipes" exact component={Recipes}></Route>
          <Route path="/recipes/:id" component={SingleRecipe}></Route>
          <Route component={Default}></Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
