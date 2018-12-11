import React from 'react'
import { Link } from 'react-router-dom';

const renderHeader = () => {
  return (
    <ul>
      <li><Link id="btnHome" to="/">Home</Link></li>
    </ul>
  )
}

export default function({children}) {
  return (
    <div>
      <div>{ renderHeader() }</div>
      { children }
    </div>
  );
}
