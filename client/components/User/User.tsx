import { UserContext } from "@/context/user";
import React, { useContext } from "react";
import Grid from "@mui/material/Grid";

import { User } from "@/types/data.interface";
import Sender from "./Sender";
import Biker from "./Biker";

function User() {
  const { user } = useContext(UserContext) as unknown as {
    user: User;
    setUser: Function;
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        padding: "15px",
      }}
    >
      <Grid item xs={12}>
        {user.userType === "sender" && <Sender />}
        {user.userType === "biker" && <Biker />}
      </Grid>
    </Grid>
  );
}

export default User;
