import React, { useState, useEffect } from 'react';
import { PRODUCTS } from './data/Products';
import Login from './components/Login';
import Navbar from './components/NavBar';
import Cart from './components/Cart';
import Profile from './components/Profile';

function App() {
  const [user, setUser] = useState(null); 
  const [cart, setCart] = useState([]);   
  const [location, setLocation] = useState("Select Location"); 
  const [view, setView] = useState('home'); 

  // --- LOCAL STORAGE ---
  useEffect(() => {
    // 1. Load Cart
    const savedCart = JSON.parse(localStorage.getItem('lifestyle-cart'));
    if (savedCart) setCart(savedCart);

    // 2. Load Session (Keep user logged in if they refresh)
    const savedSession = JSON.parse(localStorage.getItem('lifestyle-session'));
    if (savedSession) setUser(savedSession);
  }, []);

  useEffect(() => {
    localStorage.setItem('lifestyle-cart', JSON.stringify(cart));
  }, [cart]);

  // --- HANDLERS ---

  // *** NEW SMART LOGIN LOGIC ***
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // 1. Get the "Database" of all users from Local Storage
    const usersDB = JSON.parse(localStorage.getItem('lifestyle-users-db')) || {};

    if (usersDB[email]) {
      // CASE A: User ALREADY exists. Check Password.
      if (usersDB[email].password === password) {
        setUser(usersDB[email]); // Login Success
        localStorage.setItem('lifestyle-session', JSON.stringify(usersDB[email])); // Save session
        alert("Welcome back!");
      } else {
        // Login Failed
        alert("Incorrect Password! Please try again.");
      }
    } else {
      // CASE B: New User. Create Account (Register).
      const newUser = { 
        email: email, 
        password: password, // Save the password they just typed
        name: email.split('@')[0],
        phone: "",
        bio: "New Member",
        city: ""
      };
      
      // Save to "Database"
      usersDB[email] = newUser;
      localStorage.setItem('lifestyle-users-db', JSON.stringify(usersDB));
      
      // Log them in
      setUser(newUser);
      localStorage.setItem('lifestyle-session', JSON.stringify(newUser));
      alert("Account created successfully! Password set.");
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('lifestyle-session'); // Clear session
    setView('home');
  };

  // *** UPDATED PROFILE LOGIC ***
  const updateUser = (updatedDetails) => {
    // 1. Merge old data with new data
    const newUser = { ...user, ...updatedDetails };
    
    // 2. Update Current State
    setUser(newUser); 
    localStorage.setItem('lifestyle-session', JSON.stringify(newUser));

    // 3. Update the "Database" so it remembers next time
    const usersDB = JSON.parse(localStorage.getItem('lifestyle-users-db')) || {};
    usersDB[newUser.email] = newUser; // Update this specific user
    localStorage.setItem('lifestyle-users-db', JSON.stringify(usersDB));

    alert("Profile Updated Successfully!");
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(`Ahmedabad (${position.coords.latitude.toFixed(2)})`);
          alert("Delivery location updated!");
        },
        (error) => alert("Location access denied.")
      );
    } else {
      alert("Geolocation not supported.");
    }
  };

  // --- RENDER ---
  if (!user) return <Login handleLogin={handleLogin} />;

  return (
    <div className="container-fluid p-0">
      <Navbar 
        user={user} 
        cartCount={cart.length} 
        location={location} 
        setView={setView} 
        handleLogout={handleLogout}
        detectLocation={detectLocation}
      />

      <div className="container mt-4">
        {view === 'home' && (
          <div>
            <div className="p-5 mb-4 bg-light rounded-3 text-center border">
              <div className="container-fluid py-2">
                <h1 className="display-5 fw-bold">Summer Collection 2025</h1>
                <p className="col-md-8 fs-4 mx-auto">Discover the latest trends in fashion and lifestyle.</p>
              </div>
            </div>

            <div className="row">
              {PRODUCTS.map((prod) => (
                <div key={prod.id} className="col-md-3 mb-4">
                  <div className="card h-100 border-0 shadow-sm">
                    <img src={prod.img} className="card-img-top rounded-top" alt={prod.name} />
                    <div className="card-body">
                      <h6 className="card-subtitle mb-2 text-muted text-uppercase" style={{fontSize: '0.8rem'}}>{prod.category}</h6>
                      <h5 className="card-title">{prod.name}</h5>
                      <h5 className="card-text text-primary fw-bold">₹{prod.price}</h5>
                      <button onClick={() => addToCart(prod)} className="btn btn-dark w-100 mt-2">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'cart' && (
          <Cart cart={cart} removeFromCart={removeFromCart} setView={setView} />
        )}

        {view === 'profile' && (
          <Profile user={user} handleLogout={handleLogout} setView={setView} updateUser={updateUser} />
        )}
      </div>
    </div>
  );
}

export default App;