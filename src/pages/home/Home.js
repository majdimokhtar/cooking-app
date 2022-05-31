import React from 'react'
import "./Home.css"
import { useFetch } from '../../hooks/useFetch'
import RecipesList from '../../components/RecipesList'
export default function Home() {
  const {data, isPending, error} = useFetch("http://localhost:3000/recipes")
  return (
    <div className='home'>
      {error&& <p className='error'> {error} </p> }
      {isPending&&  <p className='loading'>...Loading</p> }
      {data && <RecipesList recipes={data} />}
      <br />
    </div>
  )
}
