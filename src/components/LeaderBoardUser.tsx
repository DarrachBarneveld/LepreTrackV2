import { ProgressBar } from "react-bootstrap";
import { AppUser } from "../classes/AppUser";
import { FunctionComponent } from "react";

interface LeaderBoardUserProps {
  user: AppUser;
}

const LeaderBoardUser: FunctionComponent<LeaderBoardUserProps> = ({ user }) => {
  const communityScore = user.calcRecyclingScore() / 4;
  const traveScore = user.calcTransportScore() / 4;
  const foodScore = user.calcFoodScore() / 4;
  const energyScore = user.calcEnergyScore() / 4;

  return (
    <>
      <span>{user.name}</span>
      <ProgressBar className="leaderboard-bar my-2">
        <ProgressBar
          striped
          variant="primary"
          now={traveScore}
          key={1}
          animated
        />
        <ProgressBar
          striped
          variant="success"
          now={foodScore}
          key={2}
          animated
        />
        <ProgressBar variant="warning" now={energyScore} key={3} animated />
        <ProgressBar
          striped
          variant="danger"
          now={communityScore}
          key={4}
          animated
        />
      </ProgressBar>
    </>
  );
};

export default LeaderBoardUser;
