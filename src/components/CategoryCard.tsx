import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Spinner, ProgressBar } from "react-bootstrap";
import { CategoryChart } from "./Charts";
import guardian from "../assets/images/guardians/earth-guardian.png";
import terror from "../assets/images/guardians/terra-tormentor.png";
import balanced from "../assets/images/guardians/balanced-footprint.png";
import finger from "../assets/images/guardians/green-finger.png";

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

  function renderScoreStyling(category: string) {
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

    let imageSrc;
    let borderColor;

    if (score < 25) {
      imageSrc = terror;
      borderColor = "red";
    } else if (score < 50) {
      imageSrc = balanced;
      borderColor = "orange";
    } else if (score < 75) {
      imageSrc = finger;
      borderColor = "blue";
    } else if (score > 75) {
      imageSrc = guardian;
      borderColor = "green";
    }

    return { score, imageSrc, borderColor };
  }

  const { score, imageSrc, borderColor } = renderScoreStyling(category);

  return (
    <Link
      to={`/${title}`}
      className="glassmorphism d-flex justify-content-center align-items-center text-decoration-none flex-column category-card"
    >
      <div className="w-100 px-2 mt-1 d-flex justify-content-between">
        <div className="d-flex mt-2">
          <h3 className="text-dark text-capitalize">{title}</h3>
          <FontAwesomeIcon icon={icon} className="h2 mx-2 stroke" />
        </div>
        <div>
          <img
            src={imageSrc}
            alt="guardian image"
            className="guardian-tag"
            style={{ borderColor }}
          />
        </div>
      </div>

      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-6">
            {Object.keys(categoryData).map((categoryKey, i) => {
              let categoryScore = (
                categoryData[categoryKey as keyof CategoryDataTypes] as {
                  score: number;
                }
              ).score;

              categoryScore <= 0 ? (categoryScore = 0) : categoryScore;

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
          <div className="col-6 d-flex justify-content-center align-items-center p-0">
            <CategoryChart score={score} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
