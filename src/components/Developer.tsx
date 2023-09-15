import { FunctionComponent } from "react";

export interface DeveloperProps {
  item: {
    name: string;
    role: string;
    quote: string;
    github: string;
    linkedIn: string;
  };
  i: number;
}

const Developer: FunctionComponent<DeveloperProps> = ({ item }) => {
  return (
    <div className="card glassmorphism my-3">
      <div className="card-body">
        <h5 className="card-title text-center fw-bold text-success">
          {item.name}
        </h5>
        <p className="card-title text-center fw-bold text-decoration-underline">
          {item.role}
        </p>
        <q className="card-text text-center fst-italic">{item.quote}</q>
        <div className="d-flex mt-3 justify-content-center align-items-center">
          <a
            href={item.github}
            target="_blank"
            className="card-link text-center btn text-white mx-2 github"
          >
            GitHub <i className="fa-brands fa-github"></i>
          </a>
          <a
            href={item.linkedIn}
            target="_blank"
            className="text-center btn text-white mx-2 linkedin"
          >
            LinkedIn <i className="fa-brands fa-linkedin"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Developer;
