import React, { useState } from "react";

const TicketPage = () => {
  const [tickets, setTickets] = useState([
    // Простейший мок
    { id: 1, name: "John Doe", code: "ABC123", row: "A", seat: 1, artist: "Artist 1", location: "Location 1", start_time: "18:00", end_time: "20:00", booked_on: "22/03/2026" }
  ]);

  const handleCancel = (ticketId) => {
    if (window.confirm("Are you sure you want to cancel this ticket?")) {
      setTickets(tickets.filter(t => t.id !== ticketId));
    }
  };

  if (tickets.length === 0) return <p>No tickets booked yet.</p>;

  return (
    <main>
      <div className="TicketPage">
        <h2>Your Tickets</h2>

        {tickets.map(ticket => (
          <div key={ticket.id} className="ticket">
            <p><b>Name:</b> {ticket.name}</p>
            <p><b>Booked On:</b> {ticket.booked_on}</p>
            <p><b>Code:</b> {ticket.code}</p>
            <p><b>Seat:</b> Row {ticket.row}, Seat {ticket.seat}</p>
            <p><b>Artist:</b> {ticket.artist}</p>
            <p><b>Location:</b> {ticket.location}</p>
            <p><b>Time:</b> {ticket.start_time} - {ticket.end_time}</p>
            <button className="cancel-btn" onClick={() => handleCancel(ticket.id)}>Cancel</button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default TicketPage;