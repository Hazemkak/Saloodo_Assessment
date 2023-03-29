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

export interface User {
  id: string;
  username: string;
  password: string;
  userType: "biker" | "sender";
}
