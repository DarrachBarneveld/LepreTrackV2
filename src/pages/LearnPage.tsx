import { FC, useContext } from "react";
import Carousel from "react-bootstrap/Carousel";

import { AppContext } from "../components/FireBaseContext";

interface LearnPageProps {}

const LearnPage: FC<{}> = () => {
  const { userData } = useContext(AppContext);

  return (
    <main>
      <Carousel className="container bg-dark text-white">
        <Carousel.Item>
          <div className="carousel-content">
            <h3>First Slide</h3>
            <p>
              This is the first slide's content. You can add any text or
              components here.
            </p>
            <button className="btn btn-primary">Click Me</button>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-content">
            <h3>Second Slide</h3>
            <p>
              This is the second slide's content. You can customize it as
              needed.
            </p>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
            </ul>
          </div>
        </Carousel.Item>
        {/* Add more Carousel.Items for additional slides */}
      </Carousel>
    </main>
  );
};

export default LearnPage;
