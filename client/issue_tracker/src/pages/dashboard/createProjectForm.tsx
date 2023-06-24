import { FormEvent, useReducer } from "react";
import { formState } from "./interfaces";

interface props {
    submit : (data:any)=>void,
}

enum ActionTypes {
    changeLabel,
    changeStartDate,
    changeEndDate,
    changeDescription
}
const formReducer = (state : formState, action : {type : ActionTypes, payload?: any}) : formState =>{
    switch(action.type){
        case ActionTypes.changeLabel : return {...state,projectname : action.payload }
        case ActionTypes.changeStartDate : return {...state, startDate : action.payload}
        case ActionTypes.changeEndDate : return {...state, endDate : action.payload}
        case ActionTypes.changeDescription : return {...state, description : action.payload}
        default:  throw('Incorrect action') 
    }
}
export default function CreateProjectForm({submit}:props){
    const [formState, formDispatch] = useReducer(formReducer,{
        projectname : '',
        startDate : new Date(),
        endDate : new Date(),
        description : ''
    } satisfies formState)
    
    function handleSubmit(e : FormEvent){
        e.preventDefault();
        // console.log(e,{formState})
        submit(formState)
    }
    return <>
    <div className="project-form-container">

    <form onSubmit={handleSubmit} className="form-container">
        <label htmlFor="projectname" data-tooltip="Enter Project Name in the below field" className="project-name">Project Name</label>
        <input type="text" name="projectname" id="" onChange={(e)=>formDispatch({type: ActionTypes.changeLabel, payload: e.target.value})}/>
        {/* <br /> */}
        <label htmlFor="startdate">Start Date
        <input type="date" name="startDate" id="" onChange={(e)=>formDispatch({type: ActionTypes.changeStartDate, payload: e.target.value})}/>
        </label>
        {/* <br /> */}
        <label htmlFor="enddate">End Date
        <input type="date" name="endDate" id="" onChange={(e)=>formDispatch({type: ActionTypes.changeEndDate, payload: e.target.value})}/>
        </label>
        {/* <br /> */}
        <label htmlFor="description">Enter Description</label>
        <textarea name="description" id="" cols={30} rows={10} onChange={(e)=>formDispatch({type: ActionTypes.changeDescription, payload: e.target.value})}></textarea>
        {/* <br /> */}

        <div className="btn-containers">
        <input type="submit" value="Create Project" className="create-project-submit"/>
        </div>
        
    </form>

    </div>

    </>
}