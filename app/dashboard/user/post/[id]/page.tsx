"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import UsersNavbar from "../../../../components/users/UsersNavbar";
import withAuth from "../../../../hoc/withAuth";

type User = {
  id: number;
  name: string;
  email: string;
  avatar?: string;
};

// types...
type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

const PostDetail = () => {
  const { id } = useParams();
  const [user] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("user") || "null");
    }
    return null;
  });

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      const postRes = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
      const postData = await postRes.json();

      if (user?.email !== "admin@admin.com" && user?.id !== postData.userId) {
        setPost(null);
        setLoading(false);
        return;
      }

      setPost(postData);

      const commentRes = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
      const commentData = await commentRes.json();
      setComments(commentData);

      setLoading(false);
    };

    if (user) fetchPostAndComments();
  }, [id, user]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!post) return <p className="text-center text-red-500 mt-10">You do not have access to this post.</p>;

  return (
    <>
      <UsersNavbar
        user={{
          ...user,
          id: user.id.toString(),
          avatar: user.avatar || "/default-avatar.png",
        }}
      >
       

    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700 mb-6">{post.body}</p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">Comments:</h2>
      <ul className="space-y-4">
        {comments.map((comment) => (
          <li key={comment.id} className="border p-4 rounded shadow-sm">
            <p className="font-medium">{comment.name} ({comment.email})</p>
            <p>{comment.body}</p>
          </li>
        ))}
      </ul>
    </div>
    
    </UsersNavbar>
    </>
  );
}

export default withAuth(PostDetail);
