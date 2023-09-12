import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Spinner, ProgressBar } from "react-bootstrap";
import { CategoryChart } from "./Charts";
import "./card.css";

import {
  AppUser,
  CommunityData,
  EnergyData,
  FoodData,
  TravelData,
} from "../classes/AppUser";

type CategoryDataTypes = TravelData | FoodData | EnergyData | CommunityData;

interface CategoryCardProps {
  userData: AppUser;
  category: keyof AppUser;
  icon: IconDefinition;
  title: string;
}

const CategoryCard: FunctionComponent<CategoryCardProps> = ({
  userData,
  category,
  icon,
  title,
}) => {
  if (!userData) {
    return (
      <div className="glassmorphism d-flex justify-content-center align-items-center text-decoration-none flex-column loader">
        <Spinner animation="grow" />
      </div>
    );
  }
  const categoryData = userData[category] as CategoryDataTypes;

  let score = 0;
  if (category === "energy") {
    score = userData.calcEnergyScore();
  }
  if (category === "food") {
    score = userData.calcFoodScore();
  }
  if (category === "community") {
    score = userData.calcRecyclingScore();
  }
  if (category === "travel") {
    score = userData.calcTransportScore();
  }

  return (
    <Link
      to={`/${title}`}
      className="glassmorphism d-flex justify-content-center align-items-center text-decoration-none flex-column"
    >
      <div className="d-flex mt-2 w-100 justify-content-center">
        <h3 className="text-dark text-capitalize">{title}</h3>
        <FontAwesomeIcon icon={icon} className="h2 mx-2" />
      </div>

      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-6">
            {Object.keys(categoryData).map((categoryKey, i) => {
              let categoryScore = (
                categoryData[categoryKey as keyof CategoryDataTypes] as any
              )?.score;

              let variant;
              if (categoryScore < 25) {
                variant = "danger";
              } else if (categoryScore < 50) {
                variant = "warning";
              } else if (categoryScore < 75) {
                variant = "primary";
              } else if (categoryScore > 75) {
                variant = "success";
              }

              return (
                <ProgressBar
                  className="mb-2"
                  animated
                  striped
                  variant={variant}
                  now={categoryScore}
                  label={categoryKey}
                  key={i}
                />
              );
            })}
          </div>
          <div className="col-6 d-flex justify-content-center align-items-center">
            <CategoryChart score={score} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
