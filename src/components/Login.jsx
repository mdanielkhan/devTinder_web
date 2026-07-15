
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
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const login_handler = async () => {
    setError("")
    if (!emailID || !password) {
      setError("Email and password are required.")
      return
    }
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
    }
  }



  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-6">
        <legend className="fieldset-legend text-lg font-semibold px-2">Login</legend>

        <label className="label">Email</label>
        <input
          type="email"
          className="input input-bordered w-full"
          placeholder="Email"
          value={emailID}
          onChange={(e) => setEmailID(e.target.value)}
        />

        <label className="label mt-2">Password</label>
        <input
          type="password"
          className="input input-bordered w-full"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-error text-sm mt-3">{error}</p>}

        <button className="btn btn-accent w-full mt-4" onClick={login_handler}>
          Login
        </button>
        <Link to = "/signup">Create new account, Click here</Link>
      </fieldset>
    </div>
  )
}

export default Login