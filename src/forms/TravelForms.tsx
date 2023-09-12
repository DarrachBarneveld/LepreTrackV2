import { ErrorMessage, Field, Form, Formik } from "formik";
import { FunctionComponent } from "react";
import * as Yup from "yup";

import "./forms.css";
import { Button } from "react-bootstrap";

interface FlightFormProps {}

const FlightForm: FunctionComponent<FlightFormProps> = () => {
  const initialValues = {
    flightKm: "",
    numFlights: "",
    flightClass: "economy", // Default value
  };

  const validationSchema = Yup.object().shape({
    flightKm: Yup.number()
      .required("Required")
      .positive("Number of flights must be a positive number"),
    numFlights: Yup.number()
      .required("Required")
      .positive("Number of flights must be a positive number"),
    flightClass: Yup.string().required("Please select a flight class"),
  });

  const handleSubmit = (values) => {
    // Handle form submission here
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form id="flightForm" className="bg-light p-2">
          <div>
            <label htmlFor="flightKm">Est km</label>
            <Field
              type="number"
              id="flightKm"
              name="flightKm"
              isInvalid={!!errors.flightKm && touched.flightKm}
              className={`form-control ${
                errors.flightKm && touched.flightKm ? "error-input" : ""
              }`}
            />
            <ErrorMessage name="flightKm" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="numFlights">Num flights</label>
            <Field
              type="number"
              id="numFlights"
              name="numFlights"
              isInvalid={!!errors.numFlights && touched.numFlights}
              className={`form-control ${
                errors.numFlights && touched.numFlights ? "error-input" : ""
              }`}
            />
            <ErrorMessage name="numFlights" component="div" className="error" />
          </div>
          <div className="wrapper mt-3">
            <p className="h6 fw-bold">Which class do you fly?</p>
            <div>
              <Field
                type="radio"
                id="economy"
                name="flightClass"
                value="economy"
                isInvalid={!!errors.flightClass && touched.flightClass}
                className={`form-check-input ${
                  errors.flightClass && touched.flightClass ? "is-invalid" : ""
                }`}
              />
              <label htmlFor="economy">Economy</label>
            </div>

            <div>
              <Field
                type="radio"
                id="business"
                name="flightClass"
                value="business"
                isInvalid={!!errors.flightClass && touched.flightClass}
                className={`form-check-input ${
                  errors.flightClass && touched.flightClass ? "is-invalid" : ""
                }`}
              />
              <label htmlFor="business">Business</label>
            </div>
            <div>
              <Field
                type="radio"
                id="first"
                name="flightClass"
                value="first"
                isInvalid={!!errors.flightClass && touched.flightClass}
                className={`form-check-input ${
                  errors.flightClass && touched.flightClass ? "is-invalid" : ""
                }`}
              />
              <label htmlFor="first">First</label>
            </div>
          </div>
          <Button
            type="submit"
            className="btn btn-success text-white"
            disabled={isSubmitting}
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default FlightForm;
