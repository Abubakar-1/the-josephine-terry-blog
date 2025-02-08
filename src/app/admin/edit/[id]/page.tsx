/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { BlogPostForm } from "@/components/blog-post-form";
import { Button } from "@/components/ui/button"; // Import Button component
import { ErrorBoundary } from "@/components/error-boundary";
import { Skeleton } from "@/components/ui/skeleton";
import { AdminProtection } from "@/components/AdminProtection";

export default function EditPost({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [post, setPost] = useState(null);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, "posts", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...(docSnap.data() as any) });
        } else {
          throw new Error("Post not found");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch post")
        );
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async () => {
    router.push("/admin/posts");
  };

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h2 className="text-red-800 text-lg font-semibold">Error</h2>
          <p className="text-red-600">{error.message}</p>
          <Button onClick={() => router.push("/admin/posts")} className="mt-4">
            Back to Posts
          </Button>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="p-8 space-y-4">
        <Skeleton className="h-8 w-1/4" />
        <Skeleton className="h-[600px] w-full" />
      </div>
    );
  }

  return (
    <AdminProtection>
      <ErrorBoundary>
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
          <BlogPostForm post={post} onSubmit={handleSubmit} />
        </div>
      </ErrorBoundary>
    </AdminProtection>
  );
}
