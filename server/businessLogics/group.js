import mongoose from 'mongoose';

/**
 * 
 * @param {mongoose.Document} group 
 * @param {string | mongoose.Types.ObjectId} userId 
 * @returns {boolean}
 */
export const isMemberOfGroup = (userId, group) => {
  if (group.listMembers.find(member => member.userId.equals(userId)))
    return true;
  else
    return false;
}