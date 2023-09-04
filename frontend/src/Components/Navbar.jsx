import React from 'react'
import '../css/Navbar.css'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div>
      <nav>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/new">New Post</Link></li>
      </nav>
    </div>
  )
}

export default Navbar