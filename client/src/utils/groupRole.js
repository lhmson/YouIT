export const isJoinedGroup = (group, user) => {
  let isJoined = false;
  group?.listMembers.forEach((member) => {
    if (member?.userId === user?._id) {
      isJoined = true;
    }
  });
  return isJoined;
};
