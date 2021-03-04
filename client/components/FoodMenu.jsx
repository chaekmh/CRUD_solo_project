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

  submitClicked(e) {
    if (Object.keys(this.state.data).length === 0) {
      window.alert('Please select first!');
    } else {
      const data = this.state.data;
      const foodArray = e.target.getAttribute('foodlist');
      const bodyData = { data, foodArray };

      // send the data to the backend
      fetch('/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
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
  }

  render() {
    let buttons = [];
    let foodArray = [
      'coke',
      'truffle pizza',
      'three mushroom risotto',
      'foie gras',
      'japanese A5 wagyu ribeye steak',
      'coffee',
      'jamon iberico',
      'caviar',
      'pinot noir',
      'lobster roll',
      'omakase',
      'escargo',
      'cabernet sauvignon',
      'dim sum',
      'singaporean chili crab',
    ];
    // foodArray = foodArray.sort();
    foodArray.forEach((ele, i) => {
      buttons.push(
        <button
          className='foodButton'
          key={i}
          id={ele}
          onClick={(e) => this.foodClicked(e)}
        >
          {ele[0].toUpperCase() + ele.slice(1) + ' '}
          <br></br>
          {this.state.data[ele]}
        </button>
      );
    });

    return (
      <main className='main'>
        <div>
          <h1>Pick what you ate!</h1>
        </div>

        <div className='foodButtons'>{buttons}</div>
        <br></br>
        <div className='otherButtons'>
          <button
            id='submit'
            className='otherButton'
            foodlist={foodArray}
            onClick={(e) => this.submitClicked(e)}
          >
            submit
          </button>
          <Link to={'/graph'}>
            <button className='otherButton'>to the graph!</button>
          </Link>
        </div>
      </main>
    );
  }
}

export default FoodMenu;
