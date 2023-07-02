import { NavLink, useNavigate } from "react-router-dom";
import "./style.css";
import Button from "../../components/UI/button/button";
import axios, { AxiosError } from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useRecoilState,useSetRecoilState } from "recoil";

import { ToastContext } from "../../context/toastContext";
import { currentUser } from "../../store/store";

interface LoginResponse {
  login: boolean;
  success: boolean;
  user: {
    Name: string;
    ID : number
  };
}
export default function LoginPage() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const toastContext = useContext(ToastContext);
  const [user,setNewUser] = useRecoilState(currentUser) 

  const loginFunc = async () => {
    const body: any = {};
    body.name = inputRef?.current?.value as string;
    try {
      const res = await axios.post<LoginResponse>(
        "http://127.0.0.1:3000/api/user/login",
        body
      );
      if (res.status !== 200) {
        throw "login error occured";
      } else if (res.data.login) {
        const {ID,Name} = res.data.user
        // console.log(res)
        // console.log({user})
        setNewUser({name : Name, id : ID});
        sessionStorage.setItem('user',JSON.stringify({name : Name, id : ID}))
        navigate("/dashboard");
      }
    } catch (error: any) {
      // errorToast(error)
      toastContext?.showToast?.();
    }
  };
  // useEffect(()=>{
  //   console.log({user})
  // },[user])
  return (
    <>
          <div className="login-backdrop">
            <div className="backdrop-label-container">
            <h1 className="title">Issue Tracker</h1>
            {/* <p>
              Plan | Log | work
            </p> */}
            </div>
          </div>
      {/* <NavLink to={"/dashboard"}>dashboard</NavLink> */}
      <div className="container">
        <div className="login-container">
          <label htmlFor="user">Enter Username</label>
          <input type="text" name="user" ref={inputRef} />
          {/* <button onClick={()=>navigate('/dashboard')}>Login</button> */}
          <Button text="login" onClick={() => loginFunc()} />
        </div>
        
      </div>
      <div className="description-container">
          <div className="description-box">
            <h3>Start a project</h3>
            <p>
            Start by making a Project,
            adding details,like timeline and description.
            </p>
          </div>
          <div className="description-box">
            <h3>Make Tasks</h3>
            <p>
            Make tasks for a project that'll help you breakdown a project in 
            simple easy workalbe pieces and track progess.
            </p>
          </div>
          <div className="description-box">
            <h3>Get overview of all the projects</h3>
            <p>
            Your dashboard will give you the overview of all the tasks at once with data visualization
            so that you get a bird eye view of what going on with everything.
            </p>
          </div>
        </div>
    </>
  );
}
