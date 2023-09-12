import { ErrorMessage, Field, Form, Formik } from "formik";
import { FunctionComponent } from "react";
import * as Yup from "yup";

import "./forms.css";
import { Button } from "react-bootstrap";

interface FlightFormProps {}

export const FlightForm: FunctionComponent<FlightFormProps> = () => {
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
        <Form id="flightForm" className="p-2 rounded-3">
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
          <div className="my-3">
            <p className="h6 fw-bold">Which class do you fly?</p>
            <div className="d-flex flex-column mx-auto w-fit-content">
              <div className="d-flex align-items-center">
                <Field
                  type="radio"
                  id="economy"
                  name="flightClass"
                  value="economy"
                  isInvalid={!!errors.flightClass && touched.flightClass}
                  className={`form-check-input mx-2 ${
                    errors.flightClass && touched.flightClass
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <label htmlFor="economy">Economy</label>
              </div>
              <div className="d-flex align-items-center">
                <Field
                  type="radio"
                  id="business"
                  name="flightClass"
                  value="business"
                  isInvalid={!!errors.flightClass && touched.flightClass}
                  className={`form-check-input mx-2 ${
                    errors.flightClass && touched.flightClass
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <label htmlFor="business">Business</label>
              </div>
              <div className="d-flex align-items-center">
                <Field
                  type="radio"
                  id="first"
                  name="flightClass"
                  value="first"
                  isInvalid={!!errors.flightClass && touched.flightClass}
                  className={`form-check-input mx-2 ${
                    errors.flightClass && touched.flightClass
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <label htmlFor="first">First</label>
              </div>
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

// Define a validation schema (You can make it more customizable if needed)
const validationSchema = Yup.object().shape({
  // Define validation rules for each input field
  // You can extend this schema for different inputs
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

// Define the custom reusable form component
const CustomForm = ({ initialValues, inputFields, validationSchema }) => {
  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form id="customForm" className="p-2 rounded-3">
          {inputFields.map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name}>{field.label}</label>
              {field.type === "radio" ? (
                <div className="d-flex flex-column mx-auto w-fit-content">
                  {field.options.map((option) => {
                    return (
                      <div
                        key={option.value}
                        className="d-flex align-items-center"
                      >
                        <Field
                          type="radio"
                          id={option.value}
                          name={field.name}
                          value={option.value}
                          isInvalid={!!errors && touched}
                          className={`form-check-input mx-2 ${
                            errors[field.name] && touched[field.name]
                              ? "error-input"
                              : ""
                          }`}
                        />
                        <label htmlFor="economy">{option.value}</label>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <Field
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  className={`form-control ${
                    errors[field.name] && touched[field.name]
                      ? "error-input"
                      : ""
                  }`}
                />
              )}
              <ErrorMessage
                name={field.name}
                component="div"
                className="error"
              />
            </div>
          ))}
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

export default CustomForm;
