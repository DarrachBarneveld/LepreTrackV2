import { ProgressBar } from "react-bootstrap";
import { AppUser } from "../classes/AppUser";
import { FunctionComponent } from "react";

interface LeaderBoardUserProps {
  user: AppUser;
}

const LeaderBoardUser: FunctionComponent<LeaderBoardUserProps> = () => {
  return (
    <ProgressBar>
      <ProgressBar striped variant="primary" now={35} key={1} animated />
      <ProgressBar striped variant="success" now={35} key={2} animated />
      <ProgressBar variant="warning" now={20} key={3} animated />
      <ProgressBar striped variant="danger" now={10} key={4} animated />
    </ProgressBar>
  );
};

export default LeaderBoardUser;
