import React, { useState } from 'react';

export default function Profile({ user, handleLogout, setView, updateUser }) {
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user.name,
    phone: user.phone || '',
    bio: user.bio || '',
    city: user.city || ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updateUser(formData);
    setIsEditing(false);
  };

  // --- LOGIC TO GET INITIALS ---
  const getInitials = (name) => {
    if (!name) return "U"; // Default to 'U' if no name
    const parts = name.split(" ");
    const firstInitial = parts[0] ? parts[0][0] : "";
    const lastInitial = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return (firstInitial + lastInitial).toUpperCase();
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow border-0">
            <div className="card-header bg-dark text-white text-center py-4">
              <h3 className="mb-0">{isEditing ? "Edit Profile" : "My Profile"}</h3>
            </div>
            <div className="card-body p-5">
              
              {/* --- DYNAMIC AVATAR CIRCLE --- */}
              <div className="text-center mb-4">
                <div 
                  className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto shadow" 
                  style={{ width: "100px", height: "100px", fontSize: "40px", fontWeight: "bold" }}
                >
                  {getInitials(user.name)}
                </div>
              </div>

              {/* FORM START */}
              {isEditing ? (
                // --- EDIT MODE ---
                <div>
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input type="text" name="phone" className="form-control" value={formData.phone} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Bio</label>
                    <textarea name="bio" className="form-control" rows="2" value={formData.bio} onChange={handleChange}></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">City</label>
                    <input type="text" name="city" className="form-control" value={formData.city} onChange={handleChange} />
                  </div>
                  
                  <div className="d-grid gap-2 mt-4">
                    <button onClick={handleSave} className="btn btn-success">Save Changes</button>
                    <button onClick={() => setIsEditing(false)} className="btn btn-outline-secondary">Cancel</button>
                  </div>
                </div>
              ) : (
                // --- VIEW MODE ---
                <div className="text-center">
                  <h4 className="fw-bold">{user.name}</h4>
                  <p className="text-muted mb-4">{user.email}</p>
                  
                  <div className="text-start bg-light p-3 rounded mb-4">
                    <p className="mb-2"><strong>📞 Phone:</strong> {user.phone || "Not set"}</p>
                    <p className="mb-2"><strong>🏠 City:</strong> {user.city || "Not set"}</p>
                    <p className="mb-0"><strong>📝 Bio:</strong> {user.bio || "No bio yet."}</p>
                  </div>

                  <div className="d-grid gap-2">
                    <button onClick={() => setIsEditing(true)} className="btn btn-outline-dark">
                      Edit Profile ✏️
                    </button>
                    <button onClick={() => setView('home')} className="btn btn-outline-secondary">
                      Back to Shopping
                    </button>
                    <button onClick={handleLogout} className="btn btn-danger">
                      Logout
                    </button>
                  </div>
                </div>
              )}
              {/* FORM END */}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}