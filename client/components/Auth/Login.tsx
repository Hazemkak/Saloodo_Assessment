import React, { useContext } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Template from "../partials/Template";
import { loginUser } from "./Service/auth.service";
import { UserContext } from "@/context/user";
import { useRouter } from "next/router";
import { setToken, setUserLocally } from "@/utils/auth.util";
import Alert from "@mui/material/Alert";
import { User } from "@/types/data.interface";
import Link from "next/link";
import ErrorAlert from "../partials/ErrorAlert";

function Login() {
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");

  const router = useRouter();

  const { user, setUser } = useContext(UserContext) as unknown as {
    user: any;
    setUser: Function;
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!username || !password) return setError("All fields are required");

    loginUser(
      { username, password },
      (data: { token: string; user: User }) => {
        setUser(data.user);
        setUserLocally(data.user);
        setToken(data.token);
        router.push(`/user`);
      },
      (err: any) => setError(err)
    );
  };
  return (
    <Template>
      <ErrorAlert error={error} setError={setError} />
      <br />
      <TextField
        onChange={handleUsernameChange}
        id="outlined-basic"
        value={username}
        label="Username"
        variant="outlined"
        placeholder="Enter Username"
      />
      <br />
      <TextField
        onChange={handlePasswordChange}
        value={password}
        id="outlined-basic"
        label="Password"
        placeholder="Enter Password"
        variant="outlined"
        type="password"
      />
      <br />

      <Button
        onClick={(e) => handleSubmit(e)}
        color="primary"
        variant="outlined"
      >
        Login
      </Button>
      <br />
      <Link href={"/register"}>Register ?</Link>
    </Template>
  );
}

export default Login;
