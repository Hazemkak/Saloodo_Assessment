import { UserContext } from "@/context/user";
import React, { useContext } from "react";

import { Parcel, User } from "@/types/data.interface";
import ParcelForm from "./Sender/ParcelForm";
import { getParcels } from "./Service/user.service";
import ListView from "./Sender/ListView";
import ErrorAlert from "../partials/ErrorAlert";

function Sender() {
  const [parcels, setParcels] = React.useState<Parcel[]>([]);
  const [error, setError] = React.useState<string>("");

  const { user, setUser } = useContext(UserContext) as unknown as {
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

  React.useEffect(() => {
    const senderGetParcels = setInterval(() => {
      handleGetParcels();
    }, 5000);

    return () => clearInterval(senderGetParcels);
  }, []);

  return (
    <>
      <ErrorAlert error={error} setError={setError} />
      <ParcelForm reloadData={handleGetParcels} setError={setError} />
      <br />
      <ListView parcels={parcels} />
    </>
  );
}

export default Sender;
