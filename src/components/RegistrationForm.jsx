import React from "react";

import {
  topics,
  modes,
  sessions,
  paymentStatuses
} from "../data/demoRegistrations";

function RegistrationForm({
  registrationData,
  setRegistrationData,
  saveRegistration,
  editingId
}) {

  const handleChange = (e) => {
    e.target.setCustomValidity(""); // reset lỗi khi user thay đổi
    const { name, value } = e.target;
    setRegistrationData({
      ...registrationData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.currentTarget.reportValidity()) {
      saveRegistration();
    }
  };

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 60);
  const maxDateString =
    maxDate
      .toISOString()
      .split("T")[0];

  return (

    <div className="card custom-card">
      <div className="card-body">

        <h5 className="section-title">
          {editingId ? "Cập nhật đăng ký" : "Thêm đăng ký"}
        </h5>

        <form onSubmit={handleSubmit}>

          {/* Mã đăng ký */}
          <div className="mb-3">
            <label className="form-label">Mã đăng ký</label>
            <input
              type="text"
              className="form-control"
              name="code"
              value={registrationData.code}
              onChange={handleChange}
              required
              pattern="WR-[A-Z]{3}-[0-9]{3}"
              onInvalid={(e) =>
                e.target.setCustomValidity(
                  "Mã đăng ký phải có dạng WR-ABC-123"
                )
              }
            />
          </div>

          {/* Họ và tên */}
          <div className="mb-3">
            <label className="form-label">Họ và tên</label>
            <input
              type="text"
              className="form-control"
              name="fullName"
              value={registrationData.fullName}
              onChange={handleChange}
              required
              minLength="2"
              maxLength="50"
              pattern="^[A-Za-zÀ-ỹ\s]+$"
              onInvalid={(e) =>
                e.target.setCustomValidity(
                  "Họ tên chỉ được chứa chữ cái và từ 2 đến 50 ký tự"
                )
              }
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={registrationData.email}
              onChange={handleChange}
              required
              pattern=".+@student\.haui\.edu\.vn"
              onInvalid={(e) =>
                e.target.setCustomValidity(
                  "Email phải kết thúc bằng @student.haui.edu.vn"
                )
              }
            />
          </div>

          {/* Số điện thoại */}
          <div className="mb-3">
            <label className="form-label">Số điện thoại</label>
            <input
              type="text"
              className="form-control"
              name="phone"
              value={registrationData.phone}
              onChange={handleChange}
              required
              pattern="0[0-9]{9}"
              onInvalid={(e) =>
                e.target.setCustomValidity(
                  "Số điện thoại phải gồm 10 số và bắt đầu bằng 0"
                )
              }
            />
          </div>

          {/* Chủ đề hội thảo */}
          <div className="mb-3">
            <label className="form-label">Chủ đề hội thảo</label>
            <select
              className="form-select"
              name="topic"
              value={registrationData.topic}
              onChange={handleChange}
              required
              onInvalid={(e) =>
                e.target.setCustomValidity(
                  "Vui lòng chọn chủ đề hội thảo"
                )
              }
            >
              <option value="">Chọn chủ đề</option>
              {topics.map((topic) => (
                <option key={topic} value={topic}>{topic}</option>
              ))}
            </select>
          </div>

          {/* Hình thức */}
          <div className="mb-3">
            <label className="form-label">Hình thức</label>
            <select
              className="form-select"
              name="mode"
              value={registrationData.mode}
              onChange={handleChange}
              required
              onInvalid={(e) =>
                e.target.setCustomValidity(
                  "Vui lòng chọn hình thức tham gia"
                )
              }
            >
              <option value="">Chọn hình thức</option>
              {modes.map((mode) => (
                <option key={mode} value={mode}>{mode}</option>
              ))}
            </select>
          </div>

          {/* Ngày tham gia */}
          <div className="mb-3">
            <label className="form-label">Ngày tham gia</label>
            <input
              type="date"
              className="form-control"
              name="date"
              value={registrationData.date}
              onChange={handleChange}
              required
              min={today}
              max={maxDateString}
              onInvalid={(e) =>
                e.target.setCustomValidity(
                  "Ngày tham gia phải từ hôm nay đến tối đa 60 ngày tới"
                )
              }
            />
          </div>

          {/* Ca tham gia */}
          <div className="mb-3">
            <label className="form-label">Ca tham gia</label>
            <select
              className="form-select"
              name="session"
              value={registrationData.session}
              onChange={handleChange}
              required
              onInvalid={(e) =>
                e.target.setCustomValidity(
                  "Vui lòng chọn ca tham gia"
                )
              }
            >
              <option value="">Chọn ca</option>
              {sessions.map((session) => (
                <option key={session} value={session}>{session}</option>
              ))}
            </select>
          </div>

          {/* Thanh toán */}
          <div className="mb-3">
            <label className="form-label">Thanh toán</label>
            <select
              className="form-select"
              name="paymentStatus"
              value={registrationData.paymentStatus}
              onChange={handleChange}
              required
              onInvalid={(e) =>
                e.target.setCustomValidity(
                  "Vui lòng chọn trạng thái thanh toán"
                )
              }
            >
              <option value="">Chọn trạng thái</option>
              {paymentStatuses.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          {/* Phí tham dự */}
          <div className="mb-3">
            <label className="form-label">Phí tham dự</label>
            <input
              type="number"
              className="form-control"
              name="fee"
              value={registrationData.fee}
              onChange={handleChange}
              required
              min="50000"
              max="500000"
              onInvalid={(e) =>
                e.target.setCustomValidity(
                  "Phí tham dự phải từ 50.000 đến 500.000 đồng"
                )
              }
            />
          </div>

          {/* Ghi chú */}
          <div className="mb-3">
            <label className="form-label">Ghi chú</label>
            <textarea
              className="form-control"
              rows="3"
              name="note"
              value={registrationData.note}
              onChange={handleChange}
              maxLength="150"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            {editingId ? "Cập nhật đăng ký" : "Thêm đăng ký"}
          </button>

        </form>
      </div>
    </div>

  );
}

export default RegistrationForm;84