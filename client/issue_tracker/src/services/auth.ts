import { redirect,useLocation } from "react-router-dom";

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
  if (token) {
    return token;
  }
  const localtion = useLocation()
  return redirect(localtion.pathname);
};
