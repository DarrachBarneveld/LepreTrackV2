import { FC, useContext } from "react";
import Carousel from "react-bootstrap/Carousel";

import "./learn.css";

import { AppContext } from "../components/FireBaseContext";

interface LearnPageProps {}

const LearnPage: FC<{}> = () => {
  const { userData } = useContext(AppContext);

  return (
    <main>
      <Carousel
        controls={false}
        className="container text-dark my-carousel glassmorphism"
      >
        <Carousel.Item>
          <h2 className="">
            Transport by Bicycle
            <i className="mr-4 fa-solid fa-bicycle"></i>
          </h2>
          <hr />
          <p className="fs-4 fs-6">
            They found that swapping just one trip per day from driving to
            cycling for 200 days of the year would save half a tonne of carbon
            dioxide over the course of a year. This means that if you were to
            swap your drive to work for cycling you would drastically reduce
            your carbon footprint.
          </p>
          <a
            className="btn btn-success"
            id="bicycle"
            href="https://www.cyclinguk.org/article/how-much-carbon-can-you-save-cycling-work#:~:text=They%20found%20that%20swapping%20just,drastically%20reduce%20your%20carbon%20footprint."
            target="_blank"
            rel="noopener"
          >
            Learn More
          </a>
        </Carousel.Item>
        <Carousel.Item>
          <h2 className="">
            Energy
            <i className="fa-solid fa-shower"></i>
          </h2>
          <hr />
          <p className="fs-4 fs-6">
            Shorter showers can also save up to 350 kilograms of carbon dioxide
            a year and help cut down your energy bills. Pawprint estimates that
            10 minutes in the shower causes about 600g CO2e to be released into
            the atmosphere. That’s 220 kg CO2e per year, just on showering (if
            you shower once a day).
          </p>
          <a
            className="btn btn-success"
            id="energy"
            href="https://www.pawprint.eco/eco-guides/how-to-reduce-carbon-footprint-morning#:~:text=Pawprint%20estimates%20that%2010%20minutes,to%20five%20minutes%20or%20less."
            target="_blank"
            rel="noopener"
          >
            Learn More
          </a>
        </Carousel.Item>
        <Carousel.Item>
          <h2 className="">
            Food
            <i className="fa-solid fa-bowl-food"></i>
          </h2>
          <hr />
          <p className="fs-4 fs-6">
            Less meat is nearly always better than sustainable meat, to reduce
            your carbon footprint
          </p>
          <a
            className="btn btn-success"
            id="food"
            href="https://ourworldindata.org/less-meat-or-sustainable-meat"
            target="_blank"
            rel="noopener"
          >
            Learn More
          </a>
        </Carousel.Item>
        <Carousel.Item>
          <h2 className="">
            Recycling
            <i className="fa-solid fa-recycle"></i>
          </h2>
          <hr />
          <p className="fs-4 fs-6">
            Recycling helps reduce greenhouse gas emissions by reducing energy
            consumption. Using recycled materials to make new products reduces
            the need for virgin materials. This avoids greenhouse gas emissions
            that would result from extracting or mining virgin materials
          </p>
          <a
            className="btn btn-success"
            id="recycle"
            href="https://kingcounty.gov/en/legacy/depts/dnrp/solid-waste/programs/climate/climate-change-recycling#:~:text=Recycling%20helps%20reduce%20greenhouse%20gas,extracting%20or%20mining%20virgin%20materials."
            target="_blank"
            rel="noopener"
          >
            Learn More
          </a>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-content">
            <h2 className="">
              Transport by Bus
              <i className="fa-solid fa-bus-simple"></i>
            </h2>
            <hr />
            <p className="fs-4 fs-6">
              Shifting from cars to public transportation can reduce up to 2.2
              tons of carbon emissions annually per individual.
            </p>
            <a
              className="btn btn-success"
              id="bus"
              href="https://www.un.org/en/actnow/transport#:~:text=Walk%2C%20bike%2C%20take%20public%20transport%2C%20or%20carpool&text=taking%20public%20transportation.-,Shifting%20from%20cars%20to%20public%20transportation%20can%20reduce%20up%20to,carbon%20emissions%20annually%20per%20individual."
              target="_blank"
              rel="noopener"
            >
              Learn More
            </a>
          </div>
        </Carousel.Item>
      </Carousel>
    </main>
  );
};

export default LearnPage;
