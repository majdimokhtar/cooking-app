import React, { useEffect } from 'react'
import { useParams,useHistory  } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
//style
import "./Recipe.css"



export default function Recipe() {
  const {id} = useParams()
  const url = "http://localhost:3000/recipes/" + id
  const {data: recipe , isPending, error } = useFetch(url)
  const history = useHistory()
  useEffect(() => {
    if (error) {
        //redirect
        //history.goback
        setTimeout(()=>{history.push("/")},2000)
    }
  }, [error,history])
  return (
    <div className='recipe'>
        {isPending && <p className='loading'>...Loading </p>  }
        {error && <p className='error'> {error} </p> }
        {recipe && (  <>
        {/* <img src={recipe.img} alt={recipe.title} className="col"/> */}
        
        <h2 className="page-title">
          {recipe.title}
        </h2>
        <p>Takes{recipe.cookingTime} to cook.</p>
        <ul>
          {recipe.ingredients && recipe.ingredients.map((ing)=>(
            <li key={ing}>
              {ing}
            </li>
          ))}
        </ul>
        <p className="method"> {recipe.method} </p>
        
        </>
        )}
    </div>
  )
}
