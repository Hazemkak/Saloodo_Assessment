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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  minHeight: "40vh",
}));

function Sender() {
  const [pickUp, setPickUp] = React.useState<string>("");
  const [dropOff, setDropOff] = React.useState<string>("");
  const [parcel, setParcel] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");

  const { user, setUser } = useContext(UserContext) as unknown as {
    user: Data;
    setUser: Function;
  };

  const handlePickUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPickUp(e.target.value);
  };

  const handleDropOffChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDropOff(e.target.value);
  };

  const handleParcelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParcel(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <Grid sx={{ minHeight: "100vh" }} item xs={8}>
        <Item>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold" }}>
                    {user.username} Parcels
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="right">
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user?.parcels?.map((parcel) => (
                  <TableRow
                    key={parcel.parcelId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {parcel.parcelName}
                    </TableCell>
                    <TableCell align="right">{parcel.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Item>
      </Grid>
      <Grid sx={{ minHeight: "100vh" }} item xs={4}>
        <Item>
          <TextField
            onChange={handleParcelChange}
            value={parcel}
            id="outlined-basic"
            label="Parcel Name"
            placeholder="Enter Parcel Name"
            variant="outlined"
            type="text"
          />
          <TextField
            onChange={handlePickUpChange}
            value={pickUp}
            id="outlined-basic"
            label="Pickup Address"
            placeholder="Enter Pickup Address"
            variant="outlined"
            type="text"
          />
          <TextField
            onChange={handleDropOffChange}
            value={dropOff}
            id="outlined-basic"
            label="Drop-off Address"
            placeholder="Enter Drop-off Address"
            variant="outlined"
            type="text"
          />
          <Button
            onClick={(e) => handleSubmit(e)}
            color="primary"
            variant="outlined"
          >
            create Parcel
          </Button>
        </Item>
      </Grid>
    </>
  );
}

export default Sender;
