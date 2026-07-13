import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./userSlice"
import Feedreducer from "../utils/feedSlice";
import ConnnectionReducer from "./connectionSlice"
import requestReducer from "./requestSlice"
const appStore = configureStore({
    reducer:{
        user:UserReducer,
        feed:Feedreducer,
        connection:ConnnectionReducer,
        request: requestReducer
    },
})

export default appStore