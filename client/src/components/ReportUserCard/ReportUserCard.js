import React, { useState, useEffect, useMemo } from "react";
import { Button, Typography, List, message } from "antd";
import { Avatar, Image } from "antd";
import styles from "./styles.js";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useDispatch } from "react-redux";

const { Text } = Typography;

function ReportUserCard({ contentReport, nameReportedBy }) {
  return (
    <>
      <div style={styles.card}>
        <div
          className="row"
          style={{
            justifyContent: "left",
            padding: 16,
            paddingLeft: 64,
            paddingRight: 64,
            alignItems: "center",
          }}
        >
          <Text
            style={{ fontSize: 16, fontWeight: 400, justifyContent: "left" }}
          >
            {contentReport}
          </Text>
        </div>
        <div
          className="row"
          style={{
            justifyContent: "flex-end",
            paddingRight: 64,
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: 800, marginRight: 16 }}>Reported by </Text>
          <Avatar
            size={40}
            src="https://i.pinimg.com/564x/78/1d/73/781d736622999244f10a4fecb45e2534.jpg"
          />
          <Text style={{ fontWeight: 800, marginLeft: 8 }}>
            {" "}
            {nameReportedBy}
          </Text>
        </div>
      </div>
    </>
  );
}

export default ReportUserCard;
