


import React, { useState } from 'react';
import { User, Edit2, Lock } from 'lucide-react';


const Profile = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Handle password change logic
    alert("Password changed successfully!");
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="card p-4 profile-card shadow-sm">
            
            {/* Profile Header */}
            <div className="d-flex align-items-center mb-4 profilecc">
              <div className="profile-avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center">
               JD
              </div>
              <div className="ms-3">
                <h5 className="mb-1">John Doe</h5>
                <p className="mb-0 text-muted">johndoe@example.com</p>
              </div>
            </div>

            {/* Plan Info */}
            {/* <div className="mb-4">
              <h6 className="text-black">Active Plan</h6>
              <p className="mb-1 text-muted">Professional Monthly</p>
              <span className="badge bg-primary">Active</span>
            </div> */}

            <hr />

            {/* Change Password Section */}
            <div className="mt-4">
              <h6 className="text-black mb-3"><Lock size={20} className="me-2"/>Change Password</h6>
              <form onSubmit={handlePasswordChange}>
                <div className="mb-3">
                  <label className="form-label text-muted">Current Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-muted">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-muted">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Update Password</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;







