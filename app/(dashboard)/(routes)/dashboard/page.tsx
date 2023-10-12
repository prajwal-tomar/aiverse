"use client";

import {
  ArrowRight,
  Code,
  ImageIcon,
  MessageSquare,
  Music,
  VideoIcon,
} from "lucide-react";

import { Card } from "@/components/ui/card";

import { useRouter } from "next/navigation";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    iconColor: "text-blue-800",
    bgColor: "bg-blue-300",
    href: "/conversation",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    iconColor: "text-green-800",
    bgColor: "bg-green-300",
    href: "/image",
  },
  {
    label: "Music Generation",
    icon: Music,
    iconColor: "text-orange-800",
    bgColor: "bg-orange-300",
    href: "/music",
  },
  {
    label: "Code Generation",
    icon: Code,
    iconColor: "text-indigo-800",
    bgColor: "bg-indigo-300",
    href: "/code",
  },
];

const page = () => {
  const router = useRouter();
  return (
    <div>
      <div className="space-y-2">
        <h2 className="text-4xl font-bold text-center">
          Unlock the Future with Aiverse
        </h2>
        <p className="text-slate-400 text-sm text-center">
          Welcome to Aiverse, where the limitless potential of artificial
          intelligence meets your creative vision.
        </p>
      </div>
      <div className="space-y-6 mt-10 px-28 flex flex-col ">
        {tools.map((tool) => (
          <Card
            key={tool.href}
            className="p-4 border-black/5 hover:shadow-lg"
            onClick={() => router.push(tool.href)}
          >
            <div className="flex justify-between items-center px-5">
              <div className="flex items-center space-x-4">
                <div className={`rounded-lg p-2 ${tool.bgColor}`}>
                  <tool.icon className={`${tool.iconColor}`} />
                </div>

                <div className="hover:cursor-pointer font-semibold">{tool.label}</div>
              </div>
              <ArrowRight />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default page;
