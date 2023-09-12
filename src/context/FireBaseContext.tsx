import React, { useState } from "react";
import { AppUser } from "../classes/AppUser";

type ValueProp = {
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  userData: AppUser | undefined;
  setUserData: React.Dispatch<React.SetStateAction<AppUser | undefined>>;
};

type ContextProp = {
  children: React.ReactNode;
};

export const AppContext = React.createContext({} as ValueProp);

export default function FireBaseContext({ children }: ContextProp) {
  const [userId, setUserId] = useState<string>("");
  const [userData, setUserData] = useState<AppUser>();

  return (
    <AppContext.Provider value={{ userId, setUserId, userData, setUserData }}>
      {children}
    </AppContext.Provider>
  );
}
