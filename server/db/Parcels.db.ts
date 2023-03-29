import { v4 as uuidv4 } from "uuid";

export interface Parcel {
  senderId: string;
  parcelName: string;
  parcelId: string;
  bikerId: string | undefined;
  status: "pending" | "picked" | "delivered";
  pickupAddress: string;
  dropoffAddress: string;
  pickupDate: string;
  dropoffDate: string;
}

class ParcelsDatabase {
  private parcels: Map<string, Parcel> = new Map();

  public addParcel(
    senderId: string,
    parcelName: string,
    pickupAddress: string,
    dropoffAddress: string
  ) {
    const parcel: Parcel = {
      parcelId: uuidv4(),
      senderId,
      parcelName,
      bikerId: undefined,
      status: "pending",
      pickupAddress,
      dropoffAddress,
      pickupDate: "",
      dropoffDate: "",
    };
    this.parcels.set(parcel.parcelId, parcel);
  }

  public findParcelById(parcelId: string) {
    return this.parcels.get(parcelId);
  }

  public findParcelBySenderId(senderId: string) {
    return Array.from(this.parcels.values()).filter(
      (parcel) => parcel.senderId === senderId
    );
  }

  public findParcelByBikerId(bikerId: string) {
    return Array.from(this.parcels.values()).filter(
      (parcel) => parcel.bikerId === bikerId
    );
  }

  public findParcelByStatus(status: "pending" | "picked" | "delivered") {
    return Array.from(this.parcels.values()).filter(
      (parcel) => parcel.status === status
    );
  }

  public updateParcel(parcelId: string, parcel: Parcel) {
    this.parcels.set(parcelId, parcel);
  }

  public findPendingParcels() {
    return Array.from(this.parcels.values()).filter(
      (parcel) => parcel.status === "pending"
    );
  }
}

const parcelsDatabase = new ParcelsDatabase();

export default parcelsDatabase;
