import React, { useState, useEffect } from "react";
import { Layout, Typography, Table, Button, message, Modal } from "antd";
import styles from "./styles.js";
import Navbar from "../../../components/Navbar/Navbar";
import ReportUserCard from "../../../components/ReportUserCard/ReportUserCard";
import * as apiGroup from "../../../api/group";
import { limitNameLength } from "../../../utils/limitNameLength.js";
import LoadingSearch from "../../../components/Loading/LoadingSearch";
import FriendCard from "../../../components/FriendCard/FriendCard";

const { Content } = Layout;
const { Title, Text } = Typography;

function GroupAdminManagement() {
  const [selectedRowkeys, setSelectedRowkeys] = useState([]);
  const [listReports, setListReports] = useState([]);
  // const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
    apiGroup
      .fetchGroupsForReport()
      .then((res) => {
        console.log("report", res.data);
        if (res.data instanceof Array) setListReports(res.data);
        else setListReports([]);
        setLoading(true);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  function infoMember(name, listMembers) {
    Modal.info({
      title: `List Groups of ${name}`,
      footer: null,
      width: "70%",
      content: (
        <div>
          {listMembers?.map((member, i) => {
            return (
              <FriendCard
                _id={member._id}
                name={member.name}
                relationship="Add Friend"
                avatarUrl={member.avatarUrl}
                userInfo={member.userInfo}
              ></FriendCard>
            );
          })}
        </div>
      ),
      onOk() {},
    });
  }

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: "10%",
      align: "center",
    },
    {
      title: "Group Name",
      dataIndex: "name",
      width: "40%",
      align: "left",
    },
    {
      title: "Reports",
      dataIndex: "reports",
      width: "15%",
      align: "center",
    },
    {
      title: "Members",
      dataIndex: "members",
      width: "15%",
      align: "center",
    },
    {
      title: "Posts",
      dataIndex: "posts",
      width: "15%",
      align: "center",
    },
  ];

  const data = [];
  for (let i = 0; i < listReports.length; i++) {
    data.push({
      key: i,
      id: i + 1,
      name: limitNameLength(listReports[i].name, 40),
      reports: listReports[i].reports,
      members: listReports[i].members,
      posts: listReports[i].posts,
      _id: listReports[i]._id,
    });
  }

  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowkeys(selectedRowKeys);
    console.log("rows", selectedRowkeys);
  };

  const deleteSelectedGroups = async () => {
    // nho check admin web o api
    for (let i = 0; i < selectedRowkeys.length; i++) {
      await apiGroup
        .deleteGroup(data[selectedRowkeys[i]]._id)
        .then((res) => {})
        .catch((e) => {
          console.log(e);
        });
    }
    message.success("Delete groups successfully");
    // setUpdate(!update);
  };

  const TableReportUser = () => {
    const rowSelection = {
      selectedRowKeys: selectedRowkeys,
      onChange: onSelectChange,
      selections: [
        Table.SELECTION_ALL,
        Table.SELECTION_INVERT,
        Table.SELECTION_NONE,
        {
          key: "odd",
          text: "Select Odd Row",
          onSelect: (changableRowKeys) => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return false;
              }
              return true;
            });
            setSelectedRowkeys(newSelectedRowKeys);
          },
        },
        {
          key: "even",
          text: "Select Even Row",
          onSelect: (changableRowKeys) => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return true;
              }
              return false;
            });
            setSelectedRowkeys(newSelectedRowKeys);
          },
        },
      ],
    };
    return (
      <Table
        style={{ margin: 32 }}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        scroll={{ x: "false" }}
        size="small"
        title={() => <Title level={5}>Group</Title>}
      />
    );
  };

  if (!loading)
    return (
      <Layout
        style={{
          ...styles.mainArea,
          background: "white",
          marginTop: -32,
          height: "120%",
        }}
      >
        <Content>
          <div
            className="row"
            style={{
              padding: 32,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LoadingSearch></LoadingSearch>
          </div>
        </Content>
      </Layout>
    );

  return (
    <>
      <Layout style={styles.mainArea}>
        <Content>
          <div
            className="row"
            style={{
              padding: 16,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                background: "white",
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                width: "80%",
                boxShadow: "10px 10px #27AE60",
              }}
            >
              <TableReportUser></TableReportUser>

              <div
                className="row"
                style={{
                  justifyContent: "flex-end",
                  alignItems: "center",
                  width: "100%",
                  marginBottom: 16,
                  marginTop: -16,
                }}
              >
                <Button
                  className="green-button"
                  onClick={deleteSelectedGroups}
                  type="primary"
                  style={{
                    color: "white",
                    fontWeight: 500,
                    width: 120,
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </>
  );
}

export default GroupAdminManagement;
