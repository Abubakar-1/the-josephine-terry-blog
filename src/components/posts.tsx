/* eslint-disable react/no-unescaped-entities */
"use client";
import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlogPostCard from "@/components/blog-post-card";
import { BlogPost } from "@/app/admin/posts/page";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export function Posts() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [sparklesVisible, setSparklesVisible] = useState(false);

  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const fetchedPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as BlogPost[];
      setPosts(fetchedPosts);
      console.log(posts);
    };
    fetchPosts();
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setSparklesVisible(true), 1000);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);
  console.log(posts);
  return (
    <motion.section
      id="posts"
      ref={ref}
      className="relative min-h-screen overflow-hidden py-20 bg-gradient-to-b from-blue-50 to-white"
      style={{ opacity, scale }}
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1,
              ease: "easeInOut",
            }}
            className="absolute inset-0 z-0"
          >
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-200 to-pink-200 opacity-20"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-blue-300 opacity-20 blur-3xl"
              animate={{
                scale: [1, 1.5, 1],
                x: [0, 100, 0],
                y: [0, 50, 0],
              }}
              transition={{
                duration: 15,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-pink-300 opacity-20 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, -50, 0],
                y: [0, 100, 0],
              }}
              transition={{
                duration: 18,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-semibold text-primary mb-2">
            Latest Blog Posts
          </h2>
          <h1 className="text-5xl font-bold mb-4 relative inline-block bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            <span className="relative z-10">Trends News</span>
            <AnimatePresence>
              {sparklesVisible && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Sparkles className="text-blue-400 w-full h-full" />
                </motion.div>
              )}
            </AnimatePresence>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Check out what's new in the web development and tech world! Don't
            forget to subscribe to our blog, and we'll notify you with the
            latest news.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index + 1 }}
            >
              <BlogPostCard {...post} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex justify-center mt-16"
        >
          <Button
            variant="outline"
            size="lg"
            className="group bg-white text-primary hover:bg-primary/10"
          >
            View More
            <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Posts;
