import React from "react";
import { Modal } from "react-bootstrap";
import { LoginReg } from "./LoginReg";


export const LoginRegModal = ({ show, handleShow, loginTab = true }: { show: boolean; loginTab?: boolean; handleShow: (show: boolean) => void; }) => {

  return (
    <Modal centered show={show} onHide={() => handleShow(false)}>
      <Modal.Header closeButton>
        Login / Register
      </Modal.Header>
      <Modal.Body>
        <LoginReg handleShow={handleShow} logTab={loginTab} />
      </Modal.Body>
    </Modal>
  );
};
