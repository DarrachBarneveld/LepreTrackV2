import { FunctionComponent } from "react";

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
  return (
    <footer>
      <div className="w-100 card footer fixed-bottom">
        <div className="card-body">
          <div className="card-title text-center fw-bold my-auto">
            &copy;2023 GreenStep
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
