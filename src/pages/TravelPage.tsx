import { FunctionComponent } from "react";
import PageHeader from "../components/PageHeader";
import { FormChart } from "../components/Charts";
import { faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FlightForm from "../forms/TravelForms";

interface TravelPageProps {}

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

            <FlightForm />
          </div>
        </div>

        <div className="col-lg-4 col-md-6 col-sm-12 mb-4 px-3">
          <div className="form-card card text-center glassmorphism">
            <div className="d-flex align-items-center justify-content-center">
              <div id="carChart"></div>
              <i className="fa-solid fa-car chart-icon"></i>
            </div>
            <p>
              <span id="car-result" className="fw-bolder h4"></span>
              <span className="text-muted">Avg</span>
            </p>
            <form id="carForm" className="glassmorphism mt-3">
              <label for="kilometers">km/week</label>
              <input type="number" id="kilometers" name="kilometers" required />
              <br />
              <br />

              <div className="car-wrapper mt-3">
                <div className="1col">
                  <label className="h3">Type of Car:</label>
                  <br />
                  <input
                    type="radio"
                    id="electric"
                    name="carType"
                    value="electric"
                    required
                  />
                  <label for="electric">Electric</label>
                  <br />
                  <input
                    type="radio"
                    id="hybrid"
                    name="carType"
                    value="hybrid"
                    required
                  />
                  <label for="hybrid">Hybrid</label>
                  <br />
                  <input
                    type="radio"
                    id="petrol"
                    name="carType"
                    value="petrol"
                    required
                  />
                  <label for="petrol">Petrol</label>
                  <br />
                </div>
                <div className="2col">
                  <label className="h3">Car Manufactured:</label>
                  <br />
                  <input
                    type="radio"
                    id="before"
                    name="carYear"
                    value="before"
                    required
                  />
                  <label for="before">Before 2000</label>
                  <br />
                  <input
                    type="radio"
                    id="after"
                    name="carYear"
                    value="after"
                    required
                  />
                  <label for="after">After 2000</label>
                  <br />
                  <br />
                </div>
              </div>
              <input
                type="submit"
                value="Submit"
                className="btn btn-success text-white mt-4"
              />
            </form>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 col-sm-12 mb-4 px-3">
          <div className="form-card card text-center glassmorphism">
            <div className="d-flex align-items-center justify-content-center">
              <div id="transportChart"></div>
              <i className="fa-solid fa-bicycle chart-icon"></i>
            </div>
            <p>
              <span id="transport-result" className="fw-bolder h4"></span>
              <span className="text-muted">Avg</span>
            </p>

            <form id="transportForm" className="glassmorphism mt-3">
              <div>
                <label for="driveInput">Drive:</label>
                <input
                  type="number"
                  id="driveInput"
                  name="driveInput"
                  min="0"
                  max="100"
                  value="0"
                  required
                />
                <span>%</span>
              </div>
              <div>
                <label for="carpoolInput">Carpool:</label>
                <input
                  type="number"
                  id="carpoolInput"
                  name="carpoolInput"
                  min="0"
                  max="100"
                  value="0"
                  required
                />
                <span>%</span>
              </div>
              <div>
                <label for="walkInput">Walk:</label>
                <input
                  type="number"
                  id="walkInput"
                  name="walkInput"
                  min="0"
                  max="100"
                  value="0"
                  required
                />
                <span>%</span>
              </div>
              <div>
                <label for="cycleInput">Cycle:</label>
                <input
                  type="number"
                  id="cycleInput"
                  name="cycleInput"
                  min="0"
                  max="100"
                  value="0"
                  required
                />
                <span>%</span>
              </div>
              <div>
                <label for="trainInput">Train:</label>
                <input
                  type="number"
                  id="trainInput"
                  name="trainInput"
                  min="0"
                  max="100"
                  value="0"
                  required
                />
                <span>%</span>
              </div>
              <div>
                <label for="busInput">Bus:</label>
                <input
                  type="number"
                  id="busInput"
                  name="busInput"
                  min="0"
                  max="100"
                  value="0"
                  required
                />
                <span>%</span>
              </div>
              <input
                type="submit"
                value="Submit"
                className="btn btn-success text-white mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TravelPage;
