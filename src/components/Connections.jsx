import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { BASE_URL } from "../utils/contants"
import { addConnections } from "../utils/connectionSlice"
import { useEffect } from "react"

const Connections = () => {
    const dispatch = useDispatch()
    const connections = useSelector((store) => store.connection)

    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "user/connections", {
                withCredentials: true,
            })
            dispatch(addConnections(res.data.data))
        } catch (err) {
            console.error(err?.response?.data?.message || err.message)
        }
    }

    useEffect(() => {
        fetchConnections()
    }, [])

    if (!connections) return null

    if (connections.length === 0) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <p className="text-sm text-slate-500">No connections yet.</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center gap-6 px-4 py-12">
            <h1 className="text-xl font-semibold text-slate-100 tracking-tight">
                Your connections
            </h1>

            <div className="flex flex-col gap-4 w-full items-center">
                {connections.map((connection) => (
                    <div
                        key={connection._id}
                        className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl shadow-black/40 flex gap-4"
                    >
                        <img
                            src={connection.photoUrl || "https://via.placeholder.com/80"}
                            alt={connection.firstName}
                            className="w-16 h-16 rounded-xl object-cover border border-slate-700 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-slate-100 truncate">
                                {connection.firstName} {connection.lastName}
                            </h3>
                            {(connection.age || connection.gender) && (
                                <p className="text-xs text-slate-500 font-mono mt-0.5">
                                    {connection.age}
                                    {connection.age && connection.gender && " · "}
                                    {connection.gender}
                                </p>
                            )}
                            {connection.about && (
                                <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                                    {connection.about}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Connections