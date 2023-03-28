import { Router } from "express";

import { parcelController } from "../controllers/parcel.controller";

const router = Router();

router.post("/create", parcelController.createParcel);
router.put("/update-parcel-biker", parcelController.updateParcelBiker);
router.put("/update-parcel-status", parcelController.updateParcelStatus);
router.get("/parcels/:id", parcelController.getParcelsByUserId);

