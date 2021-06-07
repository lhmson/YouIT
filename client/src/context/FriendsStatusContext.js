import React, { useContext, useEffect, useRef, useState } from 'react'
import { useCuteClientIO } from '../socket/CuteClientIOProvider.js'
import { fetchFriendsStatus, fetchMyStatus } from '../api/userStatus.js'

const friendsStatusContext = React.createContext();

/**
 * provide a context variable to get and set user status
 * @returns {FriendsStatusContextType}
 */
export const useFriendsStatus = () => {
  return useContext(friendsStatusContext)
}

export const FriendsStatusProvider = ({ children, userId }) => {
  const cuteIO = useCuteClientIO();
  const [dictFriendsStatus, setDictFriendsStatus] = useState({});
  const cleanUpCallbacks = useRef([]);

  useEffect(() => {
    if (!cuteIO || !userId)
      return;

    fetchFriendsStatus().then(res => {
      if (res.status === 200) {
        if (res.data)
          setDictFriendsStatus(prev => ({ ...prev, ...res.data }));
      }
    })

    fetchMyStatus().then(res => {
      if (res.status === 200) {
        if (res.data) {
          console.log(res.data);
          setDictFriendsStatus(prev => ({ ...prev, [userId]: res.data }));
        }
      }
    })

    cleanUpCallbacks.current.push(
      cuteIO.onReceive("System-updateStatusUser", (msg) => {
        const { userId, newStatus } = msg;
        if (userId && newStatus) {
          setDictFriendsStatus(prev => ({ ...prev, [userId]: newStatus }));
        }
      })
    );

    return cleanUpAll();
  }, [cuteIO, userId]);



  /** @type {(user: string) => StatusType} */
  const getStatus = (userId) => (dictFriendsStatus[userId] ?? "unknown");



  /**
   * @param {(userId: string, newStatus: StatusType) => void} listener 
   * @returns {() => void} returns a clean up function
   */
  const onFriendStatusChange = (listener) => {
    const cleanUp = cuteIO.onReceive("System-updateStatusUser", (msg) => {
      const { userId, newStatus } = msg;
      listener(userId, newStatus);
    })

    cleanUpCallbacks.current.push(cleanUp);
  }



  const cleanUpAll = () => {
    cleanUpCallbacks.current.forEach(clean => clean());
    cleanUpCallbacks.current.length = 0;
  }



  return (
    <friendsStatusContext.Provider
      value={{
        dictFriendsStatus,
        getStatus,
        onFriendStatusChange,
        cleanUpAll,
      }}
    >
      {children}
    </friendsStatusContext.Provider>
  )
}



/**
 * @typedef {"busy"|"online"|"offline"|"unknown"} StatusType
 */

/**
 * @typedef {object} FriendsStatusContextType
 * @property {object} dictFriendsStatus a dictionary to map from a user Id to a corresponding status
 * @property {(user: string) => StatusType} getStatus
 * @property {(listener: (userId: string, newStatus: StatusType) => void) => (() => void)} onFriendStatusChange
 * @property {() => void} cleanUpAll
 */