import { useLocation } from "react-router-dom";

function PageNotFound() {
  const location = useLocation();
  const message = location.state?.message || "Page not found!";

  return (
    <main className="main">
      <div className="error">
        <div className="error__title">
          <h2 className="heading-secondary heading-secondary--error">
            Uh oh! Something went wrong!
          </h2>
        </div>
        <div className="error__msg">{message}</div>
      </div>
    </main>
  );
}

export default PageNotFound;
