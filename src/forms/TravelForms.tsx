import { ErrorMessage, Field, Form, Formik } from "formik";
import { FunctionComponent } from "react";
import { Button } from "react-bootstrap";

import "./forms.css";

interface initialValues {
  [key: string]: string | number;
}

type inputField = {
  name: string;
  label: string;
  type: string;
  options?: { value: string; label: string }[];
};

interface CustomFormProps {
  initialValues: initialValues;
  inputFields: inputField[];
  validationSchema: {};
}

const CustomForm: FunctionComponent<CustomFormProps> = ({
  initialValues,
  inputFields,
  validationSchema,
}) => {
  const handleSubmit = (values, { setSubmitting }) => {
    // Handle form submission here
    console.log(values);
    setSubmitting(false);
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
              <label className="form-input-label fw-bold" htmlFor={field.name}>
                {field.label}
              </label>
              <ErrorMessage
                name={field.name}
                component="div"
                className="error"
              />
              {field.type === "radio" ? (
                <div className="d-flex mx-auto w-fit-content">
                  {field.options?.map((option) => {
                    return (
                      <div
                        key={option.value}
                        className="d-flex flex-column align-items-center m-2"
                      >
                        <label htmlFor={option.value}>{option.label}</label>

                        <Field
                          type="radio"
                          id={option.value}
                          name={field.name}
                          value={option.value}
                          isInvalid={touched[field.name] && errors[field.name]}
                          className={`form-check-input mb-1 mx-2 ${
                            touched[field.name] && errors[field.name]
                              ? "error-input"
                              : ""
                          }`}
                        />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <Field
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  // required={field.required}
                  className={`form-control m-0 mb-1 ${
                    touched[field.name] && errors[field.name]
                      ? "error-input"
                      : ""
                  }`}
                />
              )}
            </div>
          ))}
          <ErrorMessage name="custom" component="div" className="text-danger" />
          <Button
            type="submit"
            className="btn btn-success text-white my-2"
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
