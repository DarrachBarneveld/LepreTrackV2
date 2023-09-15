import { FunctionComponent, useContext, useState } from "react";
import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import { FormChart } from "../components/Charts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faPlugCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import CustomForm from "../forms/CustomForm";
import * as Yup from "yup";
import { FieldSet, createValidationSchema } from "./TravelPage";
import { AppContext } from "../context/FireBaseContext";
import { updateFireBase } from "../config/firebaseAuth";
import { calcBooleanAmountPercent } from "../helpers/math";

const energyInputFields = [
  {
    name: "electric",
    label: "Electric",
    type: "number",
  },
  { name: "factor", label: "Electricty Factor", type: "number" },
  {
    name: "gas",
    label: "Gas",
    type: "number",
  },
  {
    name: "oil",
    label: "Oil",
    type: "number",
  },
  {
    name: "coal",
    label: "Coal",
    type: "number",
  },
  {
    name: "lpg",
    label: "LPG",
    type: "number",
  },
  {
    name: "propane",
    label: "Propane",
    type: "number",
  },
  {
    name: "wood",
    label: "Wood",
    type: "number",
  },
];

const homeInputFields = [
  {
    name: "solar",
    label: "Solar Panels",
    type: "checkbox",
  },
  { name: "lights", label: "Energy Efficient Lights", type: "checkbox" },
  {
    name: "insulation",
    label: "Quality Insulation",
    type: "checkbox",
  },
  {
    name: "appliances",
    label: "Energy Efficient Appliances",
    type: "checkbox",
  },
  {
    name: "windows",
    label: "Energy Efficient Windows",
    type: "checkbox",
  },
  {
    name: "thermostat",
    label: "Programmable Thermostat",
    type: "checkbox",
  },
  {
    name: "water",
    label: "Water Conservation Devices",
    type: "checkbox",
  },
  {
    name: "materials",
    label: "Sustainable Material Construction",
    type: "checkbox",
  },
];

const energyFields: FieldSet = {
  electric: Yup.number()
    .required("This field is required")
    .min(0, "Number of electric must not be negative")
    .integer("Number of electric must be an integer"),
  gas: Yup.number()
    .required("This field is required")
    .min(0, "Number of gas must not be negative")
    .integer("Number of gas must be an integer"),
  oil: Yup.number()
    .required("This field is required")
    .min(0, "Number of oil must not be negative")
    .integer("Number of oil must be an integer"),
  coal: Yup.number()
    .required("This field is required")
    .min(0, "Number of coal must not be negative")
    .integer("Number of coal must be an integer"),
  lpg: Yup.number()
    .required("This field is required")
    .min(0, "Number of lpg must not be negative")
    .integer("Number of lpg must be an integer"),
  propane: Yup.number()
    .required("This field is required")
    .min(0, "Number of propane must not be negative")
    .integer("Number of propane must be an integer"),
  wood: Yup.number()
    .required("This field is required")
    .min(0, "Number of wood must not be negative")
    .integer("Number of wood must be an integer"),
  factor: Yup.number()
    .required("This field is required")
    .min(0, "Number of factor must not be negative")
    .integer("Number of factor must be an integer"),
};

const homeFields: FieldSet = {
  solar: Yup.boolean(),
  lights: Yup.boolean(),
  insulation: Yup.boolean(),
  appliances: Yup.boolean(),
  windows: Yup.boolean(),
  thermostat: Yup.boolean(),
  water: Yup.boolean(),
  materials: Yup.boolean(),
};

const energyValidationSchema = createValidationSchema(energyFields);
const homeValidationSchema = createValidationSchema(homeFields);

const EnergyPage: FunctionComponent = () => {
  const { userData, userAuth } = useContext(AppContext);

  if (!userData) return;

  const [energyScore, setEnergyScore] = useState<number>(
    +userData.energy.energy.score
  );
  const [homeScore, setHomeScore] = useState<number>(
    +userData.energy.home.score
  );

  const energyInitialValues = {
    electric: userData.energy.energy.electric || 0,
    gas: userData.energy.energy.gas || 0,
    oil: userData.energy.energy.oil || 0,
    coal: userData.energy.energy.coal || 0,
    lpg: userData.energy.energy.lpg || 0,
    propane: userData.energy.energy.propane || 0,
    wood: userData.energy.energy.wood || 0,
    factor: userData.energy.energy.factor || 0,
  };

  const homeInitialValues = {
    solar: userData.energy.home?.solar || false,
    lights: userData.energy.home?.lights || false,
    insulation: userData.energy.home?.insulation || false,
    appliances: userData.energy.home?.appliances || false,
    windows: userData.energy.home?.windows || false,
    thermostat: userData.energy.home?.thermostat || false,
    water: userData.energy.home?.water || false,
    materials: userData.energy.home?.materials || false,
  };

  const energySubmit = async (
    values: any,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const { factor, electric, coal, gas, lpg, oil, propane, wood } = values;

    const elecValue = electric * factor;
    const gasValue = gas * 0.183;
    const oilValue = oil * 2.54047619047619;
    const coalValue = coal * 2.883259523809524;
    const lpgValue = lpg * 1.557142857142857;
    const propaneValue = propane * 1.542857142857143;
    const woodValue = wood * 0.0505547619047619;

    const totalValue =
      elecValue +
      gasValue +
      oilValue +
      coalValue +
      lpgValue +
      propaneValue +
      woodValue;

    const inTonnesValue = totalValue / 1000;

    let inverseScore = calculateInvertedPercentage(inTonnesValue);

    const data = { score: inverseScore.toFixed(2), ...values };

    if (userAuth) {
      await updateFireBase(data, "energy", "energy", userAuth);

      inverseScore < 0 ? (inverseScore = 0) : inverseScore;

      setEnergyScore(+inverseScore.toFixed(2));
    }

    setSubmitting(false);
  };

  const homeSubmit = async (
    values: any,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    console.log(values);

    const score = calcBooleanAmountPercent(values);

    const data = {
      score,
      ...values,
    };

    if (userAuth) {
      await updateFireBase(data, "energy", "home", userAuth);

      setHomeScore(score);
    }

    setSubmitting(false);
  };
  return (
    <main>
      <PageHeader
        title="Energy"
        subheadline="Can you improve your energy score?"
      />

      <div className="row container-row">
        <div className="col-md-6 col-sm-12 mb-4 px-3">
          <motion.div
            className="card text-center glassmorphism"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 1 }}
          >
            <div className="d-flex align-items-center justify-content-center">
              <FormChart score={energyScore} color={["#F07654", "#F5DF2E"]} />
              <FontAwesomeIcon
                icon={faPlugCircleExclamation}
                className="h2 position-absolute"
              />
            </div>
            <p className="d-flex justify-content-center">
              <span className="fw-bolder mx-2">{energyScore}%</span>
              <span className="text-muted">Avg</span>
            </p>
            {/* DIET FORM */}
            <CustomForm
              columns
              initialValues={energyInitialValues}
              validationSchema={energyValidationSchema}
              inputFields={energyInputFields}
              handleSubmit={energySubmit}
            />
          </motion.div>
        </div>
        <div className="col-md-6 col-sm-12 mb-4 px-3">
          <motion.div
            className="card text-center glassmorphism"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 1 }}
          >
            <div className="d-flex align-items-center justify-content-center">
              <FormChart score={homeScore} color={["#F08EFC", "#EE5166"]} />
              <FontAwesomeIcon
                icon={faHouse}
                className="h2 position-absolute"
              />
            </div>
            <p className="d-flex justify-content-center">
              <span className="fw-bolder mx-2">{homeScore}%</span>
              <span className="text-muted">Avg</span>
            </p>
            {/* DIET FORM */}
            <CustomForm
              columns
              initialValues={homeInitialValues}
              validationSchema={homeValidationSchema}
              inputFields={homeInputFields}
              handleSubmit={homeSubmit}
            />
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default EnergyPage;
