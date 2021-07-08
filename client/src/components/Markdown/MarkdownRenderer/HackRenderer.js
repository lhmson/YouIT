import React, { useState, useEffect, useRef } from "react";
import { Button, Input, message, Select, Typography, Spin } from "antd";
import { languageName } from "./constant";
import TextArea from "antd/lib/input/TextArea";
import COLOR from "../../../constants/colors";
import Loading from "../../../components/Loading/Loading";
import { LoadingOutlined } from "@ant-design/icons";
import * as runnerApis from "../../../api/compiler";
import { toApiLanguage } from "./CodeRenderer";
const { Text } = Typography;

export const HackRenderer = ({ dataset }) => {
  const langOptions = languageName.map((l) => {
    return {
      value: l,
    };
  });
  const [lang, setLang] = useState("c");
  const [code, setCode] = useState("");
  const [showRunCodeRes, setShowRunCodeRes] = useState(false);
  const [showSubmitCodeRes, setShowSubmitCodeRes] = useState(false);

  const resetResult = () => {
    setShowRunCodeRes(false);
    setShowSubmitCodeRes(false);
  };

  const onCodeChange = (code) => {
    setCode(code?.target?.value);
    resetResult();
  };

  const handleRunCode = async () => {
    setShowSubmitCodeRes(false);
    setShowRunCodeRes(true);
  };

  const handleSubmitCode = () => {
    setShowRunCodeRes(false);
    setShowSubmitCodeRes(true);
  };

  const RunningTest = ({ no, failed }) => {
    return (
      <div className="row ml-0" style={{ alignItems: "center" }}>
        {!failed && (
          <Spin
            style={{ marginTop: -16 }}
            indicator={
              <LoadingOutlined
                style={{ fontSize: 16, color: COLOR.green }}
                spin
              />
            }
          />
        )}

        <p className="ml-0">{`${failed ? "❌" : ""} Test case ${no}`}</p>
      </div>
    );
  };

  const SampleCaseRes = ({ no, input, expect, resCallback }) => {
    const [result, setResult] = useState({ state: null, text: null });
    const onResult = (r) => {
      setResult(r);
      if (r.text?.toString().trim() === expect?.toString().trim())
        resCallback(true);
      else resCallback(false);
    };
    useEffect(() => {
      handleExecuteCode(code, lang, input, onResult);
    }, []);
    if (!result.state)
      return (
        <div className="mb-3">{!result.state && <RunningTest no={no} />}</div>
      );
    return (
      <div className="mb-3">
        {result.text?.toString().trim() === expect?.toString().trim()
          ? [
            <h5 className="bold">{`✔️ Sample test case ${no}`}</h5>,
            <div
              style={{
                backgroundColor: "white",
                boxShadow: "0px 7px 21px 0px rgba(36, 36, 36, 0.12)",
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
            </div>,
            <div
              className="shadow"
              style={{
                backgroundColor: "white",
                boxShadow: "0px 7px 21px 0px rgba(36, 36, 36, 0.12)",
                padding: 14,
                paddingRight: 20,
                marginBottom: 12,
              }}
              className="enable-horizontal-scroll"
            >
              <Text strong style={{ color: COLOR.darkGreen }}>
                Ouput
              </Text>
              <br />
              <Text>{result.text}</Text>
            </div>,
          ]
          : [
            <h5 className="bold">{`❌ Sample test case ${no}`}</h5>,
            <div
              style={{
                backgroundColor: "white",
                padding: 14,
                paddingRight: 20,
                marginBottom: 12,
                boxShadow: "0px 7px 21px 0px rgba(36, 36, 36, 0.12)",
              }}
              className="enable-horizontal-scroll"
            >
              <Text strong style={{ color: COLOR.darkGreen }}>
                Input
              </Text>
              <br />
              <Text>{input}</Text>
            </div>,

            <div
              style={{
                backgroundColor: "white",
                padding: 14,
                paddingRight: 20,
                marginBottom: 12,
                boxShadow: "0px 7px 21px 0px rgba(36, 36, 36, 0.12)",
              }}
              className="enable-horizontal-scroll"
            >
              <Text strong style={{ color: COLOR.darkGreen }}>
                Expected ouput
              </Text>
              <br />
              <Text>{expect}</Text>
              <br />
              <Text
                strong
                style={{
                  color: COLOR.red,
                }}
              >
                Your ouput
              </Text>
              <br />
              <Text>{result.text}</Text>
            </div>,
          ]}
      </div>
    );
  };

  const RunCodeRes = () => {
    const [status, setStatus] = useState({
      heading: "Compiling...",
      color: "green",
      errorText: null,
    });
    const countChecked = useRef(0);

    const handlePreResult = (r) => {
      if (r.state && r.state !== "Success") {
        setStatus({ heading: r.state, color: "red", errorText: r.text });
      } else {
        setStatus({ heading: "Running...", color: "green" });
      }
    };

    const handleResult = (correct) => {
      countChecked.current++;
      if (correct === false) {
        setStatus({ heading: "Wrong answer!", color: "red" });
      } else if (
        correct === true &&
        countChecked.current === dataset?.sample?.length &&
        status.heading !== "Wrong answer!"
      ) {
        setStatus({ heading: "Accepted!", color: "green" });
      }
    };

    useEffect(() => {
      handleExecuteCode(code, lang, "", handlePreResult);
    }, []);

    const renderBody = () => {
      if (status?.heading === "Compiling...") return null;
      if (
        status?.heading === "Compile error" ||
        status?.heading === "Unavailable"
      )
        return (
          <div
            style={{
              backgroundColor: "white",
              padding: 14,
              paddingRight: 20,
              marginBottom: 12,
              boxShadow: "0px 7px 21px 0px rgba(36, 36, 36, 0.12)",
            }}
            className="enable-horizontal-scroll"
          >
            <Text>{status?.errorText}</Text>
          </div>
        );
      return dataset?.sample?.map((sample, index) => (
        <SampleCaseRes
          no={index + 1}
          input={sample.input}
          expect={sample.output}
          resCallback={handleResult}
        />
      ));
    };

    return (
      <div>
        <h3 className={`bold mb-3 ${status?.color}`}>{status?.heading}</h3>
        {renderBody()}
      </div>
    );
  };

  const SubmitCodeRes = () => {
    const [desc, setDesc] = useState({
      heading: "Running test cases...",
      color: "green",
    });
    const [currentTest, setCurrentTest] = useState(0);
    useEffect(() => {
      checkResult();
    }, [currentTest]);

    const checkResult = async () => {
      const testCase = dataset?.cases[currentTest];
      const output = await executeAndGetOutput(code, lang, testCase?.input);
      if (output?.toString().trim() !== testCase?.output?.toString().trim()) {
        setDesc({ heading: "Wrong answer!", color: "red" });
      } else {
        if (
          currentTest === dataset?.cases?.length - 1 &&
          desc.heading !== "Wrong answer!"
        ) {
          setDesc({ heading: "Accepted!", color: "green" });
        }
        if (currentTest < dataset?.cases?.length - 1)
          setCurrentTest((prev) => prev + 1);
      }
    };

    return (
      <div>
        <h4 className={`bold ${desc.color}`}>{desc.heading}</h4>
        {desc.heading !== "Accepted!" && (
          <RunningTest
            no={currentTest + 1}
            failed={desc.heading === "Wrong answer!"}
          />
        )}
        {desc.heading === "Accepted!" && (
          <p>{`✔️ All ${dataset?.cases?.length} test cases passed.`}</p>
        )}
      </div>
    );
  };

  return (
    <div
      className="disable-horizontal-scroll"
      style={{
        backgroundColor: "whitesmoke",
        padding: 16,
        borderRadius: 16,
        paddingBottom: 8,
        boxShadow: "0px 7px 21px 0px rgba(36, 36, 36, 0.12)",
      }}
    >
      <div
        className="row ml-1 mb-2"
        style={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 className="bold">Hack it!</h2>
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
                resetResult();
              }}
            />
          </div>
        </div>
      </div>
      <TextArea
        onChange={onCodeChange}
        value={code}
        placeholder="// Write your code here"
        autoSize={{ minRows: 14, maxRows: 14 }}
      />
      <div
        className="row ml-1 mb-2 mt-3"
        style={{ flexDirection: "row-reverse", marginRight: 1 }}
      >
        <Button
          className="green-button"
          size="large"
          disabled={!code}
          onClick={() => {
            handleSubmitCode();
          }}
        >
          Submit code
        </Button>
        <Button
          disabled={!code}
          htmlType="button"
          className="white-button mr-3"
          size="large"
          onClick={() => {
            handleRunCode();
          }}
        >
          Run code
        </Button>
      </div>
      {showRunCodeRes && <RunCodeRes sampleCases={dataset?.sample} />}
      {showSubmitCodeRes && <SubmitCodeRes />}
    </div>
  );
};

export const executeDetailToResult = (runDetail) => {
  if (!runDetail)
    return {
      state: "Unavailable",
      text: "The code has not been run yet.",
    };
  if (runDetail.build_stderr)
    return {
      state: "Compile error",
      text: runDetail.build_stderr,
    };

  if (runDetail.stderr)
    return {
      state: "Runtime error",
      text: runDetail.stderr,
    };

  if (runDetail.result === "timeout")
    return {
      state: "Timeout",
      text: "Limited time for each execution is 1 second.",
    };

  return {
    state: "Success",
    text: runDetail.stdout,
  };
};

export const handleExecuteCode = async (code, lang, input, resultCallback) => {
  runnerApis.runCode(code, lang, input).then((runDetail) => {
    resultCallback(executeDetailToResult(runDetail));
  });
};

export const executeAndGetOutput = async (code, lang, input) => {
  return executeDetailToResult(await runnerApis.runCode(code, lang, input))
    .text;
};
