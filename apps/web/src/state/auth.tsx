import React, {createContext, useContext} from "react";

type YinAuthContextType = {
  token: string | null
  me: any
  setToken: (token: string) => void
  setMe: (me: any) => void
}

const defaultYinAuth = {
  token: null,
  me: null,
  setToken: () => {
  },
  setMe: () => {
  }
}

const YinAuthContext = createContext<YinAuthContextType>(defaultYinAuth);

export function useYinAuthContext() {
  return useContext(YinAuthContext);
}

export default function WithYinAuthContext({children}: any) {
  const [Token, setToken] = React.useState("");
  const [Me, setMe] = React.useState(null);

  function setMeFunction(me: any) {
    setMe(me)
  }

  function setTokenFunction(token: string) {
    setToken(token);
  }

  return (
      <YinAuthContext.Provider value={{token: Token, me: Me, setMe: setMeFunction, setToken: setTokenFunction}}>
        {children}
      </YinAuthContext.Provider>
  )
}