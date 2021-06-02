import React, { useState, useEffect, useMemo, useContext } from "react";
import { Button, Row, Typography, Menu, Dropdown, message } from "antd";
import { Avatar, Image, Tag, Popover, List } from "antd";
import styles from "./styles.js";
import { Link } from "react-router-dom";
import { EllipsisOutlined } from "@ant-design/icons";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";
import COLOR from "../../../../constants/colors.js";
import * as api from "../../../../api/friend";
import * as apiGroup from "../../../../api/group";
import { GroupContext } from "../../../../pages/GroupPage/GroupPage.js";
import { useHistory } from "react-router-dom";
import { GiConsoleController } from "react-icons/gi";

const { Title, Text } = Typography;

function MemberCard(props) {
  const [user, setUser] = useLocalStorage("user");
  const [listMutual, setListMutual] = useState([]);
  const [numberMutual, setNumberMutual] = useState(0);
  const { name } = props;
  const [txtButton, setTxtButton] = React.useState("Message");
  const { _id } = props;
  const { role } = props;
  const { group } = useContext(GroupContext);
  const history = useHistory();

  useEffect(() => {
    api
      .fetchCountMutualFriends(user?.result?._id, _id)
      .then((res) => {
        console.log("List mutual friends");
        console.log(res.data);
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

  const handleRemoveMember = async (groupId, userId) => {
    apiGroup
      .deleteMember(groupId, userId)
      .then((res) => {
        message.success(res.data.message);
        // history.push(`/group/${groupId}/members`);
        window.location.reload();
      })
      .catch((error) => message.success(error.message));
  };

  const menuMore = (
    <Menu>
      <Menu.Item key="settings">
        <Row align="middle">
          <Text>Add as admin</Text>
        </Row>
      </Menu.Item>
      <Menu.Item
        key="logout"
        onClick={() => {
          handleRemoveMember(group?._id, _id);
        }}
      >
        <Row align="middle">
          <Text>Remove member</Text>
        </Row>
      </Menu.Item>
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
            <Avatar
              size={72}
              src="https://vtv1.mediacdn.vn/thumb_w/650/2020/10/20/blackpink-lisa-mac-160316252527410005928.jpg"
            />

            <div className="col-8" style={{ alignSelf: "center" }}>
              <Link to={`/userinfo/${_id}`}>
                <Text style={styles.textUser}>{name ?? "Lalisa Manobal"}</Text>
              </Link>
              <div style={{ marginTop: 0 }}></div>
              <Text>{role}</Text>
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
            <Dropdown
              overlay={menuMore}
              trigger={["click"]}
              placement="bottomCenter"
            >
              <EllipsisOutlined
                style={{
                  fontSize: 20,
                  color: COLOR.black,
                  marginLeft: 20,
                }}
              />
            </Dropdown>
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
            <Tag className="tag">C#</Tag>
            <Tag className="tag">Javascript</Tag>
            <Tag className="tag">Unity 3D</Tag>
            <Text style={{ ...styles.text, fontWeight: 600 }}>+ 15 Posts</Text>
          </div>
        </div>
      </div>
    </>
  );
}

export default MemberCard;
