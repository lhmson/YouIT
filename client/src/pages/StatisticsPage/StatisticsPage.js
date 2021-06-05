import React, { useEffect, useState } from "react";
import { Button, Typography, Col, Layout } from "antd";
import styles from "./styles";
import { Link } from "react-router-dom";
import { Navbar } from "../../components";
import { UsersStatistics } from "../../components/Chart/Chart";
const { Title } = Typography;

const labels = ["January", "February", "March", "April", "May", "June"];
const data = {
  labels: labels,
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: [0, 10, 5, 2, 20, 30, 45],
    },
  ],
};

export const StatisticsPage = ({}) => {
  return (
    <div className="p-5">
      <div className="row">
        <div className="col-lg-6">
          <UsersStatistics />
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
