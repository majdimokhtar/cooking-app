import React from 'react'
import { useState,useRef , useEffect } from 'react'
import {  useHistory } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
// styles
import "./Create.css"

export default function Create() {
  const history = useHistory()
  const [title,setTitle]=useState("")
  const [method,setMethod]=useState("")
  const [cookingTime,setCookingTime]=useState("")
  const [newIngridient,setNewIngridient]=useState("")
  const [image,setImage]=useState("")
  const [ingridients,setIngridients]=useState([])
  const ingridientInput =useRef(null)
  const {postData ,data, error} =useFetch("http://localhost:3000/recipes" , "POST")

  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log(image);
    postData({title, image , ingridients , method , cookingTime : cookingTime +"minutes"})
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

    // redirect the user after we get the data
    useEffect(() => {
      if (data) {
          //redirect
          //history.goback
          setTimeout(()=>{history.push("/")},500)
      }
    }, [data,history])
  return (
    <div className='create'>
      <h2 className="page-title">
        Add a New Recipe
      </h2>
      <form onSubmit={handleSubmit}>
      <label >
          <span>Recipe Image(URL):</span>
          <input type="url" 
          onChange={(e)=>setImage(e.target.value)}
          value={image}
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
