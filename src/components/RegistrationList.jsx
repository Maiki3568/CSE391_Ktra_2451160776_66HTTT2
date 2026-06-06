import React from "react";

import RegistrationItem from "./RegistrationItem";

function RegistrationList({
  registrations,
  editRegistration,
  deleteRegistration
}) {

  if (
    registrations.length === 0
  ) {

    return (
      <div className="empty-box">

        <h4>
          Không có dữ liệu
        </h4>

        <p>
          Chưa tìm thấy lượt
          đăng ký nào.
        </p>

      </div>
    );

  }

  return (
    <div className="registration-list">

      {registrations.map(
        (registration) => (

          <RegistrationItem
            key={
              registration.id
            }
            registration={
              registration
            }
            editRegistration={
              editRegistration
            }
            deleteRegistration={
              deleteRegistration
            }
          />

        )
      )}

    </div>
  );
}

export default RegistrationList;