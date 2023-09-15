import React, { useEffect, useState } from "react";
import { OpenAI } from "openai";
import { collection, getDocs } from "firebase/firestore";
import { firebaseDB } from "../config/firebaseConfig";

type ValueProp = {
  apiKey: string | undefined;
  openai: OpenAI | undefined;
};

type ContextProp = {
  children: React.ReactNode;
};

export const OpenAiContext = React.createContext({} as ValueProp);

export default function OpenAiContextProvider({ children }: ContextProp) {
  const [apiKey, setApiKey] = useState("");
  const [openai, setOpenai] = useState<OpenAI>();

  useEffect(() => {
    async function getGPTKey() {
      try {
        const userCollectionRef = collection(firebaseDB, "api");
        const querySnapshot = await getDocs(userCollectionRef);

        const keyArr: string[] = [];
        querySnapshot.forEach((doc) => {
          const documentData = doc.data();

          const { key } = documentData;

          keyArr.push(key);
        });

        setApiKey(keyArr[0]);
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    }

    getGPTKey();
  }, []);

  useEffect(() => {
    if (apiKey) {
      const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true,
      });

      setOpenai(openai);
    }
  }, [apiKey]);

  return (
    <OpenAiContext.Provider value={{ apiKey, openai }}>
      {children}
    </OpenAiContext.Provider>
  );
}
