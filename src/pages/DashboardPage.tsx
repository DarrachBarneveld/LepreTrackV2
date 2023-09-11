import { FunctionComponent } from "react";

interface DashboardPageProps {}

const DashboardPage: FunctionComponent<DashboardPageProps> = () => {
  return (
    <main>
      <div className="container">
        <div className="row">
          <div className="col-xl-3 col-md-6">
            <a id="transport" href="transport.html">
              <div className="category">
                <div className="card-body h3">
                  <h3>TRAVEL</h3>
                  <i className="fa-solid fa-truck-plane"></i>
                  <div id="transportChart"></div>
                </div>
              </div>
            </a>
          </div>
          <div className="col-xl-3 col-md-6">
            <a id="food" href="food.html">
              <div className="category">
                <div className="card-body h3">
                  <h3>FOOD</h3>
                  <i className="fa-solid fa-utensils"></i>
                  <div id="foodChart"></div>
                </div>
              </div>
            </a>
          </div>
          <div className="col-xl-3 col-md-6">
            <a id="energy" href="energy.html">
              <div className="category">
                <div className="card-body h3">
                  <h3>ENERGY</h3>
                  <i className="fa-solid fa-lightbulb"></i>
                  <div id="energyChart"></div>
                </div>
              </div>
            </a>
          </div>
          <div className="col-xl-3 col-md-6">
            <a id="community" href="recycling.html">
              <div className="category">
                <div className="card-body h3">
                  <h3>COMMUNITY</h3>
                  <i className="fa-solid fa-recycle"></i>
                  <div id="communityChart"></div>
                </div>
              </div>
            </a>
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
