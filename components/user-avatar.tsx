import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarImage } from "./ui/avatar";

export const UserAvatar = () => {
    const {user} = useUser()
    return (
        <div className="h-8 w-8">
            <Avatar>
                <AvatarImage src={user?.imageUrl} className="" />
            </Avatar>
        </div>
    );
}
