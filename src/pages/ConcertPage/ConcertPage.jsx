import React from "react";
import { Link } from "react-router-dom";

const ConcertPage = ({ concerts }) => {
  if (!concerts || concerts.length === 0) {
    return <p style={{ textAlign: "center" }}>No concerts available</p>;
  };

  return (
    <main className="main-container">
      <h2>All Concerts</h2>
      <div className="concert-cards">
        {concerts.map(concert => (
          <div key={concert.id} className="concert-card">
            <h3>{concert.artist}</h3>
            <p><b>Location:</b> {concert.location?.name || "Unknown"}</p>
            <p><b>Start Date:</b> {concert.shows && concert.shows[0]?.start?.split("T")[0]}</p>
            <p><b>End Date:</b> {concert.shows && concert.shows[concert.shows.length - 1]?.end?.split("T")[0]}</p>
            <Link to={`/booking/${concert.id}`} className="homepage-btn">Book</Link>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ConcertPage;