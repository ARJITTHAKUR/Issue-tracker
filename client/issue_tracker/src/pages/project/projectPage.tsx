import { useEffect, useState } from "react";
import { currentProject, currentUser } from "../../store/store";
import { useRecoilState, useRecoilValue } from "recoil";
import DragNDropTasks from "./dragNdropTasks";
import DialogForm from "../dashboard/dialogForm";
import TaskForm from "./taskForm";
import Button from "../../components/UI/button/button";
import axios, { AxiosError } from "axios";
import { apis } from "../../const/api-const";
import { Task } from "./interface";
import CustomHeader from "../../components/UI/header/header";
import NewDnD from "./newDnDtasks";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { getToken } from "../../services/auth";

export default function Project() {
  const user = useRecoilValue(currentUser);
  
  const userVal = useRecoilValue(currentUser);
  const [toggleForm, setToggleForm] = useState(false);
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [currentSelectedProject, setCurrentSelectedProject] = useRecoilState(currentProject)


  const createTask = async(data : any)=>{
    const payload = {
      ...data,
      projectID : currentSelectedProject.ID,
      userID: currentSelectedProject.UserId,
    }
    try {
        let res = await axios.post(apis.CREATE_TASK,payload,{
          headers:{
            "Authorization" : "Bearer " + getToken()
          }
        })

        if(res.status){
            setToggleForm(prev=>!prev)
            await getTasks()
        }
    } catch (error) {
      if(error instanceof AxiosError){
        console.error(error)
      }
    }
  }

  const getTasks =async ()=>{
    try {
      const res = await axios.get<{tasks:Task[]}>(`${apis.GET_TASKS}/${currentSelectedProject.ID}`,{
        headers:{
          "Authorization" : "Bearer " + getToken()
        }
      })
      if(res.status){
        const newTasks = [...res.data.tasks]
        setTaskList(newTasks)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(()=>{
    getTasks()
  },[user.id])
  
  return (
    <>
    <CustomHeader>
      Manage All Tasks
    </CustomHeader>
      <div className="project-container">
        <div className="top-panel">
          <Button text="Create Task" onClick={() => setToggleForm(true)} />
         {taskList.length >0 ? <span className="info-label">
            <InformationCircleIcon width={20} height={20}/>
            Drag tasks to switch status</span> : null}
        </div>
        {/* weird behaviour when removing length property from the list */}
        {taskList.length >0 ?
         <NewDnD key={"DND"} tasks={taskList}/> :
          <div className="no-tasks-screen">
        <h1>No tasks available, Create a new task.</h1>
        </div>} 
        <DialogForm
          toggle={toggleForm}
          setToggle={setToggleForm}
          heading="New Task"
        >
          <TaskForm
            submit={createTask}
          />
        </DialogForm>
      </div>
    </>
  );
}
