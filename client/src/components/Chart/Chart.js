import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Tabs, Typography, Select, DatePicker, message } from "antd";
import moment from "moment";
import * as userAPI from "../../api/user";
const { Title } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

export const UsersStatistics = () => {
  const [data, setData] = useState(null);

  const handleFetchData = async (range, timeString) => {
    const result = await userAPI.fetchNewUsers(range, timeString);
    const newData = {
      labels: result.data.labels,
      datasets: [
        {
          label: "New users",
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
      type="area"
      title="New users"
      colorIndex={0}
    />
  );
};

// colorIndex : see chartColors
export const Chart = ({ title, data, onFetchData, type, colorIndex }) => {
  const chartColors = [
    {
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
    },
    {
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
    },
    {
      backgroundColor: "rgba(153, 102, 255, 0.2)",
      borderColor: "rgba(153, 102, 255, 1)",
    },
    {
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
    },
    {
      backgroundColor: "rgba(255, 206, 86, 0.2)",
      borderColor: "rgba(255, 206, 86, 1)",
    },
  ];
  const [range, setRange] = useState("week");
  const [time, setTime] = useState(moment());
  const dataLength = data?.datasets?.length;
  let styledData = data;

  useEffect(() => {
    onFetchData(range, time.format());
  }, [range, time]);

  const handleChangeRange = (value) => {
    setRange(value);
    setTime(moment());
  };

  const handleChangeTime = (value) => {
    setTime(value);
  };

  const chart = () => {
    for (let i = 0; i < dataLength; i++) {
      styledData.datasets[i] = {
        ...styledData.datasets[i],
        ...chartColors[(i + colorIndex || 0) % chartColors.length],
        fill: type === "area" ? "start" : false,
        borderWidth: 2,
      };
    }
    switch (type) {
      case "line":
        return <Line data={styledData} />;
      case "bar":
        return <Bar data={styledData} />;
      case "area":
        return <Line data={styledData} />;
    }
  };

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current > moment().endOf("day");
  }

  return (
    <div className="p-2">
      <Title>{title}</Title>
      <div className="row justify-content-between align-items-center pl-3 pr-4">
        <Tabs
          onChange={handleChangeRange}
          style={{ width: 200 }}
          activeKey={range}
        >
          <TabPane tab="Week" key="week" />
          <TabPane tab="Month" key="month" />
          <TabPane tab="Year" key="year" />
        </Tabs>
        <DatePicker
          onChange={handleChangeTime}
          picker={range}
          disabledDate={disabledDate}
          value={time}
        />
      </div>
      {chart()}
    </div>
  );
};
