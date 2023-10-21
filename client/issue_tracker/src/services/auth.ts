import { Navigate, redirect,useLocation } from "react-router-dom";

export const checkAuthOnNav = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return token;
  }
  return redirect("/");
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const shouldNavToLogin = () => {
  const token = localStorage.getItem("token");
  console.log({token})
  if (token) {
    // if the token exists stay at the same page
    return false
  }
  return true
};
