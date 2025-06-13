import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import TourHero from "../ui/TourHero";
import QuickFacts from "../ui/QuickFacts";
import TourGuides from "../ui/TourGuides";
import TourDescription from "../ui/TourDescription";
import TourGallery from "../ui/TourGallery";
import TourReviews from "../ui/TourReviews";
import CTASection from "../ui/CTASection";

function TourDetails() {
  const { slug } = useParams();
  const [tour, setTour] = useState(null);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:3000/tour/${slug}`);
        const data = await res.json();
        const tour = data?.data?.tour ?? [];
        setTour(tour);
      } catch (err) {
        console.error("Failed to load tour:", err);
      }
    };
    fetchTour();
  }, [slug]);

  if (!tour) return <p>Loading tour details...</p>;

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
      <TourReviews reviews={tour.reviews} />
      <CTASection image1="/img/tour-5-2.jpg" image2="/img/tour-5-1.jpg" />
    </>
  );
}

export default TourDetails;
