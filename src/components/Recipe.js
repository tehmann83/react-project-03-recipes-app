import React, { Component } from 'react'

export default class Recipe extends Component {
  render() {
    const {recipe} = this.props;
    return (
      <div>
        {recipe.title}
      </div>
    )
  }
}
