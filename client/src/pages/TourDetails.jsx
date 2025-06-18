import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import TourHero from "../ui/TourHero";
import QuickFacts from "../ui/QuickFacts";
import TourGuides from "../ui/TourGuides";
import TourDescription from "../ui/TourDescription";
import TourGallery from "../ui/TourGallery";
import TourReviews from "../ui/TourReviews";
import CTASection from "../ui/CTASection";
import Spinner from "../ui/Spinner";
import { MapComponent } from "../ui/MapComponent";

function TourDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await fetch(`http://localhost:3000/tour/${slug}`, {
          method: "GET",
          credentials: "include",
        });

        if (res.status === 404) {
          const errorData = await res.json();
          navigate("/not-found", {
            state: { message: errorData.message || "Page not found!" },
          });
          return;
        }

        if (!res.ok) {
          const errorData = await res.json();
          navigate("/not-found", {
            state: { message: errorData.message || "Something went wrong." },
          });
          return;
        }

        const data = await res.json();
        const tour = data?.data?.tour ?? [];
        setTour(tour);
      } catch (err) {
        console.error("Failed to load tour:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTour();
  }, [navigate, slug]);

  if (loading || !tour) return <Spinner />;

  return (
    <>
      <TourHero
        image={tour.imageCover}
        title={tour.name}
        duration={tour.duration}
        description={tour.startLocation.description}
      />
      <section className="section-description">
        <div className="overview-box">
          <div>
            <QuickFacts
              date={tour.startDates}
              difficulty={tour.difficulty}
              participants={tour.maxGroupSize}
              rating={tour.ratingsAverage}
            />
            <TourGuides guides={tour.guides} />
          </div>
        </div>
        <TourDescription
          paragraphs={tour.description}
          title={`About the ${tour.name.toLowerCase()}`}
        />
      </section>
      <TourGallery images={tour.images} />
      <section className="section-map">
        <MapComponent locations={tour.locations} />
      </section>
      <TourReviews reviews={tour.reviews} />
      <CTASection
        image1={tour.images[0]}
        image2={tour.images[1]}
        duration={tour.duration}
        tourId={tour._id}
      />
    </>
  );
}

export default TourDetails;
