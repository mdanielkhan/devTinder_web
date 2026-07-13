import { useSelector } from "react-redux"
import Editprofile from "./EditProfile"

const Profile =()=>{
    const user = useSelector((store) => store.user)
console.log("user from store:", user)
    return(
        <div><Editprofile user= {user}/></div>
        
    )
}

export default Profile