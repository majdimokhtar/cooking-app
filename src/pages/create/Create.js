import React from 'react'
import { useState,useRef  } from 'react'
import {  useHistory } from 'react-router-dom'
import { projectFirestore } from '../../firebase/config'
// import { useFetch } from '../../hooks/useFetch'
import { useTheme } from '../../hooks/useTheme'
// styles
import "./Create.css"

export default function Create() {
  const history = useHistory()
  const [title,setTitle]=useState("")
  const [method,setMethod]=useState("")
  const [cookingTime,setCookingTime]=useState("")
  const [newIngridient,setNewIngridient]=useState("")
  const [img,setImg]=useState("")
  const [ingridients,setIngridients]=useState([])
  const ingridientInput =useRef(null)
  const {mode} =useTheme()
  // const {postData ,data, error} =useFetch("http://localhost:3000/recipes" , "POST")

  const handleSubmit = async (e)=>{
    e.preventDefault()
    console.log(img);
    const doc = ({title, img , ingridients , method , cookingTime : cookingTime +"minutes"})
    try {
      await projectFirestore.collection("recipes").add(doc)
      history.push("/")
    } catch (err) {
      console.log(err);
    }
    
  }
// add ingridient without repeating
  const handleAdd = (e)=>{
    e.preventDefault()
    const ing = newIngridient.trim()
    if(ing && !ingridients.includes(ing)){
      setIngridients(prevIngridients=>[...prevIngridients , ing])
    }
    setNewIngridient("")
    ingridientInput.current.focus()
  }



  return (
    <div className={`create ${mode}`}>
      <h2 className="page-title">
        Add a New Recipe
      </h2>
      <form onSubmit={handleSubmit}>
      <label >
          <span>Recipe img(URL):</span>
          <input type="url" 
          onChange={(e)=>setImg(e.target.value)}
          value={img}
          required
          />
        </label>
        <label >
          <span>Recipe Title:</span>
          <input type="text" 
          onChange={(e)=>setTitle(e.target.value)}
          value={title}
          required
          />
        </label>
        {/* ingridients */}
        <label >
          <span>Recipe Ingridients:</span>
          <div className='ingridients'>
            <input type="text"
            onChange={(e)=>setNewIngridient(e.target.value)}
            value={newIngridient}
            ref={ingridientInput}
            />
            <button className='btn' onClick={handleAdd}>add</button>
          </div>
        </label>
        <p>Current ingridients : {ingridients.map((i)=><em key={i}> {i}, </em>  )} </p>

        <label >
          <span>Recipe Method:</span>
          <textarea 
          onChange={(e)=>setMethod(e.target.value)}
          value={method}
          required
          />
        </label>

        <label >
          <span>Cooking Time (minutes) :</span>
          <input type="number"
          onChange={(e)=>setCookingTime(e.target.value)}
          value={cookingTime}
          required
          min="1"
          />
        </label>
        <button className='btn'>Submit</button>
        <br />

      </form>

    </div>
  )
}
