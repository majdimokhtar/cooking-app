import { useTheme } from "../hooks/useTheme"
import modeIcon from "../assets/modeIcon.svg" 


// styles
import "./ThemeSelector.css"

const themeColors = ["#e63946","#2a9d8f","#1982c4"]




export default function ThemeSelector() {
  const {changeColor,changeMode,mode} =useTheme()
  const toggleMode = () =>{
   changeMode(mode === "dark" ? "light" : "dark")
  }
  console.log(mode);
  return (
    <div className="theme-selector">
      <div className="mode-toggle">
      <img 
      onClick={toggleMode}
      src={modeIcon}
      alt="light-dark toggle icon"
      style={{filter : mode==="dark" ? "invert(100%)" : "invert(20%)"}}
      />
      </div>
    <div className="theme-btns">
    {themeColors.map((color)=>(
        <div
        key={color}
        onClick={()=>changeColor(color)}
        style={{background: color}}
        />
    ))}
    </div>
    </div>
  )
}
