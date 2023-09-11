import { FC, useContext } from "react";
import { AppContext } from "../components/FireBaseContext";

interface LearnPageProps {}

const LearnPage: FC<{}> = () => {
  const { userData } = useContext(AppContext);

  return (
    <div>
      <p>This is the home page.</p>
      <p>Your food score {userData?.food.diet.score}</p>
    </div>
  );
};

export default LearnPage;
