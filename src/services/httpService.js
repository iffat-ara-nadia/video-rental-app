import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    console.log("Logging the error", error);
    toast.error("An unexpected error occured");
  }

  return Promise.reject(error);
});

//To avoid Bi-directional dependencies with auth module, declare a function
function setJwt(jwt) {
  //Configuring default headers
  //whenever axios tries to send a http request, make sure to include this header in the req.

  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};
