import type { ReactNode } from "react";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { AuthProvider } from "@/contexts/AuthContext";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      {" "}
      <div className="flex h-screen bg-gray-100">
        <aside className="w-64 bg-white shadow-md">
          <div className="p-4">
            <Link href="/admin" className="flex items-center space-x-2">
              <Icons.logo className="h-6 w-6" />
              <span className="text-xl font-bold">Admin Panel</span>
            </Link>
          </div>
          <nav className="mt-8">
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
        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      </div>
    </AuthProvider>
  );
}
