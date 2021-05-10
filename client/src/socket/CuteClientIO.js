import io, { Socket } from 'socket.io-client'

/**
 * A simplified interface to use socket.io by CuteTN, for YouIT only. :)   
 * [Full documentation](https://www.google.com)
 */
export default class CuteClientIO {
  /**
   * @type Socket<DefaultEventsMap, DefaultEventsMap>?
   */
  #socket = null

  /**
   * @deprecated Just in case you really need to access the real socket.io's API, I provide this to you. But try to use the supported methods or contact CuteTN first, thank you.
   */
  get socket() { return this.#socket }

  /** @type string */
  #socketId = null;

  get socketId() { return this.#socketId }



  #uri = null
  #token = null



  /** 
   * this is to store a list of event handlers in case you might try to subscribe onReceive to socket before connection :)
   * @type [{event: string, handleFunction: OnReceiveDelegate}]
   */
  #queueEventHandlersOnConnection = []



  /**
   * set socket with new serverUri and token and connect to server
   * @param {string} serverUri The address of the server.
   * @param {string} token 
   * @returns {CuteClientIO}
   */
  connect = (serverUri, token) => {
    if (serverUri === this.#uri && token === this.#token)
      return this

    this.#uri = serverUri;
    this.#token = token;
    this.close();

    this.#socket = io(
      this.#uri,
      { query: { token: this.#token } }
    )

    this.#socket.on('connect', () => {
      this.#socketId = this.#socket.id;
      console.log(`[IO] Connected to server. Socket ID: ${this.#socketId} at ${this.#uri}`);

      this.onReceiveMulti(this.#queueEventHandlersOnConnection);
      this.#queueEventHandlersOnConnection = [];

      this.#socket.on('disconnect', (reason) => {
        console.log(`[IO] Disconnected from socket ${this.#socketId}. Reason: ${reason}`)
      })
    })

    return this;
  }



  /** stop connection to server */
  close = () => {
    this.#socket?.close()
    return this
  }



  /**
   * 
   * @param {string} event 
   * @param {any} msg 
   */
  send = (event, msg) => {
    this.#socket?.emit(event, msg)
  }



  /**
   * @param {string} event 
   * @param {OnReceiveDelegate} handleFunction 
   */
  onReceive = (event, handleFunction) => {
    if (this.#socket)
      this.#socket.on(event, handleFunction)
    else
      this.#queueEventHandlersOnConnection.push({ event, handleFunction })
  }

  /**
   * Add multiple event handlers at once because you'll need it :)
   * @param {[{event: string, handleFunction: OnReceiveDelegate}]} eventHandlers 
   */
  onReceiveMulti = (eventHandlers) => {
    eventHandlers.forEach(e => this.onReceive(e.event, e.handleFunction))
  }



  /**
   * @param {string} event 
   * @param {OnReceiveDelegate} handleFunction 
   */
  stopReceive = (event, handleFunction) => {
    this.#socket?.off(event, handleFunction)
  }

  /**
   * Stop multiple event handlers at once because you'll need it :)
   * @param {[{event: string, handleFunction: OnReceiveDelegate}]} eventHandlers
   */
  stopReceiveMulti = (eventHandlers) => {
    eventHandlers.forEach(e => this.stopReceive(e.event, e.handleFunction))
  }
}


//#region typedefs
////////////////////////////////////////////////////////////////////////////////////////////////////
/**
* A kind of function to handle any messages that are emitted from the clients
* @callback OnReceiveDelegate
* @param {any} msg
* @returns {any}
*/
//#endregion