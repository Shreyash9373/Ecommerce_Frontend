import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1 text-sm">
        <li>
          <Link to="/" className="text-black hover:underline">
            Home
          </Link>
        </li>

        {pathnames.map((value, index) => {
          const path = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={path} className="flex items-center space-x-1">
              <span className="text-gray-400">›</span>
              {isLast ? (
                <span className="font-semibold text-black">
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </span>
              ) : (
                <Link
                  to={path}
                  className="text-gray-400 bg-gray-100 px-2 py-1 rounded cursor-not-allowed"
                >
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
