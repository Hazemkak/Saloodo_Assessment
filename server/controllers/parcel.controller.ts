import { Response,Request } from "express";
import database from "../db/mockedDatabase";


export const getParcelsByUserId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const parcels = database.findUserById(id);
        res.status(200).json(parcels);
    } catch (error) {
        res.status(500).json(`error while getting parcels ${error}`);
    }
}

export const createParcel = async (req: Request, res: Response) => {
    try {
        const { parcelName, senderId } = req.body;
        const parcel = database.addParcel(senderId, parcelName)
        res.status(200).json(parcel);
    } catch (error) {
        res.status(500).json(`error while creating parcel ${error}`);
    }
}

export const updateParcelBiker = async (req: Request, res: Response) => {
    try {
        const { parcelId, bikerId } = req.body;
        const parcel = database.updateParcelBidkerId(parcelId, bikerId);
        res.status(200).json(parcel);
    } catch (error) {
        res.status(500).json(`error while updating parcel biker ${error}`);
    }
}

export const updateParcelStatus = async (req: Request, res: Response) => {
    try {
        const { parcelId, status } = req.body;
        const parcel = database.updateParcelStatus(parcelId, status);
        res.status(200).json(parcel);
    } catch (error) {
        res.status(500).json(`error while updating parcel status ${error}`);
    }
}

export const parcelController = {
    getParcelsByUserId,
    createParcel,
    updateParcelBiker,
    updateParcelStatus
}