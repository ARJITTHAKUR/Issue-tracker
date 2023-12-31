import {
  NavLink,
  Navigate,
  redirect,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import "./style.css";
import Button from "../../components/UI/button/button";
import axios, { AxiosError } from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

import { ToastContext } from "../../context/toastContext";
import { currentUser,setCurrentUser } from "../../store/store";
import { apis } from "../../const/api-const";

interface LoginResponse {
  login: boolean;
  success: boolean;
  token: string;
  user: {
    Name: string;
    ID: number;
  };
}

export default function LoginPage() {
  const shouldNavToLogin = useLoaderData();
  let navigate = useNavigate();
  if (!shouldNavToLogin) {
    return <Navigate to={"/dashboard"} replace={true} />;
  }
  const inputRef = useRef<HTMLInputElement>(null);
  const toastContext = useContext(ToastContext);
  const [user, setNewUser] = useRecoilState(setCurrentUser);

  const loginFunc = async () => {
    const body: any = {};
    body.name = inputRef?.current?.value as string;
    try {
      const res = await axios.post<LoginResponse>(apis.lOGIN, body);
      if (res.status !== 200) {
        throw "login error occured";
      } else if (res.data.login) {
        const { ID, Name } = res.data.user;
        setNewUser({ name: Name, id: ID });
        sessionStorage.setItem("user", JSON.stringify({ name: Name, id: ID }));
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      }
    } catch (error: any) {
      toastContext?.showToast?.();
    }
  };

  return (
    <>
      <div className="login-backdrop">
        <div className="backdrop-label-container">
          <h1 className="title">Task Tracker</h1>
          {/* <p>
              Plan | Log | work
            </p> */}
          <div className="container">
            <div className="login-container">
              <label htmlFor="user">Enter Username</label>
              <input
                type="text"
                name="user"
                ref={inputRef}
                value={"user1"}
                className="login-input"
              />
              {/* <button onClick={()=>navigate('/dashboard')}>Login</button> */}
              <Button text="login" onClick={() => loginFunc()} />
            </div>
          </div>
        </div>
      </div>
      {/* <NavLink to={"/dashboard"}>dashboard</NavLink> */}

      <div className="description-container">
        <div className="description-box">
          <h3 className="description-title">Start a project</h3>
          <p className="description-content">
            Start by making a Project, adding details, like timeline,
            description and it's priority.
          </p>
        </div>
        <div className="description-box">
          <h3 className="description-title">Make Tasks</h3>
          <p className="description-content">
            Make tasks for a project that'll help you breakdown a project in
            simple easy workalbe pieces and track progess.
          </p>
        </div>
        <div className="description-box">
          <h3 className="description-title">
            Get overview of all the projects
          </h3>
          <p className="description-content">
            Your dashboard will give you the overview of all the tasks at once
            with data visualization so that you get a bird eye view of what
            going on with everything.
          </p>
        </div>
      </div>
    </>
  );
}
