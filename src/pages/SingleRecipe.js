import React, { Component } from "react";
import { recipeData } from "../data/tempDetails";
import { Link } from "react-router-dom";

export default class SingleRecipe extends Component {
  constructor(props) {
    super(props);
    const id = this.props.match.params.id;
    this.state = {
      // recipe: recipeData,
      recipe: {},
      id,
      loading: true
    };
  }

  async componentDidMount() {
    const url = `https://www.food2fork.com/api/get?key=${process.env.REACT_APP_API_KEY}&rId=${this.state.id}`;
    try {
      const response = await fetch(url);
      const responseData = await response.json();
      this.setState({
        recipe: responseData.recipe,
        loading: false
      })
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const {
      image_url,
      publisher,
      publisher_url,
      source_url,
      title,
      ingredients
    } = this.state.recipe;
    if (this.state.loading) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-10 mx-auto col-md-6 my-3">
              <h2 className="text-uppercase text-orange text-center">
                loading...
              </h2>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="container my-5">
        <div className="row">
          <div className="col-10 mx-auto col-md-6 my-3">
            <Link
              to="/recipes"
              className="btn btn-warning mb-5 text-capitalize"
            >
              back to recipes
            </Link>
            <img
              src={image_url}
              alt="recipe"
              className="d-block w-100"
              style={{ maxHeight: "30rem" }}
            />
          </div>
          {/* info */}
          <div className="col-10 mx-auto col-md-6 my-3">
            <h6 className="text-uppercase text-slanted-small">{title}</h6>
            <div className="links">
              <a
                href={publisher_url}
                className=""
                target="_blank"
                rel="noopener noreferrer"
              >
                <h6 className="text-dark text-capitalize text-slanted m-1">
                  {publisher}
                </h6>
              </a>
              <a
                href={source_url}
                className="btn btn-primary mt-2 mx-2 text-capitalize"
                target="_blank"
                rel="noopener noreferrer"
              >
                to recipe
              </a>
              <ul className="list-group mt-4">
                <h2 className="mt-3 mb-4">Ingredients</h2>
                {ingredients.map((item, index) => (
                  <li
                    key={index}
                    className="list-group-item text-slanted-small"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
