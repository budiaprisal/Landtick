import { useContext, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import User from "../assets/BlankProfile.jpg";
import Email from "../assets/image/Email.png";
import VIP from "../assets/image/VIP Ticket.png";
import Gender from "../assets/image/Gender.png";
import Phone from "../assets/image/Phone.png";
import Place from "../assets/image/Place.png";
import Vektor from "../assets/image/Vector.png";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";
import { useQuery } from "react-query";
import ModalUpdate from "../component/ModalUpdates";

export default function Profile() {
  const [showShipping, setShowShipping] = useState(null);
  const [showSuccess, setShowsuccess] = useState(null);

  const handleShowShipping = () => setShowShipping(true);
  const handleCloseShipping = () => setShowShipping(false);

  const popSuccess = () => {
    setShowsuccess(true);
    setShowShipping(false);
  };

  const [state] = useContext(UserContext);

  const title = "Profile";
  document.title = "Landtix | " + title;

  let { data: profile } = useQuery(
    "profileCache",
    async () => {
      const response = await API.get(`/profile`);
      return response.data.data;
    },
    { refetchInterval: 1000 }
  );

  console.log(profile);

  return (
    <>
      <Container className="mt-1 pt-5 w-50   ">
        <div
          className="rounded"
          style={{ padding: "1px", backgroundColor: "pink" }}
        >
          <div className="d-flex">
            <div>
              <h4 className="text-black fw-bold mt-5 ms-5 mb-4">
                Personal Info
              </h4>
              <div className="ps-5 d-flex align-items-center">
                <div className="mb-3">
                  <img src={Vektor} width="30px" alt="Vektor" />
                </div>
                <div>
                  <p className="text-black fw-semibold ps-3">
                    {state.user.username} <br></br>{" "}
                    <p
                      className="fw-black text-black"
                      style={{ color: "#8A8C90" }}
                    >
                      Fullname
                    </p>
                  </p>
                </div>
              </div>
              <div className="ps-5 d-flex align-items-center">
                <div className="mb-4">
                  <img src={Email} width="30px" alt="Vektor" />
                </div>
                <div>
                  <p className="text-black fw-semibold ps-3">
                    {state.user.email} <br></br>{" "}
                    <p
                      className="fw-black text-black"
                      style={{ color: "#8A8C90" }}
                    >
                      Email
                    </p>
                  </p>
                </div>
              </div>
            </div>
            <div className="d-grid  p-2 mb-4   w-25 m-auto ">
              <img
                src={profile?.photo ? `${profile.photo}` : User}
                className="mt-2 rounded-2  "
                style={{ objectFit: "cover" }}
                width="200px"
                height="270px"
                alt="Profile"
              />
              <Button
                className="border-0 mt-3"
                type="submit"
                onClick={handleShowShipping}
                style={{ backgroundColor: "#E50914" }}
              >
                Change Photo Profile
              </Button>
            </div>
          </div>
        </div>
      </Container>
      <ModalUpdate
        show={showShipping}
        onHide={handleCloseShipping}
        handleSuccess={popSuccess}
      />
    </>
  );
}
