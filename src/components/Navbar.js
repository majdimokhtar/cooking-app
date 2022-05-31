import React from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"
import SearchBar from './SearchBar'

export default function Navbar() {
  
  return (
    <div className='navbar'>
    <nav>
        <Link to="/" className='brand'>
        <h1>Cooking APP</h1>
        </Link>
        <SearchBar/>
        <Link to="/create">
        Create Recipe
        </Link>
    </nav>
    </div>
  )
}
