import React, { useState } from "react";

const HelpPopup = ({ onClose }) => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        subject: "",
        category: "",
    });
    const [showConfirm, setShowConfirm] = useState(false);
    const [showForm, setShowForm] = useState(true); // ✅ control form visibility

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // ✅ Simulate form submission (you can connect backend later)
        setShowForm(false); // Hide form modal immediately
        setShowConfirm(true); // Show confirmation popup
    };

    const handleCloseConfirm = () => {
        setShowConfirm(false);
        onClose(); // Close everything
    };

    return (
        <>
            {/* Background overlay */}
            <div
                className="modal-backdrop show"
                style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1049 }}
                onClick={onClose}
            ></div>

            {/* ✅ Help Form Modal */}
            {showForm && (
                <div
                    className="modal show d-block"
                    tabIndex="-1"
                    style={{ zIndex: 1050 }}
                >
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
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="form-control"
                                            required
                                        />
                                    </div>


                                </div>

                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary">
                                        Send
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={onClose}
                                    >
                                        Close
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* ✅ Professional Confirmation Popup */}
            {showConfirm && (
                <div
                    className="modal show d-block"
                    tabIndex="-1"
                    style={{ zIndex: 1055 }}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content text-center">
                            <div className="modal-body p-4">
                                <h5 className="mb-3 text-success">✅ Request Submitted Successfully</h5>
                                <p className="text-muted">
                                    Thank you for reaching out. Our support team has received your query
                                    and will get back to you within 24 hours via email.
                                </p>
                                <button
                                    className="btn btn-success mt-2"
                                    onClick={handleCloseConfirm}
                                >
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
