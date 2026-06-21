import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "..//..//style/servicesPage/Service.scss";
import {
  addOffre,
  demandesList,
  offresList,
  technicienInfo,
} from "../../redux/Slices/artisanSlice";
import { useDispatch, useSelector } from "react-redux";

const Service = ({
  image,
  id,
  titre,
  description,
  budget,
  dateExecution,
}) => {
  const dispatch = useDispatch();
  const [offreAdd, setOffreAdd] = useState(false);
  const artisanInfo = useSelector((state) => state.artisan.artisanInfo);
  const user = JSON.parse(sessionStorage.getItem("user"));
  // useEffect(() => {
  // }, []);
  const [formInputs, setFormInputs] = useState({
    description: "",
    montant: 0,
    statut: "en attente",
    idDemande: 0,
    idArtisan: 0,
  });
  const handleAddOffre = async (idDmnd) => {
    if (user && user.role == "technicien" && user.artisan.status == "actif") {
      const newFormInputs = {
        ...formInputs,
        idDemande: idDmnd,
        idArtisan: artisanInfo?.artisan?.id,
      };
      setFormInputs(newFormInputs);
      dispatch(addOffre(newFormInputs));
      setOffreAdd(false);
    } else {
      alert("your account is inactif");
      setOffreAdd(false);
    }
  };
  return (
    <div className="Service">
      <div className="img">
        <img src={`http://localhost:8000/${image}`} alt="" />
      </div>
      <div className="content">
        <div className="serviceInfo">
          <p className="budget">{budget} درهم</p>
          <p className="category">{dateExecution}</p>
        </div>
        <h1 className="title">{titre}</h1>
        <p className="description">{description}</p>
      </div>
      <Button onClick={() => setOffreAdd(true)}>ارسال عرض</Button>
      <Modal
        size="lg"
        scrollable
        show={offreAdd}
        onHide={() => setOffreAdd(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>ارسال عرض</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span>الوصف:</span>
              <textarea
                className="form-control"
                rows="5"
                onChange={(e) =>
                  setFormInputs({
                    ...formInputs,
                    description: e.target.value,
                  })
                }
              ></textarea>
            </li>
            <li className="list-group-item">
              <span>الميزانية:</span>
              <input
                type="number"
                className="form-control"
                onChange={(e) =>
                  setFormInputs({
                    ...formInputs,
                    montant: e.target.value,
                  })
                }
              />
            </li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setOffreAdd(false)}>
            إغلاق
          </Button>
          <Button variant="primary" onClick={() => handleAddOffre(id)}>
            رفع
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Service;
