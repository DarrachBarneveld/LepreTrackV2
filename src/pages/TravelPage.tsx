import { FunctionComponent, useContext, useState } from "react";
import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import { FormChart } from "../components/Charts";
import {
  faCar,
  faPlaneDeparture,
  faTrain,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomForm from "../forms/CustomForm";
import * as Yup from "yup";
import { AppUser } from "../classes/AppUser";
import { User } from "firebase/auth";
import {
  IrishAverageTravelMethodTotal,
  calculateInvertedPercentage,
  getPercentInRelationToAverage,
} from "../helpers/math";
import { updateFireBase } from "../config/firebaseAuth";
import { AppContext } from "../context/FireBaseContext";

export interface CategoryPageProps {
  userData: AppUser | undefined;
  userAuth: User | undefined;
}

const DUMMY_DATA = {
  // this is the average milage/carbon per week of a car
  averageKM: 327,
  averageFlights: 6.5,
  averageFlightKM: 6850,
  tonnesPerKM: 0.0002582,
  flightKperWeek: 34,
  carKperWeek: 36,
  communterKperWeek: 29,
  averageTravelMethod: {
    car: 65,
    carpool: 8,
    walkCycle: 15,
    bus: 6,
    train: 6,
  },
};

const flightInputFields = [
  {
    name: "flightKm",
    label: "Est km",
    type: "number",
  },
  {
    name: "numFlights",
    label: "Num flights",
    type: "number",
  },
  {
    name: "flightClass",
    label: "Which class do you fly?",
    type: "radio",
    options: [
      { value: "economy", label: "Economy" },
      { value: "business", label: "Business" },
      { value: "first", label: "First" },
    ],
  },
];

const carInputFields = [
  {
    name: "weeklyKm",
    label: "km/week",
    type: "number",
  },
  {
    name: "type",
    label: "Type of Car?",
    type: "radio",
    options: [
      { value: "electric", label: "Electric" },
      { value: "hybrid", label: "Hybrid" },
      { value: "petrol", label: "Petrol" },
    ],
  },
  {
    name: "year2000",
    label: "Car Manufactured?",
    type: "radio",
    options: [
      { value: "after", label: "After 2000" },
      { value: "before", label: "Before 2000" },
    ],
  },
];

const transportInputFields = [
  { name: "drive", label: "Drive (%)", type: "number" },
  { name: "carpool", label: "Carpool (%)", type: "number" },
  { name: "walk", label: "Walk (%)", type: "number" },
  { name: "cycle", label: "Cycle (%)", type: "number" },
  { name: "train", label: "Train (%)", type: "number" },
  { name: "bus", label: "Bus (%)", type: "number" },
];

export type FieldSet = Record<
  string,
  Yup.StringSchema | Yup.NumberSchema | Yup.BooleanSchema
>;

export function createValidationSchema(fields: FieldSet) {
  return Yup.object().shape(fields);
}

const carFields: FieldSet = {
  weeklyKm: Yup.number()
    .required("This field is required")
    .positive("Kilometers must be a positive number")
    .integer("Kilometers must be an integer"),
  type: Yup.string().required("Please select a car class"),
  year2000: Yup.string().required("Please select before or after 2000"),
};

const flightFields: FieldSet = {
  flightKm: Yup.number()
    .required("This field is required")
    .positive("Kilometers must be a positive number")
    .integer("Kilometers must be an integer"),
  numFlights: Yup.number()
    .required("This field is required")
    .positive("Number of flights must be a positive number")
    .integer("Number of flights must be an integer"),
  flightClass: Yup.string().required("Please select a flight class"),
};

const transportFields: FieldSet = {
  drive: Yup.number()
    .typeError("Must be a number")
    .min(0, "Value cannot be negative")
    .max(100, "Value cannot exceed 100")
    .required("Required"),
  carpool: Yup.number()
    .typeError("Must be a number")
    .min(0, "Value cannot be negative")
    .max(100, "Value cannot exceed 100")
    .required("Required"),
  walk: Yup.number()
    .typeError("Must be a number")
    .min(0, "Value cannot be negative")
    .max(100, "Value cannot exceed 100")
    .required("Required"),
  cycle: Yup.number()
    .typeError("Must be a number")
    .min(0, "Value cannot be negative")
    .max(100, "Value cannot exceed 100")
    .required("Required"),
  train: Yup.number()
    .typeError("Must be a number")
    .min(0, "Value cannot be negative")
    .max(100, "Value cannot exceed 100")
    .required("Required"),
  bus: Yup.number()
    .typeError("Must be a number")
    .min(0, "Value cannot be negative")
    .max(100, "Value cannot exceed 100")
    .required("Required"),
  custom: Yup.number()
    .test("custom", "Total percentage must equal 100%", function () {
      const { drive, carpool, walk, cycle, train, bus } = this.parent;
      const total = drive + carpool + walk + cycle + train + bus;
      return total === 100;
    })
    .required("Total percentage is required"),
};

const transportValidationSchema = createValidationSchema(transportFields);
const carValidationSchema = createValidationSchema(carFields);
const flightValidationSchema = createValidationSchema(flightFields);

const TravelPage: FunctionComponent = () => {
  const { userData, userAuth } = useContext(AppContext);
  if (!userData) return;

  const [flightScore, setFlightScore] = useState<number>(
    +userData.travel.flight.score
  );
  const [carScore, setCarScore] = useState<number>(+userData.travel.car.score);
  const [transportScore, setTransportScore] = useState<number>(
    +userData.travel.transport.score
  );
  const transportInitialValues = {
    drive: userData.travel.transport.drive || 0,
    carpool: userData.travel.transport.carpool || 0,
    walk: userData.travel.transport.walk || 0,
    cycle: userData.travel.transport.cycle || 0,
    train: userData.travel.transport.train || 0,
    bus: userData.travel.transport.bus || 0,
    custom: 0,
  };

  const flightInitialValues = {
    flightKm: userData.travel.flight.yearlyKM || 0,
    numFlights: userData.travel.flight.numFlights || 0,
    flightClass: userData.travel.flight.class || "economy",
  };

  const carInitialValues = {
    weeklyKm: userData.travel.car.weeklyKm || 0,
    type: userData.travel.car.type || "petrol",
    year2000: userData.travel.car.year2000 || "before",
  };

  const flightSubmit = async (
    values: any,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    let tonnesPerDistance = values.flightKm * DUMMY_DATA.tonnesPerKM;

    if (values.flightClass === "business") {
      // Multiple by 3 for Business Class
      tonnesPerDistance *= 3;
    }
    if (values.flightClass === "first") {
      // Multiple by 4 for First Class
      tonnesPerDistance *= 4;
    }

    const totalFlightCalc = 1 + values.numFlights / 5;

    tonnesPerDistance *= totalFlightCalc;

    const averageFlightCarbon =
      DUMMY_DATA.averageFlightKM * DUMMY_DATA.tonnesPerKM;

    let percentOfFlightKM = getPercentInRelationToAverage(
      tonnesPerDistance,
      averageFlightCarbon
    );

    const truePercent = percentOfFlightKM;

    let inversePercent = calculateInvertedPercentage(truePercent);

    const data = {
      yearlyKM: values.flightKm,
      numFlights: values.numFlights,
      class: values.flightClass,
      score: inversePercent.toFixed(2),
    };

    if (userAuth) {
      await updateFireBase(data, "travel", "flight", userAuth);

      inversePercent < 0 ? (inversePercent = 0) : inversePercent;

      setFlightScore(inversePercent);
    }

    setSubmitting(false);
  };

  const carSubmit = async (
    values: any,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    // const carType = values.

    let totalKilometers = values.weeklyKm;
    const trueTotalKM = values.weeklyKm;

    if (values.type === "electric") {
      // Reduce by 60% for Electric cars
      totalKilometers *= 0.4;
    }
    if (values.type === "hybrid") {
      // Reduce by 40% for Hybrid cars
      totalKilometers *= 0.6;
    }

    if (values.year2000 === "before") {
      totalKilometers *= 2;
    }

    let percentOfCarKM = getPercentInRelationToAverage(
      totalKilometers,
      DUMMY_DATA.averageKM
    );

    let truePercent = percentOfCarKM;
    let inversePercent = calculateInvertedPercentage(truePercent);

    const data = {
      weeklyKm: trueTotalKM,
      type: values.type,
      year2000: values.year2000,
      score: inversePercent.toFixed(2),
    };

    if (userAuth) {
      await updateFireBase(data, "travel", "car", userAuth);

      inversePercent < 0 ? (inversePercent = 0) : inversePercent;

      setCarScore(inversePercent);
    }

    setSubmitting(false);
  };

  const transportSubmit = async (
    values: any,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    // const carType = values.

    const { drive, carpool, cycle, train, bus, walk } = values;
    const weightedSum =
      drive * 1 +
      carpool * 0.5 +
      walk * 0 +
      cycle * 0 +
      train * 0.2 +
      bus * 0.6;

    const averageCarbonSum = IrishAverageTravelMethodTotal();

    let percentMode = getPercentInRelationToAverage(
      weightedSum,
      averageCarbonSum
    );

    const truePercent = percentMode;
    let inversePercent = calculateInvertedPercentage(truePercent);

    const data = {
      drive,
      carpool,
      walk,
      cycle,
      train,
      bus,
      score: inversePercent.toFixed(2),
    };

    if (userAuth) {
      await updateFireBase(data, "travel", "transport", userAuth);

      inversePercent < 0 ? (inversePercent = 0) : inversePercent;

      setTransportScore(inversePercent);
    }

    setSubmitting(false);
  };

  return (
    <main>
      <PageHeader
        title="Travel"
        subheadline="Can you improve your travel score?"
      />

      <div className="row container-row">
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4 px-3">
          <motion.div
            className="card text-center glassmorphism"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 1 }}
          >
            <div className="d-flex align-items-center justify-content-center">
              <FormChart score={flightScore} color={["#DA2D2D", "#7C0000"]} />
              <FontAwesomeIcon
                icon={faPlaneDeparture}
                className="h2 position-absolute"
              />
            </div>
            <p className="d-flex justify-content-center">
              <span className="fw-bolder mx-2">{flightScore.toFixed(2)}%</span>
              <span className="text-muted">Avg</span>
            </p>
            {/* FLIGHT FORM */}
            <CustomForm
              initialValues={flightInitialValues}
              validationSchema={flightValidationSchema}
              inputFields={flightInputFields}
              handleSubmit={flightSubmit}
            />
          </motion.div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4 px-3">
          <motion.div
            className="card text-center glassmorphism"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 1, delay: 0.2 }}
          >
            <div className="d-flex align-items-center justify-content-center">
              <FormChart score={carScore} color={["#009FFD", "#5200AE"]} />
              <FontAwesomeIcon icon={faCar} className="h2 position-absolute" />
            </div>
            <p className="d-flex justify-content-center">
              <span className="fw-bolder mx-2">{carScore.toFixed(2)}%</span>
              <span className="text-muted">Avg</span>
            </p>
            {/* CAR FORM */}
            <CustomForm
              initialValues={carInitialValues}
              validationSchema={carValidationSchema}
              inputFields={carInputFields}
              handleSubmit={carSubmit}
            />
          </motion.div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4 px-3">
          <motion.div
            className="card text-center glassmorphism"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 1, delay: 0.4 }}
          >
            <div className="d-flex align-items-center justify-content-center">
              <FormChart
                score={transportScore}
                color={["#63D471", "#378B29"]}
              />
              <FontAwesomeIcon
                icon={faTrain}
                className="h2 position-absolute"
              />
            </div>
            <p className="d-flex justify-content-center">
              <span className="fw-bolder mx-2">
                {transportScore.toFixed(2)}%
              </span>
              <span className="text-muted">Avg</span>
            </p>
            {/* TRANSPORT FORM */}
            <CustomForm
              columns
              initialValues={transportInitialValues}
              validationSchema={transportValidationSchema}
              inputFields={transportInputFields}
              handleSubmit={transportSubmit}
            />
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default TravelPage;
