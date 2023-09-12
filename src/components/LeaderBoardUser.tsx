import { OverlayTrigger, ProgressBar, Tooltip } from "react-bootstrap";
import { AppUser } from "../classes/AppUser";
import { FunctionComponent } from "react";
import guardian from "../assets/images/guardians/earth-guardian.png";

interface LeaderBoardUserProps {
  user: AppUser;
}

const LeaderBoardUser: FunctionComponent<LeaderBoardUserProps> = ({ user }) => {
  const communityScore = user.calcRecyclingScore() / 4;
  const traveScore = user.calcTransportScore() / 4;
  const foodScore = user.calcFoodScore() / 4;
  const energyScore = user.calcEnergyScore() / 4;

  const rating = user.starRating();

  return (
    <div className="d-flex my-2">
      {/* <OverlayTrigger
        placement="top"
        delay={{ show: 250, hide: 400 }}
        overlay={<Tooltip>{user.name}</Tooltip>}
      >
        <img src={guardian} width={30} height={30} />
      </OverlayTrigger> */}

      <OverlayTrigger
        placement="top"
        delay={{ show: 250, hide: 400 }}
        overlay={<Tooltip>{user.name}</Tooltip>}
      >
        <span className="leaderboard-username text-start text-capitalize">
          {user.name.slice(0, 5)}
        </span>
      </OverlayTrigger>

      <div className="d-block w-100 mx-2 position-relative">
        <ProgressBar className="leaderboard-bar" label={user.name}>
          <ProgressBar striped variant="primary" now={traveScore} key={1} />
          <ProgressBar striped variant="danger" now={foodScore} key={2} />
          <ProgressBar striped variant="warning" now={energyScore} key={3} />
          <ProgressBar striped variant="success" now={communityScore} key={4} />
        </ProgressBar>
      </div>
      <span>{rating}⭐</span>
    </div>
  );
};

export default LeaderBoardUser;
