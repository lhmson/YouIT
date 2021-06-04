import React, { useEffect, useState, useContext } from "react";
import { Button, Typography, message } from "antd";
import { Avatar, Tag } from "antd";
import styles from "./styles.js";
import COLOR from "../../constants/colors";
import OverviewRow from "../IntroCard/OverviewRow/OverviewRow.js";
import { IoSchoolSharp, IoHome, MdLocationOn } from "react-icons/all";
import * as api from "../../api/group";
import { Link } from "react-router-dom";
import { GroupContext } from "../../pages/GroupPage/GroupPage";

const { Text } = Typography;

function MemberRequests(props) {
  const { name } = props;
  const { _id } = props;
  const { group } = useContext(GroupContext);

  const acceptMemberRequest = async (groupId, memberId) => {
    api
      .addGroupMember(groupId, memberId)
      .then((res) => {
        message.success(res.data.message);
        api.removePendingMember(groupId, memberId);
        window.location.reload();
      })
      .catch((error) => message.success(error.message));
  };

  const declineMemberRequest = async (groupId, memberId) => {
    api
      .removePendingMember(groupId, memberId)
      .then((res) => {
        message.success(res.data.message);
        window.location.reload();
      })
      .catch((error) => message.success(error.message));
  };

  const [userInfo, setUserInfo] = useState([]);

  return (
    <>
      <div style={styles.card}>
        <div className="row">
          <div
            className="col-6"
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Avatar
              size={72}
              src="https://vtv1.mediacdn.vn/thumb_w/650/2020/10/20/blackpink-lisa-mac-160316252527410005928.jpg"
            />

            <div className="col-9" style={{ alignSelf: "center" }}>
              <Link to={`/userinfo/${_id}`}>
                <Text style={styles.textUser}>{name ?? "Lalisa Manobal"}</Text>
              </Link>
              <div style={{ marginTop: 0 }}></div>
              <Text>React Native Developer</Text>
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
            className="col-2"
            style={{
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Button
              onClick={() => acceptMemberRequest(group?._id, _id)}
              type="primary"
              style={{
                background: "#27AE60",
                borderColor: "#27AE60",
                color: "white",
                fontWeight: 500,
                width: 120,
              }}
              // onClick={() => handleAccept(post._id)}
            >
              Accept
            </Button>
          </div>

          <div
            className="col-2"
            style={{
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Button
              onClick={() => declineMemberRequest(group?._id, _id)}
              type="ghost"
              style={{
                background: "#BDBDBD",
                borderColor: "#BDBDBD",
                color: "black",
                fontWeight: 500,
                width: 120,
              }}
            >
              Decline
            </Button>
          </div>
        </div>

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
