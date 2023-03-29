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
import { Parcel } from "@/types/data.interface";

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

interface ListViewProps {
  parcels: Parcel[];
}

function ListView(props: ListViewProps) {
  const { parcels } = props;
  return (
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
                    <TableCell align="right">{parcel.status}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Item>
    </Grid>
  );
}

export default ListView;
