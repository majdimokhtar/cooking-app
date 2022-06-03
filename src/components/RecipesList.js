import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import deleteIcon from "../assets/deleteIcon.svg"
//styling
import "./RecipesList.css"
import { projectFirestore } from '../firebase/config'



export default function RecipesList({recipes}) {
  const handleClick =(id)=>{
    projectFirestore.collection("recipes").doc(id).delete()
  }
  const {mode} =useTheme()
  if (recipes.length===0) {
    return <div className='error'>No Recipes To Load...</div>
  }
  return (
    <div className='recipes-list'>
        {recipes.map((recipe)=>(
            <div key={recipe.id} className={`card ${mode}`}  >
                <img src={recipe.img} alt={recipe.title} className="card-img"/>
                <h3> {recipe.title}</h3>
                <p> {recipe.cookingTime} </p>
                <div>{recipe.method.substring(0,100)}...</div>
                <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
                <img 
                className='delete'
                src={deleteIcon}
                onClick={()=>handleClick(recipe.id)}
                />
            </div>
      ))}
    </div>
  )
}
