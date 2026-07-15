// import axios from "axios"
// import { useDispatch } from "react-redux"
// import { BASE_URL } from "../utils/contants"
// import { removeFeed } from "../utils/feedSlice"

// const UserCard = ({ user }) => {
//   const { _id,firstName, age, photoUrl, gender, about } = user
//   const dispatch = useDispatch()

//     const handleSendRequest = async (status, requestId) => {
//     try {
//         const res = await axios.post(
//             BASE_URL + "/request/send/" + status + "/" + requestId,
//             {},
//             { withCredentials: true }
//         )
//         dispatch(removeFeed(requestId))
//     } catch (err) {
//         console.error(err?.response?.data?.message || err.message)
//     }
// } 
// console.log("user object:", user)
//   return (
//     <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl shadow-black/40">
//       <div className="h-80 w-full bg-slate-800">
//         {photoUrl ? (
//           <img
//             src={photoUrl}
//             alt={firstName || "Profile"}
//             className="h-full w-full object-cover"
//           />
//         ) : (
//           <div className="h-full w-full flex items-center justify-center text-slate-600 text-xs font-mono">
//             no photo url yet
//           </div>
//         )}
//       </div>

//       <div className="p-5">
//         <h2 className="text-lg font-semibold text-slate-100">
//           {firstName || "Your name"}
//           {age && <span className="text-slate-500 font-normal"> · {age}</span>}
//         </h2>
//         {gender && <p className="text-xs font-mono uppercase tracking-wider text-cyan-400 mt-1">{gender}</p>}
//         {about && <p className="text-sm text-slate-400 mt-3">{about}</p>}

//         <div className="flex gap-3 mt-6">
//           <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-100 text-sm font-medium rounded-lg py-2 transition"onClick={()=>handleSendRequest("ignored", _id)}>
//             Ignore
//           </button>
//           <button className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-sm font-semibold rounded-lg py-2 transition" onClick={()=>handleSendRequest("interested" , _id)}>
//             Interested
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default UserCard



import axios from "axios"
import { useDispatch } from "react-redux"
import { BASE_URL } from "../utils/contants"
import { removeFeed } from "../utils/feedSlice"

const UserCard = ({ user }) => {
  const { _id, firstName, age, photoUrl, gender, about, skills } = user
  const dispatch = useDispatch()

  const handleSendRequest = async (status, requestId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + requestId,
        {},
        { withCredentials: true }
      )
      dispatch(removeFeed(requestId))
    } catch (err) {
      console.error(err?.response?.data?.message || err.message)
    }
  }

  const skillList = Array.isArray(skills)
    ? skills
    : typeof skills === "string" && skills.length
    ? skills.split(",").map((s) => s.trim()).filter(Boolean)
    : []

  return (
    <div className="w-full max-w-sm rounded-box overflow-hidden border border-base-300 bg-base-200 shadow-2xl shadow-black/50 animate-fade-up">
      <div className="relative h-96 w-full bg-base-300">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={firstName || "Profile"}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-base-content/30 text-xs font-mono">
            no photo url yet
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-base-100/95 via-base-100/40 to-transparent pointer-events-none" />

        <div className="absolute bottom-4 left-5 right-5">
          <h2 className="text-2xl font-display font-bold text-white drop-shadow-sm">
            {firstName || "Your name"}
            {age && <span className="text-white/70 font-medium text-xl"> · {age}</span>}
          </h2>
          {gender && (
            <p className="text-[11px] font-semibold uppercase tracking-wider text-primary mt-1">
              {gender}
            </p>
          )}
        </div>
      </div>

      <div className="p-5">
        {about && <p className="text-sm text-base-content/70 leading-relaxed">{about}</p>}

        {skillList.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {skillList.map((skill, i) => (
              <span
                key={i}
                className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-3 mt-6">
          <button
            className="flex-1 border border-base-300 hover:border-base-content/30 text-base-content/80 text-sm font-semibold rounded-field py-2.5 transition-colors"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="flex-1 bg-gradient-to-r from-primary to-secondary hover:brightness-110 text-primary-content text-sm font-semibold rounded-field py-2.5 transition shadow-lg shadow-primary/25"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserCard
