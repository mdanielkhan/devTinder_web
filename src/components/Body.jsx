// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, Outlet } from "react-router-dom";
// import axios from "axios";
// import { useEffect } from "react";
// import { BASE_URL } from "../utils/contants";
// import { addUser } from "../utils/userSlice";
// import Nav from "./Nav";
// import Footer from "./Footer";

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

//       <main className="flex-1 flex items-center justify-center">
//         <Outlet />
//       </main>

//       <Footer />
//     </div>
//   );
// }

// export default Body;
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/contants";
import { addUser } from "../utils/userSlice";
import Nav from "./Nav";
import Footer from "./Footer";

const Body=()=> {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store)=>store.user);

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if(err.status===401)
      navigate("/login");
      console.error(err);
    }
  };

  useEffect(() => {
    if(!userData)
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />

      <main className="flex-1 flex items-center justify-center px-4">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Body;

