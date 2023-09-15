import { FunctionComponent, useContext, useState } from "react";
import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import { FormChart } from "../components/Charts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomForm from "../forms/CustomForm";
import * as Yup from "yup";
import { faHandshake, faRecycle } from "@fortawesome/free-solid-svg-icons";

import { FieldSet, createValidationSchema } from "./TravelPage";
import { AppContext } from "../context/FireBaseContext";
import {
  calcVolunteerPercent,
  calculateInvertedPercentage,
} from "../helpers/math";
import { updateFireBase } from "../config/firebaseAuth";

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

const DUMMY_DATA = {
  averageMetalWaste: 6.3,
  averagePaperWaste: 19.4,
  averagePlasticWaste: 9 * 0.1,
  averageGlassWaste: 3.2,
  averageFoodWaste: 4.3,

  // below are the co2 saving per kg of material recycled
  recycledMetal: 8.1,
  recycledPaper: 0.4,
  recycledPlastic: 1.1,
  recycledGlass: 0.3,
  recycledFood: 0.2,

  // average total co2 emission from packaging & food waste
  averageTotalCo2: 108.9,
};

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

const CommunityPage: FunctionComponent = () => {
  const { userData, userAuth } = useContext(AppContext);

  if (!userData) return;

  const [recyclingScore, setRecyclingScore] = useState<number>(
    +userData.community.recycle.score
  );
  const [communityScore, setCommunityScore] = useState<number>(
    +userData.community.volunteer.score
  );

  const recycleInitialValues = {
    metal: userData.community.recycle.metal || false,
    paper: userData.community.recycle.paper || false,
    plastic: userData.community.recycle.plastic || false,
    glass: userData.community.recycle.glass || false,
    food: userData.community.recycle.food || false,
  };

  const volunteerInitialValues = {
    tree: userData.community.volunteer.tree || false,
    gardens: userData.community.volunteer.gardens || false,
    wildlife: userData.community.volunteer.wildlife || false,
    ocean: userData.community.volunteer.ocean || false,
    other: userData.community.volunteer.other || false,
    donation: userData.community.volunteer.donation || 0,
  };

  const recycleSubmit = async (
    values: any,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const { metal, paper, plastic, glass, food } = values;
    let co2Savings = 0;

    if (metal) {
      co2Savings += DUMMY_DATA.recycledMetal * DUMMY_DATA.averageMetalWaste;
    }
    if (paper) {
      co2Savings += DUMMY_DATA.recycledPaper * DUMMY_DATA.averagePaperWaste;
    }
    if (plastic) {
      co2Savings += DUMMY_DATA.recycledPlastic * DUMMY_DATA.averagePlasticWaste;
    }
    if (glass) {
      co2Savings += DUMMY_DATA.recycledGlass * DUMMY_DATA.averageGlassWaste;
    }
    if (food) {
      co2Savings += DUMMY_DATA.recycledFood * DUMMY_DATA.averageFoodWaste;
    }

    let score = (DUMMY_DATA.averageTotalCo2 - co2Savings) / 1.089;
    const invertedScore = calculateInvertedPercentage(score);

    const data = { score: invertedScore.toFixed(2), ...values };

    if (userAuth) {
      await updateFireBase(data, "community", "recycle", userAuth);

      score < 0 ? (score = 0) : score;

      setRecyclingScore(invertedScore);
    }

    setSubmitting(false);
  };

  const volunteerSubmit = async (
    values: any,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const truePercent = calcVolunteerPercent(values);

    const data = { score: truePercent, ...values };

    if (userAuth) {
      await updateFireBase(data, "community", "volunteer", userAuth);

      let percent = truePercent > 100 ? 100 : truePercent;

      setCommunityScore(percent);
    }

    setSubmitting(false);
  };
  return (
    <main>
      <PageHeader
        title="Community"
        subheadline="Can you improve your community score?"
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
              <span className="fw-bolder mx-2">{recyclingScore}%</span>
              <span className="text-muted">Avg</span>
            </p>
            {/* RECYCLING FORM */}
            <CustomForm
              heading="Check the box if you recycle that material"
              columns
              initialValues={recycleInitialValues}
              validationSchema={recyclingValidationSchema}
              inputFields={recyclingInputFields}
              handleSubmit={recycleSubmit}
            />
          </motion.div>
        </div>
        <div className="col-md-6 col-sm-12 mb-4 px-3">
          <motion.div
            className="card text-center glassmorphism"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 1, delay: 0.2 }}
          >
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
              <span className="fw-bolder mx-2">{communityScore}%</span>
              <span className="text-muted">Avg</span>
            </p>
            {/* VOLUNTEERING FORM */}
            <CustomForm
              heading="Check the box if you volunteer in"
              columns
              initialValues={volunteerInitialValues}
              validationSchema={volunteeringValidationSchema}
              inputFields={volunteerInputFields}
              handleSubmit={volunteerSubmit}
            />
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default CommunityPage;
