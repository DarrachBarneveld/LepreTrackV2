import { FunctionComponent, useContext, useEffect, useState } from "react";
import CategoryCard from "../components/CategoryCard";
import {
  faBolt,
  faBurger,
  faRecycle,
  faTruckPlane,
} from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../components/FireBaseContext";
import { AppUser } from "../classes/AppUser";
import guardian from "../assets/images/guardians/earth-guardian.png";
import { TotalScoreBar } from "../components/Charts";
import LeaderBoardUser from "../components/LeaderBoardUser";
import { getAllUserDocuments } from "../config/firebaseAuth";

interface DashboardPageProps {}

const DashboardPage: FunctionComponent<DashboardPageProps> = () => {
  const [totalUsers, setTotalUsers] = useState<AppUser[]>([]);
  const { userData } = useContext(AppContext) as { userData: AppUser };

  const totalScore = userData?.overAllScore();

  async function fetchAllUsers() {
    const usersDocs = (await getAllUserDocuments()) as AppUser[];

    if (usersDocs) {
      const users = usersDocs.map((doc) => new AppUser(doc));

      setTotalUsers(users);
    }
  }

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <main>
      <div className="container">
        <div className="row categories">
          <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
            <CategoryCard
              userData={userData}
              category="travel"
              icon={faTruckPlane}
              title="travel"
            />
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
            <CategoryCard
              userData={userData}
              category="food"
              icon={faBurger}
              title="food"
            />
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
            <CategoryCard
              userData={userData}
              category="energy"
              icon={faBolt}
              title="energy"
            />
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
            <CategoryCard
              userData={userData}
              category="community"
              icon={faRecycle}
              title="community"
            />
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
            <div className="row m-0 p-2 glassmorphism">
              <div className="col-md-6 col-sm-12">
                <h3>Earths Guardian</h3>
                <img
                  width="100%"
                  className="rounded-3"
                  src={guardian}
                  alt="user badge image"
                />
              </div>
              <div className="col-md-6 col-sm-12 bar-chart-container">
                {totalScore && (
                  <TotalScoreBar score={totalScore} user={userData.name} />
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 mb-4 glassmorphism">
            {totalUsers &&
              totalUsers.map((user, i) => (
                <LeaderBoardUser user={user} key={i} />
              ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
