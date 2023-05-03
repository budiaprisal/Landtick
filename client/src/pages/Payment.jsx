import React, { useEffect, useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { API } from "../config/api";
import Moment from "react-moment";
import moment from "moment";
import { ConvertFormatDate } from "../utils";

export default function Payment() {
  const [state] = useContext(UserContext);
  const dateTime = new Date();
  const navigate = useNavigate();
  let { data: myTicket } = useQuery("myTicket", async () => {
    const response = await API.get("/order-user");
    const ubah = response.data.data.length - 1;
    // let length = response.data.data
    console.log("length", ubah);
    return response.data.data;
  });
  console.log("response tiket", myTicket);

  const formatRupiah = (money) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(money);
  };

  const handlePay = useMutation(async (id) => {
    console.log(id);
    try {
      const response = await API.get(`/payments/${id}`);
      const token = response.data.data.token;
      console.log("ini token midtrans", token);
      console.log("response untuk midtrans", response);

      window.snap.pay(token, {
        onSuccess: function (result) {
          console.log(result);
          navigate("/");
        },
        onPending: function (result) {
          console.log(result);
        },
        onError: function (result) {
          console.log(result);
        },
        onClose: function () {
          alert("you closed the popup without finishing the payment");
        },
      });
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return (
    <>
      <div className="">
        {myTicket?.map((ticket, index) => {
          console.log(ticket);
          return (
            <>
              <div className="ms-5 mt-5 d-flex">
                <div className="">
                  <h1>Invoice</h1>
                  <div className="">
                    <Card style={{ background: "#EEEEEE", width: "796px", height: "154px" }}>
                      <div className="d-flex">
                        <div className="ms-5 mt-5">
                          <img src="/images/error.png" alt="" />
                        </div>
                        <div className="ms-5 mt-5">
                          <p>Silakan melakukan pembayaran memalui M-Banking, E-Banking dan ATM Ke No.rek Yang Tertera.</p>
                        </div>
                      </div>
                    </Card>
                    <Card style={{ marginTop: "24px", width: "796px", height: "154px" }}>
                      <div>
                        <img className="position-absolute ms-4 my-auto" src="/images/Land.png" alt="Logo" />
                        <img src="/images/Vector.png" alt="Rectangle" />
                      </div>
                      <div>
                        <table class="mt-5 border-1 border-dark w-100">
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
                              <td className="text-secondary">{ticket.id}</td>
                              <td className="text-secondary">{ticket.user.fullname}</td>
                              <td className="text-secondary">{ticket.user.phone}</td>
                              <td className="text-secondary">{ticket.user.email}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </Card>
                    <div className="d-flex">
                      <div className="mt-3">
                        <h2>Rincian Harga</h2>
                        <Card style={{ width: "446px", height: "137px" }}>
                          <div className="d-flex my-auto justify-content-between">
                            <h5 className="ms-5">
                            {ticket?.ticket.train_name} (Adult) x 1{ticket?.ticket.qty}
                            </h5>
                            <h5 className="me-5">{formatRupiah(ticket.ticket.price)}</h5>
                          </div>
                          {/* <div className="d-flex my-auto justify-content-between">
                            <h5 className="ms-5">
                            {ticket?.ticket.train_name} (Childrens) x 1{ticket?.ticket.qty}
                            </h5>
                            <h5 className="me-5">{formatRupiah(ticket.ticket.price)}</h5>
                          </div> */}
                          <div className="d-flex justify-content-between" style={{ background: "#E6E6E6" }}>
                            <h5 className="ms-5 mt-2">Total</h5>
                            <h5 className="fw-bold me-5 mt-2">{formatRupiah(ticket.ticket.price)}</h5>
                          </div>
                        </Card>
                        <Button
                          onClick={() => handlePay.mutate(ticket?.id)}
                          type="submit"
                          variant="outline-light"
                          className="fw-bold mt-3 mb-5"
                          style={{ width: "446px", height: "auto", background: "linear-gradient(90deg, #EC7AB7 -0.6%, #EC7A7A 100%)" }}
                        >
                          Bayar Sekarang
                        </Button>
                      </div>
                      <div className="ms-5 mt-5">
                        <div className="">
                          <img src="/images/Placeholder.webp" alt="" style={{ width: "215px", height: "215px" }} />
                          <p className="text-center text-secondary mt-2">upload payment proof</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ms-3 mt-5" style={{ background: "#F5F5F5", width: "447px", height: "414px" }}>
                  <div style={{ background: "#D0D0D0", width: "447px", height: "115px" }}>
                    <div className="d-flex justify-content-between">
                      <div className="mt-3 ms-4">
                        <h1 className="fw-bold">Kereta Api</h1>
                        <h5 className="text-sm font-semibold text-secondary">
                          <Moment format="dddd" className="fw-bold text-secondary">
                            {dateTime}
                          </Moment>
                          ,{" "}
                          <Moment className="text-secondary" format="D MMM YYYY">
                            {dateTime}
                          </Moment>
                        </h5>
                      </div>
                      <div className="mt-4 me-3">
                        <img src="/images/Barcode.png" alt="" />
                        <p>INV0101</p>
                      </div>
                    </div>
                  </div>
                  <div className="ms-4 mt-3">
                    <div>
                      <h3 className="fw-bold">{ticket.train_name}</h3>
                      <p className="text-secondary">{ticket.train_type}</p>
                    </div>
                    <div className="d-flex">
                      <div className="mt-5">
                        <div className="rounded-circle" style={{ width: "16px", height: "16px", border: "2px solid #EC7AB7" }}></div>
                        <div className="ms-2 mt-3 border-start border-2" style={{ width: "0px", height: "50px" }}></div>
                        <div className="rounded-circle mt-3" style={{ width: "16px", height: "16px", backgroundColor: "#EC7AB7" }}></div>
                      </div>
                      <div className="ms-4 mt-4">
                        <div>
                          <h5 className="fw-bold">{ticket?.ticket.start_time}</h5>
                          <h5 className="text-secondary">{moment(ticket.ticket.start_date).format("LL")}</h5>
                        </div>
                        <div className="mt-5">
                          <h5 className="fw-bold">{ticket?.ticket.arrival_time}</h5>
                          <h5 className="text-secondary">{moment(ticket.ticket.start_date).format("LL")}</h5>
                        </div>
                      </div>
                      <div className="ms-4 mt-4">
                        <div>
                          <h5 className="fw-bold">{ticket?.ticket.start_station.kota}</h5>
                          <h5 className="text-secondary">{ticket?.ticket.start_station.name}</h5>
                        </div>
                        <div className="mt-5">
                          <h5 className="fw-bold">{ticket?.ticket.destination_station.kota}</h5>
                          <h5 className="text-secondary">{ticket?.ticket.destination_station.name}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
