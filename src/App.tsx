import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LearnPage from "./pages/LearnPage";
import { AppContext } from "./components/FireBaseContext";
import { firebaseAuth } from "./config/firebaseConfig";
import { useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getUserData } from "./config/firebaseAuth";
import { User, UserData } from "./classes/User";

export interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
  const { userId, setUserId, setUserData } = useContext(AppContext);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        setUserId(user.uid);

        const documentData = await getUserData(user);

        if (documentData) {
          const userData: UserData = {
            id: userId,
            email: documentData.email,
            name: documentData.name,
            createdAt: documentData.createdAt.toDate(),
            travel: documentData.travel,
            food: documentData.food,
            energy: documentData.energy,
            community: documentData.community,
          };

          const newUser = new User(userData);
          setUserData(newUser);
        }
      }
    });
  }, [userId]);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="learn" element={<LearnPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
