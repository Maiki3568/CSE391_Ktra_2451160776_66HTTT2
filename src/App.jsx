import React, {
  useState,
  useEffect,
  useMemo,
  useCallback
} from "react";

import SummaryBox from "./components/SummaryBox";
import FilterPanel from "./components/FilterPanel";
import RegistrationForm from "./components/RegistrationForm";
import RegistrationList from "./components/RegistrationList";

import {
  demoRegistrations
} from "./data/demoRegistrations";

import "./App.css";

function App() {

  const [registrations, setRegistrations] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [registrationData, setRegistrationData] = useState({
    code: "",
    fullName: "",
    email: "",
    phone: "",
    topic: "",
    mode: "",
    date: "",
    session: "",
    paymentStatus: "",
    fee: "",
    note: ""
  });

  const [modeFilter, setModeFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [keyword, setKeyword] = useState("");

  /* LOAD DATA */

  useEffect(() => {

    try {

      const storedData = localStorage.getItem(
        "workshopRegistrations"
      );

      if (storedData) {

        const parsedData = JSON.parse(
          storedData
        );

        if (
          Array.isArray(parsedData) &&
          parsedData.length > 0
        ) {
          setRegistrations(parsedData);
        } else {
          setRegistrations(
            demoRegistrations
          );
        }

      } else {
        setRegistrations(
          demoRegistrations
        );
      }

    } catch (error) {

      console.error(error);

      setRegistrations(
        demoRegistrations
      );

    }

  }, []);

  /* SAVE DATA */

  useEffect(() => {

    localStorage.setItem(
      "workshopRegistrations",
      JSON.stringify(registrations)
    );

  }, [registrations]);

  /* THỐNG KÊ */

  const totalRegistrations = useMemo(() => {
    return registrations.length;
  }, [registrations]);

  const totalOnline = useMemo(() => {
    return registrations.filter(
      (item) => item.mode === "Online"
    ).length;
  }, [registrations]);

  const totalPaid = useMemo(() => {
    return registrations.filter(
      (item) =>
        item.paymentStatus ===
        "Đã thanh toán"
    ).length;
  }, [registrations]);

  /* THÊM - SỬA */

  const saveRegistration = () => {

    const bannedWords = [
      "hack",
      "spam",
      "test123"
    ];

    const note =
      registrationData.note.toLowerCase();

    let hasBannedWord = false;

    for (
      let i = 0;
      i < bannedWords.length;
      i++
    ) {

      if (
        note.includes(
          bannedWords[i]
        )
      ) {
        hasBannedWord = true;
      }

    }

    if (hasBannedWord) {
      alert("Ghi chú chứa từ cấm.");
      return;
    }

    let duplicated = false;

    registrations.forEach((item) => {

      if (
        item.code ===
          registrationData.code &&
        item.id !== editingId
      ) {
        duplicated = true;
      }

    });

    if (duplicated) {
      alert("Mã đăng ký đã tồn tại.");
      return;
    }

    if (editingId) {

      setRegistrations(

        registrations.map((item) => {

          if (
            item.id === editingId
          ) {

            return {
              ...registrationData,
              id: editingId
            };

          }

          return item;

        })

      );

    } else {

      const newItem = {
        ...registrationData,
        id: Date.now()
      };

      setRegistrations([
        ...registrations,
        newItem
      ]);

    }

    setEditingId(null);

    setRegistrationData({
      code: "",
      fullName: "",
      email: "",
      phone: "",
      topic: "",
      mode: "",
      date: "",
      session: "",
      paymentStatus: "",
      fee: "",
      note: ""
    });

  };

  /* XÓA */

  const deleteRegistration =
    useCallback((id) => {

      const confirmed =
        window.confirm(
          "Bạn có chắc muốn xóa?"
        );

      if (confirmed) {

        setRegistrations(

          registrations.filter(
            (item) =>
              item.id !== id
          )

        );

      }

    }, [registrations]);

  /* EDIT */

  const editRegistration =
    useCallback((registration) => {

      setEditingId(
        registration.id
      );

      setRegistrationData(
        registration
      );

    }, []);

  /* FILTER */

  const filteredRegistrations =
    useMemo(() => {

      return registrations.filter(
        (item) => {

          let modeMatch = true;

          if (
            modeFilter !== "all"
          ) {
            modeMatch =
              item.mode === modeFilter;
          }

          let paymentMatch = true;

          if (
            paymentFilter !== "all"
          ) {
            paymentMatch =
              item.paymentStatus ===
              paymentFilter;
          }

          let keywordMatch = true;

          if (
            keyword.trim()
          ) {

            keywordMatch =

              item.fullName
                .toLowerCase()
                .includes(
                  keyword.toLowerCase()
                ) ||

              item.code
                .toLowerCase()
                .includes(
                  keyword.toLowerCase()
                );

          }

          return (
            modeMatch &&
            paymentMatch &&
            keywordMatch
          );

        }
      );

    }, [
      registrations,
      modeFilter,
      paymentFilter,
      keyword
    ]);

  /* RESET DEMO */

  const restoreDemoData = () => {

    const confirmed =
      window.confirm(
        "Khôi phục dữ liệu mẫu?"
      );

    if (confirmed) {

      localStorage.removeItem(
        "workshopRegistrations"
      );

      setRegistrations(
        demoRegistrations
      );

    }

  };

  return (

    <div className="page-wrapper">

      <div className="container custom-container">

        <h2 className="main-title">
          Quản lý đăng ký hội thảo
        </h2>

        <div className="text-end mb-3">

          <button
            className="btn btn-outline-primary"
            onClick={restoreDemoData}
          >
            Khôi phục dữ liệu mẫu
          </button>

        </div>

        <SummaryBox
          totalRegistrations={
            totalRegistrations
          }
          totalOnline={
            totalOnline
          }
          totalPaid={
            totalPaid
          }
        />

        <FilterPanel
          keyword={keyword}
          setKeyword={setKeyword}
          modeFilter={modeFilter}
          setModeFilter={setModeFilter}
          paymentFilter={paymentFilter}
          setPaymentFilter={
            setPaymentFilter
          }
        />

        <div className="row">

          <div className="col-lg-4">

            <RegistrationForm
              registrationData={
                registrationData
              }
              setRegistrationData={
                setRegistrationData
              }
              saveRegistration={
                saveRegistration
              }
              editingId={editingId}
            />

          </div>

          <div className="col-lg-8">

            <RegistrationList
              registrations={
                filteredRegistrations
              }
              editRegistration={
                editRegistration
              }
              deleteRegistration={
                deleteRegistration
              }
            />

          </div>

        </div>

      </div>

    </div>

  );

}

export default App;