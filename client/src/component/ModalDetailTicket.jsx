import { Modal } from "react-bootstrap";
import DetailTicket from "../component/DetailTicket";

export default function ModalDetailTicket(props) {
  return (
    <>
      <Modal size="lg" show={props.show} onHide={props.onHide} centered>
        <Modal.Header closeButton>
          <div>
            <img className="position-absolute ms-4 my-auto" src="/images/Land.png" alt="Logo" />
            <img src="/images/Vector.png" alt="Rectangle" />
          </div>
        </Modal.Header>
        <Modal.Body>
          <DetailTicket onHide={props.onHide} />
        </Modal.Body>
      </Modal>
    </>
  );
}
