import React, { FC, Dispatch, PropsWithChildren, useMemo } from "react";
import { viewer } from "../dummy/user";
import { User } from "../interfaces/user";

interface CurrentUserContextType {
  user: User;
  setUser: Dispatch<React.SetStateAction<User>>;
}
export const CurrentUserContext = React.createContext({} as CurrentUserContextType);
export const CurrentUserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = React.useState(viewer);

  const providerValue = useMemo(() => ({ user, setUser }), [user]);
  return (
    <CurrentUserContext.Provider value={providerValue}>{children}</CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => React.useContext(CurrentUserContext);
