import API from "./index";

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
export const changePassword = (password) =>
  API.put(`/user/password/change`, { password: password });
export const checkPassword = (password) => {
  return API.get(`/user/password/check/${password}`);
};
