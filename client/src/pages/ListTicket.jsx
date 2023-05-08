import React, { useState, useContext, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Footer from "../component/Footer";
import ModalDetailTicket from "../component/ModalDetailTicket";
import { useQuery, useMutation } from "react-query";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import DeleteData from "../component/ModalDeleteTransaction";
import Swal from "sweetalert2";

export default function IndexAdmin() {
  const navigate = useNavigate();
  const [state] = useContext(UserContext);
  const [showTicket, setShowTicket] = useState(null);
  // Variabel for delete product data
  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  // Modal Confirm delete data
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // For get id product & show modal confirm delete data
  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

  const handleShowTicket = () => setShowTicket(true);
  const handleCloseTicket = () => setShowTicket(false);

  let { data: ticketList, refetch } = useQuery(
    "allTansactionCache",
    async () => {
      const response = await API.get("/tikets");
      return response.data.data;
    }
  );
  console.log(ticketList);

  // If confirm is true, execute delete data
  const deleteById = useMutation(async (id) => {
    try {
      const response = await API.delete(`/ticket/${id}`);
      console.log(response);
      refetch();
      navigate("/");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Delete Success",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Delete Failed",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    }
  });

  useEffect(() => {
    if (confirmDelete) {
      // Close modal confirm delete data
      handleClose();
      // execute delete data by id function
      deleteById.mutate(idDelete);
      setConfirmDelete(null);
      // window.location.reload();
    }
  }, [confirmDelete]);

  return (
    <>
      <div className="container mt-5">
        <h1>List Ticket</h1>
        <div className="mt-5">
          <Table
            striped
            className="m-auto w-100"
            style={{ border: "none", width: "100%" }}
          >
            <thead className="">
              <tr>
                <th>No</th>
                <th>Train Name</th>
                <th>Train Type</th>
                <th>Start Station</th>
                <th>End Station</th>
              </tr>
            </thead>
            <tbody>
              {ticketList?.map((data, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data.user.fullname}</td>
                    <td>
                      {data.ticket.start_station?.name}
                      {data.ticket.destination_station?.name}
                    </td>
                    {data.status === "pending" && (
                      <td style={{ color: "#FF9900" }}>{data.status}</td>
                    )}
                    {data.status === "success" && (
                      <td style={{ color: "#78A85A" }}>{data.status}</td>
                    )}
                    {data.status === "failed" && (
                      <td style={{ color: "#E83939" }}>{data.status}</td>
                    )}
                    <td className="">
                      <div className="d-flex">
                        <div>
                          <img
                            onClick={handleShowTicket}
                            src="/images/IconSearch.png"
                            alt=""
                            className=""
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                        <div>
                          <img
                            onClick={() => handleDelete(data.id)}
                            src="/images/IconTrash.png"
                            alt=""
                            className="ms-5"
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
      <Footer />
      <ModalDetailTicket show={showTicket} onHide={handleCloseTicket} />
      <DeleteData
        setConfirmDelete={setConfirmDelete}
        show={show}
        handleClose={handleClose}
      />
    </>
  );
}
