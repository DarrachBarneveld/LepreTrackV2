import { FunctionComponent, useContext } from "react";
import { AppContext } from "../context/FireBaseContext";
import Developer from "../components/Developer";
import AnimatedList from "../components/AnimatedList";
import PageHeader from "../components/PageHeader";

export interface IAboutPageProps {}

const developers = [
  {
    name: "Amanda",
    quote:
      "In the library of code, the librarian is the silent author, organizing knowledge with precision, while the coder is the eloquent storyteller, crafting tales in the language of machines.",
    github: "https://github.com/apita1423",
    linkedIn: "https://www.linkedin.com/in/amanda-pita1423/",
  },
  {
    name: "Aurelien",
    quote:
      "In both cooking and coding, it's not just about following recipes or algorithms, but about understanding the ingredients and the logic, and adding one's unique flavor to create something exceptional.",
    github: "https://github.com/AMJL-16",
    linkedIn: "https://www.linkedin.com/in/aurelien-lesage-246612255",
  },
  {
    name: "Adam",
    quote:
      "Always code as if the person who ends up maintaining your code will be a violent psychopath who knows where you live.",
    github: "https://github.com/adammkeane",
    linkedIn: "https://www.linkedin.com/in/adamkeane101/",
  },
  {
    name: "Darrach",
    quote: "Know thy self, know thy enemy",
    github: "https://github.com/DarrachBarneveld",
    linkedIn: "https://au.linkedin.com/in/darrach-barneveld-2b493511b",
  },
  {
    name: "Marlon",
    quote:
      "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
    github: "https://github.com/Markpm-code",
    linkedIn: "https://www.linkedin.com/in/marlon-mandaya-544172234/",
  },
  {
    name: "Shane",
    quote:
      "Every great developer you know got there by solving problems they were unqualified to solve until they actually did it.",
    github: "https://github.com/Shane-Donlon",
    linkedIn: "https://ie.linkedin.com/in/shane-donlon-3675b03a",
  },
];

const AboutPage: FunctionComponent<IAboutPageProps> = (props) => {
  const { userData } = useContext(AppContext);

  return (
    <main>
      <PageHeader
        title="About Us"
        subheadline="Check out these talented folks"
      />
      <div className="container">
        <AnimatedList
          list={developers}
          component={Developer}
          styles="row"
          stylesItem="col-md-4 col-sm-6"
          staggerDuration={0.05}
        />
      </div>
    </main>
  );
};

export default AboutPage;
