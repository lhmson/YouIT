import { Button, Divider, Layout, Row, Typography } from "antd";
import moment from "moment";
import React, { useContext } from "react";
import { AiOutlineFieldTime, IoMdLock } from "react-icons/all";
import { GroupContext } from "../../../pages/GroupPage/GroupPage.js";
import { limitNameLength } from "../../../utils/limitNameLength.js";
import { OverviewRow } from "../../UserInfo/AboutCard/index.js";
import styles from "./styles.js";

const { Text } = Typography;

function GroupAboutCard() {
  const { group } = useContext(GroupContext);

  // privacy row
  const PrivacyIcon = () => {
    return <IoMdLock style={styles.icon} />;
  };

  const privacyDescription =
    group?.privacy == "Public"
      ? "Anyone can see who's in the group and what they post."
      : "Only members can see who's in the group and what they post.";

  const createdDay = moment(group?.createdAt).format("DD/MM/YYYY");

  return (
    <>
      <Layout
        style={{
          padding: 32,
          background: "white",
          marginTop: 30,
          marginBottom: 16,
        }}
      >
        <Text style={{ fontSize: 32, fontWeight: "bold" }}>
          About this group
        </Text>
        <Layout style={{ paddingLeft: 32, background: "white" }}>
          <Divider style={{ justifySelf: "start" }}></Divider>
          <div className="break-word">
            <Text>{group?.description}</Text>
          </div>

          {/* <Button type="text" style={{ background: "white", marginBottom: 32 }}>
            See more
          </Button> */}
          <Row>
            <OverviewRow
              firstIcon={<PrivacyIcon />}
              text={group?.privacy}
              subText={privacyDescription}
            />
            <OverviewRow
              firstIcon={<AiOutlineFieldTime style={styles.icon} />}
              text={createdDay}
            />
          </Row>
        </Layout>
      </Layout>
    </>
  );
}

export default GroupAboutCard;
