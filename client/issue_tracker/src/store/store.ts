import { atom } from "recoil";

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
