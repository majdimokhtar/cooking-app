import {createContext , useReducer} from "react"

import React from 'react'

export const ThemeContext = createContext()
//reducer
const themeReducer =(state , action)=>{
    switch (action.type) {
     case "CHANGE_COLOR":
         return {...state, color: action.payload}
     case "CHANGE_MODE":
         return {...state, mode: action.payload}
         default: 
         return state
    } 
}
//theme provider
export function ThemeProvider ({children}) {
    const [state,dispatsh] = useReducer(themeReducer,
        {color : "#e63946",
        mode : "dark"
    })
//change color fct
     const changeColor =(color)=>{
            dispatsh({type :"CHANGE_COLOR" ,payload : color})
        }
//change mode
const changeMode =(mode)=>{
    dispatsh({type :"CHANGE_MODE" ,payload : mode})
}

   return <ThemeContext.Provider value={{...state, changeColor,changeMode}}>
       {children}
   </ThemeContext.Provider>
}
