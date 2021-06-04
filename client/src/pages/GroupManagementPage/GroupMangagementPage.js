import React, { useState, useEffect, useRef, useMemo } from "react";
import { Layout, Typography, Input } from "antd";
import styles from "./styles.js";

import Navbar from "../../components/Navbar/Navbar";

import { useDispatch } from "react-redux";
import { Button } from "antd";
import GroupJoinedCard from "../../components/GroupCard/GroupJoinedCard";
import COLOR from "../../constants/colors";
import * as api from "../../api/group";
import { useLocalStorage } from "../../hooks/useLocalStorage";

import { SearchOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Title, Text } = Typography;

function GroupManagementPage() {
  const [user, setUser] = useLocalStorage("user");
  const inputRef = useRef();
  const [listGroup, setListGroup] = useState([]);
  const [listPending, setlistPending] = useState([]);
  const [txtSearch, setTxtSearch] = useState("");
  const [mode, setMode] = useState("Groups");
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    api
      .fetchUserJoinedGroups()
      .then((res) => {
        console.log("group joined", res.data);
        if (res.data instanceof Array) setListGroup(res.data);
        else setListGroup([]);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [user]);

  useEffect(() => {
    api
      .fetchUserPendingGroups()
      .then((res) => {
        console.log("group pending", res.data);
        if (res.data instanceof Array) setlistPending(res.data);
        else setlistPending([]);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [user, update]);

  const numberTotalGroup = listGroup.length;

  let listFilter = listGroup.filter((user) =>
    user.name.toLowerCase().includes(txtSearch.toLowerCase())
  );

  if (mode === "Pending") {
    listFilter = listPending.filter((user) =>
      user.name.toLowerCase().includes(txtSearch.toLowerCase())
    );
  }

  const listUserCard = useMemo(
    () =>
      listFilter?.map((group, i) => {
        return (
          <GroupJoinedCard
            _id={group._id}
            nameGroup={group.name}
            description={group.description}
            totalMembers={group.listMembers?.length}
            joined={mode === "Groups"}
            update={update}
            setUpdate={setUpdate}
          ></GroupJoinedCard>
        );
      }),
    [listFilter]
  );

  const handleSearch = () => {
    setTxtSearch(inputRef.current.state.value);
  };

  return (
    <>
      <Layout>
        <Navbar />
        <Layout>
          <Layout style={styles.mainArea}>
            <Content>
              <div
                className="col-8 offset-2 "
                style={{
                  marginTop: 64,
                  alignItems: "center",
                }}
              >
                <div className="row" style={{ paddingTop: 16 }}>
                  <div
                    className="col-3"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Title>Groups</Title>
                  </div>
                  <div className="offset-5 col-2">
                    <Button
                      onClick={() => setMode("Pending")}
                      type="primary"
                      style={{
                        background: "#27AE60",
                        borderColor: "#27AE60",
                        color: "white",
                        fontWeight: 500,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      Pending ({listPending.length})
                    </Button>
                  </div>

                  <div className="col-2">
                    <Button
                      onClick={() => setMode("Groups")}
                      type="primary"
                      style={{
                        background: "#27AE60",
                        borderColor: "#27AE60",
                        color: "white",
                        fontWeight: 500,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      Groups ({numberTotalGroup})
                    </Button>
                  </div>
                </div>

                <div
                  className="row"
                  style={{
                    marginTop: 8,
                    marginBottom: 16,
                    paddingLeft: 32,
                    paddingRight: 32,
                  }}
                >
                  <Input
                    onPressEnter={handleSearch}
                    allowClear
                    suffix={
                      <SearchOutlined
                        onClick={() => {}}
                        style={{ fontSize: 24, color: COLOR.white }}
                      />
                    }
                    ref={inputRef}
                    bordered={false}
                    style={{
                      backgroundColor: COLOR.lightGreen,
                    }}
                    defaultValue={""}
                  />
                </div>

                <div className="row" style={{ padding: 32 }}>
                  {listUserCard}
                </div>
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}

export default GroupManagementPage;
