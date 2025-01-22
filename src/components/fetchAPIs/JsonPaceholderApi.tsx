import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface Post {
  userId: number;
  id: number;
  body: string;
  title: string;
}
const JsonPaceholderApi = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const result = await fetch(
          "https://jsonplaceholder.typicode.com/posts/1"
        );

        if (!result.ok) throw new Error("Failed to fetch data");
        const postData = await result.json();
        setPost(postData);
      } catch (err) {
        console.error("Error fetching posts", err);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, []);

  if (loading)
    return (
      <p className="text-red-700 text-center">
        <LoadingSpinner /> Loading
      </p>
    );
  if (error) return <p className="text-red-700 text-center">Error : {error}</p>;

  return (
    <div>
      <p className="text-center font-extrabold text-green-500 text-3xl">
        Post Details
      </p>
      {post && (
        <>
          <p>Post User-ID : {post.userId}</p>
          <p>Post ID : {post.id}</p>
          <p>Post Title : {post.title}</p>
          <p>Post body : {post.body}</p>
        </>
      )}
    </div>
  );
};

export default JsonPaceholderApi;
