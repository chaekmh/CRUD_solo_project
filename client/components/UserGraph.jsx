import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link, withRouter } from 'react-router-dom';

const UserGraph = (props) => {
  return (
    <div>
      <h2>USER GRAPH</h2>
      <Link to={'/'}>
        <button>Back to menu</button>
      </Link>
    </div>
  );
};

export default withRouter(UserGraph);
