import React, { useState, useEffect, useRef, useMemo } from "react";
import { Layout, Typography, Table, Button, message, Modal } from "antd";
import styles from "./styles.js";
import Navbar from "../../../components/Navbar/Navbar";
import ReportUserCard from "../../../components/ReportUserCard/ReportUserCard";
import COLOR from "../../../constants/colors";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import * as api from "../../../api/report";

const { Content } = Layout;
const { Title, Text } = Typography;

function ReportUserPage() {
  const [user, setUser] = useLocalStorage("user");
  const [selectedRowkeys, setSelectedRowkeys] = useState([]);
  const [listReports, setListReports] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    api
      .fetchAllReportUser()
      .then((res) => {
        console.log("report", res.data);
        if (res.data instanceof Array) setListReports(res.data);
        else setListReports([]);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [update]);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      width: "20%",
    },
    {
      title: "Name",
      dataIndex: "name",
      width: "30%",
    },
    {
      title: "Number of Reports",
      dataIndex: "numberOfReports",
      width: "20%",
    },
    {
      title: "Number of Groups",
      dataIndex: "numberOfGroups",
      width: "20%",
    },
  ];

  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowkeys(selectedRowKeys);
    console.log("rows", selectedRowkeys);
  };

  const data = [];
  for (let i = 0; i < listReports.length; i++) {
    data.push({
      key: i,
      stt: i + 1,
      name: listReports[i].name,
      numberOfReports: listReports[i].numberOfReports,
      numberOfGroups: listReports[i].numberOfGroups,
      _id: listReports[i]._id,
    });
  }
  function info(name, listReports) {
    Modal.info({
      title: `List Reports of ${name}`,
      footer: null,
      width: "70%",
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
        onRow={(record, rowIndex) => {
          return {
            onDoubleClick: (event) => {
              api
                .fetchAllReportOfAnUser(data[rowIndex]._id)
                .then((res) => {
                  info(data[rowIndex].name, res.data);
                })
                .catch((e) => {
                  console.log(e);
                });
            }, // double click row
          };
        }}
        style={{ width: "80%" }}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
      />
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
          width: "80%",
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
  return (
    <>
      <Layout>
        <Navbar />
        <Layout>
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
              <ButtonFooter></ButtonFooter>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}

export default ReportUserPage;
