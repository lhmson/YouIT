import React, { useState, useEffect, useMemo } from "react";
import { Button, Typography, List, message } from "antd";
import { Avatar, Image } from "antd";
import styles from "./styles.js";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useDispatch } from "react-redux";

const { Text } = Typography;

function ReportUserCard({
  idReport,
  dateReport,
  contentReport,
  nameReportedBy,
  nameReport,
  setUpdateData,
  updateData,
}) {
  return (
    <>
      <div style={styles.card}>
        <div className="row ml-2" style={{ justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              minWidth: 600,
            }}
          >
            <Avatar
              size={72}
              src="https://i.pinimg.com/564x/1e/5f/76/1e5f766fe0d03b3a91f92dc27a8fdb42.jpg"
            />

            <div className="col-8" style={{ alignSelf: "center" }}>
              <Text style={styles.textUser}>
                {nameReport ?? "Lalisa Manobal"}
              </Text>
              <div style={{ marginTop: 0 }}></div>
              <Text>Date report : {dateReport}</Text>
            </div>
            <div
              style={{
                marginLeft: 0,
                justifyContent: "center",
                flex: 1,
                display: "flex",
              }}
            ></div>
          </div>

          <div
            className="mr-3"
            style={{
              marginTop: 16,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              onClick={() => {}}
              className="mb-2"
              type="primary"
              style={{
                background: "#27AE60",
                borderColor: "#27AE60",
                color: "white",
                fontWeight: 500,
                marginRight: 16,
                width: 100,
              }}
            >
              Accept
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
              Deny
            </Button>
          </div>
        </div>
        <div
          className="row"
          style={{
            justifyContent: "center",
            padding: 16,
            paddingLeft: 64,
            paddingRight: 64,
            alignItems: "center",
          }}
        >
          <Text
            style={{ fontSize: 16, fontWeight: 400, justifyContent: "center" }}
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
          <Text style={{ fontWeight: 800, marginLeft: 8 }}> {nameReportedBy}</Text>
        </div>
      </div>
    </>
  );
}

export default ReportUserCard;
