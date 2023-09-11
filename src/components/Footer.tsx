import { FunctionComponent } from "react";

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
  return (
    <footer>
      <div class="w-100 card footer">
        <div class="card-body">
          <div class="card-title text-center fw-bold my-auto">
            &copy;2023 GreenStep
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
