import React, { useState } from "react";
import { Link } from "react-router-dom";

const HomePage = ({ shows }) => {
  const [filters, setFilters] = useState({
    artist: "All Artists",
    location: "All locations",
    date: ""
  });
  
  const uniqueArtists = ["All Artists", ...new Set(shows.map(s => s.artist))];
  const uniqueLocations = ["All locations", ...new Set(shows.map(s => s.location))];

  const handleChange = (e) => {
    setFilters({...filters, [e.target.name]: e.target.value});
  };

  const clearFilters = () => {
    setFilters({ artist: "All Artists", location: "All locations", date: "" });
  };

  const filteredShows = shows.filter(show => 
    (filters.artist === "All Artists" || show.artist === filters.artist) &&
    (filters.location === "All locations" || show.location === filters.location) &&
    (!filters.date || show.start_time.startsWith(filters.date))
  );

  const filter = document.getElementById("");

  return (
    <main>
      <div className="HomePage">
        <h2>Checkout these amazing concerts in Graz</h2>

        <div className="filters">
          <select name="artist" value={filters.artist} onChange={handleChange}>
            {uniqueArtists.map(a => <option key={a} value={a}>{a}</option>)}
          </select>

          <select name="location" value={filters.location} onChange={handleChange}>
            {uniqueLocations.map(l => <option key={l} value={l}>{l}</option>)}
          </select>

          <input type="date" name="date" value={filters.date} onChange={handleChange} />

          {(filters.artist !== "All Artists" || filters.location !== "All locations" || filters.date) && (
            <button className="clear-btn" onClick={clearFilters}>Clear</button>
          )}
        </div>

        <div className="homepage-cards">
          {filteredShows.length === 0 ? (
            <p>No shows matching current filter.</p>
          ) : (
            filteredShows.map(show => (
              <div key={show.id} className="homepage-card">
                <h3>{show.artist}</h3>
                <p>{show.location}</p>
                <p>{show.start_time} - {show.end_time}</p>
                <Link to={`/booking/${show.id}`} className="homepage-btn">Book</Link>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
};

export default HomePage;