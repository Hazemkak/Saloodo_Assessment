import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Parcel, User } from "@/types/data.interface";
import { UserContext } from "@/context/user";
import {
  getParcels,
  getPendingParcels,
  updateParcel,
} from "./Service/user.service";
import { Button } from "@mui/material";
import PendingList from "./Biker/PendingList";
import ErrorAlert from "../partials/ErrorAlert";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  minHeight: "40vh",
}));

function Biker() {
  const [parcels, setParcels] = React.useState<Parcel[]>([]);
  const [error, setError] = React.useState<string>("");

  const { user, setUser } = React.useContext(UserContext) as unknown as {
    user: User;
    setUser: Function;
  };

  const handleGetParcels = () => {
    getParcels(
      user.id,
      (data: { parcels: Parcel[] }) => {
        setParcels(data.parcels ?? []);
      },
      (errMsg: string) => {
        setError(errMsg);
      }
    );
  };

  const handleUpdateParcel = (parcel: Parcel) => {
    updateParcel(
      parcel,
      (data: { parcel: Parcel }) => {
        handleGetParcels();
      },
      (errMsg: string) => {
        setError(errMsg);
      }
    );
  };

  React.useEffect(() => {
    const getParcelsInterval = setInterval(() => {
      handleGetParcels();
    }, 5000);
    return () => clearInterval(getParcelsInterval);
  }, []);

  return (
    <>
      <ErrorAlert error={error} setError={setError} />
      <PendingList reloadData={handleGetParcels} setError={setError} />
      <br />
      <Grid sx={{ minHeight: "100vh" }} item xs={12}>
        <Item>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold" }}>Parcels</TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="right">
                    Pickup Address
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="right">
                    Dropoff Address
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="right">
                    Status
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="right">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {parcels &&
                  parcels?.map((parcel) => (
                    <TableRow
                      key={parcel.parcelId}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {parcel.parcelName}
                      </TableCell>
                      <TableCell align="right">
                        {parcel.pickupAddress}
                      </TableCell>
                      <TableCell align="right">
                        {parcel.dropoffAddress}
                      </TableCell>
                      <TableCell align="right">
                        <div
                          style={{
                            color:
                              parcel.status === "pending"
                                ? "red"
                                : parcel.status === "picked"
                                ? "orange"
                                : "green",
                          }}
                        >
                          {parcel.status}
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        {parcel.status === "pending" ? (
                          <Button
                            onClick={() =>
                              handleUpdateParcel({
                                ...parcel,
                                bikerId: user?.id,
                                status: "picked",
                              })
                            }
                            variant="contained"
                            color="primary"
                          >
                            Pick up
                          </Button>
                        ) : parcel.status === "picked" ? (
                          <Button
                            onClick={() =>
                              handleUpdateParcel({
                                ...parcel,
                                bikerId: user?.id,
                                status: "delivered",
                              })
                            }
                            variant="contained"
                            color="primary"
                          >
                            Drop off
                          </Button>
                        ) : (
                          <div
                            style={{
                              color: "green",
                            }}
                          >
                            Delivered
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Item>
      </Grid>
    </>
  );
}

export default Biker;
