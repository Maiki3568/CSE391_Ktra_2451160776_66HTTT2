import React from "react";

function RegistrationItem({
  registration,
  editRegistration,
  deleteRegistration
}) {

  let paymentClass = "";

  if (
    registration.paymentStatus ===
    "Đã thanh toán"
  ) {
    paymentClass = "paid";
  } else {
    paymentClass = "unpaid";
  }

  return (
    <div className="registration-card">

      <div className="registration-header">

        <h5>
          {registration.code}
        </h5>

        <span
          className={`payment-badge ${paymentClass}`}
        >
          {registration.paymentStatus}
        </span>

      </div>

      <div className="registration-body">

        <p>
          <strong>
            Họ tên:
          </strong>{" "}
          {registration.fullName}
        </p>

        <p>
          <strong>
            Email:
          </strong>{" "}
          {registration.email}
        </p>

        <p>
          <strong>
            SĐT:
          </strong>{" "}
          {registration.phone}
        </p>

        <p>
          <strong>
            Chủ đề:
          </strong>{" "}
          {registration.topic}
        </p>

        <p>
          <strong>
            Hình thức:
          </strong>{" "}
          {registration.mode}
        </p>

        <p>
          <strong>
            Ngày:
          </strong>{" "}
          {registration.date}
        </p>

        <p>
          <strong>
            Ca:
          </strong>{" "}
          {registration.session}
        </p>

        <p>
          <strong>
            Phí:
          </strong>{" "}
          {Number(
            registration.fee
          ).toLocaleString()}
          đ
        </p>

        <p>
          <strong>
            Ghi chú:
          </strong>{" "}
          {registration.note ||
            "Không có"}
        </p>

      </div>

      <div className="registration-footer">

        <button
          className="btn btn-warning"
          onClick={() =>
            editRegistration(
              registration
            )
          }
        >
          Sửa
        </button>

        <button
          className="btn btn-danger"
          onClick={() =>
            deleteRegistration(
              registration.id
            )
          }
        >
          Xóa
        </button>

      </div>

    </div>
  );
}

export default RegistrationItem;