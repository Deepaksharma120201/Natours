import { useEffect } from "react";
import { useState } from "react";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await fetch("/api/v1/my-bookings");
        const data = await res.json();
        const bookings = data?.data?.doc ?? [];
        console.log(bookings);

        setBookings(bookings);
      } catch (err) {
        console.error("Failed to fetch tours:", err);
        setBookings([]);
      }
    };
    fetchTours();
  }, []);

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
