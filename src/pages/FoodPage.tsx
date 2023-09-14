import { FunctionComponent, useContext, useState } from "react";
import PageHeader from "../components/PageHeader";
import { FormChart } from "../components/Charts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomForm from "../forms/CustomForm";
import {
  faPizzaSlice,
  faSeedling,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import {
  CategoryPageProps,
  FieldSet,
  createValidationSchema,
} from "./TravelPage";
import { AppContext } from "../context/FireBaseContext";
import {
  calcFarmingPercent,
  calculateInvertedPercentage,
  dietScoreComparedToIrishAverage,
} from "../helpers/math";
import { updateFireBase } from "../config/firebaseAuth";

const dietInputFields = [
  {
    name: "type",
    label: "Choose your diet",
    type: "select",
    options: [
      { value: "carnivore", label: "Carnivore" },
      { value: "omnivore", label: "Omnivore" },
      { value: "pescatarian", label: "Pescatarian" },
      { value: "vegetarian", label: "Vegetarian" },
      { value: "vegan", label: "Vegan" },
    ],
  },
  {
    name: "calories",
    label: "Daily Caloires",
    type: "number",
  },
];

const farmInputFields = [
  { name: "local", label: "Do you shop locally?", type: "checkbox" },
  { name: "produce", label: "% Local Produce", type: "number" },
  { name: "organic", label: "% Organic/Regenrative Agr", type: "number" },
  {
    name: "seasonal",
    label: "Do you mostly eat seasonal fruit/veg",
    type: "checkbox",
  },
  { name: "crop", label: "Do you grow your own crop", type: "checkbox" },
];

const diningInitialInputs = {
  out: false,
  waste: 0,
};

const diningInputFields = [
  { name: "out", label: "Do you eat out weekly?", type: "checkbox" },
  { name: "waste", label: "Do you regularly waste food?", type: "checkbox" },
];

const dietFields: FieldSet = {
  type: Yup.string().required("Please select a diet"),
  calories: Yup.number()
    .required("This field is required")
    .positive("Number of calories must be a positive number")
    .integer("Number of calories must be an integer"),
};

const farmingFields: FieldSet = {
  local: Yup.boolean(),
  produce: Yup.number()
    .required("This field is required")
    .min(0, "Number of produce must not be negative")
    .integer("Number of produce must be an integer"),
  organic: Yup.number()
    .required("This field is required")
    .min(0, "Number of organic must not be negative")
    .integer("Number of organic must be an integer"),
  seasonal: Yup.boolean(),
  crop: Yup.boolean(),
};

const diningFields: FieldSet = {
  out: Yup.boolean(),
  waste: Yup.boolean(),
};

const dietValidationSchema = createValidationSchema(dietFields);
const farmingValidationSchema = createValidationSchema(farmingFields);
const diningValidationSchema = createValidationSchema(diningFields);

const FoodPage: FunctionComponent = () => {
  const { userData, userAuth } = useContext(AppContext);
  if (!userData) return;

  const [dietScore, setDietScore] = useState<number>(+userData.food.diet.score);
  const [farmScore, setFarmScore] = useState<number>(+userData.food.farm.score);
  const [diningScore, setDiningScore] = useState<number>(
    +userData.food.dining.score
  );

  const dietInitialValues = {
    type: userData.food.diet.type || "carnivore",
    calories: userData.food.diet.calories || 0,
  };

  const farmInitialInputs = {
    local: userData.food.farm.local || false,
    produce: userData.food.farm.produce || 0,
    organic: userData.food.farm.organic || 0,
    seasonal: userData.food.farm.seasonal || false,
    crop: userData.food.farm.crop || false,
  };

  const diningInitialValues = {
    out: userData.food.dining.out || false,
    waste: userData.food.dining.waste || false,
  };

  const dietSubmit = async (
    values: any,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    let score = dietScoreComparedToIrishAverage(values.diet, values.calories);
    const trueScore = score;

    let inversePercent = calculateInvertedPercentage(trueScore);

    const data = {
      type: values.diet,
      calories: values.calories,
      score: inversePercent.toFixed(2),
    };

    if (userAuth) {
      await updateFireBase(data, "food", "diet", userAuth);

      inversePercent < 0 ? (inversePercent = 0) : inversePercent;

      setDietScore(inversePercent);
    }

    setSubmitting(false);
  };

  const farmSubmit = async (
    values: any,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    console.log(values);

    const { local, produce, organic, crop, seasonal } = values;

    const dataValues = { local, produce, organic, seasonal, crop };

    let percent = calcFarmingPercent(dataValues);

    const data = {
      local,
      produce,
      organic,
      seasonal,
      crop,
      score: percent,
    };

    if (userAuth) {
      await updateFireBase(data, "food", "farm", userAuth);

      percent < 0 ? (percent = 0) : percent;

      setFarmScore(percent);
    }
    setSubmitting(false);
  };

  const diningSubmit = async (
    values: any,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    console.log(values);
    const { out, waste } = values;

    let value = 0;

    out ? (value += 50) : value;
    waste ? (value += 50) : value;

    let inversePercent = calculateInvertedPercentage(value);

    const data = {
      out,
      waste,
      score: inversePercent,
    };

    if (userAuth) {
      await updateFireBase(data, "food", "diet", userAuth);

      inversePercent < 0 ? (inversePercent = 0) : inversePercent;

      setDiningScore(inversePercent);
    }
    setSubmitting(false);
  };

  return (
    <main>
      <PageHeader title="Food" subheadline="Can you improve your food score?" />
      <div className="row container-row">
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4 px-3">
          <div className="card text-center glassmorphism">
            <div className="d-flex align-items-center justify-content-center">
              <FormChart score={dietScore} color={["#FFBE3D", "#F06543"]} />
              <FontAwesomeIcon
                icon={faPizzaSlice}
                className="h2 position-absolute"
              />
            </div>
            <p className="d-flex justify-content-center">
              <span className="fw-bolder mx-2">{dietScore}%</span>
              <span className="text-muted">Avg</span>
            </p>
            {/* DIET FORM */}
            <CustomForm
              initialValues={dietInitialValues}
              validationSchema={dietValidationSchema}
              inputFields={dietInputFields}
              handleSubmit={farmSubmit}
            />
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4 px-3">
          <div className="card text-center glassmorphism">
            <div className="d-flex align-items-center justify-content-center">
              <FormChart score={farmScore} color={["#63D471", "#378B29"]} />
              <FontAwesomeIcon
                icon={faSeedling}
                className="h2 position-absolute"
              />
            </div>
            <p className="d-flex justify-content-center">
              <span className="fw-bolder mx-2">{farmScore}%</span>
              <span className="text-muted">Avg</span>
            </p>
            {/* FARMING FORM */}
            <CustomForm
              initialValues={farmInitialInputs}
              validationSchema={farmingValidationSchema}
              inputFields={farmInputFields}
              handleSubmit={farmSubmit}
            />
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4 px-3">
          <div className="card text-center glassmorphism">
            <div className="d-flex align-items-center justify-content-center">
              <FormChart score={diningScore} color={["#A594F9", "#6247AA"]} />
              <FontAwesomeIcon
                icon={faUtensils}
                className="h2 position-absolute"
              />
            </div>
            <p className="d-flex justify-content-center">
              <span className="fw-bolder mx-2">{diningScore}%</span>
              <span className="text-muted">Avg</span>
            </p>
            {/* DINING FORM */}
            <CustomForm
              initialValues={diningInitialInputs}
              validationSchema={diningValidationSchema}
              inputFields={diningInputFields}
              handleSubmit={diningSubmit}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default FoodPage;
