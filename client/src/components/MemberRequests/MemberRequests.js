import React, { useEffect, useState, useContext } from "react";
import { Button, Typography, message, Row, Space } from "antd";
import { Avatar, Tag } from "antd";
import styles from "./styles.js";
import OverviewRow from "../IntroCard/OverviewRow/OverviewRow.js";
import { IoSchoolSharp, MdLocationOn } from "react-icons/all";
import * as api from "../../api/group";
import { Link } from "react-router-dom";
import { GroupContext } from "../../pages/GroupPage/GroupPage";
import * as apiUserInfo from "../../api/user_info";
const { Text } = Typography;

function MemberRequests(props) {
  const { name } = props;
  const { _id } = props;
  const { group } = useContext(GroupContext);
  const [avatar, setAvatar] = useState("");

  const acceptMemberRequest = async (groupId, memberId) => {
    api
      .addGroupMember(groupId, memberId)
      .then((res) => {
        message.success("The account has been added as a member");
        api.removePendingMember(groupId, memberId);
        window.location.reload();
      })
      .catch((error) => message.success(error.message));
  };

  const declineMemberRequest = async (groupId, memberId) => {
    api
      .removePendingMember(groupId, memberId)
      .then((res) => {
        message.success("The account denied to become a member ");
        window.location.reload();
      })
      .catch((error) => message.success(error.message));
  };

  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    apiUserInfo.fetchUserInfo(_id).then((res) => {
      setUserInfo(res.data.userInfo);
    });
  }, []);

  return (
    <>
      <div style={styles.item}>
        <Row className="pb-2 justify-content-between align-items-center">
          <Row className="align-items-center" style={{ marginBottom: 16 }}>
            <Avatar className="ml-1 clickable" size={60} src={avatar} />
            <div className="d-inline-flex flex-column ml-3 break-word">
              <Row className="align-items-center">
                <Space size={4}>
                  <Link to={`/userinfo/${_id}`} target="_blank">
                    <Text
                      className="clickable"
                      strong
                      style={{ fontSize: "1.2rem" }}
                    >
                      {name ?? "Lalisa Manobal"}
                    </Text>
                  </Link>
                </Space>
              </Row>
              <Text>Fullstack Developer</Text>
            </div>
          </Row>
          <Row className="justify-content-end align-items-center pb-3">
            <div className="mr-4">
              {/* <Text className="clickable" underline type="secondary">
                Created {createdAt.toString().slice(0, 10)}
              </Text> */}
              <Button
                type="primary"
                style={{
                  background: "#27AE60",
                  borderColor: "#27AE60",
                  color: "white",
                  fontWeight: 500,
                  width: 120,
                }}
                onClick={() => acceptMemberRequest(group?._id, _id)}
              >
                Accept
              </Button>
            </div>
            <div className="mr-4">
              <Button
                type="ghost"
                style={{
                  background: "#BDBDBD",
                  borderColor: "#BDBDBD",
                  color: "black",
                  fontWeight: 500,
                  width: 120,
                }}
                onClick={() => declineMemberRequest(group?._id, _id)}
              >
                Decline
              </Button>
            </div>
          </Row>
        </Row>

        <div className="row" style={{ marginTop: 8 }}>
          <div className="col-10">
            <Tag style={styles.tag}>C#</Tag>
            <Tag style={styles.tag}>Javascript</Tag>
            <Tag style={styles.tag}>Unity 3D</Tag>
          </div>
        </div>

        <div className="row" style={{ marginTop: 10, marginLeft: 0 }}>
          <div className="col-7" style={{ marginTop: 10 }}>
            <OverviewRow
              firstIcon={<IoSchoolSharp style={styles.icon} />}
              text="Lives in Ho Chi Minh City, Vietnam"
            />
            <OverviewRow
              firstIcon={<IoSchoolSharp style={styles.icon} />}
              text="Lives in Ho Chi Minh City, Vietnam"
            />
            <OverviewRow
              firstIcon={<MdLocationOn style={styles.icon} />}
              text="Lives in Ho Chi Minh City, Vietnam"
            />
            <OverviewRow
              firstIcon={<MdLocationOn style={styles.icon} />}
              text="Lives in Ho Chi Minh City, Vietnam"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default MemberRequests;
