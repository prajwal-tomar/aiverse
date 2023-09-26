"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { Montserrat } from "next/font/google";
const poppins = Montserrat({ weight: "600", subsets: ["latin"] });

import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Music,
  Settings,
  VideoIcon,
} from "lucide-react";

const routes = [
  {
    href: "/dashboard",
    title: "Dashboard",
    icon: LayoutDashboard,
    color: "text-blue-400",
  },
  {
    href: "/conversation",
    title: "Conversation",
    icon: MessageSquare,
    color: "text-green-400",
  },
  {
    href: "/image",
    title: "Image Generation",
    icon: ImageIcon,
    color: "text-indigo-400",
  },
  // {
  //   href: "/video",
  //   title: "Video Generation",
  //   icon: VideoIcon,
  //   color: "text-orange-400",
  // },
  {
    href: "/music",
    title: "Music Generation",
    icon: Music,
    color: "text-red-400",
  },
  {
    href: "/code",
    title: "Code Generation",
    icon: Code,
    color: "text-blue-800",
  },
  {
    href: "/settings",
    title: "Settings",
    icon: Settings,
    color: "text-white",
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col space-y-4 text-white h-full pt-3 bg-slate-900">
      <Link href="/">
        <div className="py-5 px-3 ml-3 h-16 w-16 flex items-center">
          <Image src="/logo.png" alt="Logo" width={500} height={500} />
          <h1 className={`pl-3 text-2xl font-bold ${poppins.className}`}>
            aiverse
          </h1>
        </div>
      </Link>
      {routes.map((route) => (
        <Link
          href={route.href}
          key={route.href}
          className={`hover:bg-gray-600 rounded-md p-3 text-sm transition mx-4 ${
            pathname === route.href ? "bg-gray-600 text-white" : "text-zinc-400"
          }`}
        >
          <div className="flex items-center space-y-5">
            <route.icon className={`h-6 w-6 mx-3 ${route.color}`} />{" "}
            {route.title}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
