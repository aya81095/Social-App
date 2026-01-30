import NavBar from "../../componants/NavBar/NavBar";
import PostCard from "../../componants/PostCard/PostCard";
import { LeftSidebar } from "../../componants/LeftSidebar/LeftSidebar";
import { RightSidebar } from "../../componants/RightSidebar/RightSidebar";
import UploadPost from "../../componants/UploadPost/UploadPost";
import Loading from "../../componants/Loading/Loading";
import usePosts from "../../hooks/usePosts";

export default function Home() {
  const { posts, deletePost, getAllPosts, getUserPosts } = usePosts();

  return (
    <>
      <NavBar />
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 py-6">
          <LeftSidebar />

          <main className="col-span-1 md:col-span-9 lg:col-span-6 max-w-2xl mx-auto space-y-6">
            <UploadPost getAllPosts={getAllPosts} getUserPosts={getUserPosts} />

            {posts ? (
              posts.map((post) => (
                <PostCard
                  key={post._id}
                  postInfo={post}
                  onDelete={deletePost}
                  getAllPosts={getAllPosts}
                  getUserPosts={getUserPosts}
                />
              ))
            ) : (
              <Loading />
            )}
          </main>

          <RightSidebar />
        </div>
      </section>
    </>
  );
}
