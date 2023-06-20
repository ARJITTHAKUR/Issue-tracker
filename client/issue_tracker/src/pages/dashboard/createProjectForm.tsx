import { FormEvent } from "react";

interface props {
    submit : (data:any)=>void,
    cancel : ()=>void
}

export default function CreateProjectForm({submit,cancel}:props){

    function handleSubmit(e : FormEvent){
        e.preventDefault();
        console.log(e)
    }
    return <>
    <div className="project-form-container">

    <form onSubmit={handleSubmit} className="form-container">
        <label htmlFor="projectname" data-tooltip="Enter Project Name in the below field" className="project-name">Project Name</label>
        <input type="text" name="projectname" id="" />
        {/* <br /> */}
        <label htmlFor="startdate">Start Date
        <input type="date" name="startdate" id="" />
        </label>
        {/* <br /> */}
        <label htmlFor="enddate">End Date
        <input type="date" name="enddate" id="" />
        </label>
        {/* <br /> */}
        <label htmlFor="description">Enter Description</label>
        <textarea name="description" id="" cols={30} rows={10}></textarea>
        {/* <br /> */}

        <div className="btn-containers">
        <button className="modal-cancel" onClick={()=>cancel()}>Cancel</button>
        <input type="submit" value="Create Project" className="create-project-submit"/>
        </div>
        
    </form>

    </div>

    </>
}