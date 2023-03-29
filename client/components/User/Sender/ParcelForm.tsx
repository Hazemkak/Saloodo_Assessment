import React, { useContext } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { addParcel } from "../Service/user.service";
import { Parcel, User } from "@/types/data.interface";
import { UserContext } from "@/context/user";
import ErrorAlert from "@/components/partials/ErrorAlert";

interface ParcelFormProps {
  reloadData: () => void;
  setError: (errMsg: string) => void;
}

function ParcelForm(props: ParcelFormProps) {
  const { reloadData, setError } = props;
  const [pickupAddress, setPickupAddress] = React.useState<string>("");
  const [dropoffAddress, setDropoffAddress] = React.useState<string>("");
  const [parcel, setParcel] = React.useState<string>("");

  const { user } = useContext(UserContext) as unknown as { user: User };

  const handlePickUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPickupAddress(e.target.value);
  };

  const handleDropOffChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDropoffAddress(e.target.value);
  };

  const handleParcelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParcel(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!parcel || !pickupAddress || !dropoffAddress)
      return setError("All fields are required");
    addParcel(
      {
        parcelName: parcel,
        pickupAddress,
        dropoffAddress,
        senderId: user.id,
      },
      () => {
        setParcel("");
        setPickupAddress("");
        setDropoffAddress("");
        reloadData();
      },
      (errMsg: string) => {
        setError(errMsg);
      }
    );
  };
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Paper
            sx={{
              textAlign: "center",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1rem",
            }}
          >
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                size="small"
                onChange={handleParcelChange}
                value={parcel}
                id="outlined-basic"
                label="Parcel Name"
                placeholder="Enter Parcel Name"
                variant="outlined"
                type="text"
              />
              <TextField
                size="small"
                onChange={handlePickUpChange}
                value={pickupAddress}
                id="outlined-basic"
                label="Pickup Address"
                placeholder="Enter Pickup Address"
                variant="outlined"
                type="text"
              />
              <TextField
                size="small"
                onChange={handleDropOffChange}
                value={dropoffAddress}
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
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default ParcelForm;
