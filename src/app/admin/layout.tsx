"use client";
import { useState, type ReactNode } from "react";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { AuthProvider } from "@/contexts/AuthContext";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AuthProvider>
      <div className="flex h-screen bg-gray-100">
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:relative md:translate-x-0 md:w-64`}
        >
          <div className="p-4 flex justify-between items-center md:block">
            <Link href="/admin" className="flex items-center space-x-2">
              <Icons.logo className="h-6 w-6" />
              <span className="text-xl font-bold">Admin Panel</span>
            </Link>
            <button
              className="md:hidden p-2 text-gray-600"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>

          <nav className="mt-4 md:mt-8">
            <Link href="/admin" className="block px-4 py-2 hover:bg-gray-200">
              Dashboard
            </Link>
            <Link
              href="/admin/posts"
              className="block px-4 py-2 hover:bg-gray-200"
            >
              Manage Posts
            </Link>
            <Link
              href="/admin/create"
              className="block px-4 py-2 hover:bg-gray-200"
            >
              Create Post
            </Link>
          </nav>
        </aside>

        <div className="flex-1 flex flex-col">
          <header className="md:hidden bg-white shadow p-4 flex justify-between items-center">
            <button
              className="p-2 text-gray-600"
              onClick={() => setIsOpen(true)}
            >
              ☰
            </button>
            <span className="text-xl font-bold">Admin Panel</span>
          </header>

          <main className="flex-1 p-6 overflow-y-auto">{children}</main>
        </div>
      </div>
    </AuthProvider>
  );
}
