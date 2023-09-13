import { ErrorMessage, Field, Form, Formik } from "formik";
import { FunctionComponent } from "react";
import { Button } from "react-bootstrap";

import "./forms.css";

interface initialValues {
  [key: string]: string | number | boolean;
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
  columns?: boolean;
  heading?: string;
}

const CustomForm: FunctionComponent<CustomFormProps> = ({
  initialValues,
  inputFields,
  validationSchema,
  columns,
  heading,
}) => {
  const handleSubmit = (
    values: any,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
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
        <Form id="customForm" className="p-2 rounded-3 ">
          {heading && <p className="fw-bold mb-3 border-bottom">{heading}</p>}
          <div className={`${columns && "grid-2"}`}>
            {inputFields.map((field) => (
              <div key={field.name}>
                <label
                  className="form-input-label fw-bold"
                  htmlFor={field.name}
                >
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
                            isInvalid={
                              touched[field.name] && errors[field.name]
                            }
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
                ) : field.type === "select" ? (
                  <div className="d-flex flex-column mx-auto">
                    <Field
                      as="select"
                      name={field.name}
                      isInvalid={touched[field.name] && errors[field.name]}
                      className={`form-select mb-1 ${
                        touched[field.name] && errors[field.name]
                          ? "error-input"
                          : ""
                      }`}
                    >
                      {field.options?.map((option, i) => (
                        <option
                          key={i}
                          value={option.value}
                          label={option.label}
                        />
                      ))}
                    </Field>
                  </div>
                ) : field.type === "checkbox" ? (
                  <Field
                    type="checkbox"
                    name={field.name}
                    isInvalid={touched[field.name] && errors[field.name]}
                    className={`form-check mb-1 ${
                      touched[field.name] && errors[field.name]
                        ? "error-input"
                        : ""
                    }`}
                  />
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
            <ErrorMessage
              name="custom"
              component="div"
              className="text-danger"
            />
          </div>

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
