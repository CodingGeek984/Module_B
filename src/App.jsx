import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { api } from './shared/api/axios';
import { Link } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import BookingPage from './pages/BookingPage/BookingPage';
import TicketPage from "./pages/TicketPage/TicketPage";
import RetrievePage from "./pages/RetrievePage/RetrievePage";
import ConcertPage from "./pages/ConcertPage/ConcertPage";

import './App.css';

function App() {
  const [concerts, setConcerts] = useState([]);
  const [shows, setShows] = useState([]);
  
  useEffect(() => {
    api.get("/concerts")
      .then((res) => {
        // проверяем, есть ли concerts в ответе
        const concertsData = res.data.concerts || [];
        setConcerts(concertsData);

        // формируем shows для HomePage
        const allShows = [];
        concertsData.forEach(concert => {
          if (concert.shows && concert.shows.length > 0) {
            concert.shows.forEach(show => {
              allShows.push({
                id: show.id,
                artist: concert.artist,
                location: concert.location?.name || "Unknown",
                start_time: show.start,
                end_time: show.end
              });
            });
          }
        });

        setShows(allShows);
      })
      .catch((err) => {
        console.log("API error:", err);
      });
  }, []);

  return (
    <BrowserRouter>
      <header className="header">
        <div className="container">
          <div className="logo">EuroSkills</div>
          <div className="nav">
            Already booked?
            <Link to="/retrieve" className="nav-btn">Get Tickets</Link>
          </div>
        </div>
      </header>
      
      <Routes>
        <Route path='/' element={<HomePage shows={shows} />} />
        <Route path='/booking/:id' element={<BookingPage shows={shows} />} />
        <Route path="/tickets" element={<TicketPage />} />
        <Route path="/retrieve" element={<RetrievePage />} />
        <Route path="/concert" element={<ConcertPage concerts={concerts} />} />
      </Routes>

    </BrowserRouter>
    
  );
};

export default App;