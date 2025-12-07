import React, { useState } from 'react';

export default function Login({ handleLogin }) {
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 w-100">
      <div className="card p-5 shadow bg-white" style={{ maxWidth: '400px', borderRadius: '15px' }}>
        <h2 className="text-center mb-4 text-dark"><i>CLICKABLES</i></h2>
        <form onSubmit={handleLogin}>
          
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input 
              type="email" 
              name="email" 
              className="form-control" 
              placeholder="user@example.com" 
              required 
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              {/* Conditional Type: Text vs Password */}
              <input 
                type={showPassword ? "text" : "password"} 
                name="password" 
                className="form-control" 
                placeholder="*****" 
                required 
              />
              {/* The Eye Button */}
              <button 
                className="btn btn-outline-secondary" 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "Hide Password" : "Show Password"}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-dark w-100 mt-3">Sign In</button>
        </form>
        <small className="text-muted text-center mt-3 d-block">Secure Login System</small>
      </div>
    </div>
  );
}