/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function About() {
  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-b from-white to-blue-50"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Hi, I'm Josephine Terry, a passionate web developer and tech
            enthusiast. With over 5 years of experience in the industry, I've
            worked on a wide range of projects from small startups to large
            enterprises. My blog is where I share my insights, experiences, and
            the latest trends in web development and technology.
          </p>
          <p className="text-lg text-gray-600 mb-8">
            When I'm not coding, you can find me exploring new hiking trails,
            experimenting with new recipes in the kitchen, or curled up with a
            good book. I believe in continuous learning and love to share my
            knowledge with others through my writing and community involvement.
          </p>
          <Button size="lg" className="rounded-full">
            Read More
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
