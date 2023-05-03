import { Modal } from "react-bootstrap";
import EditStatus from "../component/EditStatus";

export default function ModalEdit(props) {
  return (
    <>
      <Modal show={props.show} onHide={props.onHide} centered>
        <Modal.Header closeButton>
          <div>
            <img className="position-absolute ms-4 my-auto" src="/images/Land.png" alt="Logo" />
            <img src="/images/Vector.png" alt="Rectangle" />
          </div>
        </Modal.Header>
        <Modal.Body>
          <EditStatus onHide={props.onHide} />
        </Modal.Body>
      </Modal>
    </>
  );
}
