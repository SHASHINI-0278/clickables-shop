import React from 'react';

export default function Cart({ cart, removeFromCart, setView }) {
  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white">
            <h4 className="mb-0">Your Shopping Cart</h4>
          </div>
          <div className="card-body">
            {cart.length === 0 ? (
              <div className="text-center py-5">
                <h5>Your cart is empty 😔</h5>
                <button onClick={() => setView('home')} className="btn btn-link">Start Shopping</button>
              </div>
            ) : (
              <ul className="list-group list-group-flush mb-3">
                {cart.map((item, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{item.name}</strong>
                      <div className="text-muted small">{item.category}</div>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="me-3">₹{item.price}</span>
                      <button onClick={() => removeFromCart(index)} className="btn btn-sm btn-outline-danger">&times;</button>
                    </div>
                  </li>
                ))}
                <li className="list-group-item active d-flex justify-content-between bg-dark border-dark">
                  <span>Total Amount</span>
                  <strong>₹{cartTotal}</strong>
                </li>
              </ul>
            )}
          </div>
          {cart.length > 0 && (
            <div className="card-footer bg-white d-flex justify-content-between p-3">
              <button onClick={() => setView('home')} className="btn btn-outline-dark">Continue Shopping</button>
              <button className="btn btn-success px-4">Checkout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}