import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const BotAvatar = () => {
  return (
    <div className="mr-4">
      <Avatar>
        <AvatarImage className="p-1" src="/logo.png" />
        <AvatarFallback>
          AV
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

export default BotAvatar;
