import React, { useState } from "react";
import { Button, Divider, Typography, Menu, Layout } from "antd";
import {
  FaLaptopCode,
  MdWork,
  GrOverview,
  FaStackOverflow,
} from "react-icons/all";

import { OverviewPane, ProgrammingPane, WorkAndEducationPane } from "./index";
import styles from "./styles.js";

const { Text } = Typography;
const { Sider } = Layout;

function AboutCard() {
  const [selectedItem, setSelectedItem] = useState("1");

  const CustomPane = () => {
    switch (selectedItem) {
      case "1":
        return <OverviewPane />;
      case "2":
        return <WorkAndEducationPane />;
      case "3":
        return <ProgrammingPane />;
      default:
        break;
    }
  };

  return (
    <>
      <div className="container" style={styles.whiteBackground}>
        <div className="row">
          <div
            style={{
              paddingLeft: 24,
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
          ></div>
        </div>
        <Divider />
        <div style={styles.sider}>
          <div className="row">
            <div
              // className="col-4"
              style={{ flexDirection: "row", display: "flex" }}
            >
              <Sider width="95%" breakpoint="lg" collapsedWidth="0">
                <Menu
                  mode="inline"
                  style={{
                    height: "100%",
                    borderRight: 0,
                    fontWeight: 500,
                    fontSize: "1rem",
                  }}
                  selectedKeys={selectedItem}
                >
                  <Menu.Item
                    key="1"
                    style={styles.item}
                    icon={<FaStackOverflow style={styles.icon} />}
                    onClick={(e) => setSelectedItem(e.key)}
                  >
                    Overview
                  </Menu.Item>
                  <Menu.Item
                    key="2"
                    style={styles.item}
                    icon={<MdWork style={styles.icon} />}
                    onClick={(e) => setSelectedItem(e.key)}
                  >
                    Work and Education
                  </Menu.Item>
                  <Menu.Item
                    key="3"
                    style={styles.item}
                    icon={<FaLaptopCode style={styles.icon} />}
                    onClick={(e) => setSelectedItem(e.key)}
                  >
                    Programming
                  </Menu.Item>
                </Menu>
              </Sider>
              <Divider
                type="vertical"
                style={{
                  marginLeft: 8,
                  height: "100%",
                }}
              />
            </div>
            <div style={{ flex: 1 }}>{CustomPane()}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutCard;
