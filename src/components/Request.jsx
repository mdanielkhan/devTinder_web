import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { BASE_URL } from "../utils/contants"
import { addRequests, removeRequest } from "../utils/requestSlice"
import { useEffect } from "react"

const ReceivedRequests = () => {
    const dispatch = useDispatch()
    const requests = useSelector((store) => store.request)

    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "user/requests/received", {
                withCredentials: true,
            })
            dispatch(addRequests(res?.data?.receivedRequests || []))
        } catch (err) {
            console.error(err?.response?.data?.message || err.message)
        }
    }

    useEffect(() => {
        fetchRequests()
    }, [])

    const reviewRequest = async (status, requestId) => {
        try {
            // UNCONFIRMED endpoint — see note above
            await axios.post(
                BASE_URL + "request/review/" + status + "/" + requestId,
                {},
                { withCredentials: true }
            )
            dispatch(removeRequest(requestId))
        } catch (err) {
            console.error(err?.response?.data?.message || err.message)
        }
    }

    if (!requests) return null

    if (requests.length === 0) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <p className="text-sm text-slate-500">No incoming requests right now.</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center gap-6 px-4 py-12">
            <h1 className="text-xl font-semibold text-slate-100 tracking-tight">
                Incoming requests
            </h1>

            <div className="flex flex-col gap-4 w-full items-center">
                {requests.map((request) => {
                    const { _id, sender } = request

                    return (
                        <div
                            key={_id}
                            className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl shadow-black/40 flex gap-4"
                        >
                            <div className="w-14 h-14 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                                <span className="text-sm font-mono text-cyan-400">
                                    {sender?.firstName?.[0]?.toUpperCase()}
                                </span>
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-semibold text-slate-100 truncate">
                                    {sender?.firstName} {sender?.lastName}
                                </h3>
                                <p className="text-xs text-slate-500 truncate">
                                    {sender?.email}
                                </p>

                                <div className="flex gap-2 mt-4">
                                    <button
                                        className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs rounded-lg py-2 transition"
                                        onClick={() => reviewRequest("accepted", _id)}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-lg py-2 transition border border-slate-700"
                                        onClick={() => reviewRequest("rejected", _id)}
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ReceivedRequests 