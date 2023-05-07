import React, { useEffect, useState, useContext } from "react";
import { Container, Button, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { UserContext } from "../context/userContext";
import { API, setAuthToken } from "../config/api";
import { useQuery } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ModalLogin from "./ModalLogin";
import ModalRegister from "./ModalRegister";
import Profile from "../assets/image/BlankProfile.jpg";
import Logout from "../assets/image/Logout.png";
import IconAddTicket from "../assets/image/more.png";
import Train from "../assets/image/Train.png";
import IconPayment from "../assets/image/bill.png";
import Ticket from "../assets/image/Ticket.png";

export default function Header(props) {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  let { data: profile } = useQuery("profileCache", async () => {
    const response = await API.get(`/profiles`);
    return response.data.data;
  });
  useEffect(() => {
    // Redirect Auth but just when isLoading is false
    if (!isLoading) {
      if (state.isLogin === false) {
        navigate("/");
      }
    }
  }, [isLoading]);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      console.log("check user success : ", response);
      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;
      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
      setIsLoading(false);
    } catch (error) {
      console.log("check user failed : ", error);
      dispatch({
        type: "AUTH_ERROR",
      });
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  const handleShowLogin = () => {
    handleClose(true);
    setShowLogin(true);
  };

  const handleShowRegister = () => {
    handleClose(true);
    setShowRegister(true);
  };

  const logout = () => {
    console.log(state);
    dispatch({
      type: "LOGOUT",
    });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Logout Success",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/");
    // window.location.reload();
  };

  return (
    <>
      <Navbar
        className=""
        style={{
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 3px 20px rgba(0, 0, 0, 0.25)",
          height: "60px",
        }}
      >
        <Container>
          <Navbar.Brand href="/">
            <img src="/images/LandTick.png" alt="LandTick" />
            <img className="ms-2" src="/images/Logo.png" alt="Logo LandTick" />
          </Navbar.Brand>
          <Navbar.Collapse id="">
            {state.isLogin === true ? (
              state.user.role === "admin" ? (
                <Nav className="ms-auto gap-3">
                  <h5
                    className="fw-bold "
                    style={{ color: "#EC7A7A", marginTop: "20px" }}
                  >
                    Admin
                  </h5>
                  <NavDropdown
                    align="end"
                    id="dropdown"
                    title={
                      <img
                        src={Profile}
                        alt=""
                        className="rounded-circle "
                        style={{
                          cursor: "pointer",
                          objectFit: "cover",
                          width: "50px",
                          height: "50px",
                        }}
                      />
                    }
                  >
                    <NavDropdown.Item
                      className="d-flex align-items-center"
                      href="/admin/add-station"
                    >
                      <img
                        src={Train}
                        alt=""
                        style={{ width: "40px", height: "40px" }}
                      />
                      <span className="ms-3 fw-bold">Add Station</span>
                    </NavDropdown.Item>
                    <NavDropdown.Divider style={{ background: "#EC7AB7" }} />
                    <NavDropdown.Item
                      className="d-flex align-items-center"
                      href="/admin/add-ticket"
                    >
                      <img src={IconAddTicket} alt="" />
                      <span className="ms-3 fw-bold">Add Ticket</span>
                    </NavDropdown.Item>
                    <NavDropdown.Divider style={{ background: "#EC7AB7" }} />
                    <NavDropdown.Item
                      className="d-flex align-items-center"
                      href="/admin/list-station"
                    >
                      <img
                        src={Train}
                        alt=""
                        style={{ width: "40px", height: "40px" }}
                      />
                      <span className="ms-3 fw-bold">List Station</span>
                    </NavDropdown.Item>
                    <NavDropdown.Divider style={{ background: "#EC7AB7" }} />
                    <NavDropdown.Item
                      className="d-flex align-items-center"
                      href="/admin/list-ticket"
                    >
                      <img
                        src={Ticket}
                        alt=""
                        style={{ width: "40px", height: "40px" }}
                      />
                      <span className="ms-3 fw-bold">List Ticket</span>
                    </NavDropdown.Item>
                    <NavDropdown.Divider style={{ background: "#EC7AB7" }} />
                    <NavDropdown.Item
                      className="d-flex align-items-center"
                      onClick={logout}
                    >
                      <img src={Logout} style={{ width: "40px" }} alt="" />
                      <span className="ms-3 fw-bold">Logout</span>
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              ) : (
                <Nav className="ms-auto gap-2">
                  <h5
                    className="fw-bold "
                    style={{ color: "#EC7A7A", marginTop: "20px" }}
                  >
                    Hallo, {state.user.username}
                  </h5>
                  <NavDropdown
                    id="dropdown"
                    title={
                      <img
                        src={Profile}
                        alt=""
                        className="rounded-circle   "
                        style={{
                          cursor: "pointer",
                          objectFit: "cover",
                          width: "50px",
                          height: "50px",
                        }}
                      />
                    }
                  >
                    <NavDropdown.Item href="/my-profile  ">
                      <img
                        src={
                          profile?.photo
                            ? `http://localhost:5000/uploads/${profile.photo}`
                            : Profile
                        }
                        alt=""
                        style={{ width: 40, height: 38.17 }}
                      />
                      <span className="ms-2 fw-bold ">My Profile</span>
                    </NavDropdown.Item>
                    <NavDropdown.Divider style={{ background: "#EC7AB7" }} />
                    <NavDropdown.Item href="/my-ticket-approve">
                      <img
                        src={Ticket}
                        alt=""
                        style={{ width: 40, height: 38.17 }}
                      />
                      <span className="ms-2 fw-bold">My Ticket</span>
                    </NavDropdown.Item>
                    <NavDropdown.Divider style={{ background: "#EC7AB7" }} />
                    <NavDropdown.Item href="/payment">
                      <img
                        src={IconPayment}
                        alt=""
                        style={{ width: 40, height: 38.17 }}
                      />
                      <span className="ms-2 fw-bold">Payment</span>
                    </NavDropdown.Item>
                    <NavDropdown.Divider style={{ background: "#EC7AB7" }} />
                    <NavDropdown.Item onClick={logout}>
                      <img
                        src={Logout}
                        alt=""
                        style={{ width: 40, height: 38.17 }}
                      />
                      <span className="ms-2 fw-bold">Logout</span>
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              )
            ) : (
              <Nav className="ms-auto gap-3">
                <NavLink className="text-decoration-none" to="">
                  <Button
                    size="sm"
                    className="fw-bold d-flex justify-content-center align-items-center"
                    variant="outline-light"
                    onClick={handleShowRegister}
                    style={{
                      border: "2px solid #EC7AB7",
                      backgroundColor: "white",
                      fontSize: 20,
                      fontWeight: 700,
                      color: "#EC7AB7",
                      width: "112px",
                      height: "40px",
                    }}
                  >
                    Daftar
                  </Button>
                </NavLink>
                <NavLink className="text-decoration-none" to="">
                  <Button
                    size="sm"
                    className="fw-bold"
                    href=""
                    style={{
                      background:
                        "linear-gradient(90deg, #EC7AB7 -0.6%, #EC7A7A 100%)",
                      fontSize: 20,
                      fontWeight: 700,
                      color: "white",
                      width: "112px",
                      height: "40px",
                    }}
                    variant="outline-light"
                    onClick={handleShowLogin}
                  >
                    Login
                  </Button>
                </NavLink>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <ModalLogin
        show={showLogin}
        onHide={handleClose}
        onClick={handleShowRegister}
      />
      <ModalRegister
        show={showRegister}
        onHide={handleClose}
        onClick={handleShowLogin}
      />
    </>
  );
}
