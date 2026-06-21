import React, { useState } from "react";
import "..//..//style/artisansPage/Artisan.scss";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Artisan = ({
  nom,
  specialite,
  description,
  userId,
  telephone,
  email,
  image
}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="artisan">
      <img src={`http://localhost:8000/${image}`} />
      <div className="content">
        <div className="title">
          <h1 style={{cursor: 'pointer'}} onClick={()=>{window.location.href = `/profile/${userId}`}}>{nom}</h1>
          <p>{specialite}</p>
        </div>
        {/* <p className="datecreation">
          {status == "actif" ? "مفعل" : "غير مفعل"}
        </p> */}
        <p className="description">{description}</p>
        <button className="btn" onClick={() => handleShow()}>
          معلومات الاتصال
        </button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>معلومات الاتصال</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>
              <span>الاسم</span> : {nom}
            </li>
            <li>
              <span>الهاتف</span> : {telephone}
            </li>
            <li>
              <span>الايميل</span> : {email}
            </li>
          </ul>
          <div className="clientInfo"></div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn" onClick={handleClose}>
            اغلاق
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Artisan;
