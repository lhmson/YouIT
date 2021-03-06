import React, { useEffect, useState } from "react";
import * as userAPI from "../../api/user";
import { Chart } from "./Chart";

export const UsersStatistics = () => {
  const [data, setData] = useState(null);

  const handleFetchData = async (range, timeString) => {
    const result = await userAPI.fetchNewUsers(range, timeString);
    const newData = {
      labels: result.data.labels,
      datasets: [
        {
          label: "New user",
          data: result.data.data,
        },
      ],
    };
    setData(newData);
  };

  return (
    <Chart
      data={data}
      onFetchData={handleFetchData}
      title="Users"
      colorIndex={0}
      defaultView="month"
    />
  );
};

export default UsersStatistics;
