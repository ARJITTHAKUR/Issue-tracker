import { FormEvent, useReducer, useState } from "react"
import "./style.css"
import { formState } from "./interface"
import {z} from "zod";
interface props {
    submit : (data:any)=>void,
}

enum ActionTypes {
    changetask,
    changeStatus,
    changePriority,
    changeDescription
}
const formReducer = (state : formState, action : {type : ActionTypes, payload?: any}) : formState =>{
    switch(action.type){
        case ActionTypes.changetask : return {...state,taskname : action.payload }
        case ActionTypes.changeStatus : return {...state, status : action.payload}
        case ActionTypes.changePriority : return {...state, priority : action.payload}
        case ActionTypes.changeDescription : return {...state, description : action.payload}
        default:  throw('Incorrect action') 
    }
}
const validForm = z.object({
    taskname : z.string().min(1).max(30),
    status : z.string().min(1),
    prioity : z.string().min(1),
    description : z.string().min(1).max(100)
})
interface errors{
    taskname : string[],
    description :string[]
}
export default function TaskForm({submit} : props){
    const [formState, formDispatch] = useReducer(formReducer,{
        taskname : '',
        status : '',
        priority : '',
        description : ''
    } satisfies formState)
    const [errors, setErrors] = useState<errors>({
        taskname : [],
        description :[]
    })
    const formValidation = (data : any)=>{
        try {
            validForm.parse(data)
        } catch (errors) {
            if(errors instanceof z.ZodError){
                console.log(errors.flatten())
                const {fieldErrors} = errors.flatten()
                setErrors({
                    taskname : fieldErrors?.taskname as string[] || [],
                    description : fieldErrors?.description as string[] || [],
                })
            }
        }
    }
    function handleSubmit(e : FormEvent){
        e.preventDefault();
        formValidation(formState)
        // console.log(e,{formState})
        submit(formState)
    }
    return <>
    
    <div>
    <form onSubmit={handleSubmit} className="form-container">
        <label htmlFor="projectname" data-tooltip="Enter Project Name in the below field" className="project-name">Task Name</label>
        <input type="text" name="projectname" id="" onChange={(e)=>formDispatch({type: ActionTypes.changetask, payload: e.target.value})}/>
        {
            errors && errors?.taskname.length > 0 && errors.taskname.map(errors=><span style={{color:'red'}}>{errors}</span>)
        }
        {

        }
        {/* <label htmlFor="startdate">Start Date
        <input type="date" name="startDate" id="" onChange={(e)=>formDispatch({type: ActionTypes.changeStartDate, payload: e.target.value})}/>
        </label>

        <label htmlFor="enddate">End Date
        <input type="date" name="endDate" id="" onChange={(e)=>formDispatch({type: ActionTypes.changeEndDate, payload: e.target.value})}/>
        </label> */}
        <label htmlFor="">Status</label>
        <select name="" id="" onChange={(e)=>formDispatch({type: ActionTypes.changeStatus, payload: e.target.value})}>
            <option value="planning">Planning</option>
            <option value="inprogress">In progress</option>
            <option value="completed">Completed</option>
        </select>

        <label htmlFor="">Priority</label>
        <select name="" id="" onChange={(e)=>formDispatch({type: ActionTypes.changePriority, payload: e.target.value})}>
            <option value="highest">Highest</option>
            <option value="high">High</option>
            <option value="low">Low</option>
        </select>

        <label htmlFor="description">Enter Task Description</label>
        <textarea name="description" id="" cols={30} rows={10} onChange={(e)=>formDispatch({type: ActionTypes.changeDescription, payload: e.target.value})}></textarea>
        {
            errors && errors?.description.length > 0 && errors.description.map(errors=><span style={{color:'red'}}>{errors}</span>)
        }
        <div className="btn-containers">
        <input type="submit" value="Create Task" className="create-project-submit"/>
        </div>
        
    </form>
    </div>
    </>
}