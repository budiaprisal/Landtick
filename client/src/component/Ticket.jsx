import React, { useState, useContext } from "react";
import { Card } from "react-bootstrap";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";
import { useQuery } from "react-query";
import ModalLogin from "./ModalLogin";
import { useNavigate } from "react-router";
import ModalSuccess from "../component/ModalSuccessTicket";

export default function Ticket({ filteredTickets }) {
  let navigate = useNavigate();
  const [state] = useContext(UserContext);
  const [showLogin, setShowLogin] = useState(false);
  const [showSuccess, setShowsuccess] = useState(false);

  const handleCloseSuccess = () => {
    setShowsuccess(false);
    navigate("/my-ticket");
  };

  const popSuccess = () => {
    setShowsuccess(true);
  };

  const handleClose = () => {
    setShowLogin(false);
  };

  let { data: tickets } = useQuery("ticketCache", async () => {
    const response = await API.get("/tickets");
    return response.data.data;
  });

  const formatRupiah = (money) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(money);
  };

  const HandleBuy = async (id) => {
    try {
      const response = await API.post(`/create-trans/${id}`);
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  function toMinutes(time) {
    time = /^(\d{1,2}):(\d{2})$/.exec(time);
    return time[1] * 60 + +time[2];
  }

  function timeConvert(n) {
    var num = n;
    var hours = num / 60;
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + " Jam " + rminutes + " menit";
  }

  if (filteredTickets !== undefined && filteredTickets.length > 0) {
    return (
      <>
        {tickets < 1 ? (
          <h5 className="mt-5 d-flex justify-content-center fw-bold">Admin Has Not Added Tickets</h5>
        ) : (
          <>
            {filteredTickets?.map((ticket, index) => (
              <Card
                key={index}
                className="my-5 shadow"
                style={{ marginTop: "20px", width: "1220px", height: "100px", marginLeft: "60px", cursor: "pointer" }}
                onClick={() => {
                  state.isLogin === false ? setShowLogin(true) : setShowsuccess(true);
                  HandleBuy(ticket.id);
                }}
              >
                <div className="d-flex justify-content-around mt-3">
                  <div className="ms-5">
                    <h5 className="fw-bold">{ticket.train_name}</h5>
                    <h5 className="text-secondary">{ticket.train_type}</h5>
                  </div>
                  <div className="">
                    <h5 className="fw-bold">{ticket.start_time}</h5>
                    <h5 className="text-secondary">{ticket.StartStation.name}</h5>
                  </div>
                  <div className="flex align-items-center justify-content-center">
                    <img src="/images/Arrow.png" alt="" className="" style={{ marginLeft: "0px" }} />
                  </div>
                  <div>
                    <h5 className="fw-bold">{ticket.arrival_time}</h5>
                    <h5 className="text-secondary">{ticket.EndStation.name}</h5>
                  </div>
                  <div>
                    <h5 className="fw-bold">{timeConvert(
                      toMinutes(ticket?.start_time, ticket?.arrival_time)
                    )}</h5>
                  </div>
                  <div>
                    <h5 className="fw-bold text-danger">{formatRupiah(ticket.price)}</h5>
                  </div>
                </div>
              </Card>
            ))}

            {showSuccess && <ModalSuccess show={showSuccess} onHide={handleCloseSuccess} handleSuccess={popSuccess} />}
            {showLogin && <ModalLogin show={showLogin} setShow={setShowLogin} onHide={handleClose} />}
          </>
        )}
      </>
    );
  } else {
    {
      // return all tickets
    }
    return (
      <>
        {tickets < 1 ? (
          <h5 className="mt-5 d-flex justify-content-center fw-bold">Admin Has Not Added Tickets</h5>
        ) : (
          <>
            {tickets?.map((ticket, index) => (
              <Card
                key={index}
                className="my-5 shadow"
                style={{ marginTop: "20px", width: "1220px", height: "100px", marginLeft: "60px", cursor: "pointer" }}
                onClick={() => {
                  state.isLogin === false ? setShowLogin(true) : setShowsuccess(true);
                  HandleBuy(ticket.id);
                }}
              >
                <div className="d-flex justify-content-around mt-3">
                  <div className="ms-5">
                    <h5 className="fw-bold">{ticket.train_name}</h5>
                    <h5 className="text-secondary">{ticket.train_type}</h5>
                  </div>
                  <div className="">
                    <h5 className="fw-bold">{ticket.start_time}</h5>
                    <h5 className="text-secondary">{ticket.StartStation.name}</h5>
                  </div>
                  <div className="flex align-items-center justify-content-center">
                    <img src="/images/Arrow.png" alt="" className="" style={{ marginLeft: "0px" }} />
                  </div>
                  <div>
                    <h5 className="fw-bold">{ticket.arrival_time}</h5>
                    <h5 className="text-secondary">{ticket.EndStation.name}</h5>
                  </div>
                  <div>
                    <h5 className="fw-bold">{timeConvert(
                      toMinutes(ticket?.start_time, ticket?.arrival_time)
                    )}</h5>
                  </div>
                  <div>
                    <h5 className="fw-bold text-danger">{formatRupiah(ticket.price)}</h5>
                  </div>
                </div>
              </Card>
            ))}

            {showSuccess && <ModalSuccess show={showSuccess} onHide={handleCloseSuccess} handleSuccess={popSuccess} />}
            {showLogin && <ModalLogin show={showLogin} setShow={setShowLogin} onHide={handleClose} />}
          </>
        )}
      </>
    );
  }
}
