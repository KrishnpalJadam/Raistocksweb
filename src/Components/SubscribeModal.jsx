import React, { useState } from "react";
import "./SubscribeModal.css";
import { X } from "lucide-react";

const SubscribeModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    pancard: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Razorpay checkout
  const handlePayment = async (e) => {
    e.preventDefault();

    const res = await new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // Create options for Razorpay
    const options = {
      key: "YOUR_RAZORPAY_KEY", // Replace with your Razorpay key
      amount: 499900, // in paise (₹4,999 example)
      currency: "INR",
      name: "Your Company Name",
      description: "Subscription Payment",
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone,
      },
      theme: {
        color: "#0d6efd",
      },
      handler: function (response) {
        // payment success callback
        console.log("Payment Success:", response);
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
      },
      modal: {
        ondismiss: function () {
          alert("Payment cancelled");
        },
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop-custom">
      <div className="modal-dialog-custom shadow">
        <button type="button" className="btn-close-custom" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="modal-header-custom text-center">
          <h5 className="modal-title">Enter Your Details</h5>
          <p className="text-muted small">
            All fields are required to proceed with payment
          </p>
        </div>

        <form onSubmit={handlePayment} className="modal-form">
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Aadhaar Linked Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">PAN Card</label>
            <input
              type="text"
              name="pancard"
              value={formData.pancard}
              onChange={handleChange}
              placeholder="ABCDE1234F"
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-3">
            Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubscribeModal;
