import { currentUser } from "../../store/store"
import {useRecoilState} from "recoil";

export default function Project(){
    const [user, setUser] = useRecoilState(currentUser)
    return <>
    projects current user {user}
    <h1>{user}</h1>
    </>
}