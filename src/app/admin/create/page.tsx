"use client";

import { useRouter } from "next/navigation";
import { BlogPostForm } from "@/components/blog-post-form";

export default function CreatePost() {
  const router = useRouter();

  const handleSubmit = async () => {
    router.push("/admin/posts");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
      <BlogPostForm onSubmit={handleSubmit} />
    </div>
  );
}
