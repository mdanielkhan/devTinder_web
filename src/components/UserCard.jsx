import axios from "axios"
import { useDispatch } from "react-redux"
import { BASE_URL } from "../utils/contants"
import { removeFeed } from "../utils/feedSlice"

const UserCard = ({ user }) => {
  const { _id,firstName, age, photoUrl, gender, about } = user
  const dispatch = useDispatch()

    const handleSendRequest = async (status, requestId) => {
    try {
        const res = await axios.post(
            BASE_URL + "/request/send/" + status + "/" + requestId,
            {},
            { withCredentials: true }
        )
        dispatch(removeFeed(requestId))
    } catch (err) {
        console.error(err?.response?.data?.message || err.message)
    }
} 
console.log("user object:", user)
  return (
    <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl shadow-black/40">
      <div className="h-80 w-full bg-slate-800">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={firstName || "Profile"}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-slate-600 text-xs font-mono">
            no photo url yet
          </div>
        )}
      </div>

      <div className="p-5">
        <h2 className="text-lg font-semibold text-slate-100">
          {firstName || "Your name"}
          {age && <span className="text-slate-500 font-normal"> · {age}</span>}
        </h2>
        {gender && <p className="text-xs font-mono uppercase tracking-wider text-cyan-400 mt-1">{gender}</p>}
        {about && <p className="text-sm text-slate-400 mt-3">{about}</p>}

        <div className="flex gap-3 mt-6">
          <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-100 text-sm font-medium rounded-lg py-2 transition"onClick={()=>handleSendRequest("ignored", _id)}>
            Ignore
          </button>
          <button className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-sm font-semibold rounded-lg py-2 transition" onClick={()=>handleSendRequest("interested" , _id)}>
            Interested
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserCard