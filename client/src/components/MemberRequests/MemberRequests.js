import React, { useEffect, useState, useContext } from "react";
import { Button, Typography, message, Row, Space } from "antd";
import { Avatar, Tag } from "antd";
import styles from "./styles.js";
import OverviewRow from "../IntroCard/OverviewRow/OverviewRow.js";
import {
  IoSchoolSharp,
  MdLocationOn,
  IoHome,
  FaBirthdayCake,
  MdWork,
} from "react-icons/all";
import * as api from "../../api/group";
import { Link } from "react-router-dom";
import { GroupContext } from "../../pages/GroupPage/GroupPage";
import * as apiUserInfo from "../../api/user_info";
import moment from "moment";

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

  const educations = userInfo?.educations;
  const works = userInfo?.works;
  const address = userInfo?.address ?? "Viet Nam";
  const workLocation = userInfo?.workLocation ?? "Viet Nam";
  const dateOfBirth = moment(userInfo?.dateOfBirth).format("DD/MM/YYYY");

  let education;
  if (educations) {
    education = educations[educations.length - 1];
  }
  let work;
  if (works) {
    work = works[works.length - 1];
  }

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
          <Row className="align-items-center">
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

        <div className="col-md-8" style={{ marginTop: 30, marginLeft: 0 }}>
          <div className="row" style={{ marginTop: 10 }}>
            {work && (
              <OverviewRow
                firstIcon={<MdWork style={styles.icon} />}
                text={`${work?.position} at ${work?.location}`}
              />
            )}
            {education && (
              <OverviewRow
                firstIcon={<IoSchoolSharp style={styles.icon} />}
                text={`${education?.moreInfo} at ${education?.schoolName}`}
              />
            )}
            <OverviewRow
              firstIcon={<IoHome style={styles.icon} />}
              text={`${address}`}
            />
            <OverviewRow
              firstIcon={<MdLocationOn style={styles.icon} />}
              text={`${workLocation}`}
            />
            <OverviewRow
              firstIcon={<FaBirthdayCake style={styles.icon} />}
              text={`${dateOfBirth}`}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default MemberRequests;
