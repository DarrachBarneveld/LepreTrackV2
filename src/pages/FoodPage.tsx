import { FunctionComponent } from "react";
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
import { FieldSet, createValidationSchema } from "./TravelPage";

const dietInitialValues = {
  type: "",
  calories: "",
};

const dietInputFields = [
  {
    name: "diet",
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

const farmInitialInputs = {
  local: false,
  produce: 0,
  organic: 0,
  seasonal: false,
  crop: false,
};

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

const dietFields: FieldSet = {
  diet: Yup.string().required("Please select a diet"),
  calories: Yup.number()
    .required("This field is required")
    .positive("Number of calories must be a positive number")
    .integer("Number of calories must be an integer"),
};

const farmingFields: FieldSet = {
  local: Yup.boolean(),
  produce: Yup.number()
    .required("This field is required")
    .positive("Number of produce must be a positive number")
    .integer("Number of produce must be an integer"),
  organic: Yup.number()
    .required("This field is required")
    .positive("Number of organic must be a positive number")
    .integer("Number of organic must be an integer"),
  seasonal: Yup.boolean(),
  crop: Yup.boolean(),
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
    .test("custom", "Total percentage must equal 100%", function (value) {
      const { drive, carpool, walk, cycle, train, bus } = this.parent;
      const total = drive + carpool + walk + cycle + train + bus;
      return total === 100;
    })
    .required("Total percentage is required"),
};

const dietValidationSchema = createValidationSchema(dietFields);
const farmingValidationSchema = createValidationSchema(farmingFields);

interface FoodPageProps {}

const FoodPage: FunctionComponent<FoodPageProps> = () => {
  return (
    <main>
      <PageHeader title="Food" subheadline="Can you improve your food score?" />
      <div className="row container-row">
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4 px-3">
          <div className="card text-center glassmorphism">
            <div className="d-flex align-items-center justify-content-center">
              <FormChart score={10} color={["#FFBE3D", "#F06543"]} />
              <FontAwesomeIcon
                icon={faPizzaSlice}
                className="h2 position-absolute"
              />
            </div>
            <p className="d-flex justify-content-center">
              <span className="fw-bolder mx-2">100%</span>
              <span className="text-muted">Avg</span>
            </p>
            {/* DIET FORM */}
            <CustomForm
              initialValues={dietInitialValues}
              validationSchema={dietValidationSchema}
              inputFields={dietInputFields}
            />
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4 px-3">
          <div className="card text-center glassmorphism">
            <div className="d-flex align-items-center justify-content-center">
              <FormChart score={10} color={["#63D471", "#378B29"]} />
              <FontAwesomeIcon
                icon={faSeedling}
                className="h2 position-absolute"
              />
            </div>
            <p className="d-flex justify-content-center">
              <span className="fw-bolder mx-2">100%</span>
              <span className="text-muted">Avg</span>
            </p>
            {/* FARMING FORM */}
            <CustomForm
              initialValues={farmInitialInputs}
              validationSchema={farmingValidationSchema}
              inputFields={farmInputFields}
            />
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4 px-3">
          <div className="card text-center glassmorphism">
            <div className="d-flex align-items-center justify-content-center">
              <FormChart score={10} color={["#A594F9", "#6247AA"]} />
              <FontAwesomeIcon
                icon={faUtensils}
                className="h2 position-absolute"
              />
            </div>
            <p className="d-flex justify-content-center">
              <span className="fw-bolder mx-2">100%</span>
              <span className="text-muted">Avg</span>
            </p>
            {/* TRANSPORT FORM */}
            {/* <CustomForm
              initialValues={transportInitialValues}
              validationSchema={transportValidationSchema}
              inputFields={transportInputFields}
            /> */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default FoodPage;
