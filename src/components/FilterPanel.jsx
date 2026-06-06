import React from "react";

function FilterPanel({
  keyword,
  setKeyword,
  modeFilter,
  setModeFilter,
  paymentFilter,
  setPaymentFilter
}) {

  return (
    <div className="filter-panel">

      <div className="row">

        <div className="col-md-4 mb-3">

          <label className="form-label">
            Tìm kiếm
          </label>

          <input
            type="text"
            className="form-control"
            placeholder="Nhập mã hoặc họ tên..."
            value={keyword}
            onChange={(e) =>
              setKeyword(
                e.target.value
              )
            }
          />

        </div>

        <div className="col-md-4 mb-3">

          <label className="form-label">
            Hình thức
          </label>

          <select
            className="form-select"
            value={modeFilter}
            onChange={(e) =>
              setModeFilter(
                e.target.value
              )
            }
          >
            <option value="all">
              Tất cả
            </option>

            <option value="Online">
              Online
            </option>

            <option value="Offline">
              Offline
            </option>

          </select>

        </div>

        <div className="col-md-4 mb-3">

          <label className="form-label">
            Thanh toán
          </label>

          <select
            className="form-select"
            value={paymentFilter}
            onChange={(e) =>
              setPaymentFilter(
                e.target.value
              )
            }
          >
            <option value="all">
              Tất cả
            </option>

            <option value="Đã thanh toán">
              Đã thanh toán
            </option>

            <option value="Chưa thanh toán">
              Chưa thanh toán
            </option>

          </select>

        </div>

      </div>

    </div>
  );
}

export default FilterPanel;