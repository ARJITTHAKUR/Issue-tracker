import { useRef } from "react"
import { Task } from "./interface"
import "./style.css"
interface props {
    task: Task
}
export default function TaskBox({task}: props){

    // const shortDescription = (str:string) => <span title={str} style={{cursor:"pointer"}}>{str.}</span> 
    return<>
    <span className="taskBox">
        <span className="task-item"><b className="item-name">Description </b> <DescriptionBox description={task.description}/></span>
        <span className="task-item"><b className="item-name">Priority </b>  {task.priority}</span>
        <span className="task-item"><b className="item-name">ID </b>  {task.ID}</span>
        <span className="task-item"><b className="item-name">Status </b>  {task.status}</span>
    </span>
    </>
}

const DescriptionBox = ({description})=>{
    const ref = useRef(null)
    const style = {

    }
    const handleMouseOver = ()=>{
        const style = {
            position: 'absolute',
            top : "1rem",
            left : "1rem"
        }
        ref.current.style = style
    }
    const handleMouseLeave = ()=>{
        const style = {
            position: 'relative'
        }
        ref.current.style = {}
    }
    return <>
        <p ref={ref} style={{overflowY:'hidden',margin : '0rem',padding:'0px'}}>
        {description}
        </p>
    </>
}