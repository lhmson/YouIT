export const isLoginUser = (user) => {
  const currentUser = JSON.parse(localStorage.getItem("user"))?.result;
  return user?._id === currentUser?._id;
};

export const isOwner = (user, group) => {
  let result = false;
  group?.listMembers.forEach((member) => {
    if (member?.userId === user?.result?._id) {
      if (member?.role === "Owner") result = true;
    }
  });
  return result;
};
