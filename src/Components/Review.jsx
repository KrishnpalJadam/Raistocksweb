import React from 'react';

const Review = () => {
  return (
    <div>
 
  <section className="py-5 bg-white">
    <div className="container">
      <h2 className="text-center fw-bold mb-5">
        Experience Shared By Those We've Helped
      </h2>
      <div
        id="testimonialCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div
              className="card p-4 shadow-sm mb-4  border-0 text-center mx-auto"
              style={{ maxWidth: 600 }}
            >
              <p className="lead fst-italic">
                "The analysis is deep and their process is completely
                transparent. It's refreshing to see a SEBI-RA who truly puts the
                client first. My returns have been consistent and manageable."
              </p>
              <div className="mt-3">
                <p className="fw-bold mb-1">- Rajesh K.</p>
                <div className="text-warning">
                  <i className="bi bi-star-fill" />
                  <i className="bi bi-star-fill" />
                  <i className="bi bi-star-fill" />
                  <i className="bi bi-star-fill" />
                  <i className="bi bi-star-half" />
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div
              className="card p-4 shadow-sm mb-4 border-0 text-center mx-auto"
              style={{ maxWidth: 600 }}
            >
              <p className="lead fst-italic">
                "No hidden costs and the 15-day trial was a game-changer. I saw
                the value before committing. Great support on portfolio
                restructuring."
              </p>
              <div className="mt-3">
                <p className="fw-bold mb-1">- Priya S.</p>
                <div className="text-warning">
                  <i className="bi bi-star-fill" />
                  <i className="bi bi-star-fill" />
                  <i className="bi bi-star-fill" />
                  <i className="bi bi-star-fill" />
                  <i className="bi bi-star-fill" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#testimonialCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#testimonialCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  </section>
    </div>
  );
}

export default Review;
