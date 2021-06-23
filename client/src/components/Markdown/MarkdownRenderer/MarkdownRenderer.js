import React from "react";
import ReactMarkdown from 'react-markdown'
import { Image, Input, message } from 'antd'

// markdown plugin: strikethrough, table, tasklists,...
import gfm from 'remark-gfm'

// code highlighter 
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

// Latex support
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css' // `rehype-katex` does not import the CSS for you

const CuteEasterEgg = () => {
  const [text, setText] = React.useState("");
  const [matched, setMatched] = React.useState(false);

  const rewards = React.useRef([
    "https://scontent.fsgn3-1.fna.fbcdn.net/v/t1.6435-9/198608063_346343270183185_2549186608871334108_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=8bfeb9&_nc_ohc=FzAVQ2hllJ0AX98n_eh&_nc_oc=AQkpeY88PAd8Y4_pLE0rkjU0pEZEIZFhS2lBiUNzSPQKKhzq-aPhJuydiogvi2jVuJM&tn=auSfTRkt-COgZ40-&_nc_ht=scontent.fsgn3-1.fna&oh=9a9dde0774208bf0b07bec8d1fc6c0f3&oe=60D832DA",
    "https://scontent.fsgn3-1.fna.fbcdn.net/v/t1.6435-9/187343793_1873725132801902_4765223656079327704_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=8bfeb9&_nc_ohc=Yv0Zu8UJQzcAX-bNG6c&_nc_ht=scontent.fsgn3-1.fna&oh=77ad3d03c6fb680e771c85c4c2d00d30&oe=60D82CFE",
    "https://scontent.fsgn4-1.fna.fbcdn.net/v/t1.6435-9/199278359_553928128938331_1858385376263656660_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=8bfeb9&_nc_ohc=lAGOgeMOEJ0AX8CN48d&tn=auSfTRkt-COgZ40-&_nc_ht=scontent.fsgn4-1.fna&oh=16c52d644bdfe8f77f53f9c9f0927d3d&oe=60D822B8",
    "https://scontent.fsgn4-1.fna.fbcdn.net/v/t1.6435-9/202035149_353596946124484_7377227276436241252_n.jpg?_nc_cat=102&ccb=1-3&_nc_sid=8bfeb9&_nc_ohc=KJh-tgpqh_IAX_03eBT&_nc_ht=scontent.fsgn4-1.fna&oh=4e8fd14f4bff9839913c2b2da2374eaa&oe=60D7FAE6",
    "https://scontent.fsgn3-1.fna.fbcdn.net/v/t1.6435-9/142301630_1783898471784569_3009542279817961246_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=8bfeb9&_nc_ohc=_-Tj3FiZ7WwAX8DUDD1&_nc_ht=scontent.fsgn3-1.fna&oh=754ba7ddcf6c72a02b336f1089dbe2de&oe=60D683A2",
    "https://scontent.fsgn4-1.fna.fbcdn.net/v/t1.6435-9/121561996_399189734412172_7244611002242393220_n.jpg?_nc_cat=105&ccb=1-3&_nc_sid=174925&_nc_ohc=6e6dWir2iSUAX9fLmz0&_nc_ht=scontent.fsgn4-1.fna&oh=b97fca1a30c0d98385c58eb5ecb068f1&oe=60D7D175",
  ]).current;

  const password = React.useRef(String.fromCharCode(
    Math.floor(Math.random() * 25 + 97),
    Math.floor(Math.random() * 25 + 97),
    Math.floor(Math.random() * 25 + 97),
    Math.floor(Math.random() * 25 + 97),
    Math.floor(Math.random() * 25 + 97),
  )).current;

  React.useEffect(() => {
    console.log(password.split('').reverse().join(''), ": si drowssap");
  }, []);

  const checkAnswer = () => {
    if (text === password) {
      setMatched(true);
      setInterval(
        () => setText(prev => prev === "a" ? "b" : "a"),
        500
      )
    }
    else
      message.error("No love for you 💔", 1);
  }

  if (matched)
    return (
      <Image
        src={rewards[Math.floor(Math.random() * rewards.length)]}
        style={{ maxWidth: "100%" }}
      />
    )
  else return (
    <Input
      value={text}
      type={"password"}
      onChange={(event) => setText(event.target.value)}
      onPressEnter={checkAnswer}
    />
  )
}

function MarkdownRenderer({ text, maxImgWidth = "100%" }) {
  const CustomMarkdownRendererComponents = {
    code: ({ node, inline, className, children, ...props }) => {
      if (className === "language-cute-love")
        return <CuteEasterEgg />

      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        <SyntaxHighlighter style={materialDark} language={match[1]} PreTag="div" children={String(children).replace(/\n$/, '')} {...props} />
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      )
    },

    img: ({ src, title }) => {
      return (
        <Image
          src={src}
          title={title}
          style={{ maxWidth: maxImgWidth }}
        />
      )
    }
  }


  return (
    <div>
      {text &&
        <ReactMarkdown
          components={CustomMarkdownRendererComponents}
          remarkPlugins={[remarkMath, gfm]}
          rehypePlugins={[rehypeKatex]}
        >
          {text}
        </ReactMarkdown>
      }

    </div>
  );
}

export default MarkdownRenderer;
