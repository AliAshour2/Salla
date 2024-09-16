
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const AccountAvatar = () => {
  return (
    <>
      <Avatar>
        <AvatarImage  src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </>
  );
};

export default AccountAvatar;
