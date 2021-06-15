import mongoose from "mongoose";

/**
 *
 * @param {mongoose.Document} group
 * @param {string | mongoose.Types.ObjectId} userId
 * @returns {boolean}
 */
export const isMemberOfGroup = (userId, group) => {
  if (group.listMembers.find((member) => member.userId.equals(userId)))
    return true;
  else return false;
};

export const isPendingMemberOfGroup = (userId, group) => {
  if (group?.listPendingMembers.find((member) => member.userId.equals(userId)))
    return true;
  else return false;
};

/** @type {[GroupRoleType]} */
const GROUP_ROLES = ["Member", "Moderator", "Admin", "Owner"]

/**
 * check if a role has more or the same permissions as a minimal role  
 * if someone put sth weird here, its index would be -1 in GROUP_ROLES. Which would yield a nice result.  
 * long name? idk, idc.  
 * @param {GroupRoleType} role 
 * @param {GroupRoleType} minimalRole 
 * @returns {Boolean}
 */
export const checkRoleHasPermissionOfRole = (role, minimalRole) =>
  GROUP_ROLES.indexOf(role) >= GROUP_ROLES.indexOf(minimalRole)


/**
 * @param {string | mongoose.Types.ObjectId} userId 
 * @param {mongoose.Document} group 
 * @returns {GroupRoleType}
 */
export const getMemberRoleInGroup = (userId, group) => {
  if (!group)
    return null;

  return group?.listMembers?.find?.((member) => member?.userId?.equals?.(userId))?.role
}

/** @typedef {"Member"|"Moderator"|"Admin"|"Owner"} GroupRoleType */