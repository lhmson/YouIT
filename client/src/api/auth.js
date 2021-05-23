import API from "./index";

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
export const signOut = () => API.post("/user/signout");
