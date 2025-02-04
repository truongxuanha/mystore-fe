import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

type Breadcrumd = {
  urlLink: string;
  title: string;
};
const RenewBreadcrumb = ({ page, breadcrumbs }: { page: string; breadcrumbs?: Breadcrumd[] }) => {
  return (
    <div className="link flex items-center justify-start gap-1 caption1 my-3">
      {breadcrumbs?.map((breadcrumb, index) => (
        <div key={`crumb-${index}`} className="flex items-center justify-center">
          <Link to={breadcrumb.urlLink}>{breadcrumb.title}</Link> <ChevronRight size={18} strokeWidth={1} color="#a0a0a0" />
        </div>
      ))}
      <div className="text-gray-500 capitalize">{page}</div>
    </div>
  );
};

export default RenewBreadcrumb;
