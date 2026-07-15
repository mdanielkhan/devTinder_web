import axios from "axios"
import { BASE_URL } from "../utils/contants"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../utils/userSlice"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

   const Signup = () => {
        const dispatch = useDispatch()
        const navigate = useNavigate()
        const [error , setError] = useState()
        const [firstName , setFirstname] = useState()
        const [emailID , setEmailID] = useState()
        const [password , setPassword] = useState()
        const [age , setAge] = useState()
        const [gender , setGender] = useState()
        const [lastName , setLastName] = useState()
        const [about , setAbout] = useState()
        const [skill , setSkill] = useState()
        const [photoUrl , setPhotoUrl] = useState()
        
    const Signup_Handler = async() =>{
            try{
                    const res =await axios.post(BASE_URL + "/signup",{
                        email : emailID,
                        password: password,
                        age : age,
                        lastName : lastName,
                        photoUrl :photoUrl,
                        firstName : firstName,
                        gender : gender,
                        about : about,
                        skill :skill
                    },{
                        withCredentials: true
                    } )
                    dispatch(addUser(res.data.user))
                    navigate("/")
            }catch(err){
                const msg = err?.response?.data?.message
                setError(typeof msg === "string" ? msg : "Invalid credentials. Please try again.")
            }
    }
    const login_handler = ()=>{
        navigate("/login")
    }
    
    




    
  const inputClass =
    "w-full bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
  const labelClass =
    "block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5 mt-4 first:mt-0"

  return (
    <div className="min-h-screen bg-slate-950 flex justify-center items-center px-4 py-12">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl shadow-black/40">
        <h2 className="text-lg font-semibold text-slate-100 mb-1">Create account</h2>
        <p className="text-xs text-slate-500 mb-2">Join DevTinder and start swiping.</p>

        <label className={labelClass}>First name</label>
        <input type="text" className={inputClass} placeholder="First name" 
        value={firstName}
          onChange={(e) => setFirstname(e.target.value)}
        />

        <label className={labelClass}>Last name</label>
        <input type="text" className={inputClass} placeholder="Last name" 
        value={lastName}
          onChange={(e) => setLastName(e.target.value)}/>

           <label className={labelClass}>Photo</label>
        <input type="UR:" className={inputClass} placeholder="https://..." 
        value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}/>

         <label className={labelClass}>Age</label>
        <input type="number" className={inputClass} placeholder="Age" 
        value={age}
          onChange={(e) => setAge(e.target.value)}/>

         <label className={labelClass}>Gender</label>
        <input type="text" className={inputClass} placeholder="Gender" 
        value={gender}
          onChange={(e) => setGender(e.target.value)}/>

         <label className={labelClass}>About</label>
        <input type="text" className={inputClass} placeholder="About" 
        value={about}
          onChange={(e) => setAbout(e.target.value)}/>

         <label className={labelClass}>Skill</label>
        <input type="text" className={inputClass} placeholder="Skill" 
        value={skill}
          onChange={(e) => setSkill(e.target.value)}/>

        <label className={labelClass}>Email</label>
        <input type="email" className={inputClass} placeholder="you@example.com" 
        value={emailID}
          onChange={(e) => setEmailID(e.target.value)}/>

        <label className={labelClass}>Password</label>
        <input type="password" className={inputClass} placeholder="••••••••" 
        value={password}
          onChange={(e) => setPassword(e.target.value)}/>
        {error && <p className="text-error text-sm mt-3">{error}</p>}
        <button className="w-full mt-6 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm rounded-lg py-2.5 transition" onClick={Signup_Handler}>
          Sign up
        </button>

        <button className="w-full mt-2 bg-slate-800 hover:bg-slate-700 text-slate-100 text-sm font-medium rounded-lg py-2 transition" onClick={login_handler}>
          Already have an account? Log in
        </button>
      </div>
    </div>
  )
}

export default Signup

