import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import { useMutation } from "react-query";
import { API } from "../config/api";
import Swal from "sweetalert2";

export const Register = (props) => {
  // const title = "Home"
  // document.title = "Waysbeans | " + title;

  const [formRegister, setFormRegister] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    gender: "",
    phone: "",
    address: "",
  });

  const { fullName, userName, email, password, gender, phone, address } = formRegister;

  const onChangeHandler = (e) => {
    setFormRegister({
      ...formRegister,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.post("/register", formRegister);

      console.log("register success : ", response);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Register Success",
        showConfirmButton: false,
        timer: 1500,
      });
      setFormRegister({
        fullname: "",
        username: "",
        email: "",
        password: "",
        gender: "",
        phone: "",
        address: "",
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Register Failed",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log("register failed : ", error);
    }

    props.onHide();
  });

  // const onSubmitHandler = (e) => {
  //   e.preventDefault();
  //   console.log(formRegister);

  //   const dataUsers = JSON.parse(localStorage.getItem("users"));
  //   console.log(dataUsers);

  //   if (dataUsers === null) {
  //     localStorage.setItem("users", JSON.stringify([formRegister]));
  //   } else {
  //     dataUsers.push(formRegister);
  //     localStorage.setItem("users", JSON.stringify(dataUsers));
  //   }

  //   props.onHide();
  // };

  return (
    <Modal show={props.show} onHide={props.onHide} aria-labelledby="contained-modal-title-vcenter" centered>
      <div className="px-5 pb-3">
        <p className="fs-3 fw-bold text-center" style={{ color: "#EC7AB7", paddingTop: 45 }}>
          Register
        </p>
        <Form className="mt-4" onSubmit={(e) => handleSubmit.mutate(e)}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              className="p-2 mb-3"
              type="text"
              required
              name="fullName"
              value={fullName}
              placeholder="Nama Lengkap"
              onChange={onChangeHandler}
              style={{
                textColor: "#B1B1B1",
                backgroundColor: "rgba(97, 61, 43, 0.25)",
                border: "2px solid #B1B1B1",
              }}
            />

            <Form.Control
              className="p-2 mb-3"
              type="text"
              required
              name="userName"
              value={userName}
              placeholder="Username"
              onChange={onChangeHandler}
              style={{
                textColor: "#B1B1B1",
                backgroundColor: "rgba(97, 61, 43, 0.25)",
                border: "2px solid #B1B1B1",
              }}
            />

            <Form.Control
              className="p-2 mb-3"
              type="email"
              required
              name="email"
              value={email}
              placeholder="Email"
              onChange={onChangeHandler}
              style={{
                textColor: "#B1B1B1",
                backgroundColor: "rgba(97, 61, 43, 0.25)",
                border: "2px solid #B1B1B1",
              }}
            />

            <Form.Control
              className="p-2 mb-3"
              required
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={onChangeHandler}
              style={{
                textColor: "#B1B1B1",
                backgroundColor: "rgba(97, 61, 43, 0.25)",
                border: "2px solid #B1B1B1",
              }}
            />

            <Form.Select
              className="p-2 mb-3"
              required
              type="text"
              name="gender"
              value={gender}
              placeholder="Gender"
              onChange={onChangeHandler}
              style={{
                textColor: "#B1B1B1",
                backgroundColor: "rgba(97, 61, 43, 0.25)",
                border: "2px solid #B1B1B1",
              }}
            >
              <option hidden>Gender</option>
              <option value="Laki - laki">Laki - laki</option>
              <option value="Perempuan">Perempuan</option>
            </Form.Select>

            <Form.Control
              className="p-2 mb-3"
              required
              type="number"
              name="phone"
              value={phone}
              placeholder="Nomor Telephone"
              onChange={onChangeHandler}
              style={{
                textColor: "#B1B1B1",
                backgroundColor: "rgba(97, 61, 43, 0.25)",
                border: "2px solid #B1B1B1",
              }}
            />

            <Form.Control
              className="p-2 mb-3"
              required
              type="text"
              name="address"
              value={address}
              placeholder="Alamat Lengkap"
              onChange={onChangeHandler}
              style={{
                textColor: "#B1B1B1",
                backgroundColor: "rgba(97, 61, 43, 0.25)",
                border: "2px solid #B1B1B1",
              }}
            />
          </Form.Group>

          <Button type="submit" className="fw-bold border-0 w-100 py-2 mt-3" style={{ background: "linear-gradient(180deg, #EC7AB7 0%, #EC7A7A 100%)", borderRadius: "50px" }}>
            Register
          </Button>
        </Form>

        <p className="text-center mt-3">
          Sudah Punya AKun ? Klik{" "}
          <span onClick={props.onClick} className="fw-bold" style={{ cursor: "pointer" }}>
            Disini
          </span>
        </p>
      </div>
    </Modal>
  );
};

export default Register;
