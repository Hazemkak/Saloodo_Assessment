export interface Parcel {
  senderId: string;
  parcelName: string;
  parcelId: string;
  bikerId: string | undefined;
  status: "pending" | "picked" | "delivered";
}

export interface Data {
  id: string;
  username: string;
  password: string;
  userType: "biker" | "sender";
  parcels: Parcel[];
}
