import { FunctionComponent } from "react";
import PageHeader from "../components/PageHeader";

interface FoodPageProps {}

const FoodPage: FunctionComponent<FoodPageProps> = () => {
  return (
    <PageHeader title="Food" subheadline="Can you improve your food score?" />
  );
};

export default FoodPage;
