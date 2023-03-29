import axios from "axios";
export const registerUser = (
  user: any,
  cbSuccess: Function,
  failureCb: Function
) => {
  axios({
    method: "post",
    url: "http://localhost:4000/auth/register",
    data: user,
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      cbSuccess(res.data);
    })
    .catch((err) => {
      failureCb(err.response.data);
    });
};

export const loginUser = (
  user: any,
  cbSuccess: Function,
  failureCb: Function
) => {
  axios
    .post("http://localhost:4000/auth/login", user)
    .then((res) => {
      console.log(res.data);
      cbSuccess(res.data);
    })
    .catch((err) => {
      console.log(err.message);
      failureCb(err.response.data);
    });
};
