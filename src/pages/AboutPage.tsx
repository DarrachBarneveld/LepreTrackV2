import { FunctionComponent, useContext } from "react";
import { AppContext } from "../components/FireBaseContext";
import Developer from "../components/Developer";
import AnimatedList from "../components/AnimatedList";

export interface IAboutPageProps {}

const developers = [
  {
    name: "Amanda",
    quote:
      "In the library of code, the librarian is the silent author, organizing knowledge with precision, while the coder is the eloquent storyteller, crafting tales in the language of machines.",
    github: "https://github.com/apita1423",
    linkedIn: "https://www.linkedin.com/in/amanda-pita1423/",
  },
];

const AboutPage: FunctionComponent<IAboutPageProps> = (props) => {
  const { userData } = useContext(AppContext);

  return (
    <main>
      <div className="w-100 card glassmorphism-title">
        <div className="card-body">
          <h1 className="card-title text-center">About Us</h1>
          <h6 className="card-subtitle mb-2 text-muted text-center">
            Check out these talented folks
          </h6>
        </div>
      </div>

      <div className="mx-3">
        <AnimatedList list={developers} component={Developer} />
        <div className="card mt-3 mx-auto col-sm-8 col-md-6 col-lg-4 glassmorphism">
          <div className="card-body">
            <h5 className="card-title text-center fw-bold">Amanda</h5>
            <q className="card-text text-center fst-italic px-4">
              In the library of code, the librarian is the silent author,
              organizing knowledge with precision, while the coder is the
              eloquent storyteller, crafting tales in the language of machines.
            </q>
            <a
              href="https://github.com/apita1423"
              target="_blank"
              className="card-link d-block text-center btn btn-success text-white col-sm-6 mx-auto"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/amanda-pita1423/"
              target="_blank"
              className="mt-1 d-block text-center btn btn-success text-white col-sm-6 mx-auto"
            >
              LinkedIn
            </a>
          </div>
        </div>
        <div className="card mt-3 mx-auto col-sm-8 col-md-6 col-lg-4 glassmorphism">
          <div className="card-body">
            <h5 className="card-title text-center fw-bold">Aurelien</h5>
            <q className="card-text text-center fst-italic px-4">
              In both cooking and coding, it's not just about following recipes
              or algorithms, but about understanding the ingredients and the
              logic, and adding one's unique flavor to create something
              exceptional.
            </q>
            <a
              href="https://github.com/AMJL-16"
              target="_blank"
              className="card-link d-block text-center btn btn-success text-white col-sm-6 mx-auto"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/aurelien-lesage-246612255"
              target="_blank"
              className="mt-1 d-block text-center btn btn-success text-white col-sm-6 mx-auto"
            >
              LinkedIn
            </a>
          </div>
        </div>
        <div className="card mt-3 mx-auto col-sm-8 col-md-6 col-lg-4 glassmorphism">
          <div className="card-body">
            <h5 className="card-title text-center fw-bold">Adam</h5>
            <q className="card-text text-center fst-italic px-4">
              Always code as if the person who ends up maintaining your code
              will be a violent psychopath who knows where you live.
            </q>
            <a
              href="https://github.com/adammkeane"
              target="_blank"
              className="card-link d-block text-center btn btn-success text-white col-sm-6 mx-auto"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/adamkeane101/"
              target="_blank"
              className="mt-1 d-block text-center btn btn-success text-white col-sm-6 mx-auto"
            >
              LinkedIn
            </a>
          </div>
        </div>
        <div className="card mt-3 mx-auto col-sm-8 col-md-6 col-lg-4 glassmorphism">
          <div className="card-body">
            <h5 className="card-title text-center fw-bold">Darrach</h5>
            <q className="card-text text-center fst-italic px-4">
              Know thy self, know thy enemy
            </q>
            <a
              href="https://github.com/DarrachBarneveld"
              target="_blank"
              className="card-link d-block text-center btn btn-success text-white col-sm-6 mx-auto"
            >
              GitHub
            </a>
            <a
              href="https://au.linkedin.com/in/darrach-barneveld-2b493511b"
              target="_blank"
              className="mt-1 d-block text-center btn btn-success text-white col-sm-6 mx-auto"
            >
              LinkedIn
            </a>
          </div>
        </div>
        <div className="card mt-3 mx-auto col-sm-8 col-md-6 col-lg-4 glassmorphism">
          <div className="card-body">
            <h5 className="card-title text-center fw-bold">Marlon</h5>
            <q className="card-text text-center fst-italic px-4">
              If you set your goals ridiculously high and it's a failure, you
              will fail above everyone else's success.
            </q>
            <a
              href="https://github.com/Markpm-code"
              target="_blank"
              className="card-link d-block text-center btn btn-success text-white col-sm-6 mx-auto"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/marlon-mandaya-544172234/"
              target="_blank"
              className="mt-1 d-block text-center btn btn-success text-white col-sm-6 mx-auto"
            >
              LinkedIn
            </a>
          </div>
        </div>
        <div className="card mt-3 mx-auto col-sm-8 col-md-6 col-lg-4 mb-3 glassmorphism">
          <div className="card-body">
            <h5 className="card-title text-center fw-bold">Shane</h5>
            <q className="card-text text-center fst-italic px-4">
              Every great developer you know got there by solving problems they
              were unqualified to solve until they actually did it.
            </q>
            <a
              href="https://github.com/Shane-Donlon"
              target="_blank"
              className="card-link d-block text-center btn btn-success text-white col-sm-6 mx-auto"
            >
              GitHub
            </a>
            <a
              href="https://ie.linkedin.com/in/shane-donlon-3675b03a"
              target="_blank"
              className="mt-1 d-block text-center btn btn-success text-white col-sm-6 mx-auto"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
