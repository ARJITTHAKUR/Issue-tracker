import { Task } from "./interface"
import "./style.css"
interface props {
    task: Task
}
export default function TaskBox({task}: props){

    // const shortDescription = (str:string) => <span title={str} style={{cursor:"pointer"}}>{str.}</span> 
    return<>
    <span className="taskBox">
        <span className="task-item"><b className="item-name">Description </b>:  {task.description}</span>
        <span className="task-item"><b className="item-name">Priority </b>:  {task.priority}</span>
        <span className="task-item"><b className="item-name">ID </b>:  {task.ID}</span>
        <span className="task-item"><b className="item-name">Status </b>:  {task.status}</span>
    </span>
    </>
}