import { FormEvent, useEffect, useReducer, useState } from "react"
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
    changeDescription,
    resetForm
}
const formReducer = (state : formState, action : {type : ActionTypes, payload?: any}) : formState =>{
    switch(action.type){
        case ActionTypes.changetask : return {...state,taskname : action.payload }
        case ActionTypes.changeStatus : return {...state, status : action.payload}
        case ActionTypes.changePriority : return {...state, priority : action.payload}
        case ActionTypes.changeDescription : return {...state, description : action.payload}
        case ActionTypes.resetForm : return {...state,taskname : '', description : '', priority : '', status : ''}
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
        submit(formState)
        formDispatch({type: ActionTypes.resetForm})
    }

    useEffect(()=>{

        return ()=>{
            formDispatch({type:ActionTypes.resetForm})
        }
    },[])
    return <>
    
    <div>
    <form onSubmit={handleSubmit} className="form-container">
        <label htmlFor="projectname" data-tooltip="Enter Project Name in the below field" className="project-name">Task Name</label>
        <input type="text" name="projectname" id="" style={{padding:"0.4rem"}} value={formState.taskname} onChange={(e)=>formDispatch({type: ActionTypes.changetask, payload: e.target.value})}/>
        {
            errors && errors?.taskname.length > 0 && errors.taskname.map(errors=><span style={{color:'red'}}>{errors}</span>)
        }

        <label htmlFor="">Status</label>

        <div className="status_radio_wrapper">
        <label htmlFor="nostatus">
        <input type="radio" name="status" id="nostatus" value="" defaultChecked={true} onChange={(e)=>formDispatch({type: ActionTypes.changeStatus, payload: e.target.value})}/>
        New Task
        </label>
        <label htmlFor="planning">
        <input type="radio" name="status" id="planning" value="planning" onChange={(e)=>formDispatch({type: ActionTypes.changeStatus, payload: e.target.value})}/>
        Planning
        </label>
        <label htmlFor="progress">
        <input type="radio" name="status" id="progress"  value="inprogress" onChange={(e)=>formDispatch({type: ActionTypes.changeStatus, payload: e.target.value})}/>
        In Progress
        </label>
        <label htmlFor="completed">
        <input type="radio" name="status" id="completed" value="completed" onChange={(e)=>formDispatch({type: ActionTypes.changeStatus, payload: e.target.value})}/>
        Completed
        </label>
        </div>

        <label htmlFor="">Priority</label>

        <div className="status_radio_wrapper">
        <label htmlFor="low">
        <input type="radio" name="prio" id="low" value="low" defaultChecked={true} onChange={(e)=>formDispatch({type: ActionTypes.changePriority, payload: e.target.value})}/>
        Low
        </label>
        <label htmlFor="highest">
        <input type="radio" name="prio" id="highest" value="highest" onChange={(e)=>formDispatch({type: ActionTypes.changePriority, payload: e.target.value})}/>
        Highest
        </label>
        <label htmlFor="high">
        <input type="radio" name="prio" id="high"  value="high" onChange={(e)=>formDispatch({type: ActionTypes.changePriority, payload: e.target.value})}/>
        High
        </label>
        
        </div>

        <label htmlFor="description">Task Description</label>
        <textarea name="description" id="" cols={30} rows={10} value={formState.description} onChange={(e)=>formDispatch({type: ActionTypes.changeDescription, payload: e.target.value})}></textarea>
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