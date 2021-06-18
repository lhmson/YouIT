import React, { useState, useEffect, useRef, useMemo } from "react";
import { Layout, Typography, Table, Button } from "antd";
import styles from "./styles.js";

import Navbar from "../../../components/Navbar/Navbar";

import ReportUserCard from "../../../components/ReportUserCard/ReportUserCard";

import COLOR from "../../../constants/colors";
import * as api from "../../../api/reportUser";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

const { Content } = Layout;
const { Title, Text } = Typography;

function ReportUserPage() {
  const [user, setUser] = useLocalStorage("user");
  const [selectedRowkeys, setSelectedRowkeys] = useState([]);

  // useEffect(() => {
  //   api
  //     .fetchAllReportUser()
  //     .then((res) => {
  //       console.log(res.data);
  //       if (res.data instanceof Array) setListReports(res.data);
  //       else setListReports([]);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }, [user]);

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
      dataIndex: "reports",
      width: "20%",
    },
    {
      title: "Number of Groups",
      dataIndex: "groups",
      width: "20%",
    },
  ];

  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowkeys(selectedRowKeys);
  };

  const data = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      stt: i,
      name: `Edward King ${i}`,
      reports: 32,
      groups: 12,
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
              console.log("alo");
            }, // double click row
          };
        }}
        style={{ width: "800%" }}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
      />
    );
  };

  const ButtonFooter = () => {
    return (
      <div
        className="row"
        style={{ justifyContent: "flex-end", alignItems: "center" }}
      >
        <Button
          onClick={() => {}}
          className="mb-2"
          type="primary"
          style={{
            background: "red",
            borderColor: "red",
            color: "white",
            fontWeight: 500,
            width: 100,
            marginRight: 64,
          }}
        >
          Ban
        </Button>

        <Button
          onClick={() => {}}
          className="mb-2"
          type="primary"
          style={{
            background: "#27AE60",
            borderColor: "#27AE60",
            color: "white",
            fontWeight: 500,
            width: 100,
            marginRight: 64,
          }}
        >
          Accept
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
