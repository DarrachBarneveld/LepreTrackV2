import { FunctionComponent } from "react";

export interface DeveloperProps {
  item: {
    name: string;
    quote: string;
    github: string;
    linkedIn: string;
  };
  i: number;
}

const Developer: FunctionComponent<DeveloperProps> = ({ item }) => {
  return (
    <div className="card glassmorphism">
      <div className="card-body">
        <h5 className="card-title text-center fw-bold">{item.name}</h5>
        <q className="card-text text-center fst-italic px-4">{item.quote}</q>
        <a
          href={item.github}
          target="_blank"
          className="card-link d-block text-center btn btn-success text-white col-sm-6 mx-auto"
        >
          GitHub
        </a>
        <a
          href={item.linkedIn}
          target="_blank"
          className="mt-1 d-block text-center btn btn-success text-white col-sm-6 mx-auto"
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
};

export default Developer;
