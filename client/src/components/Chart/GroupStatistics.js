import React, { useState } from "react";
import * as groupAPI from "../../api/group";
import { Chart } from "./Chart";

export const GroupStatistics = () => {
  const [data, setData] = useState(null);

  const handleFetchData = async (range, timeString) => {
    const result = await groupAPI.fetchCountGroups(range, timeString);
    const newData = {
      labels: result.data.labels,
      datasets: [
        {
          label: "Public groups",
          data: result.data.publicGroups,
        },
        {
          label: "Private groups",
          data: result.data.privateGroups,
        },
      ],
    };
    console.log("data", newData);
    setData(newData);
  };

  return (
    <Chart
      data={data}
      onFetchData={handleFetchData}
      title="Groups"
      colorIndex={3}
      defaultView="year"
    />
  );
};

export default GroupStatistics;
