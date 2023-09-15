import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LearnPage from "./pages/LearnPage";
import { AppContext } from "./context/FireBaseContext";
import { firebaseAuth } from "./config/firebaseConfig";
import { useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getUserData } from "./config/firebaseAuth";
import { AppUser, UserData } from "./classes/AppUser";
import Footer from "./components/Footer";
import DashboardPage from "./pages/DashboardPage";
import TravelPage from "./pages/TravelPage";
import FoodPage from "./pages/FoodPage";
import EnergyPage from "./pages/EnergyPage";
import CommunityPage from "./pages/CommunityPage";

export interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = () => {
  const { userAuth, setUserAuth, setUserData, userData } =
    useContext(AppContext);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        setUserAuth(user);

        const documentData = await getUserData(user);

        if (documentData) {
          const userData: UserData = {
            id: documentData.id,
            email: documentData.email,
            name: documentData.name,
            createdAt: documentData.createdAt.toDate(),
            travel: documentData.travel,
            food: documentData.food,
            energy: documentData.energy,
            community: documentData.community,
          };

          const newUser = new AppUser(userData);

          setUserData(newUser);
        }
      }
    });
  }, [userAuth]);

  return (
    <BrowserRouter>
      <NavBar user={userData} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="learn" element={<LearnPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="travel" element={<TravelPage />} />
        <Route path="food" element={<FoodPage />} />
        <Route path="energy" element={<EnergyPage />} />
        <Route path="community" element={<CommunityPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
