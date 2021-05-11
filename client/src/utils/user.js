export const isLoginUser = (user) => {
  const currentUser = JSON.parse(localStorage.getItem("user"))?.result;
  return user?._id === currentUser?._id;
};
