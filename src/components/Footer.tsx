import { FunctionComponent } from "react";

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
  return (
    <footer>
      <div className="w-100 footer glassmorphism rounded-0 mt-5">
        <div className="p-4 text-center">
          <p className="fst-italic fw-bold">
            Together, we're driving positive change, one person at a time,
            towards a cleaner and more sustainable planet.
          </p>

          <h3 className="fw-bolder text-success">
            &copy;2023 GreenStep <i className="fa-solid fa-clover"></i>
          </h3>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
