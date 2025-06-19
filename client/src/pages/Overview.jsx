import { useEffect, useState } from "react";
import { fetchTours } from "../services/apiServices";
import { useSearch } from "../context/SearchContext";
import Spinner from "../ui/Spinner";
import Card from "../ui/Card";

function Overview() {
  const [tours, setTours] = useState([]);
  const { searchTerm } = useSearch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTours = async () => {
      const data = await fetchTours();
      setTours(data);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    };
    loadTours();
  }, []);

  const filteredTours = searchTerm
    ? tours.filter((tour) =>
        tour.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : tours;

  if (loading) return <Spinner />;

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

export default Overview;
