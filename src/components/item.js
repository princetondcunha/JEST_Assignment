import React, { Component } from "react";

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowCapital: false,
    };
  }

  render() {
    return (
      <div className="container" key={this.props.name}>
        <img
          alt={`${this.props.name}'s Flag`}
          width={125}
          src={this.props.flagUrl}
        />
        <div>
          <h3>{this.props.name}</h3>
          {this.state.isShowCapital ? <p>{this.props.capital}</p> : undefined}
        </div>
        <button
          onClick={() =>
            this.setState({ isShowCapital: !this.state.isShowCapital })
          }
          className={
            this.state.isShowCapital ? "btn-capital-hide" : "btn-capital-show"
          }
        >
          {this.state.isShowCapital ? "Hide Capital" : "Show Capital"}
        </button>
      </div>
    );
  }
}

export default Item;

/**
 * Topics you might also like:
 *      - Object Destructuring -> https://dmitripavlutin.com/javascript-object-destructuring/
 *      - Template Literals -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
 *      - Rendering Elements -> https://reactjs.org/docs/rendering-elements.html
 *      - Handling events -> https://reactjs.org/docs/handling-events.html
 *      - Arrow Functions -> https://www.w3schools.com/js/js_arrow_function.asp
 *      - Conditional (ternary) operator -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
 */
