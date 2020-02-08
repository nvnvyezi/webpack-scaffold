import React from 'react'
import ReactDom from 'react-dom'

import './index.css'
import gif from './gif.gif'

function App() {
  return (
    <div>
      webpack
      <img src={gif} alt="测试gif" />
      <style jsx>{`
        div {
          color: red;
        }
      `}</style>
    </div>
  )
}

ReactDom.render(<App />, document.getElementById('app'))
