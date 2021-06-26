import React, { useMemo, useState } from 'react';
import { Button, Input, } from 'antd';

// code highlighter 
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import * as runnerApis from '../../../api/compiler';

/**
 * 28 languages are supported :)
 * @param {string} className 
 */
const toApiLanguage = (className) => {
  if (!className)
    return null;

  const classLang = className.replace("language-", "");

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

  if (sameNameLangs.includes(classLang))
    return classLang;

  // languages with different names
  const nameMapper = {
    "objectivec": "objective-c",
    "python": "python3",
    "py": "python3",
    "js": "javascript",
    "visual-basic": "vb",
    "lisp": "commonlisp",
  }

  if (nameMapper[classLang])
    return nameMapper[classLang];

  return null;
}

export const CodeRenderer = ({ node, inline, className, children, ...props }) => {
  const apiLanguage = toApiLanguage(className);
  const match = /language-(\w+)/.exec(className || '');

  const [input, setInput] = useState("");
  const [runDetail, setRunDetail] = useState(null);

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
          text: runDetail.build_stderr,
          code: runDetail.build_exit_code,
        }

      if (runDetail.stderr)
        return {
          state: "Runtime error",
          text: runDetail.stderr,
          code: runDetail.exit_code,
        }

      if (runDetail.result === "timeout")
        return {
          state: "Timeout",
          text: "Limited time for each execution is 1 second. Donate us for more :)",
          code: runDetail.exit_code,
        }

      return {
        state: "Success",
        text: runDetail.stdout,
        code: runDetail.exit_code,
      }
    }, [runDetail])

  const handleExecuteCode = (sourceCode, language, input) => {
    runnerApis.createRunnerSection(sourceCode, language, input).then(
      (res) => {
        const { id } = res.data;
        runnerApis.getSectionDetail(id).then((runRes) => {
          setRunDetail(runRes.data);
        })
      }
    );
  }

  return (
    <div style={{ border: "2px solid black" }}>
      {
        !inline && match ? (
          <SyntaxHighlighter
            style={materialDark}
            language={match[1]}
            PreTag="div"
            children={String(children).replace(/\n$/, '')}
            {...props}
          />
        ) : (
          <code className={className} {...props}>
            {children}
          </code>
        )
      }

      {apiLanguage &&
        <div>
          <Button className={"green-button"} onClick={() => handleExecuteCode(String(children), apiLanguage, input)} >
            Run
          </Button>

          <Input
            value={input}
            onChange={(event) => { setInput(event.target.value) }}
          />

          {renderedOutput.state !== "Unavailable" &&
            <p>
              {renderedOutput.state}
              <br />
              {renderedOutput.state === "Success" ?
                renderedOutput.text
                :
                `Exit code ${renderedOutput.code}: ${renderedOutput.text}`
              }
            </p>
          }
        </div>
      }
    </div>
  )
}