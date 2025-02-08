import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AdminProtection } from "@/components/AdminProtection";

export default function AdminDashboard() {
  return (
    <AdminProtection>
      <div>
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/admin/posts">
            <Button className="w-full">Manage Posts</Button>
          </Link>
          <Link href="/admin/create">
            <Button className="w-full">Create New Post</Button>
          </Link>
        </div>
      </div>
    </AdminProtection>
  );
}
