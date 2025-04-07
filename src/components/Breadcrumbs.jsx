import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav>
      <ul className="flex space-x-2 text-blue-500">
        <li>
          <Link to="/" className="hover:underline">
            Home
          </Link>
          {pathnames.length > 0 && " / "}
        </li>
        {pathnames.map((value, index) => {
          const path = `/${pathnames.slice(0, index + 1).join("/")}`;
          return (
            <li key={path}>
              <Link to={path} className="hover:underline">
                {value.charAt(0).toUpperCase() + value.slice(1)}
              </Link>
              {index < pathnames.length - 1 && " / "}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
