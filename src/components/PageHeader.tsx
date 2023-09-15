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
    <div className="w-100 glassmorphism mb-5 text-success fw-bolder header p-2 rounded-0">
      <h1 className=" text-center display-4 fw-bold">{title}</h1>
      <h6 className="mb-2 text-center">{subheadline}</h6>
    </div>
  );
};

export default PageHeader;
