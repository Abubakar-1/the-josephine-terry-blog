"use client";

import { Toaster } from "sonner";
import Navbar from "@/components/navbar";
import AnimatedFooter from "@/components/footer";
import { usePathname } from "next/navigation";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");
  return (
    <div>
      {!isAdminRoute && <Navbar />}
      {children}
      {!isAdminRoute && <AnimatedFooter />}
      <Toaster />
    </div>
  );
}
