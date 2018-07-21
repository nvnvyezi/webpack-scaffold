import React, { Component } from 'react';

import './page1.css'
import img from '../../assets/default.png'

export default class Test extends Component {
  render () {
    return (
      <div>this is page1 sdsds
        <img src={img} alt=""/>
      </div>
    )
  }
}