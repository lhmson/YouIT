import React, { useEffect, useState } from "react";
import * as postAPI from "../../api/post";
import { Chart } from "./Chart";

export const GroupStatistics = () => {
  const [data, setData] = useState(null);

  const handleFetchData = async (range, timeString) => {
    const result = await postAPI.fetchCountPosts(range, timeString);
    const newData = {
      labels: result.data.labels,
      datasets: [
        {
          label: "Wall posts",
          data: result.data.wallPosts,
        },
        {
          label: "Group posts",
          data: result.data.groupPosts,
        },
      ],
    };
    setData(newData);
  };

  return (
    <Chart
      data={data}
      onFetchData={handleFetchData}
      title="Posts"
      colorIndex={1}
    />
  );
};

export default GroupStatistics;
