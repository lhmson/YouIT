import React, { useState, useEffect } from "react";
import { Layout, Typography, Table, Button, message } from "antd";
import styles from "./styles.js";
import Navbar from "../../../components/Navbar/Navbar";
import ReportUserCard from "../../../components/ReportUserCard/ReportUserCard";
import * as apiGroup from "../../../api/group";
import { limitNameLength } from "../../../utils/limitNameLength.js";
import LoadingSearch from "../../../components/Loading/LoadingSearch";

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

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: "20%",
    },
    {
      title: "Group Name",
      dataIndex: "name",
      width: "30%",
    },
    {
      title: "Reports",
      dataIndex: "reports",
      width: "20%",
    },
    {
      title: "Members",
      dataIndex: "members",
      width: "20%",
    },
    {
      title: "Posts",
      dataIndex: "posts",
      width: "20%",
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

  // const getReportInfo = (name, listReports) => {
  //   Modal.info({
  //     title: `List Reports of ${name}`,
  //     footer: null,
  //     width: "70%",
  //     content: (
  //       <div>
  //         {listReports.map((report) => (
  //           <ReportUserCard
  //             contentReport={report.content}
  //             nameReportedBy={report.nameUserReport}
  //           ></ReportUserCard>
  //         ))}
  //       </div>
  //     ),
  //     onOk() {},
  //   });
  // };

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
    message.success("Delete reports successfully");
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
        // onRow={(record, rowIndex) => {
        //   return {
        //     onDoubleClick: (event) => {
        //       api
        //         .fetchAllReportOfAnUser(data[rowIndex]._id)
        //         .then((res) => {
        //           getReportInfo(data[rowIndex].name, res.data);
        //         })
        //         .catch((e) => {
        //           console.log(e);
        //         });
        //     }, // double click row
        //   };
        // }}
        style={{ width: "80%" }}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
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
              padding: 32,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TableReportUser></TableReportUser>
          </div>
          {/* <ButtonFooter></ButtonFooter> */}
          <div
            className="row"
            style={{
              justifyContent: "flex-end",
              alignItems: "center",
              width: "90%",
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
        </Content>
      </Layout>
    </>
  );
}

export default GroupAdminManagement;
