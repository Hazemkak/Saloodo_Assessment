import { Router } from "express";

import { parcelController } from "../controllers/parcel.controller";

const router = Router();

router.post("/", parcelController.createParcel);
router.put("/", parcelController.updateParcel);
router.get("/pending", parcelController.getPendingParcels);
router.get("/:id", parcelController.getParcels);

export default router;
