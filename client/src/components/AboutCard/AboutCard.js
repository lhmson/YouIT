import React from "react";
import { Button, Divider, Typography, Card, Tabs } from "antd";
import Icon, { HomeFilled } from "@ant-design/icons";

import styles from "./styles.js";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const OverviewRow = (props) => {
  return (
    <>
      <div className="container" style={{ marginBottom: 32 }}>
        <div className="row" style={{ alignItems: "center" }}>
          <div className="col-8">
            <div
              className="row"
              style={{ display: "flex", alignItems: "center" }}
            >
              {props.firstIcon}
              <div>
                <Text style={{ fontSize: 18, fontWeight: 400 }}>
                  {props.text}
                </Text>
                <br />
                <Text>{props.subText}</Text>
              </div>
            </div>
          </div>
          <div
            className="col-2 offset-1"
            style={{
              background: "white",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button style={{ marginRight: 16 }}>{props.privacyIcon}</Button>
            <Button>{props.lastIcon}</Button>
          </div>
        </div>
      </div>
    </>
  );
};

const OverviewPane = (props) => {
  const schoolIcon = () => {
    return <HomeFilled style={{ marginRight: 16, fontSize: 24 }} />;
  };
  const homeIcon = () => {
    return <HomeFilled style={{ marginRight: 16, fontSize: 24 }} />;
  };

  return (
    <div>
      <OverviewRow
        firstIcon={schoolIcon()}
        text="Went to Truong THPT Gia Dinh"
        subText="Attended from 2015 to 2018"
        privacyIcon="ZZZ"
        lastIcon="AAA"
      />
      <OverviewRow
        firstIcon={homeIcon()}
        text="Went to Truong THPT Gia Dinh"
        subText="Attended from 2015 to 2018"
        privacyIcon="ZZZ"
        lastIcon="AAA"
      />
    </div>
  );
};

function AboutCard() {
  return (
    <>
      <div style={styles.whiteBackground}>
        <div className="row">
          <div
            className="col-2"
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 36, fontWeight: 700 }}>About</Text>
          </div>
          <div
            className="col-2 offset-7"
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              type="primary"
              style={{ margin: 8, width: 128, borderRadius: 4 }}
            >
              Edit
            </Button>
          </div>
        </div>
        <Divider />
        <Tabs tabPosition="left" type="card" tabBarGutter={16}>
          <TabPane tab="Tab 1" key="1">
            <OverviewPane />
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of Tab 2
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of Tab 3
          </TabPane>
        </Tabs>
      </div>
    </>
  );
}

export default AboutCard;
