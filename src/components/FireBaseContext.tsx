import React, { useState } from "react";
import { User } from "../classes/User";

type ValueProp = {
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  userData: User | undefined;
  setUserData: React.Dispatch<React.SetStateAction<User | undefined>>;
};

type ContextProp = {
  children: React.ReactNode;
};

export const AppContext = React.createContext({} as ValueProp);

export default function FireBaseContext({ children }: ContextProp) {
  const [userId, setUserId] = useState<string>("");
  const [userData, setUserData] = useState<User>();

  return (
    <AppContext.Provider value={{ userId, setUserId, userData, setUserData }}>
      {children}
    </AppContext.Provider>
  );
}
