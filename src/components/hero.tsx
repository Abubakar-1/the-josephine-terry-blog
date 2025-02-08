"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

function Hero() {
  return (
    <header className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/jojo/jojo.jpg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          objectPosition="center center"
          quality={100}
          priority
          className="xl:object-[center_20%] 2xl:object-[center_10%]"
        />
        {/* Creative Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/50 to-transparent"></div>
      </div>

      {/* Animated Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-blue-300 opacity-20 blur-3xl"
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
          className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-pink-300 opacity-20 blur-3xl"
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

      <div className="container relative mx-auto flex min-h-screen flex-col justify-center px-6 py-12">
        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl xl:text-7xl">
            <span className="inline-block bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent">
              The Josephine Terry
            </span>{" "}
            Blog
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-gray-700 lg:text-xl xl:text-2xl">
            Experience my personal and professional touch all here
          </p>
          <div className="mt-8 flex items-center gap-4">
            <Button
              size="lg"
              className="rounded-full bg-gradient-to-r from-blue-600 to-pink-600 px-6 py-3 text-white transition-all hover:from-blue-700 hover:to-pink-700 xl:text-lg"
            >
              Latest Posts
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-gray-900 px-6 py-3 text-gray-900 transition-all hover:bg-gray-100 xl:text-lg"
            >
              About Me
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Creative floating elements */}
      <motion.div
        className="absolute right-10 bottom-20 h-16 w-16 rounded-full bg-blue-500 opacity-20 xl:h-24 xl:w-24"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 360],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute left-1/4 top-1/4 h-8 w-8 rounded-sm bg-pink-500 opacity-20 xl:h-12 xl:w-12"
        animate={{
          x: [0, 20, 0],
          rotate: [0, -180],
        }}
        transition={{
          duration: 7,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute right-1/3 top-1/3 h-12 w-12 rounded-md bg-yellow-500 opacity-20 xl:h-16 xl:w-16"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
    </header>
  );
}

export default Hero;
