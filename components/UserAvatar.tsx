import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@clerk/nextjs";

const UserAvatar = () => {
  const { user } = useUser();
  return (
    <div className="mr-4">
      <Avatar>
        <AvatarImage src={user?.profileImageUrl} />
        <AvatarFallback>
          {user?.firstName?.charAt(0)}
          {user?.lastName?.charAt(0)}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

export default UserAvatar;
