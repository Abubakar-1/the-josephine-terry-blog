"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  ArrowUp,
  Send,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AnimatedFooter = () => {
  const [email, setEmail] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribed:", email);
    setEmail("");
  };

  return (
    <footer className="relative bg-gradient-to-b from-blue-50 to-blue-100 pt-20 pb-10 overflow-hidden">
      {/* Animated wave background */}
      <div className="absolute inset-0 z-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="absolute bottom-0"
        >
          <motion.path
            fill="#93C5FD"
            fillOpacity="0.3"
            d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,149.3C672,149,768,203,864,218.7C960,235,1056,213,1152,192C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            animate={{
              d: [
                "M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,149.3C672,149,768,203,864,218.7C960,235,1056,213,1152,192C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                "M0,64L48,85.3C96,107,192,149,288,165.3C384,181,480,171,576,144C672,117,768,75,864,80C960,85,1056,139,1152,160C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              ],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              duration: 20,
              ease: "easeInOut",
            }}
          />
        </svg>
      </div>

      {/* Particle effect */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-200 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo and description */}
          <div className="flex flex-col items-center md:items-start">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <Sparkles className="h-12 w-12 text-primary mb-4" />
            </motion.div>
            <h3 className="text-2xl font-bold mb-2">
              The Josephine Terry Blog
            </h3>
            <p className="text-gray-600 text-center md:text-left">
              Exploring the world of web development and beyond.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "About", "Blog", "Contact"].map((item) => (
                <motion.li
                  key={item}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Newsletter subscription */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
            <form onSubmit={handleSubmit} className="relative">
              <motion.div
                animate={isEmailFocused ? { scale: 1.05 } : { scale: 1 }}
                className="flex"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => setIsEmailFocused(false)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-l-md border-2 border-primary focus:outline-none focus:border-primary"
                />
                <Button type="submit" className="rounded-r-md">
                  <Send className="h-5 w-5" />
                </Button>
              </motion.div>
            </form>
          </div>
        </div>

        {/* Social media links */}
        <div className="flex justify-center space-x-4 mb-8">
          {[Facebook, Twitter, Instagram].map((Icon, index) => (
            <motion.a
              key={index}
              href="#"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="text-primary hover:text-primary-dark transition-colors"
            >
              <Icon className="h-6 w-6" />
            </motion.a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} Josephine Terry Blog. All rights
            reserved.
          </p>
        </div>
      </div>

      {/* Back to top button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 bg-primary text-white p-2 rounded-full shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <ArrowUp className="h-6 w-6" />
      </motion.button>
    </footer>
  );
};

export default AnimatedFooter;
