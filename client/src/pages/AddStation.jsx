import React, { useState } from "react";
import Footer from "../component/Footer";
import { Form, Button } from "react-bootstrap";
import { API } from "../config/api";
import { useMutation } from "react-query";
import Swal from "sweetalert2";

export default function AddTicket() {
  const [form, setForm] = useState({
    name: "",
    kota: "",
  });
  console.log(form);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.set("name", form.name);
      formData.set("kota", form.kota);

      const response = await API.post("/station", formData);
      if (response.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Berhasil Menambahkan Jurusan Station Baru!",
          showConfirmButton: false,
          timer: 1500,
        });
        setForm({
          name: "",
          kota: "",
        });
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Gagal Menambahkan Jurusan Station Baru!",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    }
  });

  return (
    <>
      <div className="container mt-5">
        <h1 className="fw-bold">Add Station</h1>
        <Form
          className="mt-5"
          onSubmit={(e) => {
            handleSubmit.mutate(e);
          }}
        >
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="name"
              placeholder="Station Name"
              onChange={handleChange}
              value={form.name}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="kota"
              placeholder="City"
              onChange={handleChange}
              value={form.kota}
            />
          </Form.Group>

          <Button
            className="mt-5"
            variant="outline-light fw-bold"
            type="submit"
            style={{
              width: "535px",
              height: "50px",
              background: "#0ACF83",
              marginLeft: "282px",
            }}
          >
            Save
          </Button>
        </Form>
      </div>
      <Footer />
    </>
  );
}
