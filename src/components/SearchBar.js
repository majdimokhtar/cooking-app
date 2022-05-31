import {useState} from 'react'
import { useHistory } from 'react-router-dom'
import "./SearchBar.css"

export default function SearchBar() {
    const [term,setTerms] =useState("")
    const history =useHistory()
    const handleSubmit =(e)=>{
        e.preventDefault()
        history.push(`/search?q=${term}`)
    }

  return (
    <div className='search-bar'>
        <form onSubmit={handleSubmit}>
            <label htmlFor="search">Search</label>
            <input type="text"
            id='search'
            onChange={(e)=>setTerms(e.target.value)}
            required
            />
        </form>

    </div>
  )
}
