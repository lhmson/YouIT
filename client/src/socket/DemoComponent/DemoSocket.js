import { Button, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useCuteClientIO } from '../CuteClientIOProvider.js';

const DemoSocket = () => {
  const [text, setText] = useState()
  const handleTextChange = (e) => { setText(e.target.value) }

  const cuteIO = useCuteClientIO()

  const handleJoin = () => {
    cuteIO.send("JoinDemo", {})
  }

  const handleSend = () => {
    cuteIO.send("SendDemo", { text })
  }

  const handleQuit = () => {
    cuteIO.send("QuitDemo")
  }

  const onReceiveHandlers = [
    {
      event: "JoinDemoResponse",
      handleFunction: (msg) => console.log(msg)
    },
    {
      event: "SendDemoResponse",
      handleFunction: (msg) => console.log(msg)
    },
    {
      event: "QuitDemoResponse",
      handleFunction: (msg) => console.log(msg)
    }

  ]

  useEffect(() => {
    cuteIO.onReceiveMulti(onReceiveHandlers)

    return () => {
      // clean up
      cuteIO.stopReceiveMulti(onReceiveHandlers)
    }
  }, [])

  return (
    <div>
      <div className="d-flex justify-content-start">
        <Input
          placeholder="Input something to send!"
          value={text}
          onChange={handleTextChange}
        />
      </div>

      <div className="d-flex justify-content-around">
        <Button onClick={handleJoin}>Join</Button>
        <Button onClick={handleSend}>Send</Button>
        <Button onClick={handleQuit}>Quit</Button>
      </div>
    </div>
  )
}

export default DemoSocket