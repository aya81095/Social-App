import { useParams } from "react-router";
import NavBar from "../../componants/NavBar/NavBar";
import PostCard from "../../componants/PostCard/PostCard";
import { useContext, useState } from "react";
import { AuthContext } from "./../../context/Auth.context";
import { useEffect } from "react";
import axios from "axios";
import Loading from "../../componants/Loading/Loading";

export default function getPostDetails() {
  const [postDetails, setPostDetails] = useState(null);
  const { token } = useContext(AuthContext);
  const { id } = useParams();
  async function getPostDetails() {
    try {
      const options = {
        url: `https://linked-posts.routemisr.com/posts/${id}`,
        method: "GET",
        headers: {
          token,
        },
      };
      const { data } = await axios.request(options);
      console.log(data);
      if (data.message === "success") {
        setPostDetails(data.post);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getPostDetails();
  }, []);
  return (
    <>
      <NavBar />
      <section>
        <div className="container max-w-3xl mx-auto px-3">
          {postDetails ? (
            <PostCard postInfo={postDetails} commentsLimit={10} />
          ) : (
            <Loading />
          )}
        </div>
      </section>
    </>
  );
}
