import React, { Component } from "react";
import RecipeList from "../components/RecipeList";
import Search from "../components/Search";
import { recipeData } from "../data/tempList";

export default class Recipes extends Component {
  constructor(props) {
    super(props);
    this.getRecipes = this.getRecipes.bind(this);
  }

  state = {
    recipes: recipeData,
    url: `https://www.food2fork.com/api/search?key=${process.env.REACT_APP_API_KEY}`,
    base_url: `https://www.food2fork.com/api/search?key=${process.env.REACT_APP_API_KEY}`,
    query: "&q=",
    search: "",
    error: ""
  };

  async getRecipes() {
    try {
      const data = await fetch(this.state.url);
      const jsonData = await data.json();
      console.log(jsonData);
      if (jsonData.recipes.length === 0) {
        this.setState({
          error:
            "Couldn't find any recipes. \nPlease try again or press the search icon for the most popular recipes.",
          search: ""
        });
      } else {
        this.setState({ recipes: jsonData.recipes, error: "" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.getRecipes();
  }

  handleChange = e => {
    //e.preventDefault();
    this.setState({
      search: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { base_url, query, search } = this.state;
    this.setState(
      {
        url: `${base_url}${query}${search}`
      },
      () => this.getRecipes()
    );
  };

  render() {
    return (
      <>
        <Search
          search={this.state.search}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        ></Search>
        {this.state.error ? (
          <section>
            <div className="row">
              <div className="col">
                <h2 className="text-orange text-center text-uppercase mt-5">
                  {this.state.error}
                </h2>
              </div>
            </div>
          </section>
        ) : (
          <RecipeList recipes={this.state.recipes}></RecipeList>
        )}
      </>
    );
  }
}
