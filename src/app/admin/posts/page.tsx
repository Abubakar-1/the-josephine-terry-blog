"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { AdminProtection } from "@/components/AdminProtection";

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  tag: string;
  desc: string;
  image: string;
  img: string;
  author: {
    img: string;
    name: string;
  };
  content: string;
  min_read: number;
}

export default function ManagePosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const fetchedPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as BlogPost[];
      setPosts(fetchedPosts);
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await deleteDoc(doc(db, "posts", id));
      setPosts(posts.filter((post) => post.id !== id));
    }
  };

  return (
    <AdminProtection>
      {" "}
      <div>
        <h1 className="text-3xl font-bold mb-6">Manage Posts</h1>
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex items-center justify-between p-4 bg-white rounded shadow"
            >
              <div>
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p className="text-gray-500">{post.date}</p>
              </div>
              <div className="space-x-2">
                <Link href={`/admin/edit/${post.id}`}>
                  <Button variant="outline">Edit</Button>
                </Link>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(post.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminProtection>
  );
}
