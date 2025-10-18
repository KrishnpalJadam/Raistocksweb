import React, { useState } from "react";
import "./SubscribeModal.css";
import { X } from "lucide-react";

const SubscribeModal = ({ isOpen, onClose, onSubmit, selectedPlan }) => {
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

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!selectedPlan) {
      alert("Please select a plan first!");
      return;
    }

    try {
      // 1️⃣ Call backend to create Razorpay order
      const createRes = await fetch(
      `${API_URL}/api/subscription/create-order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            dob: formData.dob,
            pan: formData.pancard,
            planId: selectedPlan.id,
            amount: parseInt(selectedPlan.price.replace(/,/g, "")), // remove commas
          }),
        }
      );

      const orderData = await createRes.json();

      if (!orderData.success) {
        alert("Order creation failed: " + orderData.message);
        return;
      }

      // 2️⃣ Load Razorpay SDK
      const res = await new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });

      if (!res) {
        alert("Razorpay SDK failed to load");
        return;
      }

      // 3️⃣ Razorpay options
      const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY, // Vite env variable
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Your Company Name",
        description: `Subscription for ${selectedPlan.title}`,
        order_id: orderData.orderId,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        handler: async function (response) {
          // 4️⃣ Verify payment on backend
          const verifyRes = await fetch(
           `${API_URL}/api/subscription/verify-payment`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            }
          );

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            alert("Payment verified successfully!");
            onSubmit({ ...formData, plan: selectedPlan });
          } else {
            alert("Payment verification failed!");
          }
        },
        theme: { color: "#0d6efd" },
        modal: {
          ondismiss: function () {
            alert("Payment cancelled");
          },
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong during payment.");
    }
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
            <label className="form-label">Phone Number</label>
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
