import { atom } from "recoil";
import { Project } from "../pages/dashboard/interfaces";
import { object } from "zod";

interface user {
  id: number ;
  name: string;
}
export const currentUser = atom({
  key: "currentUser",
  default: {
    id: 0,
    name: '',
  } satisfies user,
});

type project = object | null
export const currentProject = atom({
  key : "currentProject",
  default : {
     
  } satisfies project
})