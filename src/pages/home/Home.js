import {useEffect, useState} from 'react'
import {projectFirestore} from "../../firebase/config"
import "./Home.css"
// import { useFetch } from '../../hooks/useFetch'
import RecipesList from '../../components/RecipesList'
export default function Home() {
  // const {data, isPending, error} = useFetch("http://localhost:3000/recipes")
  const [data,setData]=useState(null)
  const [isPending, setIsPending]=useState(false)
  const [error,setError]=useState(null)
  // onsnapshot method we dont catch err but we set err second argument
  // fire cleanup fct unsub if we move to another page
  useEffect(() => {
    setIsPending(true)
    const unsub =projectFirestore.collection("recipes").onSnapshot((snapshot)=>{
      if (snapshot.empty) {
        setError("No recipes to load")
        setIsPending(false)
      } else {
        let result = []
        snapshot.docs.forEach(doc=>{
          result.push({id:doc.id, ...doc.data()})
        })
        setData(result)
        setIsPending(false)
      }
    },(err)=>{
      setError(err.message)
      setIsPending(false)
    })
    return ()=> unsub()
  }, [])
  
  return (
    <div className='home'>
      {error&& <p className='error'> {error} </p> }
      {isPending &&  <p className='loading'>Loading...</p> }
      {data && <RecipesList recipes={data} />}
      <br />
    </div>
  )
}
