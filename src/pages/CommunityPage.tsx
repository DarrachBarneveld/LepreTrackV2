import { FunctionComponent } from "react";
import PageHeader from "../components/PageHeader";

interface CommunityPageProps {}

const CommunityPage: FunctionComponent<CommunityPageProps> = () => {
  return (
    <PageHeader
      title="Community"
      subheadline="Can you improve your community score?"
    />
  );
};

export default CommunityPage;
