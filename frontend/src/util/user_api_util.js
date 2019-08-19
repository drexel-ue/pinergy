import Axios from "axios";

export const updateUser = (userData, id) => {
  return Axios.patch(`/api/users/update/${id}`, userData);
};

export const fetchUser = id => {
  return Axios.get(`/api/users/${id}`);
};

export const peopleSearch = queryString =>
  Axios.get(`/api/users/search/${queryString}`);
