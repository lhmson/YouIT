import { Server, Socket } from 'socket.io'
import { verifyJwt } from '../utils/verfifyAuth.js'

/**
 * A simplified interface to use socket.io by CuteTN, for YouIT only. :)   
 * [Full documentation](https://www.google.com)
 */
export default class CuteServerIO {
  /** 
   * A wrapped reference to socket.io "Server".
   * @type Server<DefaultEventsMap, DefaultEventsMap>? 
   */
  #io = null;

  /**
   * @deprecated Just in case you really need to access the real socket.io's API, I provide this to you. But try to use the supported methods or contact CuteTN first, thank you.
   */
  get io() { return this.#io; }



  #ANONYMOUS_ROOM_PREFIX = "ANONYMOUS~"
  #USER_ROOM_PREFIX = "USER~"
  #TOKEN_ROOM_PREFIX = "TOKEN~"



  /**
   * onReceiveCallbacks Define a set of tasks to handle when server receive something from client
   * @type [{eventName: string?, handleFunction: OnReceiveDelegate}]
   */
  #onReceiveCallbacks = [];



  /** 
   * @param {Server<DefaultEventsMap, DefaultEventsMap>} io
   */
  constructor(io) {
    this.#io = io;
    this.#onReceiveCallbacks = [];
  }



  /**
   * extract token and userId from a socket.
   * @param {Socket} socket 
   * @returns {{socket: string, token: string, userId: string}}
   */
  #extractInfoSocket = (socket) => {
    // user must provide a token in order to connect to this server.
    const token = socket.handshake.query.token;
    const userId = verifyJwt(token)?.id;

    return { socket, token, userId }
  }



  /** @param {string} id */
  #getSocket = (id) => this.#io.sockets.sockets.get(id)



  /**
   * Add handlers when receiving a message from specific client (by its socket Id). Subscribe immediately
   * @param {Socket | string} socket
   * @param {string} eventName 
   * @param {OnReceiveDelegate} handleFunction 
   */
  onReceive = (socket, eventName, handleFunction) => {
    if (typeof socket === "string")
      socket = this.#getSocket(socket);
    const { userId, token } = this.#extractInfoSocket(socket)

    socket.on(eventName, (msg) => {
      handleFunction({
        userId,
        token,
        socket,
        msg,
        cuteServerIo: this,
      })
    })
  }



  /**
   * Add handlers when receiving a message from client. automatically subscribe to client's socket ON CONNECTION
   * @param {string} eventName 
   * @param {OnReceiveDelegate} handleFunction 
   */
  queueReceiveHandler = (eventName, handleFunction) => {
    this.#onReceiveCallbacks.push({
      eventName,
      handleFunction
    })
  }



  /** 
   * start waiting for new clients to connect to this server. The more the merrier!
  */
  start = () => {
    this.#io.on("connection", async socket => {
      const { token, userId } = this.#extractInfoSocket(socket)

      try {
        if (!token || !userId) {
          // signed in anonymously
          socket.join(this.#ANONYMOUS_ROOM_PREFIX)
        }
        else {
          // Add this socket to a room with id User. every socket here belongs to this user only.
          socket.join([
            this.#USER_ROOM_PREFIX + userId,
            this.#TOKEN_ROOM_PREFIX + token,
          ]);
        }

        // add handlers to call whenever this client send something to the server
        if (this.#onReceiveCallbacks) {
          this.#onReceiveCallbacks.forEach(cb => {
            this.onReceive(socket, cb.eventName, cb.handleFunction);
          })
        }

        socket.on("disconnect", (reason) => {
          console.log(`[IO] Disconnected from socket ${socket.id}. Reason: ${reason}`)
        })

        if (userId)
          console.log(`[IO] Connected to user ${userId} from socket ${socket.id}`);
        else
          console.log(`[IO] Connected to an anonymous user from socket ${socket.id}`);
      }
      catch (error) {
        // CuteTN Todo: send something back to client maybe
        console.log(`[IO] Error: cannot connect to a client with socket id ${socket.id}. Reason: ${error}`);
        socket.disconnect();
      }
    })
  }



  /**
   * 
   * @param {Socket?} toSocket 
   * @param {string?} event Convention: Action_Receiver
   * @param {object} msg 
   */
  sendToSocket = (toSocket, event, msg) => {
    toSocket.emit(event, msg)
  }



  /**
   * 
   * @param {string?} toTokenId 
   * @param {string?} event Convention: Action_Receiver
   * @param {any} msg 
   * @param {Socket?} excludedSocket sometimes we dont wanna send some message back to the sender (client). That's when this is helpful :)
   */
  sendToToken = (toTokenId, event, msg, excludedSocket) => {
    const roomName = this.#TOKEN_ROOM_PREFIX + toTokenId

    if (
      excludedSocket && excludedSocket.broadcast
      && excludedSocket.rooms.has(roomName)
    ) {
      excludedSocket.broadcast.to(roomName).emit(event, msg)
    }
    else
      this.#io.in(roomName).emit(event, msg)
  }



  /**
   * 
   * @param {string?} toUserId
   * @param {string?} event Convention: Action_Receiver
   * @param {any} msg 
   * @param {Socket?} excludedSocket sometimes we dont wanna send some message back to the sender (client). That's when this is helpful :)
   */
  sendToUser = (toUserId, event, msg, excludedSocket) => {
    console.log("sent to user", toUserId);
    const roomName = this.#USER_ROOM_PREFIX + toUserId

    if (excludedSocket && excludedSocket.broadcast) {
      excludedSocket.broadcast.to(roomName).emit(event, msg)
    }
    else
      this.#io.in(roomName).emit(event, msg)
  }



  /**
   * 
   * @param {string?} event
   * @param {any} msg 
   * @param {string?} excludedSocket sometimes we dont wanna send some message back to the sender (client). That's when this is helpful :)
   */
  sendToAll = (event, msg, excludedSocket) => {
    if (excludedSocket && excludedSocket.broadcast) {
      excludedSocket.broadcast.emit(event, msg)
    }
    else
      this.#io.emit(event, msg)
  }
}


// test


//#region typedefs
////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @typedef {object} OnReceiveParams
 * @property {string?} userId
 * @property {string?} token
 * @property {Socket?} socket
 * @property {string?} eventName
 * @property {CuteServerIO} cuteServerIo
 * @property {object?} msg The data/message that was provided by the client
 */

/**
 * A kind of function to handle any messages that are emitted from the clients
 * @callback OnReceiveDelegate
 * @param {OnReceiveParams} params
 * @returns {any}
 */
//#endregion