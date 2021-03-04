import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link, withRouter } from 'react-router-dom';
import { PieChart } from 'react-minimal-pie-chart';

class UserGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    fetch('/display')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // update state with this data
        const state = {};
        data.forEach((ele) => {
          state[ele.cuisine] = ele.sum;
        });
        this.setState(state);
      })
      .catch((err) => console.log(err));
  }

  render() {
    // console.log(this.state);
    let total = 0;
    let data = [];
    function getRandomColor() {
      var letters = 'ACDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        // color += letters[Math.floor(Math.random() * 16)];
        color += letters[Math.floor(Math.random() * 5)];
      }
      return color;
    }
    for (let key in this.state) {
      total += Number(this.state[key]);
    }
    for (let key in this.state) {
      let pie = {};
      pie.title = key;
      pie.value = Number(this.state[key]) / total;
      pie.color = getRandomColor();
      data.push(pie);
    }
    const defaultLabelStyle = {
      fontSize: '5px',
      fontFamily: 'sans-serif',
    };

    return (
      <div className='main'>
        <h1>What is my preference?</h1>
        {/* DISPLAY THE DATA HERE */}
        <PieChart
          data={data}
          className='pie'
          radius={40}
          label={(data) => data.value}
          labelStyle={(index) => ({
            fill: data[index].color,
            fontSize: '5px',
            fontFamily: 'sans-serif',
          })}
          labelPosition={60}
        />
        <Link to={'/'}>
          <button className='otherButton'>Back to menu</button>
        </Link>
      </div>
    );
  }
}

export default withRouter(UserGraph);
