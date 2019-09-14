import React, { Component } from "react";
import RecipeList from "./RecipeList";
import Search from "./Search";
import { recipeData } from "../data/tempList";

export default class Recipes extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    recipes: recipeData,
    search: ""
  };

  handleChange = e => {
    //e.preventDefault();
    this.setState({
      search: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  render() {
    return (
      <>
        <Search
          search={this.state.search}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        ></Search>
        <RecipeList recipes={this.state.recipes}></RecipeList>
      </>
    );
  }
}
