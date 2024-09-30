import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountSettingTap from "./AccountSettings";
import PasswordSetting from "./PasswordSetting";

const SettingPage = () => {
  return (
    <>
      <div className="flex items-center justify-center h-screen p-5">
        <Tabs defaultValue="account" className="w-[600px] h-[600px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <AccountSettingTap />
          <PasswordSetting />
        </Tabs>
      </div>
    </>
  );
};

export default SettingPage;
