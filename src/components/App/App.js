import React, { Component } from 'react';

import Nav from '../Nav/Nav';
import getRouter from '../../router/router';

export default class Test extends Component {
  render () {
    return (
      <div>
        <Nav />
        {getRouter()}
        {/* <div>sss</div> */}
      </div>
    )
  }
}