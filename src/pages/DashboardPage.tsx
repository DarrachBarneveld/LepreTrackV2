import { FunctionComponent, useContext, useEffect, useState } from "react";
import CategoryCard from "../components/CategoryCard";
import {
  faBolt,
  faBurger,
  faRecycle,
  faSignal,
  faStar,
  faTruckPlane,
} from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../context/FireBaseContext";
import { AppUser } from "../classes/AppUser";
import guardian from "../assets/images/guardians/earth-guardian.png";
import { TotalScoreBar } from "../components/Charts";
import LeaderBoardUser from "../components/LeaderBoardUser";
import { getAllUserDocuments } from "../config/firebaseAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PageHeader from "../components/PageHeader";
import { renderUserBadge } from "../helpers/renders";

interface DashboardPageProps {}

const DashboardPage: FunctionComponent<DashboardPageProps> = () => {
  const [totalUsers, setTotalUsers] = useState<AppUser[]>([]);
  const { userData } = useContext(AppContext) as { userData: AppUser };

  const totalScore = userData?.overAllScore();
  const rating = userData?.starRating();

  const { guardianName, guardian } = renderUserBadge(totalScore);

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
      <PageHeader title="Dashboard" subheadline="Check out your latest data" />
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

          <div className="col-lg-6 col-md-6 col-sm-12 mb-4 py-2">
            <div className="row m-0 p-2 glassmorphism align-items-center">
              <h3 className="border-bottom">
                Your Score {rating && rating}
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-warning stroke"
                />
              </h3>
              <div className="col-md-6 col-sm-12">
                <h3>{guardianName}</h3>
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
          <div className="col-lg-6 col-md-6 col-sm-12 mb-4 glassmorphism py-2">
            <div>
              <h3 className="border-bottom ">
                Leaderboard{" "}
                <FontAwesomeIcon
                  icon={faSignal}
                  className="stroke text-success"
                />
              </h3>
              <ul className="d-flex list-unstyled justify-content-center">
                <li className="d-flex align-items-center mx-1">
                  <div className="legend bg-primary mx-1"></div>
                  <span>Travel</span>
                </li>
                <li className="d-flex align-items-center mx-1">
                  <div className="legend bg-danger mx-1"></div>
                  <span>Food</span>
                </li>
                <li className="d-flex align-items-center mx-1">
                  <div className="legend bg-warning mx-1"></div>
                  <span>Energy</span>
                </li>
                <li className="d-flex align-items-center mx-1">
                  <div className="legend bg-success mx-1"></div>
                  <span>Community</span>
                </li>
              </ul>
            </div>
            {totalUsers &&
              totalUsers
                .sort((a, b) => +b.starRating() - +a.starRating())
                .map((user, i) => <LeaderBoardUser user={user} key={i} />)}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
