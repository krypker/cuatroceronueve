import React, { useState, useEffect, useMemo, useCallback } from "react";
import { injected } from "./connectors";
import { useWeb3React } from "@web3-react/core";

export const MetaMaskContext = React.createContext(null);

export const MetaMaskProvider = ({ children }) => {
  const { activate, account, active, deactivate } = useWeb3React();
  const [isActive, setIsActive] = useState(false);
  const [shouldDisable, setShouldDisable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleIsActive = useCallback(() => {   
    setIsActive(active);
  }, [active]);

  useEffect(() => {
    handleIsActive();
  }, [handleIsActive]);

  const connect = async () => {
    setShouldDisable(true);
    try {
      await activate(injected).then(() => {
        setShouldDisable(false);
      });
    } catch (error) {
      console.log("Error on connecting: ", error);
    }
  };

  const disconnect = async () => {
    try {
      deactivate();
    } catch (error) {
      console.log("Error on disconnnect: ", error);
    }
  };

  const values = useMemo(
    () => ({
      isActive,
      account,
      isLoading,
      connect,
      disconnect,
      shouldDisable,
    }),
    [isActive, isLoading, shouldDisable, account]
  );

  useEffect(() => {
    connect().then(() => {
      setIsLoading(false);
    });
  }, [isLoading]);

  return (
    <MetaMaskContext.Provider value={values}>
      {children}
    </MetaMaskContext.Provider>
  );
};

export default function useMetaMask() {
  const context = React.useContext(MetaMaskContext);

  if (context == undefined) {
    throw new Error(
      "useMetaMask hook must be used with a MetaMaskProvider component"
    );
  }

  return context;
}
