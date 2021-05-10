import CuteServerIO from "../CuteServerIO.js"

let demoGroupUser = []
const addToDemoGroup = (newUser) => {
  if (demoGroupUser.indexOf(newUser) < 0) {
    demoGroupUser.push(newUser);
    return true
  }
  else
    return false
}
const removeFromDemoGroup = (user) => {
  if (demoGroupUser.indexOf(user) < 0) {
    return false
  }

  demoGroupUser = demoGroupUser.filter(u => u !== user)
  return true
}

/** Send to every client that is currently joined in this party */
const broadcastDemoGroup = (cuteIO, senderUserId, event, msg, senderSocket) => {
  demoGroupUser.forEach(memberUserId => {
    if (memberUserId !== senderUserId)
      cuteIO.sendToUser(memberUserId, event, msg, senderSocket)
  })
}



/**
 * @param {CuteServerIO} cuteIO 
 */
export const setupDemoOnReceive = (cuteIO) => {

  cuteIO.queueReceiveHandler("JoinDemo", (params) => {
    if (params.userId) {
      const isNewMem = addToDemoGroup(params.userId)

      if (isNewMem)
        cuteIO.sendToAll(
          "JoinDemoResponse",
          `Welcome new member ${params.userId}`,
        )
      else {
        cuteIO.sendToSocket(params.socket, "JoinDemoResponse", "You're already in!")
        cuteIO.sendToUser(params.userId, "JoinDemoResponse", "Someone is trying to join with your account!", params.socket)
      }
    }
    else
      cuteIO.sendToSocket(params.socket, "JoinDemoResponse", "You need to sign in first because Chưn is cute!")
  })



  cuteIO.queueReceiveHandler("SendDemo", (params) => {
    if (!params.userId) {
      cuteIO.sendToSocket(params.socket, "SendDemoResponse", "You need to sign in first because Chưn is cute!")
      return
    }

    if (demoGroupUser.indexOf(params.userId) < 0) {
      cuteIO.sendToSocket(params.socket, "SendDemoResponse", "You need to join in first because Chưn is cute!")
      return
    }

    // send to all other user Id
    broadcastDemoGroup(
      cuteIO,
      params.userId,
      "SendDemoResponse",
      `${params.userId} said: ${params.msg.text}`,
      params.socket
    );

    cuteIO.sendToUser(params.userId, "SendDemoResponse", `You said: ${params.msg.text}`)
  })



  cuteIO.queueReceiveHandler("QuitDemo", (params) => {
    if (!params.userId) {
      cuteIO.sendToSocket(params.socket, "QuitDemoResponse", "You need to sign in first because Chưn is cute!")
      return;
    }

    const oldUser = removeFromDemoGroup(params.userId)
    if (oldUser)
      cuteIO.sendToUser(params.userId, "QuitDemoResponse", `Goodbye ${params.userId}!`)
    else
      cuteIO.sendToSocket(params.socket, "QuitDemoResponse", `You're not even in! Shame on you, boooo`)
  })


}