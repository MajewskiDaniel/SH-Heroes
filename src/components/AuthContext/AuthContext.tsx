import React from "react";
export interface IAuthContext {
  auth: boolean,
  setAuth: (value: boolean) => void
}

const AuthContext = React.createContext<IAuthContext>({auth: false, setAuth: ():void=>{}});

const { Provider, Consumer } = AuthContext;

export { Provider, Consumer };
export default AuthContext;
