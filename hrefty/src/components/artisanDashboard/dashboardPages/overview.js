import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../../style/artisanDashboard/dashboardPages/overview.scss";
import {
  faBell,
  faBriefcase,
  faCircle,
  faClipboardCheck,
  faComment,
  faLocationDot,
  faPaperPlane,
  faStar,
  faToolbox,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addOffre,
  demandesList,
  offresList,
  statistiques,
  technicienInfo,
} from "../../../redux/Slices/artisanSlice";
import {
  createConversation,
  fetchMessages,
  setSelectedConversation,
} from "../../../redux/Slices/chatSlice";
import { moyenne } from "../../../redux/Slices/profileSlice";

const OverviewTechnicien = () => {
  const [show, setShow] = useState(false);
  const [offreAdd, setOffreAdd] = useState(false);
  const [formInputs, setFormInputs] = useState({
    description: "",
    montant: 0,
    statut: "en_attente",
    idDemande: 0,
    idArtisan: 0,
  });

  const [client, setClient] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const artisanInfo = useSelector((state) => state.artisan.artisanInfo);
  const listOffres = useSelector((state) => state.artisan.listOffres);
  const listDemandes = useSelector((state) => state.artisan.listDemandes);
  const conversations = useSelector((state) => state.chat.conversations);

  useEffect(() => {
    dispatch(offresList());
    dispatch(demandesList());
  }, [dispatch]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(statistiques(artisanInfo.artisan.id));
  }, []);
  const statis = useSelector((state) => state.artisan.statis);

  const handleClientShow = (clientId) => {
    handleShow();
    const demande = listDemandes.find((d) => d.client?.id === clientId);
    if (demande) {
      const { nom, telephone, user, photo } = demande.client;
      setClient({ nom, telephone, email: user.email, photo });
    }
  };
  const handleAddOffre = async (idDmnd) => {
    if (artisanInfo.artisan.status == "actif") {
      const newFormInputs = {
        ...formInputs,
        idDemande: idDmnd,
        idArtisan: artisanInfo?.artisan?.id,
      };
      setFormInputs(newFormInputs);
      console.log(newFormInputs)
      dispatch(addOffre(newFormInputs));
      setOffreAdd(false);
    } else {
      alert("your account is inactif");
      setOffreAdd(false);
    }
  };

  const openChat = async (offre, clientId, nomClient) => {
    let conv = conversations.find((c) => c.idOffre === offre.id);

    if (!conv) {
      const action = await dispatch(createConversation({ idOffre: offre.id }));

      // 👇 Corriger ici
      if (action.payload) {
        conv = action.payload;
      } else {
        console.error("Échec de création de la conversation");
        return;
      }
    }

    console.log("Conversation ouverte :", conv);

    dispatch(
      setSelectedConversation({
        ...conv,
        nomAutreUtilisateur: nomClient,
        autreUserId: clientId,
        expediteurType: user.role,
      })
    );

    dispatch(fetchMessages(conv.id));

    navigate("/technicien_panel/chat");
  };

  useEffect(() => {
    dispatch(moyenne(artisanInfo.id));
  }, []);
  const moy = useSelector((state) => state.profile.moyenne);

  return (
    <div className="artisanOverview">
      <div className="header">
        <div  onClick={()=>{window.location.href = `/profile/${artisanInfo.id}`}} className="profile">
          <img src={`http://localhost:8000/${artisanInfo.artisan?.photo}`} />
          <ul>
            <li>
              <FontAwesomeIcon className="icon" icon={faUser} />{" "}
              {artisanInfo.artisan?.nom}
            </li>
            <li>
              <FontAwesomeIcon className="icon" icon={faLocationDot} />{" "}
              {artisanInfo.artisan?.adresse} - {artisanInfo.artisan?.ville}
            </li>
            <li>
              <FontAwesomeIcon className="icon-actif" icon={faCircle} />{" "}
              {artisanInfo.artisan?.status === "actif" ? "مفعل" : "غير مفعل"}
            </li>
            <li>
              <FontAwesomeIcon className="icon" icon={faToolbox} />{" "}
              {artisanInfo.artisan?.specialite?.nom}
            </li>
            <li className="stars">
              {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon
                  key={i}
                  icon={faStar}
                  style={{ color: i < moy ? "#088178" : "#e4e5e9" }}
                />
              ))}
            </li>
          </ul>
        </div>

        <div className="statistiques">
          {/* <div className="row">
            <p>
              <FontAwesomeIcon icon={faClipboardCheck} /> الطلبات النشطة:
              <span>0</span>
            </p>
          </div> */}
          <div className="row">
            <p>
              <FontAwesomeIcon icon={faPaperPlane} /> العروض المرسلة:
              <span>{statis.totalOffres}</span>
            </p>
          </div>
          <div className="row">
            <p>
              <FontAwesomeIcon icon={faBriefcase} /> الطلبات المنجزة:
              <span>{statis.totalDemandeFaire}</span>
            </p>
          </div>
          {/* <div className="row">
            <p>
              <FontAwesomeIcon icon={faComment} /> الرسائل المعلقة:
              <span>0</span>
            </p>
          </div> */}
        </div>

        <div className="header-left">
          <h1 className="title-right">الاحصائيات</h1>
          <h1 className="title-left">الطلبات المقبولة</h1>
          <div className="demandesAccept">
            {listOffres
              .filter((artisan) => artisan.user?.id === artisanInfo.id)
              .flatMap((artisan) =>
                artisan.offres
                  .filter(
                    (offre) =>
                      offre.statut === "acceptable" &&
                      offre.demande?.status === "en_cours"
                  )
                  .map((offre, idx) => (
                    <div className="demande" key={idx}>
                      <ul>
                        <li>
                          <img
                            src={`http://localhost:8000/${offre.demande?.photo}`}
                            alt=""
                          />
                        </li>
                        <li>
                          <span>المشكل: </span>
                          {offre.demande?.titre || "—"}
                        </li>
                        <li>
                          <span>الوصف: </span>
                          {offre.demande?.description || "—"}
                        </li>
                        <li>
                          <span>الميزانية: </span>
                          {offre.demande?.budget || "—"}
                        </li>
                        <li>
                          <span>الموقع: </span>
                          {offre.demande?.adresse || "—"}
                        </li>
                      </ul>
                      <button
                        className="btn"
                        onClick={() =>
                          handleClientShow(offre.demande?.client?.id)
                        }
                      >
                        معلومات العميل
                      </button>
                    </div>
                  ))
              )}
          </div>
        </div>
      </div>

      {/* Liste des demandes programmées à Fès sans offre acceptable */}
      <div className="orderList">
        <h1 className="title">الطلبات ذات صلة</h1>
        <table className="table table-bordered text-center table-hover m-0">
          <thead>
            <tr>
              <th style={{whiteSpace: 'nowrap'}}>الصورة</th>
              <th style={{whiteSpace: 'nowrap'}}>المشكل</th>
              <th style={{whiteSpace: 'nowrap'}}>الوصف</th>
              <th style={{whiteSpace: 'nowrap'}}>الميزانية</th>
              <th style={{whiteSpace: 'nowrap'}}>الموقع</th>
              <th style={{whiteSpace: 'nowrap'}}>معلومات العميل</th>
              <th style={{whiteSpace: 'nowrap'}}>المزيد</th>
            </tr>
          </thead>
          <tbody>
            {listDemandes &&
              listDemandes.map((demande, index) => {
                const specialite =
                  demande.category?.nom ===
                  artisanInfo?.artisan?.specialite?.nom;
                const ville = demande.ville === artisanInfo?.artisan?.ville;
                const hasAcceptableOffre = demande.offres?.some(
                  (offre) => offre.statut === "acceptable"
                );

                if (specialite && ville && !hasAcceptableOffre) {
                  return (
                    <tr key={index}>
                      <td>
                        <img style={{width: "150px", objectFit: 'cover'}}
                          src={`http://localhost:8000/${demande.photo}`}
                          alt=""
                        />
                      </td>
                      <td>{demande.titre}</td>
                      <td>{demande.description}</td>
                      <td>{demande.budget} درهم</td>
                      <td>{demande.adresse}</td>
                      <td>
                        <button
                          className="btn"
                          onClick={() => handleClientShow(demande.client?.id)}
                        >
                          عرض المعلومات
                        </button>
                      </td>
                      <td>
                        <button className="btn" onClick={() => setOffreAdd(true)}>
                          ارسال عرض
                        </button>

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
                            <Button
                              variant="secondary"
                              onClick={() => setOffreAdd(false)}
                            >
                              إغلاق
                            </Button>
                            <Button
                              variant="primary"
                              onClick={() => handleAddOffre(demande.id)}
                            >
                              رفع
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </td>
                    </tr>
                  );
                }
                return null;
              })}
          </tbody>
        </table>
      </div>

      {/* Liste des offres acceptées */}
      <div className="orderList">
        <h1 className="title">العروض المرسلة</h1>
        <table className="table table-bordered text-center table-hover m-0">
          <thead>
            <tr>
              <th>المشكل</th>
              <th>الوصف</th>
              <th>الميزانية</th>
              <th>معلومات العميل</th>
              <th>اجراء</th>
            </tr>
          </thead>
          <tbody>
            {listOffres &&
              listOffres
                .filter((artisan) => artisan.user?.id === artisanInfo.id)
                .flatMap((artisan) =>
                  artisan.offres
                    // .filter((offre) => offre.statut === "acceptable")
                    .map((offre, index) => (
                      <tr key={index}>
                        <td>{offre.demande?.titre}</td>
                        <td>{offre.description}</td>
                        <td>{offre.montant}</td>
                        <td>
                          <button
                            className="btn"
                            onClick={() =>
                              handleClientShow(offre.demande?.client?.id)
                            }
                          >
                            عرض المعلومات
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn"
                            onClick={() =>
                              openChat(
                                offre,
                                offre.demande?.client?.id,
                                offre.demande?.client?.nom
                              )
                            }
                          >
                            مراسلة العميل
                          </button>
                        </td>
                      </tr>
                    ))
                )}
          </tbody>
        </table>
      </div>

      {/* Modal client info */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>معلومات العميل</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column">
          <img
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              margin: "auto",
              objectFit: "cover"
            }}
            src={`http://localhost:8000/${client.photo}`}
            alt=""
          />
          <ul>
            <li>
              <span>الاسم</span> : {client.nom}
            </li>
            <li>
              <span>الهاتف</span> : {client.telephone}
            </li>
            <li>
              <span>الايميل</span> : {client.email}
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

export default OverviewTechnicien;
