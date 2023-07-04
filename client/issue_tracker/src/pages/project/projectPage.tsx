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

export default function Project() {
  const [user, setUser] = useRecoilState(currentUser);
  
  const userVal = useRecoilValue(currentUser);
  const [toggleForm, setToggleForm] = useState(false);
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [currentSelectedProject, setCurrentSelectedProject] = useRecoilState(currentProject)

  const logUser = () => {
    console.log({ user });
  };
  useEffect(() => {
    console.log(user);
  }, [user, userVal]);


  const createTask = async(data : any)=>{
    // console.log(data);
    const payload = {
      ...data,
      projectID : currentSelectedProject.ID,
      userID: currentSelectedProject.UserId,
    }
    try {
        let res = await axios.post(apis.CREATE_TASK,payload)

        if(res.status){
            console.log({res})
            setToggleForm(prev=>!prev)
        }
    } catch (error) {
      if(error instanceof AxiosError){
        console.error(error)
      }
    }
  }

  const getTasks =async ()=>{
    try {
      const res = await axios.get(`${apis.GET_TASKS}/${currentSelectedProject.ID}`)
      if(res.status){
        // console.log(res.data.tasks)
        setTaskList(res.data.tasks)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(()=>{
    getTasks()
  },[user.id])
  useEffect(()=>{
    console.log({taskList})
  },[taskList])
  
  return (
    <>
    <CustomHeader>
      {/* Projects current user {userVal.name} */}
      {/* <h1>{user.name}</h1> */}
      {/* <button onClick={() => logUser()}>log user</button> */}
      Manage All Tasks
    </CustomHeader>
      <div className="project-container">
        <div className="top-panel">
          <Button text="Create Task" onClick={() => setToggleForm(true)} />
        </div>
        {/* weird behaviour when removing length property from the list */}
        {taskList.length >0 ?
         <NewDnD tasks={taskList}/> :
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
