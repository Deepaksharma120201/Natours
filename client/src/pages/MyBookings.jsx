import { useEffect } from "react";
import { useState } from "react";
import { fetchMyBookings } from "../services/apiServices.js";
import Spinner from "../ui/Spinner.jsx";
import Card from "../ui/Card.jsx";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookings = async () => {
      const bookedTours = await fetchMyBookings();
      setBookings(bookedTours);
      setLoading(false);
    };

    loadBookings();
  }, []);

  if (loading) return <Spinner />;

  return (
    <main className="main">
      {bookings.length === 0 ? (
        <div className="error__msg">
          No bookings yet. Start exploring tours!
        </div>
      ) : (
        <div className="card-container">
          {bookings.map((tour) => (
            <Card key={tour.id} tour={tour} />
          ))}
        </div>
      )}
    </main>
  );
}

export default MyBookings;
