import React, { useEffect } from "react";
import { Typography } from "antd";
import UsersStatistics from "../../components/Chart/UserStatistics";
import PostStatistics from "../../components/Chart/PostStatistics";
import GroupStatistics from "../../components/Chart/GroupStatistics";

export const StatisticsPage = () => {
  return (
    <div className="p-5">
      <div className="row">
        <div className="col-lg-6">
          <UsersStatistics />
        </div>
        <div className="col-lg-6">
          <PostStatistics />
        </div>
        <div className="col-lg-6">
          <GroupStatistics />
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
