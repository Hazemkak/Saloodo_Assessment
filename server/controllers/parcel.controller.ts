import { Response, Request } from "express";
import parcelsDatabase, { Parcel } from "../db/Parcels.db";
import usersDatabase from "../db/Users.db";

export const getParcels = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = usersDatabase.findUserById(id);
    if (user?.userType === "biker") {
      const parcels = parcelsDatabase.findParcelByBikerId(id) ?? [];
      return res.status(200).json({ parcels: parcels });
    }
    if (user?.userType === "sender") {
      const parcels = parcelsDatabase.findParcelBySenderId(id) ?? [];
      return res.status(200).json({ parcels: parcels });
    }

    res.status(400).json({ message: "bad request" });
  } catch (error) {
    res.status(500).json(`error while getting parcels ${error}`);
  }
};

export const createParcel = async (req: Request, res: Response) => {
  try {
    const { parcelName, senderId, pickupAddress, dropoffAddress } = req.body;
    const parcel = parcelsDatabase.addParcel(
      senderId,
      parcelName,
      pickupAddress,
      dropoffAddress
    );
    res.status(200).json({ parcel: parcel });
  } catch (error) {
    res.status(500).json(`error while creating parcel ${error}`);
  }
};

export const updateParcel = async (req: Request, res: Response) => {
  try {
    const parcel: Parcel = req.body;
    const currParcel = parcelsDatabase.findParcelById(parcel.parcelId);

    if (!currParcel)
      return res.status(400).json(`No parcel with this id found`);

    if (currParcel.bikerId && currParcel.bikerId !== parcel.bikerId)
      return res
        .status(403)
        .json(`Parcel is already assigned to another biker`);

    if (!currParcel.bikerId) parcel.pickupDate = new Date().toUTCString();
    if (currParcel.status === "picked" && parcel.status === "delivered")
      parcel.dropoffDate = new Date().toUTCString();

    const updatedParcel = parcelsDatabase.updateParcel(parcel.parcelId, parcel);
    res.status(200).json({ parcel: updatedParcel });
  } catch (error) {
    res.status(500).json(`error while updating parcel biker ${error}`);
  }
};

export const getPendingParcels = async (req: Request, res: Response) => {
  try {
    const parcels = parcelsDatabase.findPendingParcels();
    res.status(200).json({ parcels: parcels });
  } catch (error) {
    res.status(500).json(`error while getting pending parcels ${error}`);
  }
};

export const parcelController = {
  getParcels,
  createParcel,
  updateParcel,
  getPendingParcels,
};
