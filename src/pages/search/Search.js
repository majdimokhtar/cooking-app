import React from 'react'
import { useLocation } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import RecipesList from "../../components/RecipesList"

import "./Search.css"

export default function Search() {
  const queryString = useLocation().search
  const queryParams = new URLSearchParams(queryString)
  const query = queryParams.get("q")
  const url = "http://localhost:3000/recipes?q=" + query
  const {data, isPending, error} = useFetch(url)

  return (
    <div className='search'>
      <h2>Recipe Including "{query}"</h2>
      {error && <p> {error} </p> }
      {isPending && <p>Loading....</p> }
      {data && <RecipesList recipes={data} />  }
    </div>
  )
}
