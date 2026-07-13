import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { BASE_URL } from "../utils/contants"
import { removeUser } from "../utils/userSlice"

const Nav = () => {
  const user = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handle_logout = async () => {
    try {
      await axios.post(BASE_URL + "logout", {}, { withCredentials: true })
      dispatch(removeUser())
      navigate("/login")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="navbar bg-base-200 border-b border-base-300 px-4">

      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl text-accent">DevTinder</Link>
      </div>
      <div className="flex gap-2">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            {user && (
              <div className="flex items-center gap-2">
                <span className="text-sm">Welcome, {user.firstName}</span>
                <div className="w-9 h-9 rounded-full overflow-hidden bg-base-300 flex items-center justify-center">
                  {/* NOTE: was user.photourl (lowercase) — check Editprofile.jsx and
                      ConnectionRequestCard.jsx, both use camelCase photoUrl. If your
                      backend actually sends lowercase photourl, revert this. */}
                  {user.photoUrl ? (
                    <img src={user.photoUrl} alt={user.firstName} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs font-mono">{user.firstName?.[0]?.toUpperCase()}</span>
                  )}
                </div>
              </div>
            )}
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-200 border border-base-300 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {user && (
              <>
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge badge-accent">New</span>
                  </Link>
                </li>
                <li><Link to="/connections">Connections</Link></li>
                 <li><Link to="/requests">Requests</Link></li>
                <li><a onClick={handle_logout}>Logout</a></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Nav