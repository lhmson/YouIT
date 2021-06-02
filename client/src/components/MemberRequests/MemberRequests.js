import React, { useEffect, useState } from "react";
import { Button, Row, Col, Divider, Form, Typography, Input, Card } from "antd";
import { Avatar, Image, Tag } from "antd";
import styles from "./styles.js";
import COLOR from "../../constants/colors";
import OverviewRow from "../IntroCard/OverviewRow/OverviewRow.js";
import { useSelector } from "react-redux";
import {
  IoSchoolSharp,
  IoHome,
  MdPublic,
  MdLocationOn,
  AiFillHeart,
  AiOutlineInstagram,
  AiFillInstagram,
} from "react-icons/all";
import * as api from "../../api/user_info";
import { Link } from "react-router-dom";
import { FETCH_USER_JOINED_GROUPS } from "../../redux/actionTypes.js";

const { Title, Text, Paragraph } = Typography;

const schoolIcon = () => {
  return <IoSchoolSharp style={styles.icon} />;
};
const homeIcon = () => {
  return <IoHome style={styles.icon} />;
};

function MemberRequests(props) {
  const { name } = props;
  const { _id } = props;

  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    api.fetchUserInfo(_id).then((res) => {
      setUserInfo(res.data.userInfo);
      console.log("thy", res.data.userInfo);
    });
  }, []);

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
          {/* <Paragraph>
            Some word Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Paragraph>
          <Link href="#" target="_blank" strong style={{ color: COLOR.green }}>
            Xem toàn bộ bài viết
          </Link> */}
          {/* <OverviewRow
            firstIcon={schoolIcon()}
            text="Went to Truong THPT Gia Dinh"
          />

          <OverviewRow
            firstIcon={homeIcon()}
            text="Lives in Ho Chi Minh City, Vietnam"
          /> */}
          <div className="col-7" style={{ marginTop: 10 }}>
            <OverviewRow
              firstIcon={<IoSchoolSharp style={styles.icon} />}
              text={userInfo.gender}
            />
            <OverviewRow
              firstIcon={<IoSchoolSharp style={styles.icon} />}
              text={userInfo.gender}
            />
            <OverviewRow
              firstIcon={<MdLocationOn style={styles.icon} />}
              text={userInfo.gender}
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
