import { FunctionComponent } from "react";
import PageHeader from "../components/PageHeader";
import { FormChart } from "../components/Charts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomForm from "../forms/CustomForm";
import * as Yup from "yup";
import { faHandshake, faRecycle } from "@fortawesome/free-solid-svg-icons";

import {
  CategoryPageProps,
  FieldSet,
  createValidationSchema,
} from "./TravelPage";

interface CommunityPageProps {}

const recycleInitialValues = {
  metal: false,
  paper: false,
  plastic: false,
  glass: false,
  food: false,
};

const recyclingInputFields = [
  {
    name: "metal",
    label: "Metal",
    type: "checkbox",
  },
  {
    name: "paper",
    label: "Paper",
    type: "checkbox",
  },
  {
    name: "plastic",
    label: "Plastic",
    type: "checkbox",
  },
  {
    name: "glass",
    label: "Glass",
    type: "checkbox",
  },
  {
    name: "food",
    label: "Food",
    type: "checkbox",
  },
];

const recyclingFields: FieldSet = {
  metal: Yup.boolean(),
  paper: Yup.boolean(),
  plastic: Yup.boolean(),
  glass: Yup.boolean(),
  food: Yup.boolean(),
};

const volunteerInitialValues = {
  tree: false,
  gardens: false,
  wildlife: false,
  ocean: false,
  other: false,
  donation: 0,
};

const volunteerInputFields = [
  {
    name: "tree",
    label: "Planting Trees",
    type: "checkbox",
  },
  {
    name: "gardens",
    label: "Community Gardens",
    type: "checkbox",
  },
  {
    name: "wildlife",
    label: "Protecting Wildlife",
    type: "checkbox",
  },
  {
    name: "ocean",
    label: "Ocean Cleanup",
    type: "checkbox",
  },
  {
    name: "other",
    label: "Other",
    type: "checkbox",
  },
  {
    name: "donation",
    label: "Weekly Donations",
    type: "number",
  },
];

const volunteeringFields: FieldSet = {
  tree: Yup.boolean(),
  gardens: Yup.boolean(),
  wildlife: Yup.boolean(),
  ocean: Yup.boolean(),
  other: Yup.boolean(),
  donation: Yup.number()
    .required("This field is required")
    .min(0, "Number of donation must not be negative")
    .integer("Number of donation must be an integer"),
};

const recyclingValidationSchema = createValidationSchema(recyclingFields);
const volunteeringValidationSchema = createValidationSchema(volunteeringFields);

const CommunityPage: FunctionComponent<CategoryPageProps> = ({ userData }) => {
  if (!userData) return;

  const recyclingScore = userData.community.recycle.score;
  const communityScore = userData.community.volunteer.score;

  return (
    <main>
      <PageHeader
        title="Community"
        subheadline="Can you improve your community score?"
      />
      <div className="row container-row">
        <div className="col-md-6 col-sm-12 mb-4 px-3">
          <div className="card text-center glassmorphism">
            <div className="d-flex align-items-center justify-content-center">
              <FormChart
                score={recyclingScore}
                color={["#63D471", "#378B29"]}
              />
              <FontAwesomeIcon
                icon={faRecycle}
                className="h2 position-absolute"
              />
            </div>
            <p className="d-flex justify-content-center">
              <span className="fw-bolder mx-2">100%</span>
              <span className="text-muted">Avg</span>
            </p>
            {/* RECYCLING FORM */}
            <CustomForm
              heading="Check the box if you recycle that material"
              columns
              initialValues={recycleInitialValues}
              validationSchema={recyclingValidationSchema}
              inputFields={recyclingInputFields}
            />
          </div>
        </div>
        <div className="col-md-6 col-sm-12 mb-4 px-3">
          <div className="card text-center glassmorphism">
            <div className="d-flex align-items-center justify-content-center">
              <FormChart
                score={communityScore}
                color={["#009FFD", "#5200AE"]}
              />
              <FontAwesomeIcon
                icon={faHandshake}
                className="h2 position-absolute"
              />
            </div>
            <p className="d-flex justify-content-center">
              <span className="fw-bolder mx-2">100%</span>
              <span className="text-muted">Avg</span>
            </p>
            {/* VOLUNTEERING FORM */}
            <CustomForm
              heading="Check the box if you volunteer in"
              columns
              initialValues={volunteerInitialValues}
              validationSchema={volunteeringValidationSchema}
              inputFields={volunteerInputFields}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default CommunityPage;
