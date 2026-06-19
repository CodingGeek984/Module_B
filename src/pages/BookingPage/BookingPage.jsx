import React, { useState } from "react";
import { useParams } from "react-router-dom";

const BookingPage = ({ shows }) => {
  const { id } = useParams();
  const show = shows.find(s => s.id === parseInt(id));

  const rows = ["A","B","C","D","E","F"]; // 6 рядов
  const [selected, setSelected] = useState([]);

  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    zip: "",
    country: ""
  });

  const [error, setError] = useState("");

  // клик по месту
  const handleSeatClick = (row, seat) => {
    const key = `${row}-${seat}`;

    if (selected.includes(key)) {
      setSelected(selected.filter(s => s !== key));
    } else {
      setSelected([...selected, key]);
    }
  };

  // форма
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleBooking = (e) => {
    e.preventDefault();

    if (selected.length === 0 || Object.values(form).some(v => !v)) {
      setError("Fill all fields and select seats");
      return;
    };

    const ticket = {
      name: form.name,
      code: Math.random().toString(36).substring(2, 8).toUpperCase(),
      seats: selected,
      artist: show.artist,
      location: show.location,
      location: show.location,
      time: `${show.start_time} - ${show.end_time}`,
      date: new Date().toLocaleDateString()
    };

    localStorage.setItem("ticket", JSON.stringify(ticket));

    alert("Booking successful! Your ticket code is: " + ticket.code);

    window.location.href = "/retrieve";

  };

  if (!show) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <main className="main-container">

      <h2>{show.artist}</h2>

      <p style={{ textAlign: "center" }}>
        {show.location} | {show.start_time} - {show.end_time}
      </p>

      {/* МЕСТА */}
      <div className="seats-grid">
        {rows.map(row => (
          <div key={row} className="seat-row">
            <span className="row-label">{row}</span>

            {[...Array(10)].map((_, i) => {
              const seat = i + 1;
              const key = `${row}-${seat}`;

              return (
                <button
                  key={key}
                  className={`seat ${selected.includes(key) ? "selected" : ""}`}
                  onClick={() => handleSeatClick(row, seat)}
                >
                  {seat}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Selected seats */}
      <div className="selected-seats">
        {selected.length > 0
          ? selected.map(s => {
              const [row, seat] = s.split("-");
              return <div key={s}>Row: {row}, Seat: {seat}</div>;
            })
          : "No seats selected. Click on a seat to make a reservation."}
      </div>

      {/* ФОРМА */}
      {selected.length > 0 && (
        <form className="booking-form" onSubmit={handleBooking}>

          <input name="name" placeholder="Name" onChange={handleChange} />
          <input name="address" placeholder="Address" onChange={handleChange} />
          <input name="city" placeholder="City" onChange={handleChange} />
          <input name="zip" placeholder="Zip code" onChange={handleChange} />
          <input name="country" placeholder="Country" onChange={handleChange} />

          {error && <p className="error">{error}</p>}

          <button className="book-btn">Book</button>

        </form>
      )}

    </main>
  );
};

export default BookingPage;