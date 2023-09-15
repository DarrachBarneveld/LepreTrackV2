import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import FireBaseContext from "./context/FireBaseContext.tsx";
import OpenAiContextProvider from "./context/OpenAiContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>

  <OpenAiContextProvider>
    <FireBaseContext>
      <App />
    </FireBaseContext>
  </OpenAiContextProvider>
  // </React.StrictMode>
);
