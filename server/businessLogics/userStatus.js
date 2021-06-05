import CuteServerIO from "../socket/CuteServerIO.js";
import event from "events";
import User from "../models/user.js";

export default class UsersStatusManager {
  constructor() {
    User.find().then((users) => {
      users.forEach((item) => {
        this.setLockedStatus(item._id, item.onlineStatus ?? "online");
      });
    });
  }

  /**
   * Should be called before this CuteServerIO is started
   * @param {CuteServerIO} CuteIO
   */
  init(CuteIO) {
    if (CuteIO) {
      CuteIO.onConnection((params) => {
        this.#addUserInstance(params.userId);
      });

      CuteIO.onDisconnection((params) => {
        this.#removeUserInstance(params.userId);
      });
    }
  }

  /**
   * acts as a dictionary, in which values have type {countInstances, actualStatus, lockedStatus}
   */
  #statusInfoOfUsers = {};

  #initNewUser = (userId) => {
    this.#statusInfoOfUsers[userId] = {
      countIntances: 0,
      actualStatus: "offline",
      lockedStatus: null,
    };
  };

  /**
   * @param {string} userId
   */
  #addUserInstance = (userId) => {
    if (userId) {
      const oldStatus = this.getUserStatus(userId);

      if (!this.#statusInfoOfUsers[userId]) this.#initNewUser(userId);

      this.#statusInfoOfUsers[userId].countIntances++;
      this.#statusInfoOfUsers[userId].actualStatus = "online";

      const newStatus = this.getUserStatus(userId);
      if (oldStatus !== newStatus)
        this.#userStatusChangeEventEmitter.emit("", userId, newStatus);
    }
  };

  /**
   * @param {string} userId
   */
  #removeUserInstance = (userId) => {
    if (userId) {
      const oldStatus = this.getUserStatus(userId);

      if (this.#statusInfoOfUsers[userId]) {
        this.#statusInfoOfUsers[userId].countIntances--; // Shouldn't be less than 0, should it?
        this.#statusInfoOfUsers[userId].actualStatus = this.#statusInfoOfUsers[
          userId
        ].countIntances
          ? "online"
          : "offline";
      }

      const newStatus = this.getUserStatus(userId);
      if (oldStatus !== newStatus)
        this.#userStatusChangeEventEmitter.emit("", userId, newStatus);
    }
  };

  /**
   * @param {string} userId
   * @param {StatusTypes} newStatus
   */
  setLockedStatus = (userId, newStatus) => {
    if (!["busy", "online", "offline"].includes(newStatus)) return;

    if (userId) {
      const oldStatus = this.getUserStatus(userId);

      if (!this.#statusInfoOfUsers[userId]) this.#initNewUser(userId);

      this.#statusInfoOfUsers[userId].lockedStatus = newStatus;

      User.findByIdAndUpdate(userId, { onlineStatus: newStatus }).then(() => {
        // console.log(`Set status of ${userId} to ${newStatus}`);
      });

      if (oldStatus !== newStatus)
        this.#userStatusChangeEventEmitter.emit("", userId, newStatus);
    }
  };

  /**
   * @param {string} userId
   * @returns {StatusTypes}
   */
  getUserStatus = (userId) => {
    if (userId && this.#statusInfoOfUsers[userId]) {
      if (this.#statusInfoOfUsers[userId].actualStatus === "offline")
        return "offline";

      if (this.#statusInfoOfUsers[userId].lockedStatus)
        return this.#statusInfoOfUsers[userId].lockedStatus;
      else return this.#statusInfoOfUsers[userId].actualStatus;
    } else return "offline";
  };

  #userStatusChangeEventEmitter = new event.EventEmitter();

  /**
   * @param {(userId: string, newStatus: StatusTypes) => void} listener
   */
  onUserStatusChange = (listener) => {
    this.#userStatusChangeEventEmitter.addListener("", listener);
  };
}

/**
 * @typedef {"online" | "offline" | "busy"} StatusTypes
 */
