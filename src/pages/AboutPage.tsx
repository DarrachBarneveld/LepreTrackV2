import { FunctionComponent, useContext } from "react";
import { AppContext } from "../components/FireBaseContext";

export interface IAboutPageProps {}

const AboutPage: FunctionComponent<IAboutPageProps> = (props) => {
  const { userData } = useContext(AppContext);

  return (
    <div>
      <p>This is the learn page.</p>
      <p>Your travel score {userData?.travel.flight.score}</p>
    </div>
  );
};

export default AboutPage;
