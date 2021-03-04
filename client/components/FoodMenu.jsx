import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FoodMenu extends Component {
  constructor(props) {
    super(props);

    this.state = { data: {} };
    this.foodClicked = this.foodClicked.bind(this);
    this.submitClicked = this.submitClicked.bind(this);
  }

  foodClicked(type) {
    let food = type.target.id;

    let newState = { data: {} };

    if (!this.state.data[food]) {
      newState = {
        data: {
          ...this.state.data,
          [food]: 1,
        },
      };
    } else {
      newState = {
        data: {
          ...this.state.data,
          [food]: this.state.data[food] + 1,
        },
      };
    }
    // console.log(`${food} clicked`, this.state.data[food]);
    this.setState({ ...newState });
  }

  submitClicked() {
    const data = this.state.data;

    // send the data to the backend
    fetch('/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });

    this.setState({ data: {} });
  }

  render() {
    let buttons = [];
    let foodArray = [
      'truffle pizza',
      'three mushroom risotto',
      'foie gras',
      'japanese A5 wagyu ribeye steak',
      'luwak Coffee',
      'iberico pork chop',
      'caviar',
      'pino noir',
      'coke',
    ];
    foodArray = foodArray.sort();
    foodArray.forEach((ele, i) => {
      buttons.push(
        <button key={i} id={ele} onClick={(e) => this.foodClicked(e)}>
          {ele[0].toUpperCase() + ele.slice(1) + ' '}
          {this.state.data[ele]}
        </button>
      );
    });

    return (
      <main>
        <div>
          <h2>FOOD MENU</h2>
        </div>
        <div>{buttons}</div>
        <br></br>
        <button id='submit' onClick={this.submitClicked}>
          submit
        </button>
        <Link to={'/graph'}>
          <button>to the graph!</button>
        </Link>
      </main>
    );
  }
}

export default FoodMenu;
