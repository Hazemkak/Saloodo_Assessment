import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { User } from "@/types/data.interface";
import { UserContext } from "@/context/user";

export default function Navbar() {
  const router = useRouter();
  const { user, setUser } = React.useContext(UserContext) as unknown as {
    user: User;
    setUser: Function;
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Saloodo
          </Typography>
          {!user?.id ? (
            <>
              <Button
                onClick={() => {
                  router.push("/login");
                }}
                color="primary"
                variant="contained"
              >
                Login
              </Button>
              <Button
                style={{
                  marginLeft: "20px",
                }}
                onClick={() => {
                  router.push("/register");
                }}
                color="inherit"
                variant="outlined"
              >
                Register
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  setUser({});
                  router.push("/login");
                }}
                color="inherit"
                variant="outlined"
              >
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
