import { FunctionComponent, useContext } from "react";
import CategoryCard from "../components/CategoryCard";
import {
  faBolt,
  faBurger,
  faRecycle,
  faTruckPlane,
} from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../components/FireBaseContext";
import { AppUser } from "../classes/AppUser";

interface DashboardPageProps {}

const DashboardPage: FunctionComponent<DashboardPageProps> = () => {
  const { userData } = useContext(AppContext) as { userData: AppUser };

  return (
    <main>
      <div className="container">
        <div className="row">
          <div className="col-xl-3 col-md-6">
            <CategoryCard
              userData={userData}
              category="travel"
              icon={faTruckPlane}
              title="travel"
            />
          </div>
          <div className="col-xl-3 col-md-6">
            <CategoryCard
              userData={userData}
              category="food"
              icon={faBurger}
              title="food"
            />
          </div>
          <div className="col-xl-3 col-md-6">
            <CategoryCard
              userData={userData}
              category="energy"
              icon={faBolt}
              title="energy"
            />
          </div>
          <div className="col-xl-3 col-md-6">
            <CategoryCard
              userData={userData}
              category="community"
              icon={faRecycle}
              title="community"
            />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-3 pie-container">
            <img
              id="badgeImage"
              width="100%"
              className="rounded-3"
              src="./src/assets/images/earth-guardian.png"
              alt="user badge image"
            />
          </div>
          <div className="col-lg-6 leaderboard-container">
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">User</th>
                  <th scope="col">Travel</th>
                  <th scope="col">Food</th>
                  <th scope="col">Energy</th>
                  <th scope="col">Community</th>
                  <th scope="col">Rating</th>
                </tr>
              </thead>
              <tbody id="leaderboard"></tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="pie-container col-lg-6">
            <div id="pieChart"></div>
          </div>

          <div className="col-lg-6 col-md-3 pie-container">
            <div id="totalChart"></div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
