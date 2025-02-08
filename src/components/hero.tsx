"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

function Hero() {
  return (
    <header className="relative min-h-screen overflow-hidden bg-gradient-to-b from-blue-50 via-pink-50 to-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-4 top-20 h-64 w-64 rounded-full bg-blue-200 opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute right-0 top-40 h-72 w-72 rounded-full bg-pink-200 opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="container relative mx-auto grid min-h-screen grid-cols-1 items-center gap-8 px-6 py-12 lg:grid-cols-2 lg:gap-12">
        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left"
        >
          <h1 className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-4xl font-bold leading-tight tracking-tight text-transparent sm:text-5xl lg:text-6xl">
            The Josephine Terry Blog
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-gray-600 lg:text-xl">
            Experience my personal and professional touch all here
          </p>
          <div className="mt-8 flex items-center gap-4">
            <Button
              size="lg"
              className="rounded-full bg-primary px-6 py-3 text-white transition-all hover:bg-primary/90"
            >
              Latest Posts
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-primary px-6 py-3 text-primary transition-all hover:bg-primary/10"
            >
              About Me
            </Button>
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto lg:ml-auto"
        >
          <div className="relative h-[400px] w-[400px]">
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-300 to-pink-300 opacity-30 blur-3xl"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
            <div className="absolute inset-4 rounded-full bg-white" />
            <Image
              src="/images/jojo/IMG-20250206-WA0043.jpg"
              alt="Profile"
              width={400}
              height={400}
              className="relative rounded-full w-[375px] h-[375px] object-cover shadow-lg"
              priority
            />
          </div>

          {/* Decorative elements */}
          <motion.div
            className="absolute -right-6 -top-6 h-24 w-24 rounded-xl bg-blue-100 blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 45, 0],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute -bottom-6 -left-6 h-24 w-24 rounded-xl bg-pink-100 blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, -45, 0],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        </motion.div>
      </div>
    </header>
  );
}

export default Hero;
