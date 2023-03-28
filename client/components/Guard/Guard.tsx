import { UserContext } from "@/context/user";
import React, { useContext } from "react";

function Guard({ children }: { children: React.ReactNode }) {
  const [render, setRender] = React.useState(false);
  const { user } = useContext(UserContext);

  React.useEffect(() => {
    if (user) {
      setRender(true);
    }
  }, [user]);

  if (!render) return <></>;
  return <>{children}</>;
}

export default Guard;
