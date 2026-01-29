import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";
import Exfeed from "./Exfeed";

const Feed = () => {
  const feed = useSelector((store) => store.feed);

  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) {
      return;
    }
    try {
      const res = await axios.get(
        BASE_URL + "/user/feed",

        {
          withCredentials: true,
        },
      );
      dispatch(addFeed(res.data.data));
    } catch (err) {}
  };

  useEffect(() => {
    getFeed();
  }, []);
  console.log(feed);
  return (
    feed && (
      <>
        <Exfeed feed={feed} />
      </>
    )
  );
};

export default Feed;
