import React, { useContext } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Template from "../partials/Template";
import { UserContext } from "@/context/user";
import { registerUser } from "./Service/auth.service";
import { useRouter } from "next/router";
import { setToken, setUserLocally } from "@/utils/auth.util";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Alert from "@mui/material/Alert";
import ErrorAlert from "../partials/ErrorAlert";

function Register() {
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [type, setType] = React.useState<string>("sender");
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

    registerUser(
      { username, password, type },
      (data: { token: string; user: any }) => {
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
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Type</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <FormControlLabel value="sender" control={<Radio />} label="Sender" />
          <FormControlLabel value="biker" control={<Radio />} label="Biker" />
        </RadioGroup>
      </FormControl>
      <br />
      <Button
        onClick={(e) => handleSubmit(e)}
        color="primary"
        variant="outlined"
      >
        Register
      </Button>
    </Template>
  );
}

export default Register;
