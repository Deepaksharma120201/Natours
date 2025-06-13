import Card from "./Card.jsx";
import { useEffect } from "react";
import { useState } from "react";

function Main() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await fetch("/api/v1/tours");
        const data = await res.json();
        const tours = data?.data?.doc ?? [];
        setTours(tours);
      } catch (err) {
        console.error("Failed to fetch tours:", err);
        setTours([]);
      }
    };
    fetchTours();
  }, []);

  return (
    <main className="main">
      <div className="card-container">
        {tours.map((tour) => (
          <Card key={tour.id} tour={tour} />
        ))}
      </div>
    </main>
  );
}

export default Main;
