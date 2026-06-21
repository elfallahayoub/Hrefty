import React, { useEffect } from "react";
import "..//..//..//style/adminDashboard/dashboardPages/demandes_offres.scss";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDemande,
  deleteOffre,
  listDemandes,
} from "../../../redux/Slices/adminSlice";

const Demandes_offres = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listDemandes());
  }, [dispatch]);
  const demandes = useSelector((state) => state.admin.demandeOffres);
  console.log(demandes)
  const handleDeleteDemande = (id) => {
    dispatch(deleteDemande(id));
  };
  const handleDeleteOffre = (id) => {
    dispatch(deleteOffre(id));
  };
  return (
    <div className="demandes_offres">
      {demandes &&
        demandes.map((demande) => (
          <div className="demande">
            <div className="cols1">
              <img src={`http://localhost:8000/${demande.photo}`} />
              <div className="info">
                <ul>
                  <li>
                    {" "}
                    <span>العنوان</span> : {demande.titre}
                  </li>
                  <li>
                    {" "}
                    <span>العميل</span> : {demande.client.nom}
                  </li>
                  <li>
                    {" "}
                    <span>الوصف</span> : {demande.description}
                  </li>
                  <li>
                    {" "}
                    <span>العنوان</span> : {demande.adresse}
                  </li>
                  <li>
                    {" "}
                    <span>المدينة</span> : {demande.ville}
                  </li>
                  <li>
                    {" "}
                    <span>الميزانية</span> : {demande.budget}
                  </li>
                  <li>
                    {" "}
                    <span>القطاع</span> : {demande.category.nom}
                  </li>
                  <li>
                    {" "}
                    <span>الحالة</span> : {demande.status}
                  </li>
                </ul>
              </div>
              <button
                className="btn btn-success"
                onClick={() => handleDeleteDemande(demande.id)}
              >
                الغاء الطلب
              </button>
            </div>
            <div className="cols2">
              <div className="offre">
                <table className="table text-center table-bordered">
                  <thead>
                    <tr>
                      <th>التقني</th>
                      <th>الوصف</th>
                      <th>الميزانية</th>
                      <th>الحالة</th>
                      <th>اجراء</th>
                    </tr>
                  </thead>
                  <tbody>
                    {demande.offres &&
                      demande.offres
                        .filter((off) => off.statut == "en_attente")
                        .map((off) => (
                          <tr key={off.id}>
                            <td>{off.artisan.nom}</td>
                            <td>{off.description}</td>
                            <td>{off.montant}</td>
                            <td>{off.statut}</td>
                            <td>
                              <button
                                className="btn btn-success"
                                onClick={() => handleDeleteOffre(off.id)}
                              >
                                الغاء العرض
                              </button>
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}

      {/* <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>قائمة العروض</Modal.Title>
          </Modal.Header>
          <Modal.Body></Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal> */}
    </div>
  );
};

export default Demandes_offres;
