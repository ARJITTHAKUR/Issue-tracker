import { ArrowLeftIcon } from "@heroicons/react/20/solid"
import classes from "./style.module.css"
import { useNavigate } from "react-router-dom"
type Props = {
    children: React.ReactNode
  }
export default function CustomHeader({children} :Props){
  const navigate = useNavigate()
    const logout = ()=>{
      localStorage.removeItem("token")
      navigate("/")
    }

    return <>
    <header style={{backgroundColor : 'var(--color-primary)', display :'flex', justifyContent:'space-between'}}>
      <span ><ArrowLeftIcon onClick={()=>window.history.back()} height={30} width={30} cursor="pointer" title="Go Back"/></span>
    {children}
    <span title="Logout" className={classes.logout_btn} onClick={()=>logout()}>logout</span>
    </header>
    </>
}