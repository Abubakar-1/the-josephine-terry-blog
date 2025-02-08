"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Icons } from "@/components/icons";

const NAV_MENU = [
  {
    name: "Home",
    icon: Icons.home,
    href: "/",
  },
  {
    name: "About",
    icon: Icons.user,
    href: "/#about",
  },
  {
    name: "Posts",
    icon: Icons.posts,
    href: "/#posts",
  },
];

interface NavItemProps {
  children: React.ReactNode;
  href: string;
  isMobile?: boolean;
}

function NavItem({ children, href, isMobile = false }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li className={cn(isMobile ? "w-full" : "relative")}>
      <Link
        href={href}
        className={cn(
          "flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors",
          isActive
            ? "text-primary"
            : "text-muted-foreground hover:text-primary",
          isMobile && "w-full"
        )}
      >
        {children}
      </Link>
      {!isMobile && isActive && (
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 w-full bg-primary"
          layoutId="navbar-indicator"
        />
      )}
    </li>
  );
}

export function Navbar() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Icons.logo className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            The Josephine Terry
          </span>
        </Link>
        <ul className="hidden items-center space-x-6 lg:flex">
          {NAV_MENU.map(({ name, icon: Icon, href }) => (
            <NavItem key={name} href={href}>
              <Icon className="h-4 w-4" />
              {name}
            </NavItem>
          ))}
        </ul>
        <div className="hidden items-center gap-4 lg:flex">
          <Link href="/admin">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Button>Subscribe</Button>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label="Toggle Menu"
            >
              <Icons.menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4">
              {NAV_MENU.map(({ name, icon: Icon, href }) => (
                <NavItem key={name} href={href} isMobile>
                  <Icon className="h-4 w-4" />
                  {name}
                </NavItem>
              ))}
              <hr className="my-4" />
              <Link href="/admin">
                <Button className="w-full" variant="outline">
                  Sign In
                </Button>
              </Link>
              <Button className="w-full">Subscribe</Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}

export default Navbar;
