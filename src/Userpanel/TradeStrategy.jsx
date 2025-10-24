import React from "react";


const TradeStrategy = () => {
    // Dummy data (later replace with API data)
    const comments = [
        "Market is currently in bullish phase Volume increasing on breakout zone Stop loss to be placed near previous support.", "Wait for retest confirmation before entry  RSI showing positive divergence, monitor closely.",
    ];

    return (
        <div className="trade-strategy-wrapper container-fluid">
            <style>
                {`
            .trade-strategy-wrapper {
  padding: 20px;
  background-color: #fff;
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
}

.trade-strategy-title {
  font-size: 22px;
  font-weight: 600;
  color: #222;
}

.trade-strategy-box {
  border: 2px solid blue;
  border-radius: 20px;
  background: #ffffff;
  max-width: 950px;
}

.trade-strategy-subtitle {
  font-size: 18px;
  font-weight: 500;
  color: #000;
}

.trade-strategy-label {
  font-weight: 600;
  font-size: 15px;
  color: #333;
  min-width: 90px;
}

.trade-strategy-dotted {
  border-bottom: 1px dotted #555;
  height: 14px;
  display: block;
}

.trade-strategy-comments {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 8px;
}

.trade-strategy-comment-line {
  position: relative;
  padding-bottom: 5px;
}

.trade-strategy-comment-text {
  display: inline-block;
  position: relative;
  z-index: 2;
  background: #fff;
  padding-right: 6px;
  color: #444;
  font-size: 15px;
}

.trade-strategy-dotted-line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-bottom: 1px dotted #555;
  z-index: 1;
}

/* RESPONSIVE DESIGN */
@media (max-width: 768px) {
  .trade-strategy-wrapper {
    padding: 15px;
  }

  .trade-strategy-box {
    padding: 15px !important;
  }

  .trade-strategy-title {
    font-size: 20px;
  }

  .trade-strategy-label {
    font-size: 14px;
    min-width: 70px;
  }

  .trade-strategy-comment-text {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .trade-strategy-title {
    font-size: 18px;
  }

  .trade-strategy-subtitle {
    font-size: 16px;
  }
}

            
            `}
            </style>
            <h4 className="trade-strategy-title">Trade Strategy</h4>

            <div className="trade-strategy-box p-4 mt-3">
                <h5 className="trade-strategy-subtitle">From Trade Setup</h5>
                <hr />
                <div className="trade-strategy-fields mt-3">
                    <div className="trade-strategy-line  align-items-center">
                        <span className="trade-strategy-label">Title :</span>
                        <span className=" "> Market Strategy</span>
                    </div>

                    <div className="trade-strategy-line mt-3">
                        <span className="trade-strategy-label">Comment :</span>
                    </div>

                    <div className="trade-strategy-comments mt-2">
                        {comments.map((text, index) => (
                            <div key={index} className="trade-strategy-comment-line">
                                <span className="trade-strategy-comment-text">{text}</span>
                                <span className="trade-strategy-dotted-line"></span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TradeStrategy;
