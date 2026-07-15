// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { BASE_URL } from "../utils/contants";
// import { addFeed } from "../utils/feedSlice";
// import { useEffect } from "react";
// import UserCard from "./UserCard";

// const Feed = () => {
//   const feed = useSelector((store) => store.feed);
//   const dispatch = useDispatch();

//   const getFeed = async () => {
//     try {
//       const res = await axios.get(BASE_URL + "/user/feed", {
//         withCredentials: true,
//       });
//       dispatch(addFeed(res?.data?.data));
//     } catch (err) {
//       console.error(err?.response?.data?.message || err.message); // temporarily log instead of swallowing
//     }
//   };

//   useEffect(() => {
//     getFeed();
//   }, []);

//   if (!feed) return null;

//   if (feed.length <= 0)
//     return <h1 className="flex justify-center my-10">No new users founds!</h1>;

//   return (
//     <div className="flex justify-center my-10">
//       <UserCard user={feed[0]} />
//     </div>
//   );
// };

// export default Feed;




import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/contants";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error(err?.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed)
    return (
      <span className="loading loading-spinner loading-lg text-primary" />
    );

  if (feed.length <= 0)
    return (
      <div className="flex flex-col items-center gap-2 text-center py-16">
        <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-2xl">
          👀
        </div>
        <h1 className="text-lg font-display font-semibold text-base-content">
          You're all caught up
        </h1>
        <p className="text-sm text-base-content/50 max-w-xs">
          No new developers to show right now. Check back soon.
        </p>
      </div>
    );

  return (
    <div className="flex justify-center py-10">
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
