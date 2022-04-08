import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <h1>Navbar</h1>
        <Link to="/register">
            <button>REGISTER</button>
        </Link>
        <Link to="/login">
            <button>LOGIN</button>
        </Link>
    </div>
  )
}

export default Navbar