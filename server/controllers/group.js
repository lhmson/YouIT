import express from "express";
import Group from "../models/group.js";
import User from "../models/user.js";
import {
  checkRoleHasPermissionOfRole,
  getMemberRoleInGroup,
  isMemberOfGroup,
  isPendingMemberOfGroup,
} from "../businessLogics/group.js";
import { httpStatusCodes } from "../utils/httpStatusCode.js";
import { sendNotificationUser } from "../businessLogics/notification.js";
import moment from "moment";
import Post from "../models/post.js";

/**
 * @param {express.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>} req
 * @param {express.Response<any, Record<string, any>, number>} res
 * @param {express.NextFunction} next
 */
export const getAGroup = async (req, res, next) => {
  const { groupId } = req.params;

  if (!groupId.match(/^[0-9a-fA-F]{24}$/)) {
    return res
      .status(httpStatusCodes.notFound)
      .json(`Cannot find a group with id: ${groupId}`);
  }

  try {
    const { userId } = req;
    if (!userId)
      res
        .status(httpStatusCodes.unauthorized)
        .json(".... // cho nay k login k vao dc");

    Group.findById(groupId)
      .then((group) => {
        if (group) return res.status(httpStatusCodes.ok).json(group);
        else
          return res
            .status(httpStatusCodes.notFound)
            .json(`Cannot find a group with id: ${groupId}`);
      })
      .catch((err) => {
        return res
          .status(httpStatusCodes.internalServerError)
          .json({ message: err.message });
      });
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

/**
 * @param {express.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>} req
 * @param {express.Response<any, Record<string, any>, number>} res
 * @param {express.NextFunction} next
 */
export const getJoinedGroups = async (req, res) => {
  const { userId } = req;

  if (!userId)
    return res
      .status(httpStatusCodes.unauthorized)
      .json({ message: "You must sign in to fetch list of your group" });

  try {
    const groups = await (await Group.find())
      .map((g) => g.toObject())
      .filter((g) => isMemberOfGroup(userId, g));
    return res.status(httpStatusCodes.accepted).json(groups);
  } catch (error) {
    return res.status(httpStatusCodes.internalServerError).json({ error });
  }
};

export const getPendingGroups = async (req, res) => {
  const { userId } = req;

  if (!userId)
    return res.status(httpStatusCodes.unauthorized).json({
      message: "You must sign in to fetch list of your pending group",
    });

  try {
    const groups = await (await Group.find())
      .map((g) => g.toObject())
      .filter((g) => isPendingMemberOfGroup(userId, g));
    return res.status(httpStatusCodes.accepted).json(groups);
  } catch (error) {
    return res.status(httpStatusCodes.internalServerError).json({ error });
  }
};

export const createGroup = async (req, res) => {
  const group = req.body;

  if (group._id) {
    return res.status(400).json("New group mustn't have _id field");
  }

  const newGroup = new Group({
    ...group,
    //userId: req.userId,
  });

  try {
    // await newGroup.save();
    const groupOwner = { role: "Owner", userId: req.userId };
    // newGroup.listMembers.push(groupOwner);
    newGroup.listMembers = [groupOwner, ...newGroup?.listMembers];
    await newGroup.save();

    const groupOwnerData = await User.findById(req.userId);
    newGroup.listMembers.forEach((member) => {
      if (!member.userId.equals(req.userId))
        sendNotificationUser({
          userId: member.userId,
          kind: "NewGroup_InitialMembers",
          content: {
            description: `You have been added to a new group "${newGroup?.name}" by ${groupOwnerData?.name}.`,
          },
          link: `/group/${newGroup._id}/main`,
        });
    });

    res.status(httpStatusCodes.created).json(newGroup);
  } catch (error) {
    res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

/**
 * @param {express.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>} req
 * @param {express.Response<any, Record<string, any>, number>} res
 * @param {express.NextFunction} next
 */
export const addGroupMember = async (req, res) => {
  const { groupId, memberId } = req.params;

  //const { role } = req.query ?? "Member";
  const role = "Member";
  const addMember = { role, userId: memberId };
  try {
    const group = await Group.findById(groupId);
    if (isMemberOfGroup(memberId, group))
      return res
        .status(httpStatusCodes.badContent)
        .json({ message: "User is a member of the group" });

    group.listMembers.push(addMember);

    // const newPendingMembers = group.listPendingMembers.filter(
    //   (member) => member?.userId != memberId
    // );
    // group.listPendingMembers = newPendingMembers;

    await group.save();

    sendNotificationUser({
      userId: memberId,
      kind: "NewMember_NewMember",
      content: {
        description: `Your request to join group "${group?.name}" has been approved!`,
      },
      link: `/group/${group._id}/main`,
    });

    return res.status(httpStatusCodes.ok).json(group);
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

/**
 * @param {express.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>} req
 * @param {express.Response<any, Record<string, any>, number>} res
 * @param {express.NextFunction} next
 */
export const inviteFriends = async (req, res) => {
  const { groupId } = req.params;
  const { userId } = req;

  /** @type {[]} */
  const { listUsersToInvite } = req.body;

  try {
    const user = await User.findById(userId);
    const group = await Group.findById(groupId);

    if (!group)
      return res.status(httpStatusCodes.notFound).send("Group not found");

    if (listUsersToInvite) {
      listUsersToInvite.forEach((invitedId) => {
        sendNotificationUser({
          userId: invitedId,
          kind: "InviteToGroup_InvitedUser",
          content: {
            description: `${user?.name} invited you to their group "${group?.name}".`,
          },
          link: `/group/${groupId}/main`,
        });
      });
    }

    return res.status(httpStatusCodes.ok).send("Invitation was sent.");
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

export const addGroupPendingMember = async (req, res) => {
  const { groupId, memberId } = req.params;
  const pendingMember = { userId: memberId };

  try {
    const newMember = await User.findById(memberId);
    if (!newMember)
      return res.status(httpStatusCodes.notFound).json("User not exists");

    const group = await Group.findById(groupId);
    if (!group) {
      return res
        .status(httpStatusCodes.notFound)
        .json({ message: "Group not exists" });
    }

    const { listPendingMembers } = group;

    const mapPendingMembers = listPendingMembers?.filter((member) =>
      member.userId.equals(memberId)
    );

    if (isMemberOfGroup(memberId, group))
      return res
        .status(httpStatusCodes.badContent)
        .json({ message: "Member existed" });

    if (mapPendingMembers.length !== 0)
      return res
        .status(httpStatusCodes.badContent)
        .json({ message: "Member existed" });

    group.listPendingMembers.push(pendingMember);
    await group.save();

    // send noti to group admins
    group?.listMembers?.forEach((member) => {
      if (checkRoleHasPermissionOfRole(member?.role, "Admin"))
        sendNotificationUser({
          userId: member.userId,
          kind: "NewPendingMember_GroupAdmins",
          content: {
            description: `User ${newMember?.name} wants to join your group "${group?.name}". Click here to review member requests.`,
          },
          link: `/group/${group._id}/member_requests`,
        });
    });

    return res.status(httpStatusCodes.ok).json(group);
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

/**
 * @param {express.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>} req
 * @param {express.Response<any, Record<string, any>, number>} res
 * @param {express.NextFunction} next
 */
export const removeGroupPendingMember = async (req, res) => {
  const { groupId, memberId } = req.params;

  try {
    const group = await Group.findById(groupId);

    if (!group) {
      return res
        .status(httpStatusCodes.notFound)
        .json({ message: "Group not exists" });
    }

    const newPendingMembers = group.listPendingMembers.filter(
      (member) => member?.userId != memberId
    );
    group.listPendingMembers = newPendingMembers;

    await group.save();
    res.status(httpStatusCodes.ok).json(group);
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

export const getListMembers = async (req, res) => {
  const { groupId } = req.params;
  try {
    const group = await Group.findById(groupId).populate({
      path: "listMembers",
      populate: {
        path: "userId",
        select: "name avatarUrl",
        model: "User",
      },
    });

    const listUsers = group.listMembers;
    // const listMembers = [];

    // for (let i = 0; i < listUsers.length; i++)
    //   listMembers.push(await User.findById(listUsers[i].userID));

    res.status(httpStatusCodes.ok).json(listUsers); // groupMemberSchema
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error.message);
  }
};

export const getListPendingMembers = async (req, res) => {
  const { groupId } = req.params;
  try {
    const group = await Group.findById(groupId).populate({
      path: "listPendingMembers",
      populate: {
        path: "userId",
        select: "name avatarUrl",
        model: "User",
      },
    });

    const listUsers = group.listPendingMembers;
    // const listMembers = [];

    // for (let i = 0; i < listUsers.length; i++)
    //   listMembers.push(await User.findById(listUsers[i].userID));

    res.status(httpStatusCodes.ok).json(listUsers); // groupMemberSchema
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error.message);
  }
};

export const deleteGroup = async (req, res) => {
  const { id } = req.params;

  try {
    // auth
    if (!req.userId) {
      return res.json({ message: "Unauthenticated" });
    }

    if (!(await Group.findById(id))) {
      return res
        .status(httpStatusCodes.notFound)
        .send(`No group with id: ${id}`);
    }

    await Group.findByIdAndRemove(id);
    res
      .status(httpStatusCodes.ok)
      .json({ message: "Group deleted successfully." });
  } catch (error) {
    res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

export const deleteMember = async (req, res) => {
  const { groupId, deletedUserId } = req.params;

  try {
    const group = await Group.findById(groupId);
    if (!isMemberOfGroup(deletedUserId, group))
      return res
        .status(httpStatusCodes.badContent)
        .json({ message: "User is not a member of the group" });

    group.listMembers = group.listMembers.filter(
      (member) =>
        !member.userId.equals(deletedUserId) || member.role === "Owner"
    );

    // const newGroup = await Group.findByIdAndUpdate(groupId, group, {
    //   new: true,
    // });
    await group.save();
    // res.status(httpStatusCodes.ok).json(newGroup);
    res
      .status(httpStatusCodes.ok)
      .json({ message: "Member removed successfully" });
  } catch (error) {
    res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

export const leaveGroup = async (req, res) => {
  const { groupId, userId } = req.params;

  try {
    const group = await Group.findById(groupId);
    if (!isMemberOfGroup(userId, group))
      return res
        .status(httpStatusCodes.badContent)
        .json({ message: "User is not a member of the group" });

    if (
      group.listMembers.length > 1 &&
      group.listMembers.find((member) => member.userId.equals(userId)).role ===
        "Owner"
    )
      return res
        .status(httpStatusCodes.badContent)
        .json({ message: "You're a group owner" });

    if (
      group.listMembers.find((member) => member.userId.equals(userId)).role ===
      "Owner"
    ) {
      return (
        await Group.findByIdAndRemove(groupId),
        res
          .status(httpStatusCodes.ok)
          .json({ message: "Group deleted successfully." })
      );
    }

    group.listMembers = group.listMembers.filter(
      (member) => !member.userId.equals(userId) || member.role === "Owner"
    );

    const newGroup = await Group.findByIdAndUpdate(groupId, group, {
      new: true,
    });
    // await group.save();
    res.status(httpStatusCodes.ok).json(newGroup);
  } catch (error) {
    res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

/**
 * @param {express.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>} req
 * @param {express.Response<any, Record<string, any>, number>} res
 * @param {express.NextFunction} next
 */
export const setGroupMemberRole = async (req, res) => {
  const { groupId, memberId } = req.params;
  const { newRole } = req.body;
  // console.log(newRole);
  const { userGroupRole } = req;

  const group = await Group.findById(groupId);

  if (!group)
    return res
      .status(httpStatusCodes.notFound)
      .json({ message: "Group not found" });

  try {
    if (!isMemberOfGroup(memberId, group))
      return res
        .status(httpStatusCodes.notFound)
        .json({ message: "This user is not a member of group" });

    const rolesCanSet = ["Member", "Moderator", "Admin", "Owner"];
    const userRoleIndex = rolesCanSet.indexOf(userGroupRole);
    rolesCanSet.length = userRoleIndex;

    if (!rolesCanSet.includes(newRole))
      return res
        .status(httpStatusCodes.forbidden)
        .json({ message: `${userGroupRole} can't set member to ${newRole}` });

    group.listMembers.forEach(async (member) => {
      if (member.userId.equals(memberId)) {
        const oldRole = member.role;
        member.role = newRole;
        await group.save();

        // only send notification if the member have a higher role
        if (checkRoleHasPermissionOfRole(newRole, oldRole))
          sendNotificationUser({
            userId: member.userId,
            kind: "SetGroupMemberRole_SetMember",
            content: {
              description: `You have been promoted as ${
                newRole === "Admin" ? "an" : "a"
              } ${newRole} of group "${group?.name}".`,
            },
            link: `/group/${group._id}/main`,
          });

        return res.status(httpStatusCodes.ok).json(group);
      }
    });
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

/**
 * @param {express.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>} req
 * @param {express.Response<any, Record<string, any>, number>} res
 * @param {express.NextFunction} next
 */
export const updateGroup = async (req, res) => {
  const updatedGroup = req.body;
  const { userId } = req;

  if (!userId) return res.json({ message: "Unauthenticated" });

  try {
    const userRole = updatedGroup?.listMembers?.find?.(
      (member) => member?.userId == userId
    )?.role;

    if (!checkRoleHasPermissionOfRole(userRole, "Owner"))
      return res
        .status(httpStatusCodes.forbidden)
        .json({ message: "Not have permission" });

    await Group.findByIdAndUpdate(updatedGroup?._id, updatedGroup, {
      new: true,
    }).then((result) => res.status(httpStatusCodes.ok).json(result));
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

export const countGroups = async (req, res) => {
  const { range, timeString } = req.params;
  let time = moment(timeString);
  let labels = [];
  let publicGroups = [];
  let privateGroups = [];
  const countPrivate = async (start, end) => {
    const count = await Group.find({
      createdAt: { $gt: start, $lte: end },
      privacy: "Private",
    }).count();
    privateGroups.push(count);
  };
  const countPublic = async (start, end) => {
    const count = await Group.find({
      createdAt: { $gt: start, $lte: end },
      privacy: "Public",
    }).count();
    publicGroups.push(count);
  };
  const addData = async (time, unit) => {
    const start = time.clone().startOf(unit);
    const end = time.clone().endOf(unit);
    await countPrivate(start, end);
    await countPublic(start, end);
  };
  try {
    switch (range) {
      case "week":
        labels = moment.weekdaysShort();
        for (let i = 0; i < labels.length; i++) {
          let temp = time.clone().set("day", i);
          await addData(temp, "day");
        }
        break;
      case "month":
        for (let i = 0; i < time.daysInMonth(); i++) {
          labels.push(i + 1);
          let temp = time.clone().set("date", i);
          await addData(temp, "day");
        }
        break;
      case "year":
        labels = moment.monthsShort();
        for (let i = 0; i < labels.length; i++) {
          let temp = time.clone().set("month", i);
          await addData(temp, "month");
        }
        break;
    }
    res.status(200).json({ labels, publicGroups, privateGroups });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @param {express.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>} req
 * @param {express.Response<any, Record<string, any>, number>} res
 * @param {express.NextFunction} next
 */
export const countPostsOfGroup = async (req, res) => {
  const { groupId } = req.params;

  const group = Group.findById(groupId);
  if (!group)
    return res.status(httpStatusCodes.notFound).json("Group not found");

  try {
    const posts = await Post.find();

    let count = 0;
    posts.forEach((post) => {
      const groupPostId = post?.groupPostInfo?.groupId;
      const groupStatus = post?.groupPostInfo?.status;
      if (groupPostId === groupId && groupStatus !== "Pending") count++;
    });

    return res.status(httpStatusCodes.ok).json(count);
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

/**
 * @param {express.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>} req
 * @param {express.Response<any, Record<string, any>, number>} res
 * @param {express.NextFunction} next
 */
export const countMembersOfGroup = async (req, res) => {
  const { groupId } = req.params;

  try {
    const group = Group.findById(groupId);
    if (!group)
      return res.status(httpStatusCodes.notFound).json("Group not found");

    const members = group?.listMembers?.length;
    return res.status(httpStatusCodes.ok).json(members);
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

/**
 * @param {express.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>} req
 * @param {express.Response<any, Record<string, any>, number>} res
 * @param {express.NextFunction} next
 */
export const getAllGroupsForReport = async (req, res) => {
  try {
    const groups = await Group.find();

    let groupsForReport = [];

    for (var group of groups) {
      const members = group?.listMembers?.length;

      const posts = await Post.find();
      let countPost = 0;
      try {
        posts.forEach((post) => {
          const groupPostInfo = post?.groupPostInfo;
          if (groupPostInfo) {
            const groupPostId = groupPostInfo.groupId;
            const groupStatus = groupPostInfo.status;
            if (groupPostId.equals(group._id) && groupStatus !== "Pending")
              countPost++;
          }
        });
      } catch (error) {
        console.log(error);
      }

      const groupReport = {
        _id: group?._id,
        name: group?.name,
        members: members,
        posts: countPost,
        reports: 0,
      };
      groupsForReport.push(groupReport);
    }

    return res.status(httpStatusCodes.ok).json(groupsForReport);
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};
