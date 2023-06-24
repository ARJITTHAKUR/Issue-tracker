import { useEffect } from "react";
import { currentUser } from "../../store/store"
import {useRecoilState, useRecoilValue} from "recoil";

export default function Project(){
    const [user, setUser] = useRecoilState(currentUser) 
    const userVal = useRecoilValue(currentUser)
    const logUser = ()=>{
        console.log({user})
    }
    useEffect(()=>{
        console.log(user)
    },[user,userVal])
    return <>
    projects current user {userVal}
    <h1>{user.name}</h1>
    <button onClick={()=>logUser()}>log user</button>
    </>
}