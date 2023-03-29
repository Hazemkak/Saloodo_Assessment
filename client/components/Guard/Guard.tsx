import { UserContext } from "@/context/user";
import { User } from "@/types/data.interface";
import { getUser } from "@/utils/auth.util";
import { useRouter } from "next/router";
import React, { useContext } from "react";

function Guard({ children }: { children: React.ReactNode }) {
  const [render, setRender] = React.useState(false);
  const { user, setUser } = useContext(UserContext) as unknown as {
    user: User;
    setUser: Function;
  };
  const router = useRouter();

  React.useEffect(() => {
    const localUser = getUser();
    console.log(user);
    console.log(localUser);
    if (user?.id) {
      setRender(true);
    } else if (localUser?.id) {
      setUser(localUser);
      setRender(true);
    } else {
      router.push("/login");
    }
  }, [user]);

  if (!render) return <></>;
  return <>{children}</>;
}

export default Guard;
