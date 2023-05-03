import React from "react";
import { Form, Button } from "react-bootstrap";

export default function EditStatus() {
  return (
    <>
      <div>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="1" disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="Anto" disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="Surabaya - Jakarta" disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="bca.jpg" disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="Approved" />
          </Form.Group>

          <Button className="mt-3" variant="outline-light fw-bold" type="submit" style={{ width: "206px", height: "40px", background: "#0ACF83", marginLeft: "130px" }}>
            Save
          </Button>
        </Form>
      </div>
    </>
  );
}
