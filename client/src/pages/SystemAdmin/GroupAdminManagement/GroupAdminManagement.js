import React, { useState, useEffect } from "react";
import { Layout, Typography, Table, Button, message, Modal } from "antd";
import styles from "./styles.js";
import Navbar from "../../../components/Navbar/Navbar";
import ReportUserCard from "../../../components/ReportUserCard/ReportUserCard";
import * as apiGroup from "../../../api/group";
import { limitNameLength } from "../../../utils/limitNameLength.js";
import LoadingSearch from "../../../components/Loading/LoadingSearch";
import FriendCard from "../../../components/FriendCard/FriendCard";
import { useHistory } from "react-router-dom";
import COLOR from "../../../constants/colors.js";

const { Content } = Layout;
const { Title, Text } = Typography;

function GroupAdminManagement() {
  const [selectedRowkeys, setSelectedRowkeys] = useState([]);
  const [listReports, setListReports] = useState([]);
  // const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

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
    const CardMember = ({ avatarUrl, name }) => {
      return (
        <div
          className="row"
          style={{
            width: "100%",
            borderRadius: 20,
            alignItems: "center",
            background: COLOR.greenSmoke,
            margin: 8,
            paddingLeft: 16,
            height: 80,
          }}
        >
          <img
            src={avatarUrl}
            width={50}
            height={50}
            alt={"avt"}
            style={{ borderRadius: 50, marginRight: 16, objectFit: "cover" }}
          ></img>
          <Title level={5}>{name}</Title>
        </div>
      );
    };
    Modal.info({
      title: `List members of ${name}`,
      footer: null,
      width: "50%",
      content: (
        <div>
          {listMembers?.map((member, i) => {
            console.log("member", member);
            return (
              <CardMember
                name={member.userId?.name}
                avatarUrl={member.userId?.avatarUrl}
              ></CardMember>
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
      render: (text) => <div className="clickable">{text}</div>,
      onCell: function (record, rowIndex) {
        return {
          onClick: (event) => {
            history.push(`/group/${record._id}/main`);
          },
        };
      },
    },
    {
      title: "Members",
      dataIndex: "members",
      width: "15%",
      align: "center",
      render: (text) => <div className="clickable">{text}</div>,
      onCell: function (record, rowIndex) {
        return {
          onClick: (event) => {
            apiGroup
              .getListMembers(record._id)
              .then((res) => {
                infoMember(record.name, res.data);
              })
              .catch((e) => {
                console.log(e);
              });
          },
        };
      },
    },
    {
      title: "Posts",
      dataIndex: "posts",
      width: "15%",
      align: "center",
      render: (text) => <div className="clickable">{text}</div>,
    },
    {
      title: "Reports",
      dataIndex: "reports",
      width: "15%",
      align: "center",
      render: (text) => <div className="clickable">{text}</div>,
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
