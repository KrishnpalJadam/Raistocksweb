import React from 'react';

const Complaints = () => {
  return (
    <div>
       <section className="py-5 bg-light-gray">
    <div className="container">
      <h2 className="text-center fw-bold mb-4">
        Number of Client's Complaints
      </h2>
      <div className="table-responsive shadow-sm">
        <table className="table table-bordered table-striped text-center align-middle caption-top bg-white">
          <caption>Complaint Data for FY 2024-25 (Illustrative)</caption>
          <thead className="table-primary">
            <tr>
              <th scope="col">Received From</th>
              <th scope="col">Pending</th>
              <th scope="col">Received</th>
              <th scope="col">Resolved</th>
              <th scope="col">Total</th>
              <th scope="col">Pending &gt; 3 months</th>
              <th scope="col">Avg Resolution (Days)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Direct Clients</td>
              <td>0</td>
              <td>2</td>
              <td>2</td>
              <td>2</td>
              <td>0</td>
              <td>5</td>
            </tr>
            <tr>
              <td>SEBI (SCORES)</td>
              <td>0</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>0</td>
              <td>8</td>
            </tr>
            <tr className="table-secondary fw-bold">
              <td>TOTAL</td>
              <td>0</td>
              <td>3</td>
              <td>3</td>
              <td>3</td>
              <td>0</td>
              <td>6</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="small text-muted text-center mt-3">
        All data strictly reported as per SEBI Guidelines and disclosed
        quarterly.
      </p>
    </div>
  </section>
    </div>
  );
}

export default Complaints;
