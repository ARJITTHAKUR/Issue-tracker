import { NavLink , useNavigate} from "react-router-dom";
import "./style.css";
import Button from "../../components/UI/button/button";
import axios, { AxiosError } from "axios";
import { useContext, useRef, useState } from "react";

import { ToastContext } from "../../context/toastContext";
export default function LoginPage() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const toastContext = useContext(ToastContext)
  const loginFunc = async()=>{
    const body : any = {}
    body.name = inputRef?.current?.value as string;
    try {
      const res = await axios.post("http://127.0.0.1:3000/api/user/login",body)
    console.log(res)
    if(res.status !== 200){
      throw('login error occured')}
    navigate('/dashboard')
    } catch (error : any) {
      // errorToast(error)    
      toastContext?.showToast?.()
    }
    
  }
  return (
    <>
      <NavLink to={"/dashboard"}>dashboard</NavLink>
      <div className="container">
        <div className="login-container">
          <label htmlFor="user">Enter Username</label>
          <input type="text" name="user" ref={inputRef}/>
          {/* <button onClick={()=>navigate('/dashboard')}>Login</button> */}
          <Button text="login" onClick={()=>loginFunc()} />
        </div>
      </div>
    </>
  );
}
