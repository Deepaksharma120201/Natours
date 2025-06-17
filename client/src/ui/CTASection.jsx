import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { bookTour } from "../services/payment";

function CTASection({ image1, image2, duration, tourId }) {
  const { user } = useAuth();

  const handleBooking = () => {
    bookTour(tourId);
  };

  return (
    <section className="section-cta">
      <div className="cta">
        <div className="cta__img cta__img--logo">
          <img src="/img/logo-white.png" alt="wildway logo" />
        </div>
        <img
          className="cta__img cta__img--1"
          src={`/img/tours/${image1}`}
          alt=""
        />
        <img
          className="cta__img cta__img--2"
          src={`/img/tours/${image2}`}
          alt=""
        />
        <div className="cta__content">
          <h2 className="heading-secondary">What are you waiting for?</h2>
          <p className="cta__text">
            {duration} days. 1 adventure. Infinite memories. Make it yours
            today!
          </p>

          {user ? (
            <button
              className="btn btn--green span-all-rows"
              onClick={handleBooking}
            >
              Book tour now!
            </button>
          ) : (
            <Link to="/login" className="btn btn--green span-all-rows">
              Log in to book tour
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

export default CTASection;
