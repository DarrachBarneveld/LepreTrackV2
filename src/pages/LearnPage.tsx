import {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useContext,
  useState,
} from "react";
import { motion } from "framer-motion";
import Carousel from "react-bootstrap/Carousel";

import "./learn.css";

import PageHeader from "../components/PageHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faComment,
  faPaperPlane,
  faRobot,
} from "@fortawesome/free-solid-svg-icons";
import { OpenAiContext } from "../context/OpenAiContext";

const LearnPage: FunctionComponent = () => {
  const { openai } = useContext(OpenAiContext);
  const [showBot, setShowBot] = useState(false);
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setQuestion(value);
  };

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const message = await openai?.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: question }],
      max_tokens: 30,
    });

    const reply = message?.choices[0].message.content;

    if (reply) {
      setResponse(reply);
    } else setResponse("There was an error getting your request");
  }

  return (
    <main>
      <PageHeader
        title="Learn More"
        subheadline="Inform yourself with the latest articles"
      />

      <Carousel
        controls={false}
        className="container text-dark my-carousel glassmorphism mb-5"
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

      {!showBot && (
        <div className="glassmorphism p-4">
          <h3>Still have questions?</h3>
          <p>Click the below Chat Icon to ask more questions</p>

          <button className="chat-btn" onClick={() => setShowBot(true)}>
            <FontAwesomeIcon icon={faComment} className="stroke-lg" />
          </button>
        </div>
      )}
      {showBot && (
        <motion.div
          initial={{ opacity: 0, x: -300 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring" }}
        >
          <form
            onSubmit={handleSubmit}
            className="d-flex flex-column card p-4 rounded-3 glassmorphism position-relative"
          >
            <button onClick={() => setShowBot(false)} className="close">
              <FontAwesomeIcon icon={faClose} className="text-muted" />
            </button>
            <FontAwesomeIcon
              icon={faRobot}
              className="robot text-primary h1 stroke-lg"
            />
            <label htmlFor="input-gpt">
              Please ask us about the environment
            </label>
            <div className="d-flex">
              <input
                type="text"
                value={question}
                onChange={handleInputChange}
                required
                name="input-gpt"
                id="input-gpt"
                className="input-gpt"
              />
              <button type="submit" className="ask-btn">
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>

            <textarea
              name="gpt-output"
              id="gpt-output"
              rows={10}
              className="text-dark bg-white p-2 rounded-3"
              disabled
              value={response}
            ></textarea>
          </form>
        </motion.div>
      )}
    </main>
  );
};

export default LearnPage;
