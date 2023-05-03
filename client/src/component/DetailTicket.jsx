import React, { useContext } from "react";
import { useQuery } from "react-query";
import { API } from "../config/api";
import moment from "moment";
import { ConvertFormatDate } from "../utils";
import { UserContext } from "../context/userContext";

export default function DetailTicket() {
  const [state] = useContext(UserContext);
  let { data: transactionList } = useQuery("allTansactionCache", async () => {
    const response = await API.get("/transactions");
    return response.data.data;
  });
  console.log(transactionList);

  const formatRupiah = (money) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(money);
  };

  return (
    <>
      {state.user.role === "admin" ? (
        <div>
          {transactionList
        ?.filter((transaction) => transaction.user_id === state.user.id)
        ?.map((data, index) => {
          return (
            <div key={index}>
              <div>
                <h1 className="fw-bold">INVOICE</h1>
                <p>Kode Invoice : INV0101</p>
              </div>
              <div className="d-flex">
                <div>
                  <div className="d-flex mt-5">
                    <div>
                      <h4 className="fw-bold">Kereta Api</h4>
                      <p className="text-secondary">{ConvertFormatDate(data?.ticket.start_date)}</p>
                    </div>
                    <div className="ms-5">
                      <img src="/images/Barcode.png" alt="" />
                      <p>TCK0101</p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <h4 className="fw-bold">{data.ticket.start_station.name}</h4>
                      <p>{data?.ticket.train_type}</p>
                    </div>
                    <div className="d-flex">
                      <div className="mt-5">
                        <div className="rounded-circle" style={{ width: "16px", height: "16px", border: "2px solid #EC7AB7" }}></div>
                        <div className="ms-2 mt-3 border-start border-2" style={{ width: "0px", height: "50px" }}></div>
                        <div className="rounded-circle mt-3" style={{ width: "16px", height: "16px", backgroundColor: "#EC7AB7" }}></div>
                      </div>
                      <div className="ms-3 mt-4">
                        <div>
                          <h5 className="fw-bold">{data?.ticket.start_time}</h5>
                          <h5 className="text-secondary">{moment(data?.ticket.start_date).format("LL")}</h5>
                        </div>
                        <div className="mt-5">
                          <h5 className="fw-bold">{data?.ticket.arrival_time}</h5>
                          <h5 className="text-secondary">{moment(data?.ticket.start_date).format("LL")}</h5>
                        </div>
                      </div>
                      <div className="ms-5 mt-4">
                        <div>
                          <h5 className="fw-bold">{data?.ticket.start_station.kota}</h5>
                          <h5 className="text-secondary">{data?.ticket.start_station.name}</h5>
                        </div>
                        <div className="mt-5">
                          <h5 className="fw-bold">{data?.ticket.destination_station.kota}</h5>
                          <h5 className="text-secondary">{data?.ticket.destination_station.name}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ms-5">
                  <img src="/images/Placeholder.webp" alt="" style={{ width: "220px", height: "250px" }} />
                  <p className="text-center text-secondary">upload payment proof</p>
                </div>
              </div>

              <table class="mt-3 border-top border-bottom border-1 border-dark w-100">
                <thead>
                  <tr>
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
                    <td className="text-secondary">{data?.id}</td>
                    <td className="text-secondary">{data?.user.fullname}</td>
                    <td className="text-secondary">{data?.user.phone}</td>
                    <td className="text-secondary">{data?.user.email}</td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-3" style={{ background: "#E6E6E6" }}>
                <div className="d-flex justify-content-between align-items-center py-3">
                  <h5 className="ms-3 mb-0 fw-bold">Total</h5>
                  <h5 className="me-3 mb-0 text-danger fw-bold">{formatRupiah(data.ticket.price)}</h5>
                </div>
              </div>
            </div>
          );
        })}
        </div>
      ) : (
        <div>
          {transactionList
        ?.filter((transaction) => transaction.user_id === state.user.id)
        ?.map((data, index) => {
          return (
            <div key={index}>
              <div>
                <h1 className="fw-bold">INVOICE</h1>
                <p>Kode Invoice : INV0101</p>
              </div>
              <div className="d-flex">
                <div>
                  <div className="d-flex mt-5">
                    <div>
                      <h4 className="fw-bold">Kereta Api</h4>
                      <p className="text-secondary">{ConvertFormatDate(data?.ticket.start_date)}</p>
                    </div>
                    <div className="ms-5">
                      <img src="/images/Barcode.png" alt="" />
                      <p>TCK0101</p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <h4 className="fw-bold">{data.ticket.start_station.name}</h4>
                      <p>{data?.ticket.train_type}</p>
                    </div>
                    <div className="d-flex">
                      <div className="mt-5">
                        <div className="rounded-circle" style={{ width: "16px", height: "16px", border: "2px solid #EC7AB7" }}></div>
                        <div className="ms-2 mt-3 border-start border-2" style={{ width: "0px", height: "50px" }}></div>
                        <div className="rounded-circle mt-3" style={{ width: "16px", height: "16px", backgroundColor: "#EC7AB7" }}></div>
                      </div>
                      <div className="ms-3 mt-4">
                        <div>
                          <h5 className="fw-bold">{data?.ticket.start_time}</h5>
                          <h5 className="text-secondary">{moment(data?.ticket.start_date).format("LL")}</h5>
                        </div>
                        <div className="mt-5">
                          <h5 className="fw-bold">{data?.ticket.arrival_time}</h5>
                          <h5 className="text-secondary">{moment(data?.ticket.start_date).format("LL")}</h5>
                        </div>
                      </div>
                      <div className="ms-5 mt-4">
                        <div>
                          <h5 className="fw-bold">{data?.ticket.start_station.kota}</h5>
                          <h5 className="text-secondary">{data?.ticket.start_station.name}</h5>
                        </div>
                        <div className="mt-5">
                          <h5 className="fw-bold">{data?.ticket.destination_station.kota}</h5>
                          <h5 className="text-secondary">{data?.ticket.destination_station.name}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ms-5">
                  <img src="/images/Placeholder.webp" alt="" style={{ width: "220px", height: "250px" }} />
                  <p className="text-center text-secondary">upload payment proof</p>
                </div>
              </div>

              <table class="mt-3 border-top border-bottom border-1 border-dark w-100">
                <thead>
                  <tr>
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
                    <td className="text-secondary">{data?.id}</td>
                    <td className="text-secondary">{data?.user.fullname}</td>
                    <td className="text-secondary">{data?.user.phone}</td>
                    <td className="text-secondary">{data?.user.email}</td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-3" style={{ background: "#E6E6E6" }}>
                <div className="d-flex justify-content-between align-items-center py-3">
                  <h5 className="ms-3 mb-0 fw-bold">Total</h5>
                  <h5 className="me-3 mb-0 text-danger fw-bold">{formatRupiah(data.ticket.price)}</h5>
                </div>
              </div>
            </div>
          );
        })}
        </div>
      )}
      
    </>
  );
}
