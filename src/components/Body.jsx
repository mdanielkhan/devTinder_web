
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/contants";
import { addUser } from "../utils/userSlice";
import Nav from "./Nav";
import Footer from "./Footer";


// const Body=()=> {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const userData = useSelector((store)=>store.user);

//   const fetchUser = async () => {
//     try {
//       const res = await axios.get(BASE_URL + "/profile/view", {
//         withCredentials: true,
//       });
//       dispatch(addUser(res.data));
//     } catch (err) {
//       if(err.status===401)
//       navigate("/login");
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     if(!userData)
//     fetchUser();
//   }, []);

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Nav />

//       <main className="flex-1 flex items-center justify-center px-4">
//         <Outlet />
//       </main>

//       <Footer />
//     </div>
//   );
// }

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", { withCredentials: true });
      dispatch(addUser(res.data));
    } catch (err) {
      console.error(err);
    } finally {
      setCheckingAuth(false);
    }
  };

  useEffect(() => {
    if (!userData) fetchUser();
    else setCheckingAuth(false);
  }, []);

  if (checkingAuth) return null; // or a spinner component

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1 flex items-center justify-center px-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Body;

