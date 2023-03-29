import React from "react";
import { getPendingParcels, updateParcel } from "../Service/user.service";
import { Parcel, User } from "@/types/data.interface";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import { UserContext } from "@/context/user";

interface PendingListProps {
  reloadData: Function;
  setError: Function;
}

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

function PendingList(props: PendingListProps) {
  const { reloadData, setError } = props;
  const [parcels, setParcels] = React.useState<Parcel[]>([]);

  const { user, setUser } = React.useContext(UserContext) as unknown as {
    user: User;
    setUser: Function;
  };

  const handleGetPendingParcels = () => {
    getPendingParcels(
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
        handleGetPendingParcels();
        reloadData();
      },
      (errMsg: string) => {
        setError(errMsg);
      }
    );
  };

  React.useEffect(() => {
    const intervalParcels = setInterval(() => {
      handleGetPendingParcels();
    }, 5000);
    return () => clearInterval(intervalParcels);
  }, []);

  return (
    <Grid item xs={12}>
      <Item>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>
                  Parcel Name
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="right">
                  Pickup Address
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="right">
                  Dropoff Address
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="right">
                  Action
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
                    <TableCell align="right">{parcel.pickupAddress}</TableCell>
                    <TableCell align="right">{parcel.dropoffAddress}</TableCell>
                    <TableCell align="right">
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
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Item>
    </Grid>
  );
}

export default PendingList;
