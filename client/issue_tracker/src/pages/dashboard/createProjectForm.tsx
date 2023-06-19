import { FormEvent } from "react";

interface props {
    submit : (data:any)=>void
}

export default function CreateProjectForm({submit}:props){

    function handleSubmit(e : FormEvent){
        e.preventDefault();
        console.log(e)
    }
    return <>
    <div className="project-form-container">

    <form onSubmit={handleSubmit}>
        <label htmlFor="projectname">Project Name</label>
        <input type="text" name="projectname" id="" />
        <br />
        <label htmlFor="startdate">Start Date</label>
        <input type="date" name="startdate" id="" />
        <br />
        <label htmlFor="enddate">End Date</label>
        <input type="date" name="enddate" id="" />
        <br />
        <label htmlFor="description">Enter Description</label>
        <textarea name="description" id="" cols={30} rows={10}></textarea>
        <br />
        <input type="submit" value="Create Project" className="create-project-submit"/>
        
    </form>

    </div>

    </>
}