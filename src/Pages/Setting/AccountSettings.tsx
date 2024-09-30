import { AppDispatch, RootState } from "@/app/store";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { updateLoggedUserData } from "@/features/auth/thunks/authThunks";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AccountSettingTap = () => {
  const [name, setname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();
  const { status, error } = useSelector((state: RootState) => state.auth);

  const handleUpdateLoggedUserData = () => {
    dispatch(updateLoggedUserData({ name, email, phone }));
  };
  return (
    <>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            {error && (
              <div className="space-y-1">
                <Alert variant="destructive">
                  <ExclamationTriangleIcon className="h-4 w-4" />
                  <AlertTitle>Account data update error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={handleUpdateLoggedUserData}>
              {status === "loading" ? "Loading..." : "Save"}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </>
  );
};

export default AccountSettingTap;
