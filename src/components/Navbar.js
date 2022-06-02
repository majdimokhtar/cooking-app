import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'
import { useTheme } from '../hooks/useTheme'
// style
import "./Navbar.css"



export default function Navbar() {
  const {color} =useTheme()
  
  
  return (
    <div className='navbar'style={{background : color}}>
    <nav >
        <Link to="/" className='brand'>
        <h1>Cooking APP</h1>
        </Link>
        <SearchBar/>
        <Link to="/create" >
        Create Recipe
        </Link>
    </nav>
    </div>
  )
}
