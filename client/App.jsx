import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import FoodMenu from './components/FoodMenu';
import UserGraph from './components/UserGraph';
import './styles.css';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='router'>
        <Switch>
          <Route exact path='/' component={FoodMenu} />
          <Route exact path='/graph' component={UserGraph} />
        </Switch>
      </div>
    );
  }
}

export default App;
