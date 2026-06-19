import React, { useState } from "react";

const RetrievePage = () => {
  const [form, setForm] = useState({ name: "", code: "" });
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.code) {
      setError("Fill all fields");
      return;
    }

    const saved = JSON.parse(localStorage.getItem("ticket"));

    if (!saved || saved.name !== form.name || saved.code !== form.code) {
      setError("Could not find tickets with these details.");
      return;
    }

    setTicket(saved);
  };

  return (
    <main className="main-container">

      {!ticket && (
        <>
          <h2>Retrieve your tickets</h2>

          <form className="retrieve-form" onSubmit={handleSubmit}>
            <input name="name" placeholder="Name" onChange={handleChange} />
            <input name="code" placeholder="Ticket Code" onChange={handleChange} />

            {error && <p className="error">{error}</p>}

            <button className="retrieve-btn">Get Ticket</button>
          </form>
        </>
      )}

      {ticket && (
        <div>
          <h2>Your Tickets are ready!</h2>

          <div className="ticket">
            <p><b>Name:</b> {ticket.name}</p>
            <p><b>Booked On:</b> {ticket.date}</p>

            {ticket.seats.map((s, i) => {
              const [row, seat] = s.split("-");
              return (
                <p key={i}>
                  Row: {row}, Seat: {seat}
                </p>
              );
            })}

            <p><b>Code:</b> {ticket.code}</p>
            <p><b>Artist:</b> {ticket.artist}</p>
            <p><b>Location:</b> {ticket.location}</p>
            <p><b>Time:</b> {ticket.time}</p>
          </div>

        </div>
      )}

    </main>
  );
};

export default RetrievePage;