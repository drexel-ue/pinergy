import Axios from "axios";

export const updateUser = userData => {
  return Axios.patch("/api/users/update", userData);
};
