import { FunctionComponent } from "react";

interface PageHeaderProps {
  title: string;
  subheadline: string;
}

const PageHeader: FunctionComponent<PageHeaderProps> = ({
  title,
  subheadline,
}) => {
  return (
    <div className="w-100 card glassmorphism mb-5 text-success fw-bolder">
      <div className="card-body">
        <h1 className="card-title text-center">{title}</h1>
        <h6 className="card-subtitle mb-2 text-muted text-center">
          {subheadline}
        </h6>
      </div>
    </div>
  );
};

export default PageHeader;
