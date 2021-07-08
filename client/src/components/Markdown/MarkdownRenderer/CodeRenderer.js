import React, { useMemo, useState } from "react";
import { Button, Input, message, Tooltip } from "antd";

// code highlighter
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import * as runnerApis from "../../../api/compiler";
import COLOR from "../../../constants/colors";
import { materialLight, materialOceanic } from "react-syntax-highlighter/dist/esm/styles/prism";
import TextArea from "antd/lib/input/TextArea";
import Text from "antd/lib/typography/Text";

/**
 * 28 languages are supported :)
 * @param {string} className
 */
export const toApiLanguage = (className) => {
  if (!className) return null;

  const classLang = className.replace("language-", "").trim();

  // languages that keeps their names
  const sameNameLangs = [
    "c",
    "cpp",
    "java",
    "kotlin",
    "scala",
    "swift",
    "csharp",
    "go",
    "haskell",
    "erlang",
    "perl",
    "ruby",
    "php",
    "bash",
    "r",
    "javascript",
    "coffeescript",
    "fsharp",
    "d",
    "clojure",
    "elixir",
    "rust",
    "scheme",
    "typescript",
  ];

  if (sameNameLangs.includes(classLang)) return classLang;

  // languages with different names
  const nameMapper = {
    objectivec: "objective-c",
    python: "python3",
    py: "python3",
    js: "javascript",
    "visual-basic": "vb",
    lisp: "commonlisp",
  };

  if (nameMapper[classLang]) return nameMapper[classLang];

  return null;
};

export const CodeRenderer = ({
  node,
  inline,
  className,
  children,
  previewMode = false,
  ...props
}) => {
  const apiLanguage = toApiLanguage(className);
  const match = /language-(\w+)/.exec(className || "");

  const [input, setInput] = useState("");
  const [runDetail, setRunDetail] = useState(runnerApis.RUN_DETAIL_NULL);

  const renderedOutput = useMemo(
    /**
     * @returns {{state: 'Success'|'Compile error'|'Runtime error'|'Timeout'|'Unavailable', text: string, code: number?}}
     */
    () => {
      if (!runDetail)
        return {
          state: "Unavailable",
          text: "The code has not been run yet.",
        };

      if (runDetail.build_stderr)
        return {
          state: "Compile error",
          color: COLOR.blue,
          text: runDetail.build_stderr,
          code: runDetail.build_exit_code,
        };

      if (runDetail.stderr)
        return {
          state: "Runtime error",
          color: COLOR.red,
          text: runDetail.stderr,
          code: runDetail.exit_code,
        };

      if (runDetail.result === "timeout")
        return {
          state: "Timeout",
          color: COLOR.yellow,
          text:
            runDetail.stdout +
            "\n...\nLimited time for each execution is 1 second. Donate us for more :)",
          code: runDetail.exit_code,
        };

      return {
        state: "Success",
        color: COLOR.green,
        text: runDetail.stdout,
        code: runDetail.exit_code,
      };
    },
    [runDetail]
  );

  const handleExecuteCode = (sourceCode, language, input) => {
    // ms
    const RESPONSE_TIME_LIMIT = 5000;

    if (language && sourceCode) {
      const messageKey = "compiler_" + Date.now();
      const hideMessage = message.loading({
        key: messageKey,
        content: "Please wait for code execution...",
        duration: RESPONSE_TIME_LIMIT / 1000,
      });

      const responseTimeout = setTimeout(() => {
        message.error({ key: messageKey, content: "It takes too long to get code result." })
      }, RESPONSE_TIME_LIMIT)

      runnerApis.runCode(sourceCode, language, input).then((runDetail) => {
        setRunDetail(runDetail);
        hideMessage?.();
        clearTimeout(responseTimeout);
      });
    }
  };

  const [theme, setTheme] = useState(materialOceanic);
  const isDarkTheme = useMemo(() => theme === materialOceanic, [theme]);

  const switchTheme = () => {
    setTheme((prev) =>
      prev === materialOceanic ? materialLight : materialOceanic
    );
  };

  return (
    <div
      className="disable-horizontal-scroll"
      style={{ backgroundColor: "whitesmoke", padding: 12 }}
    >
      {!inline && match ? (
        <div
          style={
            {
              backgroundColor: isDarkTheme ? "#263238" : "#fafafa",
              paddingBottom: (!previewMode) ? 12 : 0, // this code can be improved
              paddingRight: (!previewMode) ? 12 : 0 // this code can be improved
            }
          }
        >
          <SyntaxHighlighter
            style={theme}
            language={match[1]}
            PreTag="div"
            children={String(children).replace(/\n$/, "")}
            {...props}
          />
          {(!previewMode) &&
            <div
              style={{
                flexDirection: "row-reverse",
                display: "flex",
              }}
            >
              {apiLanguage &&
                <Tooltip title={apiLanguage}>
                  <Button
                    className="green-button"
                    style={{ alignSelf: "flex-end" }}
                    onClick={() =>
                      handleExecuteCode(String(children), apiLanguage, input)
                    }
                  >
                    Run
                  </Button>
                </Tooltip>
              }
              <Button
                className="green-button mr-3"
                style={{ alignSelf: "flex-end" }}
                onClick={() => {
                  switchTheme();
                }}
              >
                Switch theme
              </Button>
            </div>
          }
        </div>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      )}

      {apiLanguage && (!previewMode) && (
        <div>
          {/* sorry but this is the only way */}
          <div style={{ height: 4 }} />
          <Text className="bold">Input</Text>

          <br />
          <TextArea
            className="mr-4 mb-2"
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
          <br />

          {renderedOutput.state !== "Unavailable" && (
            <p>
              <div
                style={{
                  color: renderedOutput.color,
                  fontWeight: 500,
                  fontSize: 20,
                }}
              >
                {renderedOutput.state}
              </div>
              <br />
              {renderedOutput.state === "Success"
                ? renderedOutput.text
                : `Exit code ${renderedOutput.code}: ${renderedOutput.text}`}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
