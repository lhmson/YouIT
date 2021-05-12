import React, { useContext, useEffect, useState } from 'react'
import CuteClientIO from './CuteClientIO'

const CuteClientIOContext = React.createContext();

/**
 * provide a context variable to work with CuteClientIO
 * @returns {CuteClientIO}
 */
export const useCuteClientIO = () => {
  return useContext(CuteClientIOContext)
}


export const CuteClientIOProvider = ({ serverUri, token, children, onNewConnection }) => {
  /** @type [CuteClientIO, any] */
  const [cuteIO, setCuteIO] = useState(() => new CuteClientIO());

  useEffect(() => {
    setCuteIO(
      /**
       * @param {CuteClientIO} cuteIO 
       */
      cuteIO => {
        cuteIO.connect(serverUri, token)
        onNewConnection(cuteIO);
        return cuteIO;
      }
    );
  }, [token, serverUri])

  return (
    <CuteClientIOContext.Provider value={cuteIO}>
      {children}
    </CuteClientIOContext.Provider>
  )
}