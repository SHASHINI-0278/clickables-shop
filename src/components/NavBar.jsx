import React from 'react';

export default function Navbar({ user, cartCount, location, setView, handleLogout, detectLocation }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4 sticky-top">
      <a className="navbar-brand fw-bold" href="#" onClick={() => setView('home')}><i> CLICKABLES 🛍️ </i></a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <div className="ms-auto d-flex align-items-center gap-3">
          <button onClick={detectLocation} className="btn btn-outline-secondary btn-sm rounded-pill">
            📍 {location}
          </button>
          
          <button className="btn btn-dark position-relative rounded-pill" onClick={() => setView('cart')}>
            Cart
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {cartCount}
            </span>
          </button>
          
          {/* UPDATED: Click Name to go to Profile */}
          <button 
            onClick={() => setView('profile')} 
            className="btn btn-link text-decoration-none text-dark fw-bold ms-2 border-0"
          >
            Hi, {user.name} 👤
          </button>
          
          <button onClick={handleLogout} className="btn btn-sm btn-outline-danger ms-2">Logout</button>
        </div>
      </div>
    </nav>
  );
}