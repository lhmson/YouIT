import React, { useState, useEffect } from "react";
import { Layout, Typography, Table, Button, message, Modal } from "antd";
import styles from "./styles.js";
import ReportUserCard from "../../../components/ReportUserCard/ReportUserCard";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import * as api from "../../../api/report";
import * as apiGroup from "../../../api/group";
import { limitNameLength } from "../../../utils/limitNameLength.js";
import LoadingSearch from "../../../components/Loading/LoadingSearch";
import COLOR from "../../../constants/colors.js";
import { useHistory } from "react-router-dom";
import GroupJoinedCard from "../../../components/GroupCard/GroupJoinedCard";
import FeedPost from "../../../components/Posts/FeedPosts/FeedPost/FeedPost";

const { Content } = Layout;
const { Title, Text } = Typography;

function UserAdminManagement() {
  const [user, setUser] = useLocalStorage("user");
  const [selectedRowkeys, setSelectedRowkeys] = useState([]);
  const [listReports, setListReports] = useState([]);
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setLoading(false);
    api
      .fetchAllReportUser()
      .then((res) => {
        // console.log("report", res.data);
        if (res.data instanceof Array) setListReports(res.data);
        else setListReports([]);
        setLoading(true);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [update]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: "5%",
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "name",
      width: "30%",
      align: "center",
      onCell: function (record, rowIndex) {
        return {
          onClick: (event) => {
            console.log("record", record);
            history.push(`/userinfo/${record._id}`);
          },
        };
      },
    },
    {
      title: "Reports",
      dataIndex: "numberOfReports",
      width: "20%",
      align: "center",
      onCell: function (record, rowIndex) {
        return {
          onClick: (event) => {
            api
              .fetchAllReportOfAnUser(record._id)
              .then((res) => {
                info(record.name, res.data);
              })
              .catch((e) => {
                console.log(e);
              });
          },
        };
      },
    },
    {
      title: "Groups",
      dataIndex: "numberOfGroups",
      width: "20%",
      align: "center",
      onCell: function (record, rowIndex) {
        return {
          onClick: (event) => {
            api
              .fetchAllGroupsOfAnUser(record._id)
              .then((res) => {
                console.log(res.data);
                infoGroup(record.name, res.data);
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
      dataIndex: "numberOfPosts",
      width: "20%",
      align: "center",
      // onCell: function (record, rowIndex) {
      //   return {
      //     onClick: (event) => {
      //       api
      //         .fetchAllPostsOfAnUser(record._id)
      //         .then((res) => {
      //           console.log(res.data);
      //           infoPost(record.name, res.data);
      //         })
      //         .catch((e) => {
      //           console.log(e);
      //         });
      //     },
      //   };
      // },
    },
  ];

  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowkeys(selectedRowKeys);
    // console.log("rows", selectedRowkeys);
  };

  const data = [];
  for (let i = 0; i < listReports.length; i++) {
    data.push({
      key: i,
      id: i + 1,
      name: limitNameLength(listReports[i].name, 40),
      numberOfReports: listReports[i].numberOfReports,
      numberOfGroups: listReports[i].numberOfGroups,
      numberOfPosts: listReports[i].numberOfPosts,
      _id: listReports[i]._id,
    });
  }

  function info(name, listReports) {
    Modal.info({
      title: `List Reports of ${name}`,
      footer: null,
      width: "50%",
      content: (
        <div>
          {listReports.map((report) => (
            <ReportUserCard
              contentReport={report.content}
              nameReportedBy={report.nameUserReport}
            ></ReportUserCard>
          ))}
        </div>
      ),
      onOk() {},
    });
  }

  function infoGroup(name, listGroups) {
    Modal.info({
      title: `List Groups of ${name}`,
      footer: null,
      width: "70%",
      content: (
        <div>
          {listGroups?.map((group, i) => {
            return (
              <GroupJoinedCard
                _id={group._id}
                nameGroup={group.name}
                description={group.description}
                topic={group.topic}
                totalMembers={group.listMembers?.length}
                joined={true}
                update={update}
                setUpdate={setUpdate}
                backgroundUrl={group.backgroundUrl}
                isAdmin={true}
              ></GroupJoinedCard>
            );
          })}
        </div>
      ),
      onOk() {},
    });
  }

  function infoPost(name, listPosts) {
    Modal.info({
      title: `List Posts of ${name}`,
      footer: null,
      width: "70%",
      content: (
        <div>
          {listPosts?.map((post, i) => {
            return <FeedPost key={post._id} post={post}></FeedPost>;
          })}
        </div>
      ),
      onOk() {},
    });
  }
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
      <div
        style={{
          alignSelf: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Table
          style={{ margin: 32 }}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          scroll={{ x: "false" }}
          size="small"
          title={() => <Title level={5}>User</Title>}
        />
      </div>
    );
  };

  const ButtonFooter = () => {
    const banUser = async () => {
      for (let i = 0; i < selectedRowkeys.length; i++) {
        await api
          .banUser(data[selectedRowkeys[i]]._id)
          .then((res) => {})
          .catch((e) => {
            console.log(e);
          });
      }
      message.success("Ban users successfully");
      setUpdate(!update);
    };

    const deleteAllReportsUser = async () => {
      for (let i = 0; i < selectedRowkeys.length; i++) {
        await api
          .deleteAllReportsUser(data[selectedRowkeys[i]]._id)
          .then((res) => {})
          .catch((e) => {
            console.log(e);
          });
      }
      message.success("Delete reports successfully");
      setUpdate(!update);
    };

    return (
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
          onClick={deleteAllReportsUser}
          className="mb-2"
          type="primary"
          style={{
            background: "#27AE60",
            borderColor: "#27AE60",
            color: "white",
            fontWeight: 500,
            width: 150,
            marginRight: 64,
          }}
        >
          Delete Reports
        </Button>

        <Button
          onClick={banUser}
          className="mb-2"
          type="primary"
          style={{
            background: "red",
            borderColor: "red",
            color: "white",
            fontWeight: 500,
            width: 150,
          }}
        >
          Ban Users
        </Button>
      </div>
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
              <ButtonFooter></ButtonFooter>
            </div>
          </div>
        </Content>
      </Layout>
    </>
  );
}

export default UserAdminManagement;
