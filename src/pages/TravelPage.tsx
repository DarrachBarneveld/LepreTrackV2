import { FunctionComponent } from "react";
import PageHeader from "../components/PageHeader";
import { FormChart } from "../components/Charts";
import {
  faCar,
  faPlaneDeparture,
  faTrain,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomForm from "../forms/TravelForms";
import * as Yup from "yup";

interface TravelPageProps {}

const flightValidationSchema = Yup.object().shape({
  flightKm: Yup.number()
    .required("This field is required")
    .positive("Kilometers must be a positive number")
    .integer("Kilometers must be an integer"),
  numFlights: Yup.number()
    .required("This field is required")
    .positive("Number of flights must be a positive number")
    .integer("Number of flights must be an integer"),
  flightClass: Yup.string().required("Please select a flight class"),
});

const flightInitialValues = {
  flightKm: "",
  numFlights: "",
  flightClass: "",
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

const carValidationSchema = Yup.object().shape({
  weeklyKm: Yup.number()
    .required("This field is required")
    .positive("Kilometers must be a positive number")
    .integer("Kilometers must be an integer"),
  type: Yup.string().required("Please select a car class"),
  year2000: Yup.string().required("Please select before or after 2000"),
});

const carInitialValues = {
  weeklyKm: "",
  type: "",
  year2000: "",
};

const carInputFields = [
  {
    name: "weeklyKm",
    label: "km/week",
    type: "number",
  },
  {
    name: "carType",
    label: "Type of Car",
    type: "radio",
    options: [
      { value: "electric", label: "Electric" },
      { value: "hybrid", label: "Hybrid" },
      { value: "petro", label: "Petro" },
    ],
  },
  {
    name: "carYear",
    label: "Car Manufactured:",
    type: "radio",
    options: [
      { value: "after", label: "After 2000" },
      { value: "before", label: "Before 2000" },
    ],
  },
];

const transportValidationSchema = Yup.object().shape({
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
    .test("custom", "Total percentage must equal 100%", function (value) {
      const { drive, carpool, walk, cycle, train, bus } = this.parent;
      const total = drive + carpool + walk + cycle + train + bus;
      return total === 100;
    })
    .required("Total percentage is required"),
});

const transportInitialValues = {
  drive: 0,
  carpool: 0,
  walk: 0,
  cycle: 0,
  train: 0,
  bus: 0,
  custom: 0,
};

const transportInputFields = [
  { name: "drive", label: "Drive (%)", type: "number" },
  { name: "carpool", label: "Carpool (%)", type: "number" },
  { name: "walk", label: "Walk (%)", type: "number" },
  { name: "cycle", label: "Cycle (%)", type: "number" },
  { name: "train", label: "Train (%)", type: "number" },
  { name: "bus", label: "Bus (%)", type: "number" },
];

const TravelPage: FunctionComponent<TravelPageProps> = () => {
  return (
    <main>
      <PageHeader
        title="Travel"
        subheadline="Can you improve your travel score?"
      />

      <div className="row container-row">
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4 px-3">
          <div className="card text-center glassmorphism">
            <div className="d-flex align-items-center justify-content-center">
              <FormChart score={10} color={["#DA2D2D", "#7C0000"]} />
              <FontAwesomeIcon
                icon={faPlaneDeparture}
                className="h2 position-absolute"
              />
            </div>
            <p className="d-flex justify-content-center">
              <span className="fw-bolder mx-2">100%</span>
              <span className="text-muted">Avg</span>
            </p>
            {/* FLIGHT FORM */}
            <CustomForm
              initialValues={flightInitialValues}
              validationSchema={flightValidationSchema}
              inputFields={flightInputFields}
            />
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4 px-3">
          <div className="card text-center glassmorphism">
            <div className="d-flex align-items-center justify-content-center">
              <FormChart score={10} color={["#009FFD", "#5200AE"]} />
              <FontAwesomeIcon icon={faCar} className="h2 position-absolute" />
            </div>
            <p className="d-flex justify-content-center">
              <span className="fw-bolder mx-2">100%</span>
              <span className="text-muted">Avg</span>
            </p>
            {/* CAR FORM */}
            <CustomForm
              initialValues={carInitialValues}
              validationSchema={carValidationSchema}
              inputFields={carInputFields}
            />
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4 px-3">
          <div className="card text-center glassmorphism">
            <div className="d-flex align-items-center justify-content-center">
              <FormChart score={10} color={["#63D471", "#378B29"]} />
              <FontAwesomeIcon
                icon={faTrain}
                className="h2 position-absolute"
              />
            </div>
            <p className="d-flex justify-content-center">
              <span className="fw-bolder mx-2">100%</span>
              <span className="text-muted">Avg</span>
            </p>
            {/* TRANSPORT FORM */}
            <CustomForm
              initialValues={transportInitialValues}
              validationSchema={transportValidationSchema}
              inputFields={transportInputFields}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default TravelPage;
