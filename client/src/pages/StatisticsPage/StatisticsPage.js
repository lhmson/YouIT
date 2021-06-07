import React, { useEffect, useState } from "react";
import { Button, Typography, Col, Layout } from "antd";
import styles from "./styles";
import { Link } from "react-router-dom";
import { Navbar } from "../../components";
import UsersStatistics from "../../components/Chart/UserStatistics";
import PostStatistics from "../../components/Chart/PostStatistics";
const { Title } = Typography;

export const StatisticsPage = ({}) => {
  const chartArray = [<UsersStatistics />, <PostStatistics />];
  return (
    <div className="p-5">
      <div className="row">
        {chartArray.map((c) => {
          return <div className="col-lg-6">{c}</div>;
        })}
      </div>
    </div>
  );
};

export default StatisticsPage;
