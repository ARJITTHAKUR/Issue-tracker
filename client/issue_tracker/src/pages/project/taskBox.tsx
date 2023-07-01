import { Task } from "./interface"
import "./style.css"
interface props {
    task: Task
}
export default function TaskBox({task}: props){
    return<>
    <span className="taskBox">
        <span><b>Description : </b>{task.description}</span>
        <span><b>Priority : </b>{task.priority}</span>
        <span><b>ID : </b>{task.ID}</span>
        <span><b>Status : </b>{task.status}</span>
    </span>
    </>
}