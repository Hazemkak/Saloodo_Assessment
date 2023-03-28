import axios from "axios";
export const registerUser = (
  user: any,
  cbSuccess: Function,
  cbFailure: Function
) => {
  axios
    .post("http://localhost:4000/auth/register", user)
    .then((res) => {
      console.log(res.data);
      cbSuccess(res.data);
    })
    .catch((err) => {
      console.log(err.message);
      cbFailure(err.message);
    });
};

export const loginUser = (
  user: any,
  cbSuccess: Function,
  cbFailure: Function
) => {
  axios
    .post("http://localhost:4000/auth/login", user)
    .then((res) => {
      console.log(res.data);
      cbSuccess(res.data);
    })
    .catch((err) => {
      console.log(err.message);
      cbFailure(err.message);
    });
};
