import { UserContext } from "@/context/user";
import React, { useContext } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Data } from "@/types/data.interface";
import { Button, TextField } from "@mui/material";
import Sender from "./Sender";
import Biker from "./Biker";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function User() {
  const { user } = useContext(UserContext) as unknown as {
    user: Data;
    setUser: Function;
  };

  return (
    <Box sx={{ flexGrow: 1, margin: "15px" }}>
      <Grid container spacing={2}>
        {user.userType === "sender" && <Sender />}
        {user.userType === "biker" && <Biker />}
      </Grid>
    </Box>
  );
}

export default User;
