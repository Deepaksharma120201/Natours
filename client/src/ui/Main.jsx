import Card from "./Card.jsx";
import data from "../assets/tours.json";

function Main() {
  return (
    <main className="main">
      <div className="card-container">
        {data.map((tour, index) => (
          <Card key={index} {...tour} />
        ))}
      </div>
    </main>
  );
}

export default Main;
