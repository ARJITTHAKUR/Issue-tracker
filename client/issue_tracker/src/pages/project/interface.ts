export interface formState {
    taskname : string,
    priority : string,
    status : string,
    description : string 
  }

  export interface Task {
    ID : number,
    CreatedAt : Date,
    UpdatedAt : Date,
    priority : "high" | "highest" | "low" | "",
    status : "planning" | "completed" | "inprogress" | "",
    description : string,
    projectId : number
  }