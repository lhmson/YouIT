import React, { useState, useEffect, useRef, useMemo } from "react";
import { Layout, Typography, Input } from "antd";
import styles from "./styles.js";

import Navbar from "../../../components/Navbar/Navbar";

import ReportUserCard from "../../../components/ReportUserCard/ReportUserCard";

import COLOR from "../../../constants/colors";
import * as api from "../../../api/reportUser";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { SearchOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Title, Text } = Typography;

function ReportUserPage() {
  const [user, setUser] = useLocalStorage("user");
  const inputRef = useRef();
  const [listReports, setListReports] = useState([]);
  const [txtSearch, setTxtSearch] = useState("");
  const [mode, setMode] = useState("Friends");
  const [updateData, setUpdateData] = useState(false);

  useEffect(() => {
    api
      .fetchAllReportUser()
      .then((res) => {
        console.log(res.data);
        if (res.data instanceof Array) setListReports(res.data);
        else setListReports([]);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [user, updateData]);

  let listFilter = listReports.filter((report) =>
    report.content?.toLowerCase().includes(txtSearch.toLowerCase())
  );

  const listReportsCard = useMemo(
    () =>
      listFilter?.map((report, i) => {
        return (
          <ReportUserCard
            idReport={report._id}
            dateReport={report._dateReport}
            contentReport={report.content}
            nameReportedBy={report.nameReportedBy}
            nameReport={report.nameReport}
            setUpdateData={setUpdateData}
            updateData={updateData}
          ></ReportUserCard>
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
                  marginTop: 32,
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
                    <Title>Report User</Title>
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
                  {listReportsCard}
                </div>
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}

export default ReportUserPage;
