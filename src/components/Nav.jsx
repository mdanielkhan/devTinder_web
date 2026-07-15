



import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { BASE_URL } from "../utils/contants"
import { removeUser } from "../utils/userSlice"

const Nav = () => {
  const user = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handle_logout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true })
      dispatch(removeUser())
      navigate("/login")
    } catch (err) {
      console.error(err)
    }
  }

  const navLinkClass = ({ isActive }) =>
    `px-3 py-1.5 rounded-field text-sm font-medium transition-colors ${
      isActive
        ? "text-primary bg-primary/10"
        : "text-base-content/70 hover:text-base-content hover:bg-base-200"
    }`

  return (
    <div className="sticky top-0 z-30 backdrop-blur-md bg-base-100/80 border-b border-base-300/60">
      <div className="navbar max-w-5xl mx-auto px-4">
        <div className="flex-1">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-field bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-content font-display font-bold text-sm shadow-lg shadow-primary/30 group-hover:scale-105 transition-transform">
              D
            </span>
            <span className="font-display text-lg font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              GitMatch
            </span>
          </Link>

          {user && (
            <div className="hidden sm:flex items-center gap-1 ml-6">
              <NavLink to="/" end className={navLinkClass}>
                Discover
              </NavLink>
              <NavLink to="/connections" className={navLinkClass}>
                Connections
              </NavLink>
              <NavLink to="/requests" className={navLinkClass}>
                Requests
              </NavLink>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          {user && (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost rounded-field gap-2 px-2"
              >
                <span className="hidden md:inline text-sm text-base-content/80">
                  {user.firstName}
                </span>
                <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-primary/40 bg-base-300 flex items-center justify-center shrink-0">
                  {user.photoUrl ? (
                    <img
                      src={user.photoUrl}
                      alt={user.firstName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs font-semibold text-base-content/80">
                      {user.firstName?.[0]?.toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
              <ul
                tabIndex={-1}
                className="menu menu-sm dropdown-content bg-base-200 border border-base-300 rounded-box z-1 mt-3 w-56 p-2 shadow-xl shadow-black/40"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge badge-primary badge-sm">You</span>
                  </Link>
                </li>
                <li className="sm:hidden">
                  <Link to="/connections">Connections</Link>
                </li>
                <li className="sm:hidden">
                  <Link to="/requests">Requests</Link>
                </li>
                <div className="divider my-1" />
                <li>
                  <a onClick={handle_logout} className="text-error">
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Nav
