import React, { useEffect } from "react";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import { Tabs, Typography, DatePicker } from "antd";
import moment from "moment";
import { useRef } from "react";
const { Title } = Typography;
const { TabPane } = Tabs;

// colorIndex : see chartColors
export const Chart = ({
  title,
  data,
  onFetchData,
  colorIndex,
  defaultView,
}) => {
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
  const range = useRef(defaultView || "week");
  const time = useRef(moment());
  const dataLength = data?.datasets?.length;
  const chartType = useRef();
  let styledData = data;

  useEffect(() => {
    onFetchData(range.current, time?.current?.format());
  }, []);

  const countDataItems = () => {
    let temp = 0;
    data?.datasets?.map((d) => {
      d.data.map((item) => {
        temp += item;
      });
    });
    return temp;
  };

  const getChartTitle = () => {
    return {
      display: true,
      text: `${title} ${chartType.current} - Total: ${countDataItems()}`,
    };
  };

  const handleChangeRange = (value) => {
    range.current = value;
    time.current = moment();
    onFetchData(range.current, time?.current?.format());
  };

  const handleChangeTime = (value) => {
    time.current = value;
    onFetchData(range.current, time?.current?.format());
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
    switch (range.current) {
      case "week":
        chartType.current = "Bar Chart";
        return (
          <Bar
            data={styledData}
            options={{
              plugins: {
                title: getChartTitle(),
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
                title: getChartTitle(),
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
                title: getChartTitle(),
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
      default:
        return <div></div>;
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
          activeKey={range.current}
        >
          <TabPane tab="Week" key="week" />
          <TabPane tab="Month" key="month" />
          <TabPane tab="Year" key="year" />
        </Tabs>
        <DatePicker
          onChange={handleChangeTime}
          picker={range.current}
          disabledDate={disabledDate}
          value={time.current}
        />
      </div>
      {chart()}
    </div>
  );
};
