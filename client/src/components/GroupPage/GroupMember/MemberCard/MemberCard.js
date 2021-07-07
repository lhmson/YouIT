import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Row,
  Typography,
  Menu,
  Dropdown,
  message,
  Tooltip,
} from "antd";
import { Avatar, Tag, Popover, List } from "antd";
import styles from "./styles.js";
import { Link } from "react-router-dom";
import { EllipsisOutlined } from "@ant-design/icons";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";
import COLOR from "../../../../constants/colors.js";
import * as api from "../../../../api/friend";
import * as apiGroup from "../../../../api/group";
import * as apiUserInfo from "../../../../api/user_info";
import { GroupContext } from "../../../../pages/GroupPage/GroupPage.js";
import { fetchProgrammingHashtags } from "../../../../api/hashtag.js";

const { Text } = Typography;
const { Item } = Menu;
function MemberCard(props) {
  const [user, setUser] = useLocalStorage("user");
  const [listMutual, setListMutual] = useState([]);
  const [numberMutual, setNumberMutual] = useState(0);
  const { name } = props;
  const [txtButton, setTxtButton] = React.useState("Message");
  const { _id } = props;
  const { role } = props;
  const { group } = useContext(GroupContext);
  const [roleUser, setRoleUser] = useState("");
  const { avatarUrl } = props;
  const [listHashTags, setListHashTags] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    api
      .fetchCountMutualFriends(user?.result?._id, _id)
      .then((res) => {
        if (res.data) setNumberMutual(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    api
      .fetchListMutualFriends(user?.result?._id, _id)
      .then((res) => {
        if (res.data && res.data instanceof Array) {
          const tempList = [];
          for (let i = 0; i < res.data.length; i++)
            tempList.push({
              name: res.data[i].name,
              id: res.data[i]._id,
              role: res.data[i].role,
            });
          setListMutual(tempList);
          console.log(tempList);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    group?.listMembers.forEach((member) => {
      if (member?.userId === user?.result?._id) setRoleUser(member?.role);
    });
  }, []);

  useEffect(() => {
    fetchProgrammingHashtags(_id)
      .then((res) => {
        if (res.data) setListHashTags(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    apiUserInfo.fetchUserInfo(_id).then((res) => {
      setUserInfo(res.data.userInfo);
    });
  }, []);

  const renderUserInfo = () => {
    const education = userInfo.educations?.[userInfo.educations?.length - 1];
    const work = userInfo.works?.[userInfo.works?.length - 1];
    const educationInfo = education
      ? `${education?.moreInfo} at ${education?.schoolName}`
      : null;
    const workInfo = work ? `${work?.position} at ${work?.location}` : null;
    return workInfo || educationInfo;
  };

  const handleRemoveMember = async (groupId, userId) => {
    apiGroup
      .deleteMember(groupId, userId)
      .then((res) => {
        message.success("This user has been removed from the group.");
        window.location.reload();
      })
      .catch((error) => message.success(error.message));
  };

  const handleSetMember = async (groupId, memberId, role) => {
    apiGroup
      .setGroupMemberRole(groupId, memberId, role)
      .then((res) => {
        message.success(
          "This user no longer has the right to admin or moderate the group."
        );
        window.location.reload();
      })
      .catch((error) => message.success(error.message));
  };

  const handleSetModerator = async (groupId, memberId, role) => {
    apiGroup
      .setGroupMemberRole(groupId, memberId, role)
      .then((res) => {
        message.success("The user is set as the moderator of this group.");
        window.location.reload();
      })
      .catch((error) => message.success(error.message));
  };

  const handleSetAdmin = async (groupId, memberId, role) => {
    apiGroup
      .setGroupMemberRole(groupId, memberId, role)
      .then((res) => {
        message.success("The user is set as the administrator of this group.");
        window.location.reload();
      })
      .catch((error) => message.success(error.message));
  };

  const removeAdminMenuItem = () => {
    return (
      <Item
        key="removeAdmin"
        onClick={() => {
          handleSetMember(group?._id, _id, "Member");
        }}
      >
        <Row align="middle">
          <Text>Remove as admin</Text>
        </Row>
      </Item>
    );
  };

  const removeModeratorMenuItem = () => {
    return (
      <Item
        key="removeModerator"
        onClick={() => {
          handleSetMember(group?._id, _id, "Member");
        }}
      >
        <Row align="middle">
          <Text>Remove as moderator</Text>
        </Row>
      </Item>
    );
  };

  const addAdminMenuItem = () => {
    return (
      <Item
        key="addAdmin"
        onClick={() => {
          handleSetAdmin(group?._id, _id, "Admin");
        }}
      >
        <Row align="middle">
          <Text>Add as admin</Text>
        </Row>
      </Item>
    );
  };

  const addModeratorMenuItem = () => {
    return (
      <Item
        key="AddModerator"
        onClick={() => {
          handleSetModerator(group?._id, _id, "Moderator");
        }}
      >
        <Row align="middle">
          <Text>Add as moderator</Text>
        </Row>
      </Item>
    );
  };

  const removeMember = () => {
    return (
      <Item
        key="removeMember"
        onClick={() => {
          handleRemoveMember(group?._id, _id);
        }}
      >
        <Row align="middle">
          <Text>Remove member</Text>
        </Row>
      </Item>
    );
  };

  const isAdmin = () => {
    if (roleUser === "Owner" || (roleUser === "Admin" && role !== "Owner"))
      return true;
    return false;
  };

  const menuMore = (
    <Menu>
      {roleUser === "Owner"
        ? role === "Admin"
          ? removeAdminMenuItem()
          : addAdminMenuItem()
        : ""}

      {roleUser === "Owner"
        ? role === "Member"
          ? addModeratorMenuItem()
          : role === "Moderator"
          ? removeModeratorMenuItem()
          : ""
        : ""}

      {roleUser === "Admin"
        ? role !== "Moderator"
          ? addModeratorMenuItem()
          : removeModeratorMenuItem()
        : ""}

      {removeMember()}
    </Menu>
  );

  const popupListMutualFriend = (data) => {
    return (
      <>
        <div>
          <List
            header={<div></div>}
            footer={<div></div>}
            bordered
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <Link to={`/userinfo/${item.id}`}>
                  <Text style={styles.text}>{item.name}</Text>
                </Link>
              </List.Item>
            )}
          />
        </div>
      </>
    );
  };
  return (
    <>
      <div style={styles.card}>
        <div className="row ml-2" style={{ justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Avatar size={72} src={avatarUrl} />

            <div className="ml-3 break-word">
              <Link to={`/userinfo/${_id}`}>
                <Text style={styles.textUser}>{name ?? "Lalisa Manobal"}</Text>
              </Link>
              <div style={{ marginTop: 0 }}>
                <Text strong className="green">
                  {renderUserInfo()}
                </Text>
              </div>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>{role}</Text>
            </div>
            <div
              style={{
                marginLeft: 0,
                justifyContent: "center",
                flex: 1,
                display: "flex",
              }}
            ></div>
          </div>

          <div
            className="mr-3"
            style={{
              justifyContent: "flex-end",
              alignItems: "flex-end",
              display: user?.result?._id === _id ? "none" : "block",
            }}
          >
            <Button
              className="mb-2"
              type="primary"
              style={{
                background: "#27AE60",
                borderColor: "#27AE60",
                color: "white",
                fontWeight: 500,
              }}
            >
              {txtButton}
            </Button>
            {isAdmin() ? (
              <Dropdown
                overlay={menuMore}
                trigger={["click"]}
                placement="bottomRight"
              >
                <EllipsisOutlined
                  style={{
                    fontSize: 20,
                    color: COLOR.black,
                    marginLeft: 20,
                  }}
                />
              </Dropdown>
            ) : (
              <></>
            )}
            <div>
              <Popover
                placement="bottom"
                title={""}
                content={popupListMutualFriend(listMutual ?? [])}
                trigger="hover"
              >
                <Link to={`/mutualFriends/${_id}`}>
                  <Text style={styles.text}>
                    {numberMutual} mutual friend{numberMutual >= 2 ? "s" : ""}
                  </Text>
                </Link>
              </Popover>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="ml-4">
            {listHashTags?.map((item, i) => (
              <Tooltip
                title={`Mentioned ${item?.count} time${
                  item?.count > 1 ? "s" : ""
                }`}
              >
                <Tag key={i} className="mb-2 tag">
                  {item.name}
                </Tag>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default MemberCard;
