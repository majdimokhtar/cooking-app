import React, { useEffect,useState } from 'react'
import { useParams,useHistory  } from 'react-router-dom'
import {projectFirestore} from "../../firebase/config"
// import { useFetch } from '../../hooks/useFetch'
import { useTheme } from '../../hooks/useTheme'
//style
import "./Recipe.css"



export default function Recipe() {
  const {id} = useParams()
  const [recipe,setRecipe]=useState(null)
  const [isPending, setIsPending]=useState(false)
  const [error,setError]=useState(null)
  const handleClick=()=>{
    projectFirestore.collection("recipes").doc(id).update({
      title:"Some title"
    })
  }

  useEffect(()=>{
  setIsPending(true)
  const unsub =projectFirestore.collection("recipes").doc(id).onSnapshot((doc)=>{
    if (doc.exists) {
      setIsPending(false)
      setRecipe(doc.data())
    } else {
      setIsPending(false)
      setError("could not find the recipe")
    }
  })
  return () => unsub()
  },[id])
  // const url = "http://localhost:3000/recipes/" + id
  // const {data: recipe , isPending, error } = useFetch(url)
  const {mode} =useTheme()
  const history = useHistory()
  useEffect(() => {
    if (error) {
        //redirect
        //history.goback
        setTimeout(()=>{history.push("/")},2000)
    }
  }, [error,history])
  return (
    <div className={`recipe ${mode}`}>
        {isPending && <p className='loading'>Loading ... </p>  }
        {error && <p className='error'> {error} </p> }
        {recipe && (  <>
        {/* <img src={recipe.img} alt={recipe.title} className="col"/> */}
        
        <h2 className="page-title">
          {recipe.title}
        </h2>
        <p>Takes {recipe.cookingTime} to cook.</p>
        <ul>
          {recipe.ingridients && recipe.ingridients.map((ing)=>(
            <li key={ing}>
              {ing}
            </li>
          ))}
        </ul>
        <p className="method"> {recipe.method} </p>
        {/* <button
        onClick={handleClick}
        >Update</button> */}
        </>
        )}
    </div>
  )
}
