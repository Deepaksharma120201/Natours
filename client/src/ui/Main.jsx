import { useEffect, useState } from "react";
import { useSearch } from "../context/SearchContext";
import Card from "./Card.jsx";

function Main() {
  const [tours, setTours] = useState([]);
  const { searchTerm } = useSearch();

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await fetch("/api/v1/tours");
        const data = await res.json();
        setTours(data?.data?.doc ?? []);
      } catch (err) {
        console.error("Failed to fetch tours:", err);
        setTours([]);
      }
    };
    fetchTours();
  }, []);

  const filteredTours = searchTerm
    ? tours.filter((tour) =>
        tour.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : tours;

  return (
    <main className="main">
      <div className="card-container">
        {filteredTours.length > 0 ? (
          filteredTours.map((tour) => <Card key={tour.id} tour={tour} />)
        ) : (
          <div className="error__msg">No tours found matching your search.</div>
        )}
      </div>
    </main>
  );
}

export default Main;
