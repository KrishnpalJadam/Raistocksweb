// src/components/HelpPopup.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createSupportTicket,
  resetSupportState,
} from "../slices/supportSlice";

const HelpPopup = ({ onClose }) => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.support);
  const { client } = useSelector((state) => state.clientAuth); // ✅ get logged-in client

  const [formData, setFormData] = useState({
    category: "",
    subject: "",
  });

  const [showConfirm, setShowConfirm] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!client?._id) {
      alert("You must be logged in to send a query.");
      return;
    }

    // ✅ Send request with logged-in client’s ID
    dispatch(
      createSupportTicket({
        category: formData.category,
        subject: formData.subject,
        userId: client._id, // ✅ automatically included
      })
    );
  };

  useEffect(() => {
    if (success) {
      setShowForm(false);
      setShowConfirm(true);
      dispatch(resetSupportState());
    }
  }, [success, dispatch]);

  const handleCloseConfirm = () => {
    setShowConfirm(false);
    onClose();
  };

  return (
    <>
      <div
        className="modal-backdrop show"
        style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1049 }}
        onClick={onClose}
      ></div>

      {showForm && (
        <div className="modal show d-block" tabIndex="-1" style={{ zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Help & Support</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={onClose}
                ></button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="form-select"
                      required
                    >
                      <option value="">Select Category</option>
                      <option>Account Issue</option>
                      <option>Payment</option>
                      <option>Trade Query</option>
                      <option>Technical Issue</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Query</label>
                    <textarea
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>

                  {loading && (
                    <p className="text-muted text-center">
                      Sending your request...
                    </p>
                  )}
                  {error && <p className="text-danger text-center">{error}</p>}
                </div>

                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Sending..." : "Send"}
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={onClose}>
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {showConfirm && (
        <div className="modal show d-block" tabIndex="-1" style={{ zIndex: 1055 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content text-center">
              <div className="modal-body p-4">
                <h5 className="mb-3 text-success">✅ Request Submitted Successfully</h5>
                <p className="text-muted">
                  Thank you for reaching out. Our support team has received your query and will get back to you within 24 hours via email.
                </p>
                <button className="btn btn-success mt-2" onClick={handleCloseConfirm}>
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HelpPopup;
