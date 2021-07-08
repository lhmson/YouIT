import API from "./index";

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
export const changePassword = (password) =>
  API.put(`/user/password/change`, { password: password });
export const checkPassword = (password) => {
  return API.get(`/user/password/check/${password}`);
};
export const verifyToken = (token) => API.put(`/user/verify/${token}`);
export const resendVerificationMail = (email) =>
  API.post(`/user/resend`, { email: email });
export const signOut = (browserId) => API.post("/user/signout", { browserId });

export const checkAdminSystem = () => API.get("/user/checkAdminSystem");

// export const signinWithGithub = () => API.get("/user/login/github");
