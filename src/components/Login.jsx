
// import axios from "axios"
// import { useState } from "react"
// import { useDispatch } from "react-redux"
// import { addUser } from "../utils/userSlice"
// import { Link, useNavigate } from "react-router-dom"
// import { BASE_URL } from "../utils/contants"

// const Login = () => {
//   const [emailID, setEmailID] = useState("")
//   const [password, setPassword] = useState("")
//   const [error, setError] = useState("")
//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   const login_handler = async () => {
//     setError("")
//     if (!emailID || !password) {
//       setError("Email and password are required.")
//       return
//     }
//     try {
//       const res = await axios.post(
//         BASE_URL + "/login",
//         { email: emailID, password },
//         { withCredentials: true }
//       )
//       dispatch(addUser(res.data.user))
//       navigate("/")
//     } catch (err) {
//       const msg = err?.response?.data?.message
//       setError(typeof msg === "string" ? msg : "Invalid credentials. Please try again.")
//     }
//   }



//   return (
//     <div className="flex justify-center items-center min-h-screen bg-base-100">
//       <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-6">
//         <legend className="fieldset-legend text-lg font-semibold px-2">Login</legend>

//         <label className="label">Email</label>
//         <input
//           type="email"
//           className="input input-bordered w-full"
//           placeholder="Email"
//           value={emailID}
//           onChange={(e) => setEmailID(e.target.value)}
//         />

//         <label className="label mt-2">Password</label>
//         <input
//           type="password"
//           className="input input-bordered w-full"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         {error && <p className="text-error text-sm mt-3">{error}</p>}

//         <button className="btn btn-accent w-full mt-4" onClick={login_handler}>
//           Login
//         </button>
//         <Link to = "/signup">Create new account, Click here</Link>
//       </fieldset>
//     </div>
//   )
// }

// export default Login




import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"
import { Link, useNavigate } from "react-router-dom"
import { BASE_URL } from "../utils/contants"

const Login = () => {
  const [emailID, setEmailID] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const login_handler = async () => {
    setError("")
    if (!emailID || !password) {
      setError("Email and password are required.")
      return
    }
    setLoading(true)
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { email: emailID, password },
        { withCredentials: true }
      )
      dispatch(addUser(res.data.user))
      navigate("/")
    } catch (err) {
      const msg = err?.response?.data?.message
      setError(typeof msg === "string" ? msg : "Invalid credentials. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    "input w-full bg-base-100 border-base-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
  const labelClass = "label text-xs font-medium uppercase tracking-wider text-base-content/50"

  return (
    <div className="w-full max-w-sm py-12 animate-fade-up">
      <div className="bg-base-200 border border-base-300 rounded-box p-7 shadow-2xl shadow-black/40">
        <div className="mb-6">
          <h2 className="text-2xl font-display font-bold text-base-content">Welcome back</h2>
          <p className="text-sm text-base-content/50 mt-1">Log in to keep swiping.</p>
        </div>

        <label className={labelClass}>Email</label>
        <input
          type="email"
          className={inputClass}
          placeholder="you@example.com"
          value={emailID}
          onChange={(e) => setEmailID(e.target.value)}
        />

        <label className={`${labelClass} mt-4 block`}>Password</label>
        <input
          type="password"
          className={inputClass}
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && login_handler()}
        />

        {error && (
          <p className="text-error text-sm mt-3 bg-error/10 border border-error/20 rounded-field px-3 py-2">
            {error}
          </p>
        )}

        <button
          className="btn w-full mt-6 bg-gradient-to-r from-primary to-secondary border-none text-primary-content hover:brightness-110 shadow-lg shadow-primary/25"
          onClick={login_handler}
          disabled={loading}
        >
          {loading ? <span className="loading loading-spinner loading-sm" /> : "Log in"}
        </button>

        <p className="text-center text-sm text-base-content/50 mt-5">
          New here?{" "}
          <Link to="/signup" className="text-primary font-medium hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
