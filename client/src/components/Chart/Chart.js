import React, { useEffect, useState } from "react";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import { Tabs, Typography, Select, DatePicker, message } from "antd";
import moment from "moment";
import * as userAPI from "../../api/user";
import { useRef } from "react";
const { Title } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

// colorIndex : see chartColors
export const Chart = ({ title, data, onFetchData, colorIndex }) => {
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
  const [chartTitle, setChartTitle] = useState(null);
  const dataLength = data?.datasets?.length;
  const chartType = useRef();
  let styledData = data;

  const countDataItems = () => {
    let temp = 0;
    data?.datasets?.map((d) => {
      d.data.map((item) => {
        temp += item;
      });
    });
    return temp;
  };

  useEffect(() => {
    setChartTitle({
      display: true,
      text: `${title} ${chartType.current} - Total: ${countDataItems()}`,
    });
  }, [title, data, range, time]);

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
        fill: "start",
        borderWidth: 2,
      };
    }
    switch (range) {
      case "week":
        chartType.current = "Bar Chart";
        return (
          <Bar
            data={styledData}
            options={{
              plugins: {
                title: chartTitle,
              },
              responsive: true,
            }}
          />
        );
      case "month":
        chartType.current = "Area Chart";

        return (
          <Line
            data={styledData}
            options={{
              plugins: {
                title: chartTitle,
              },
              responsive: true,
            }}
          />
        );
      case "year":
        chartType.current = "Stacked Bar Chart";

        return (
          <Bar
            data={styledData}
            options={{
              plugins: {
                title: chartTitle,
              },
              responsive: true,
              scales: {
                x: {
                  stacked: true,
                },
                y: {
                  stacked: true,
                },
              },
            }}
          />
        );
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
