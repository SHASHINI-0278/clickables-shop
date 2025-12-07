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
    const savedCart = JSON.parse(localStorage.getItem('lifestyle-cart'));
    const savedSession = JSON.parse(localStorage.getItem('lifestyle-session'));
    if (savedCart) setCart(savedCart);
    if (savedSession) setUser(savedSession);
  }, []);

  useEffect(() => {
    localStorage.setItem('lifestyle-cart', JSON.stringify(cart));
  }, [cart]);

  // --- HANDLERS ---
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const usersDB = JSON.parse(localStorage.getItem('lifestyle-users-db')) || {};

    if (usersDB[email]) {
      if (usersDB[email].password === password) {
        setUser(usersDB[email]); 
        localStorage.setItem('lifestyle-session', JSON.stringify(usersDB[email])); 
        alert("Welcome back!");
      } else {
        alert("Incorrect Password!");
      }
    } else {
      const newUser = { 
        email: email, 
        password: password, 
        name: email.split('@')[0],
        phone: "",
        bio: "New Member",
        city: ""
      };
      usersDB[email] = newUser;
      localStorage.setItem('lifestyle-users-db', JSON.stringify(usersDB));
      setUser(newUser);
      localStorage.setItem('lifestyle-session', JSON.stringify(newUser));
      alert("Account created successfully!");
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('lifestyle-session');
    setView('home');
  };

  const updateUser = (updatedDetails) => {
    const newUser = { ...user, ...updatedDetails };
    setUser(newUser); 
    localStorage.setItem('lifestyle-session', JSON.stringify(newUser));
    const usersDB = JSON.parse(localStorage.getItem('lifestyle-users-db')) || {};
    usersDB[newUser.email] = newUser;
    localStorage.setItem('lifestyle-users-db', JSON.stringify(usersDB));
    alert("Profile Updated Successfully!");
  };

  // --- CART LOGIC ---
  
  // 1. Add Item (Removed Alert to make clicking "+" smoother)
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // 2. Remove ONE instance of an item (for the "-" button)
  const decrementItem = (product) => {
    const index = cart.findIndex(item => item.id === product.id);
    if (index !== -1) {
      const newCart = [...cart];
      newCart.splice(index, 1); // Remove only that one item
      setCart(newCart);
    }
  };

  // 3. Remove ALL instances (for the Cart page "X" button)
  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  // 4. Helper to count how many of THIS product are in cart
  const getProductQuantity = (productId) => {
    return cart.filter(item => item.id === productId).length;
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
              {PRODUCTS.map((prod) => {
                // Calculate quantity for THIS specific product
                const qty = getProductQuantity(prod.id);
                
                return (
                  <div key={prod.id} className="col-md-3 mb-4">
                    <div className="card h-100 border-0 shadow-sm">
                      <img src={prod.img} className="card-img-top rounded-top" alt={prod.name} />
                      <div className="card-body">
                        <h6 className="card-subtitle mb-2 text-muted text-uppercase" style={{fontSize: '0.8rem'}}>{prod.category}</h6>
                        <h5 className="card-title">{prod.name}</h5>
                        <h5 className="card-text text-primary fw-bold">₹{prod.price}</h5>
                        
                        {/* --- NEW CONDITIONAL BUTTONS --- */}
                        {qty === 0 ? (
                          // Case A: Not in cart yet -> Show Add Button
                          <button onClick={() => addToCart(prod)} className="btn btn-dark w-100 mt-2">
                            Add to Cart
                          </button>
                        ) : (
                          // Case B: Already in cart -> Show Counter
                          <div className="d-flex justify-content-between align-items-center mt-2">
                            <button 
                              onClick={() => decrementItem(prod)} 
                              className="btn btn-outline-danger btn-sm" 
                              style={{width: '30%'}}
                            >
                              -
                            </button>
                            <span className="fw-bold">{qty}</span>
                            <button 
                              onClick={() => addToCart(prod)} 
                              className="btn btn-success btn-sm" 
                              style={{width: '30%'}}
                            >
                              +
                            </button>
                          </div>
                        )}

                      </div>
                    </div>
                  </div>
                );
              })}
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