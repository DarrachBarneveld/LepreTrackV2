import { FunctionComponent, useContext } from "react";
import { AppContext } from "../components/FireBaseContext";

export interface IHomePageProps {}

const HomePage: FunctionComponent<IHomePageProps> = (props) => {
  const { userData } = useContext(AppContext);

  return (
    <div>
      <p>This is the home page.</p>
      <p>Welcome {userData?.name}</p>
    </div>
  );
};

export default HomePage;
