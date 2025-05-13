
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import withAuth from "../../../hoc/withAuth";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        if (!res.ok) throw new Error("Post not found");
        const data = await res.json();
        setPost(data);
      } catch (err) {
        console.error('Failed to load post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading post...</p>;
  if (!post) return <p className="text-center mt-10">Post not found.</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700">{post.body}</p>
    </div>
  );
}

export default withAuth(PostPage);