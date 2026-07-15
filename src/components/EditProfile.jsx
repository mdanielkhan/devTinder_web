// import axios from "axios"
// import { useState } from "react"
// import { BASE_URL } from "../utils/contants"
// import { useDispatch } from "react-redux"
// import UserCard from "./UserCard"
// import { addUser } from "../utils/userSlice"

// const Editprofile = ({ user }) => {
//   const [firstName, setFirstName] = useState("")
//   const [gender, setGender] = useState("")
//   const [age, setAge] = useState("")
//   const [photoUrl, setPhotoUrl] = useState("")
//   const [skills, setSkills] = useState("")
//   const [error, setError] = useState("")
//   const dispatch = useDispatch()
//   const [showtoast, setShowtoast] = useState(false)

//   const saveChanges = async () => {
//     try {
//       const payload = {
//         firstName: firstName || user?.firstName,
//         gender: gender || user?.gender,
//         age: age !== "" ? Number(age) : user?.age,
//         photoUrl: photoUrl || user?.photoUrl,
//         skills: skills || user?.skills,
//       }

//       const res = await axios.patch(
//         BASE_URL + "/profile/view/edit",
//         payload,
//         { withCredentials: true }
//       )
//       dispatch(addUser(res.data.user))
//       setShowtoast(true)
//       setTimeout(() => {
//         setShowtoast(false)
//       }, 3000)
//     } catch (error) {
//       setError(error?.response?.data?.message || "Couldn't save changes")
//       console.error(error.message)
//     }
//   }

//   const inputClass =
//     "w-full bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
//   const labelClass =
//     "block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5 mt-4 first:mt-0"

//   return (
//     <div className="min-h-screen bg-slate-950 flex flex-col lg:flex-row justify-center items-center gap-8 px-4 py-12">
//       <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl shadow-black/40">
//         <h2 className="text-lg font-semibold text-slate-100 mb-1">Edit profile</h2>
//         <p className="text-xs text-slate-500 mb-2">Update how other devs see you.</p>

//         <label className={labelClass}>First name</label>
//         <input
//           type="text"
//           className={inputClass}
//           placeholder={user?.firstName || "First name"}
//           value={firstName}
//           onChange={(e) => setFirstName(e.target.value)}
//         />

//         <label className={labelClass}>Gender</label>
//         <input
//           type="text"
//           className={inputClass}
//           placeholder={user?.gender || "Gender"}
//           value={gender}
//           onChange={(e) => setGender(e.target.value)}
//         />

//         <label className={labelClass}>Photo URL</label>
//         <input
//           type="text"
//           className={inputClass}
//           placeholder={user?.photoUrl || "https://..."}
//           value={photoUrl}
//           onChange={(e) => setPhotoUrl(e.target.value)}
//         />

//         <label className={labelClass}>Age</label>
//         <input
//           type="number"
//           className={inputClass}
//           placeholder={user?.age?.toString() || "Age"}
//           value={age}
//           onChange={(e) => setAge(e.target.value)}
//         />

//         <label className={labelClass}>Skills</label>
//         <input
//           type="text"
//           className={inputClass}
//           placeholder={user?.skills?.join(", ") || "Skills"}
//           value={skills}
//           onChange={(e) => setSkills(e.target.value)}
//         />

//         {error && <p className="text-red-400 text-xs mt-3">{error}</p>}

//         <button
//           className="w-full mt-6 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm rounded-lg py-2.5 transition"
//           onClick={saveChanges}
//         >
//           Confirm changes
//         </button>
//       </div>

//       <UserCard
//         user={{
//           firstName: firstName || user?.firstName,
//           gender: gender || user?.gender,
//           age: age || user?.age,
//           skills: skills || user?.skills,
//           photoUrl: photoUrl || user?.photoUrl,
//         }}
//       />

//       {showtoast && (
//         <div className="toast toast-top toast-center">
//           <div className="alert alert-success">
//             <span>Profile updated successfully.</span>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Editprofile





import axios from "axios"
import { useState } from "react"
import { BASE_URL } from "../utils/contants"
import { useDispatch } from "react-redux"
import UserCard from "./UserCard"
import { addUser } from "../utils/userSlice"

const Editprofile = ({ user }) => {
  const [firstName, setFirstName] = useState("")
  const [gender, setGender] = useState("")
  const [age, setAge] = useState("")
  const [photoUrl, setPhotoUrl] = useState("")
  const [skills, setSkills] = useState("")
  const [error, setError] = useState("")
  const [saving, setSaving] = useState(false)
  const dispatch = useDispatch()
  const [showtoast, setShowtoast] = useState(false)

  const saveChanges = async () => {
    setSaving(true)
    try {
      const payload = {
        firstName: firstName || user?.firstName,
        gender: gender || user?.gender,
        age: age !== "" ? Number(age) : user?.age,
        photoUrl: photoUrl || user?.photoUrl,
        skills: skills || user?.skills,
      }

      const res = await axios.patch(
        BASE_URL + "/profile/view/edit",
        payload,
        { withCredentials: true }
      )
      dispatch(addUser(res.data.user))
      setShowtoast(true)
      setTimeout(() => {
        setShowtoast(false)
      }, 3000)
    } catch (error) {
      setError(error?.response?.data?.message || "Couldn't save changes")
      console.error(error.message)
    } finally {
      setSaving(false)
    }
  }

  const inputClass =
    "input w-full bg-base-100 border-base-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
  const labelClass = "label text-xs font-medium uppercase tracking-wider text-base-content/50"

  return (
    <div className="w-full flex flex-col lg:flex-row justify-center items-start gap-8 px-4 py-4 animate-fade-up">
      <div className="w-full max-w-sm bg-base-200 border border-base-300 rounded-box p-7 shadow-2xl shadow-black/40">
        <div className="mb-6">
          <h2 className="text-2xl font-display font-bold text-base-content">Edit profile</h2>
          <p className="text-sm text-base-content/50 mt-1">Update how other devs see you.</p>
        </div>

        <label className={labelClass}>First name</label>
        <input
          type="text"
          className={inputClass}
          placeholder={user?.firstName || "First name"}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label className={`${labelClass} mt-4 block`}>Gender</label>
        <input
          type="text"
          className={inputClass}
          placeholder={user?.gender || "Gender"}
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />

        <label className={`${labelClass} mt-4 block`}>Photo URL</label>
        <input
          type="text"
          className={inputClass}
          placeholder={user?.photoUrl || "https://..."}
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
        />

        <label className={`${labelClass} mt-4 block`}>Age</label>
        <input
          type="number"
          className={inputClass}
          placeholder={user?.age?.toString() || "Age"}
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <label className={`${labelClass} mt-4 block`}>Skills</label>
        <input
          type="text"
          className={inputClass}
          placeholder={user?.skills?.join(", ") || "Skills"}
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />

        {error && (
          <p className="text-error text-xs mt-4 bg-error/10 border border-error/20 rounded-field px-3 py-2">
            {error}
          </p>
        )}

        <button
          className="btn w-full mt-6 bg-gradient-to-r from-primary to-secondary border-none text-primary-content hover:brightness-110 shadow-lg shadow-primary/25"
          onClick={saveChanges}
          disabled={saving}
        >
          {saving ? <span className="loading loading-spinner loading-sm" /> : "Confirm changes"}
        </button>
      </div>

      <UserCard
        user={{
          firstName: firstName || user?.firstName,
          gender: gender || user?.gender,
          age: age || user?.age,
          skills: skills || user?.skills,
          photoUrl: photoUrl || user?.photoUrl,
        }}
      />

      {showtoast && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert bg-success text-success-content border-none shadow-lg">
            <span>Profile updated successfully.</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Editprofile
