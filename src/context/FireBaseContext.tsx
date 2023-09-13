import React, { useState } from "react";
import { AppUser } from "../classes/AppUser";
import { User } from "firebase/auth";

type ValueProp = {
  userAuth: User | undefined;
  setUserAuth: React.Dispatch<React.SetStateAction<User | undefined>>;
  userData: AppUser | undefined;
  setUserData: React.Dispatch<React.SetStateAction<AppUser | undefined>>;
};

type ContextProp = {
  children: React.ReactNode;
};

export const AppContext = React.createContext({} as ValueProp);

export default function FireBaseContext({ children }: ContextProp) {
  const [userAuth, setUserAuth] = useState<User>();
  const [userData, setUserData] = useState<AppUser>();

  return (
    <AppContext.Provider
      value={{ userAuth, setUserAuth, userData, setUserData }}
    >
      {children}
    </AppContext.Provider>
  );
}
