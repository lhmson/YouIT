import React, { useEffect, useRef, useState } from "react";
import { Tooltip, Popover, Button, Typography, Input, Select, message } from "antd";

import {
  SearchOutlined,
  DeleteOutlined,
  EyeOutlined,
  EditOutlined,
} from "@ant-design/icons";

import "../styles.css";

import { Link } from "react-router-dom";
import "../styles.css";
import { useLocalStorage } from "../../../hooks/useLocalStorage.js";
import COLOR from "../../../constants/colors.js";

import { useMobile } from "../../../utils/responsiveQuery";

import * as apiFriend from "../../../api/friend";
import * as apiConversation from "../../../api/conversation";
import { useFriendsStatus } from "../../../context/FriendsStatusContext";
import { GrStatusGoodSmall } from "react-icons/gr";
import { renderStatus, statusList } from "../../../utils/userStatus";
import { useMessage } from "../../../hooks/useMessage";

const { Text } = Typography;

const { Option } = Select;

function MessageHeader({ setOpenSidebar, currentId, listSeenMembers }) {
  const isMobile = useMobile();

  const [user] = useLocalStorage("user");


  const [visibleEdit, setVisibleEdit] = useState(false); // select display
  const currentTitle = useRef();
  const [title, setTitle] = useState("");

  const currentListMembers = useRef([]);
  const [listMembers, setListMembers] = useState([]);

  const [listFriends, setListFriends] = useState([]);

  const friendsStatusManager = useFriendsStatus();
  const [listMembersStatus, setListMembersStatus] = useState([]); // same as list members, but add new status property

  const [canEdit, setCanEdit] = useState(false);

  const messageHandle = useMessage();

  useEffect(() => {
    messageHandle.onConversationUpdated(msg => {
      if (msg.res.conversationId === currentId) {
        handleLoadConversationData();
      }
    })

    return messageHandle.cleanUpAll;
  }, [currentId])

  useEffect(() => {
    apiFriend.fetchListMyFriends(user?.result?._id).then((res) => {
      setListFriends(
        res.data?.map((item, i) => ({ _id: item._id, name: item.name }))
      );
    });
  }, []);

  useEffect(() => {
    if (currentId) {
      handleLoadConversationData();
      friendsStatusManager.onFriendStatusChange(handleUpdateMembersStatus);

      return friendsStatusManager.cleanUpAll;
    }
  }, [currentId]);

  const handleLoadConversationData = () => {
    if (!currentId) return;

    apiConversation.fetchAConversation(currentId, 0, 0).then((res) => {
      const { listMembers, title } = res.data;

      if (listMembers) {
        const newList = listMembers?.map((member) => ({
          ...member,
          status: friendsStatusManager.getStatus(member._id),
        }));

        const listOthersId = listMembers.map(user => user._id).filter(userId => userId !== user?.result?._id)

        currentTitle.current = title;
        currentListMembers.current = listOthersId;

        setTitle(title);
        setListMembers(listOthersId);
        setListMembersStatus(newList);
        setCanEdit(res.data.listOwners.some(ownerId => ownerId === user?.result?._id))
      }
    });
  };

  const handleUpdateMembersStatus = (userId, newStatus) => {
    if (!listMembersStatus) return;

    setListMembersStatus((oldList) => {
      const newList = oldList?.map((member) => {
        if (member?._id === userId) return { ...member, status: newStatus };
        else return member;
      });

      return newList;
    });

    // doesn't work, don't know why :D
    // const newList = listMembersStatus?.map(member => {
    //   if (member?._id === userId)
    //     return { ...member, status: newStatus }
    //   else
    //     return member;
    // })
    // setListMembersStatus(newList)
  };

  const handleOpenSidebar = () => {
    setOpenSidebar((prev) => !prev);
  };

  const handleEditConversation = () => {
    apiConversation.updateConversation(currentId, {
      title,
      listMembers,
    }).then(res => {
      if (res.status === 200) {
        message.success("Conversation updated!");

        // prevent reset
        currentTitle.current = title;
        currentListMembers.current = listMembers;
      }
    }).catch(res => {
      message.error("Cannot update conversation! Make sure there're at least 2 members and the title is not empty.")
    })
  };

  const handleChangeUserToAdd = (value, options) => {
    setListMembers(options?.map((item) => item.key));
  };

  const handleVisibleChange = (visibleAdd) => {
    if (!visibleAdd) {
      setTitle(currentTitle.current);
      setListMembers(currentListMembers.current);
    }

    setVisibleEdit(visibleAdd);
  };

  const handleTitleEditTextChange = (e) => {
    const newTitle = e?.target?.value;
    setTitle(newTitle);
  }

  const getConversationStatus = () => {
    let result = "offline";
    listMembersStatus?.forEach((item) => {
      if (item._id !== user?.result?._id) {
        const status = item.status;
        if (status === "online") {
          result = "online";
        } else if (status === "busy" && result !== "online") {
          result = "busy";
        }
      }
    });
    return result;
  };

  const handleDeleteConversation = () => {
    // Need a yes/no prompt
    apiConversation.deleteConversation(currentId).then(res => {
      message.success("Conversation deleted!");
    }).catch(() => {
      message.error("Something went wrong!");
    })
  }

  return (
    <div className="chat-title">
      <div className="d-flex align-items-center">
        <Tooltip title="Search conversation" placement="right">
          <SearchOutlined
            className="clickable icon mr-3"
            onClick={() => handleOpenSidebar()}
          />
        </Tooltip>

        <Popover
          content={
            <>
              <Button onClick={handleEditConversation}>Confirm</Button>
            </>
          }
          title={
            <div>
              <Input
                type="text"
                placeholder="Title"
                value={title}
                onChange={handleTitleEditTextChange}
                style={{ margin: "5px 0" }}
              />
              <Select
                mode="tags"
                placeholder="Add friend"
                value={listMembers}
                onChange={handleChangeUserToAdd}
                style={{ width: "100%" }}
              >
                {listFriends?.map((item) => (
                  <Option key={item._id}>{item.name}</Option>
                ))}
              </Select>
            </div>
          }
          trigger="click"
          visible={visibleEdit}
          onVisibleChange={handleVisibleChange}
        >
          {canEdit && <Button
            className="d-flex justify-content-center align-items-center green-button ml-3"
            icon={<EditOutlined />}
          >
            Edit
          </Button>}
        </Popover>
      </div>

      <span className="text-center">
        {currentId && (isMobile ? title.substring(0, 12) + "..." : title)}
      </span>
      <div className="d-flex">
        {listSeenMembers && (
          <Tooltip
            title={
              <div>
                {listSeenMembers.map((item) => (
                  <div>{item.name}</div>
                ))}
              </div>
            }
            placement="bottom"
          >
            <EyeOutlined className="clickable icon mr-2" />
          </Tooltip>
        )}

        {listMembersStatus && (
          <Tooltip
            title={
              <div>
                {listMembersStatus.map((item) => (
                  <div>{`${item.name}: ${item.status}`}</div>
                ))}
              </div>
            }
          >
            <GrStatusGoodSmall
              className="clickable icon mr-2"
              style={{ color: renderStatus(getConversationStatus()) }}
            />
          </Tooltip>
        )}

        {canEdit && <Tooltip title="Delete conversation">
          <DeleteOutlined className="clickable icon" onClick={handleDeleteConversation} />
        </Tooltip>}
      </div>
    </div>
  );
}

export default MessageHeader;
