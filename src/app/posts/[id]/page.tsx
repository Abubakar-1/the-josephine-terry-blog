"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MessageCircle,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { BlogPost } from "@/app/admin/posts/page";
import Link from "next/link";
import LoadingState from "@/components/loading-state";

export default function BlogPostDetail() {
  const { id } = useParams();
  console.log(id);
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (typeof id === "string") {
        const docRef = doc(db, "posts", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() } as BlogPost);
        }
      }
    };
    fetchPost();
  }, [id]);

  if (!post) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="relative h-[50vh] overflow-hidden">
        <Image
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          layout="fill"
          objectFit="cover"
          className="brightness-50"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center max-w-4xl px-4"
          >
            {post.title}
          </motion.h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Link
            href="/#posts"
            className="inline-flex items-center text-primary hover:underline mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all posts
          </Link>

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage
                  src="/images/jojo/IMG-20250206-WA0043.jpg"
                  alt="Josephine Terry"
                />
                <AvatarFallback>JT</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">Josephine Terry</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="mr-1 h-4 w-4" />
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString()}
                  </time>
                  <Clock className="ml-4 mr-1 h-4 w-4" />
                  <span>{post.min_read || 0} min read</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <MessageCircle className="mr-2 h-4 w-4" />
                Comment
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>

          <article className="prose lg:prose-xl max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>

          <div className="mt-12 border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold mb-4">Comments</h2>
            {/* Add your comments component here */}
            <p className="text-gray-600">Comments are coming soon!</p>
          </div>

          <div className="mt-12 border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold mb-4">Related Posts</h2>
            {/* Add your related posts component here */}
            <p className="text-gray-600">Related posts are coming soon!</p>
          </div>

          <div className="mt-12 border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold mb-4">
              Subscribe to our newsletter
            </h2>
            <p className="text-gray-600 mb-4">
              Stay up to date with our latest blog posts and news.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow rounded-md border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
