import React from "react";

function SummaryBox({
  totalRegistrations,
  totalOnline,
  totalPaid
}) {

  return (
    <div className="summary-container">

      <div className="summary-card">

        <h5>
          Tổng đăng ký
        </h5>

        <h2>
          {totalRegistrations}
        </h2>

      </div>

      <div className="summary-card online">

        <h5>
          Online
        </h5>

        <h2>
          {totalOnline}
        </h2>

      </div>

      <div className="summary-card paid">

        <h5>
          Đã thanh toán
        </h5>

        <h2>
          {totalPaid}
        </h2>

      </div>

    </div>
  );
}

export default SummaryBox;