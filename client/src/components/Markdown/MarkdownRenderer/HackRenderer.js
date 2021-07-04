import React, { useState } from "react";
import { Button, Input, message, Select, Typography, Spin } from "antd";
import { languageName } from "./constant";
import TextArea from "antd/lib/input/TextArea";
import COLOR from "../../../constants/colors";
import Loading from "../../../components/Loading/Loading";
import { LoadingOutlined } from "@ant-design/icons";
const { Text } = Typography;

const SampleCaseRes = ({ input, expect, output }) => {
  return (
    <div>
      <h5 className="bold">{`${
        expect !== output ? "❌" : "✔️"
      } Sample test case 0`}</h5>
      <div
        style={{
          backgroundColor: COLOR.whiteSmoke,
          padding: 14,
          paddingRight: 20,
          marginBottom: 12,
        }}
        className="enable-horizontal-scroll"
      >
        <Text strong style={{ color: COLOR.darkGreen }}>
          Input
        </Text>
        <br />
        <Text>{input}</Text>
      </div>

      <div
        style={{
          backgroundColor: COLOR.whiteSmoke,
          padding: 14,
          paddingRight: 20,
          marginBottom: 12,
        }}
        className="enable-horizontal-scroll"
      >
        {expect !== output && [
          <Text strong style={{ color: COLOR.darkGreen }}>
            Expected ouput
          </Text>,
          <br />,
          <Text>{expect}</Text>,
          <br />,
        ]}
        <Text
          strong
          style={{ color: expect !== output ? COLOR.red : COLOR.darkGreen }}
        >
          Your ouput
        </Text>
        <br />
        <Text>{output}</Text>
      </div>
    </div>
  );
};

export const RunCodeRes = () => {
  return (
    <div>
      <h4 className="bold green">Congratulations!</h4>
      <p>You have passed the sample test cases.</p>
      <SampleCaseRes input={"3\n1 2 3"} expect={"6"} output={"5"} />
    </div>
  );
};

export const SubmitCodeRes = () => {
  return (
    <div>
      <h4 className="bold green">Running test cases...</h4>
      <div className="row ml-0" style={{ alignItems: "center" }}>
        <Spin
          style={{ marginTop: -16 }}
          indicator={
            <LoadingOutlined
              style={{ fontSize: 16, color: COLOR.green }}
              spin
            />
          }
        />

        <p className="ml-3">Test case 1</p>
      </div>
    </div>
  );
};

export const HackRenderer = () => {
  const langOptions = languageName.map((l) => {
    return {
      value: l,
    };
  });
  const [lang, setLang] = useState("c");
  return (
    <div className="disable-horizontal-scroll">
      <div
        className="row ml-1 mb-2"
        style={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <h2>Hack it!</h2>
        <div className="row mr-3 ml-1">
          <p className="mr-3" style={{ marginTop: 2 }}>
            Choose language
          </p>
          <div style={{ width: 150 }}>
            <Select
              className="green"
              style={{ width: "100%", fontSize: "16px" }}
              options={langOptions}
              dropdownStyle={{ fontSize: "16px" }}
              value={lang}
              onChange={(value) => {
                setLang(value);
              }}
            />
          </div>
        </div>
      </div>
      <TextArea
        placeholder="// Write your code here"
        autoSize={{ minRows: 12, maxRows: 24 }}
      />
      <div
        className="row ml-1 mb-2 mt-3"
        style={{ flexDirection: "row-reverse", marginRight: 1 }}
      >
        <Button className="green-button" size="large">
          Submit code
        </Button>
        <Button
          htmlType="button"
          className="white-button mr-3"
          size="large"
          onClick={() => {}}
        >
          Run code
        </Button>
      </div>
      {/* <RunCodeRes /> */}
      <SubmitCodeRes />
    </div>
  );
};
