import { FunctionComponent } from "react";
import PageHeader from "../components/PageHeader";

interface EnergyPageProps {}

const EnergyPage: FunctionComponent<EnergyPageProps> = () => {
  return (
    <PageHeader
      title="Energy"
      subheadline="Can you improve your energy score?"
    />
  );
};

export default EnergyPage;
