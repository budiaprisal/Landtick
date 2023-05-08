import React, { useContext, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { UserContext } from "../context/userContext";
import { useQuery } from "react-query";
import { API } from "../config/api";
import ticket from "../assets/ticket.png";
import moment from "moment";
import { ConvertFormatDate } from "../utils";
import { useNavigate } from "react-router-dom";

export default function MyTicket() {
  const navigate = useNavigate();
  const [state] = useContext(UserContext);

  let { data: myTicket } = useQuery("myTicketCache", async () => {
    const response = await API.get("/order-user");
    return response.data.data;
  });
  console.log(myTicket);

  const handlePayment = async (id) => {
    try {
      const response = await API.get(`/get-idpayment/${id}`, {
        headers: {
          Authorization: `Bearer ${state.user.token}`,
        },
      });
      navigate("/payment");
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Card className="mt-2 rounded-none shadow-none border-0 ml-20">
        <h1
          className="fw-bold"
          style={{ marginTop: "68px", marginLeft: "120px" }}
        >
          My Ticket
        </h1>
        {myTicket === null ? (
          <div>
            <h2 className="text-center text-danger fw-bold">
              Tiket Not Found.
            </h2>
            <div className="d-flex justify-content-center align-items-center">
              <img src={ticket} alt="" className="mt-3 w-50 h-52" />
            </div>
          </div>
        ) : (
          <div>
            {myTicket?.map((item, index) => (
              <Card
                key={index}
                className=""
                style={{
                  width: "1035px",
                  height: "344px",
                  marginTop: "33px",
                  marginLeft: "165.50px",
                }}
              >
                <div className="">
                  <div>
                    <img
                      className="position-absolute ms-4 my-auto"
                      src="/images/Land.png"
                      alt="Logo"
                    />
                    <img src="/images/Vector.png" alt="Rectangle" />
                  </div>
                  <div
                    className="text-end position-absolute"
                    style={{ marginLeft: "750px" }}
                  >
                    <h1>Kereta Api</h1>
                    <h5 className="text-secondary">
                      {ConvertFormatDate(item?.ticket.start_date)}
                    </h5>
                    <img
                      className="me-5 mt-3"
                      src="/images/Barcode.png"
                      alt=""
                    />
                    <p className="me-5 mt-3">INV0101</p>
                  </div>
                  <div className="d-flex">
                    <div>
                      <h1 className="ms-5 mt-5 fw-bold">
                        {item?.ticket.train_name}
                      </h1>
                      <h5 className="ms-5 mt-3">{item?.ticket.train_type}</h5>
                      <div
                        className="font-size-14px text-center rounded ms-5 mt-3"
                        style={{
                          width: "69px",
                          height: "24px",
                          color: "#78A85A",
                          backgroundColor: "rgba(120,168,90,0.125)",
                        }}
                      >
                        Success
                      </div>
                    </div>
                    <div className="mt-5 ms-5">
                      <div
                        className="rounded-circle"
                        style={{
                          width: "16px",
                          height: "16px",
                          border: "2px solid #EC7AB7",
                        }}
                      ></div>
                      <div
                        className="ms-2 mt-3 border-start border-2"
                        style={{ width: "0px", height: "50px" }}
                      ></div>
                      <div
                        className="rounded-circle mt-3"
                        style={{
                          width: "16px",
                          height: "16px",
                          backgroundColor: "#EC7AB7",
                        }}
                      ></div>
                    </div>
                    <div className="ms-3 mt-4">
                      <div>
                        <h5 className="fw-bold">{item?.ticket.start_time}</h5>
                        <h5 className="text-secondary">
                          {moment(item?.ticket.start_date).format("LL")}
                        </h5>
                      </div>
                      <div className="mt-5">
                        <h5 className="fw-bold">{item?.ticket.arrival_time}</h5>
                        <h5 className="text-secondary">
                          {moment(item?.ticket.start_date).format("LL")}
                        </h5>
                      </div>
                    </div>
                    <div className="ms-5 mt-4">
                      <div>
                        <h5 className="fw-bold">
                          {item?.ticket.start_station.kota}
                        </h5>
                        <h5 className="text-secondary">
                          {item?.ticket.start_station.name}
                        </h5>
                      </div>
                      <div className="mt-5">
                        <h5 className="fw-bold">
                          {item?.ticket.destination_station.kota}
                        </h5>
                        <h5 className="text-secondary">
                          {item?.ticket.destination_station.name}
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex">
                    <table class=" ms-3 mt-4 border-1 border-dark">
                      <thead className="">
                        <tr className="border-bottom border-2">
                          <th>No. Tanda Pengenal</th>
                          <th>Nama Pemesan</th>
                          <th>No. Handphone</th>
                          <th>Email</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td></td>
                        </tr>
                        <tr>
                          <td className="text-secondary">{item?.id}</td>
                          <td className="text-secondary">
                            {state.user.username}
                          </td>
                          <td className="text-secondary">{item?.user.phone}</td>
                          <td className="text-secondary">{item?.user.email}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div>
                      <Button
                        onClick={() => handlePayment(item.id)}
                        className="mt-5 ms-4 me-3"
                        variant="outline-light text-white fw-bold"
                        style={{
                          width: "206px",
                          height: "40px",
                          background:
                            "linear-gradient(90deg, #EC7AB7 -0.6%, #EC7A7A 100%)",
                        }}
                      >
                        Pay Now
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Card>
    </>
  );
}
