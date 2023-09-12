import { FunctionComponent } from "react";
import earthGuardian from "../assets/images/guardians/earth-guardian.png";
import terraTormentor from "../assets/images/guardians/terra-tormentor.png";
import AnimatedList, { HomeCopy } from "../components/AnimatedList";
import { homeContent } from "../content/content";
import leprechaun from "../assets/images/leprechaun.png";
import { motion } from "framer-motion";

import "./homepage.css";

export interface IHomePageProps {}

const HomePage: FunctionComponent<IHomePageProps> = (props) => {
  return (
    <main>
      <div className="glassmorphism text-success fw-bold text-center w-100">
        <div className="d-flex justify-content-center align-items-center">
          <img src={terraTormentor} width="150" alt="earth guardian photo" />
          <h1 className="text-center">LepreTrackV2</h1>
          <img src={earthGuardian} width="150" alt="earth guardian photo" />
        </div>
        <h2 className="py-4 mt-2 h5">
          Empowering Individuals for a Greener Tomorrow
        </h2>
      </div>

      <div className="p-4 position-relative">
        {/* <motion.img
          animate={{ y: -125 }}
          transition={{
            delay: 1,
            repeat: Infinity,
            ease: "linear",
            duration: 2,
            repeatType: "reverse",
          }}
          src={leprechaun}
          alt="leprechaun waving"
          id="leprechaun"
        /> */}
        <div className="card p-4  mt-4" id="text-overlay">
          <div className="fs-4 px-3 fw-bold">
            Tracking Solutions for a Greener Tomorrow
          </div>
          <div className="mt-3">
            Our platform enables you to effortlessly track your carbon
            footprint,
            <br />
            empowering you to make informed choices that reduce your CO2
            emissions.
          </div>
          <a
            className="btn btn-success text-white start-tracking mt-3"
            href="#"
          >
            Start Tracking
          </a>
        </div>
      </div>

      <div className="container mt-4">
        <h2 className="fw-bolder bg-light py-3 rounded-3 text-success text-uppercase">
          Features
        </h2>
        <AnimatedList list={homeContent} component={HomeCopy} />
      </div>

      <div className="w-100 card glassmorphism my-5">
        <div className="card-body">
          <div className="card-title text-center my-auto py-1 text-muted">
            Together, we're driving positive change, one person at a time,
            towards a cleaner and more sustainable planet.
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
