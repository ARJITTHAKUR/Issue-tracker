import { useEffect, useState } from "react";
import { currentUser } from "../../store/store";
import { useRecoilState, useRecoilValue } from "recoil";
import DragNDropTasks from "./dragNdropTasks";
import DialogForm from "../dashboard/dialogForm";
import TaskForm from "./taskForm";
import Button from "../../components/UI/button/button";
import axios from "axios";
import { apis } from "../../const/api-const";

export default function Project() {
  const [user, setUser] = useRecoilState(currentUser);
  
  const userVal = useRecoilValue(currentUser);
  const [toggleForm, setToggleForm] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const logUser = () => {
    console.log({ user });
  };
  useEffect(() => {
    console.log(user);
  }, [user, userVal]);


  const createTask = async(data : any)=>{
    console.log(data);
    try {
        let res = await axios.post(apis.CREATE_TASK,data)

        if(res.status){
            console.log({res})
        }
    } catch (error) {
        
    }
  }

  return (
    <>
      projects current user {userVal.name}
      <h1>{user.name}</h1>
      {/* <button onClick={() => logUser()}>log user</button> */}
      <div>
        <div>
          <Button text="Create Task" onClick={() => setToggleForm(true)} />
        </div>
        <DragNDropTasks />
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
