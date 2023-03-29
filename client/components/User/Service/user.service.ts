import { API_URL } from "@/api/api";
import { Parcel } from "@/types/data.interface";
import { getToken } from "@/utils/auth.util";
import Axios from "axios";

export const addParcel = (
  parcel: {
    parcelName: string;
    senderId: string;
    pickupAddress: string;
    dropoffAddress: string;
  },
  successCb: Function,
  failureCb: Function
) => {
  return Axios({
    method: "POST",
    url: `${API_URL}/parcels`,
    data: parcel,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  })
    .then((res) => {
      successCb(res.data);
    })
    .catch((err) => {
      failureCb(err.response.data);
    });
};

export const getParcels = (
  userId: string,
  successCb: Function,
  failureCb: Function
) => {
  return Axios({
    method: "GET",
    url: `${API_URL}/parcels/${userId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  })
    .then((res) => {
      successCb(res.data);
    })
    .catch((err) => {
      failureCb(err.response.data);
    });
};

export const updateParcel = (
  parcel: Parcel,
  successCb: Function,
  failureCb: Function
) => {
  Axios({
    method: "PUT",
    url: `${API_URL}/parcels`,
    data: parcel,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  })
    .then((res) => {
      successCb(res.data);
    })
    .catch((err) => {
      console.log(err);
      failureCb(err.response.data);
    });
};

export const getPendingParcels = (successCb: Function, failureCb: Function) => {
  Axios({
    method: "GET",
    url: `${API_URL}/parcels/pending`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  })
    .then((res) => {
      successCb(res.data);
    })
    .catch((err) => {
      failureCb(err.response.data);
    });
};
