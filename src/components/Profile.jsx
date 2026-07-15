// import { useSelector } from "react-redux"
// import Editprofile from "./EditProfile"

// const Profile =()=>{
//     const user = useSelector((store) => store.user)
// console.log("user from store:", user)
//     return(
//         <div><Editprofile user= {user}/></div>
        
//     )
// }

// export default Profile



import { useSelector } from "react-redux"
import Editprofile from "./EditProfile"

const Profile = () => {
    const user = useSelector((store) => store.user)

    return (
        <div className="w-full flex justify-center py-8">
            <Editprofile user={user} />
        </div>
    )
}

export default Profile
