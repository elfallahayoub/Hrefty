import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "..//..//style/clientDashboard/dashboardSlider.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faClipboardList,
  faEnvelopeOpenText,
  faFileImport,
  faCog,
  faRightFromBracket,
  faComment,
  faChartDiagram,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import {
  categoryList,
  demandesList,
  filterServices,
} from "../../redux/Slices/pageServicesSlice";
import { Dropdown, Button, Modal } from "react-bootstrap";
import { addDemande } from "../../redux/Slices/clientSlice";
import { NavLink } from "react-router-dom";
import { logout } from "../../redux/Slices/authSlice";

const DashboardSlider = () => {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const user = JSON.parse(sessionStorage.getItem("user"));

  const categorys = useSelector((state) => state.services.listCategorys);
  const [listCategorys, setListCategorys] = useState([]);
  useEffect(() => {
    dispatch(categoryList()); // ← parentheses ici
  }, [dispatch]);
  useEffect(() => {
    setListCategorys(categorys || []);
  }, [categorys]);

  //demande Information
  const [formInputs, setFormIntputs] = useState({
    titre: "",
    description: "",
    adresse: "",
    ville: "",
    budget: 0,
    telephone: "",
    photo: null,
    dateExecution: "",
    category: 0,
    status: "en_attente",
    idClient: user && user.client.id,
  });

  const handleAddDemande = () => {
    setShow(false);
    dispatch(addDemande(formInputs));
  };

  return (
    <div className="dashboardSlider">
      <div className="sliderTop">
        {user && (
          <>
            <img src={`http://localhost:8000/${user.client.photo}`} />
            <h1>{user.client.nom}</h1>
          </>
        )}
      </div>
      <div className="sliderMiddle">
        <NavLink className="btn" to="/">
          <div className="icon">
            <FontAwesomeIcon icon={faHome} className="ml-2" />
          </div>
          <div className="text">الرئيسية</div>
        </NavLink>
        <NavLink className="btn" to="/client_panel">
          <div className="icon">
            <FontAwesomeIcon icon={faChartLine} className="ml-2" />
          </div>
          <div className="text">لوحة التحكم</div>
        </NavLink>

        {/* فقط الزر هنا داخل NavLink بدون form أو Modal */}
        <button className="btn" onClick={() => setShow(true)}>
          <div className="icon">
            <FontAwesomeIcon icon={faFileImport} className="ml-2" />
          </div>
          <div className="text">رفع طلب</div>
        </button>

        <NavLink className="btn" to="/client_panel/chat">
          <div className="icon">
            <FontAwesomeIcon icon={faComment} className="ml-2" />
          </div>
          <div className="text">المحادثات</div>
        </NavLink>

        <NavLink onClick={() => dispatch(logout())} className="btn">
          <div className="icon">
            <FontAwesomeIcon icon={faRightFromBracket} className="ml-2" />
          </div>
          <div className="text">تسجيل الخروج</div>
        </NavLink>

        {/* ضعه خارج NavLink بالكامل */}
        <Modal
          size="lg"
          scrollable
          show={show}
          onHide={() => setShow(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>رفع طلب</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form
              encType="multipart/form-data"
              onSubmit={(e) => e.preventDefault()}
            >
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <span>العنوان:</span>
                  <input
                    onChange={(e) =>
                      setFormIntputs({ ...formInputs, titre: e.target.value })
                    }
                    className="form-control"
                    type="text"
                  />
                </li>
                <li class="list-group-item">
                  <span>الوصف:</span>
                  <textarea
                    onChange={(e) =>
                      setFormIntputs({
                        ...formInputs,
                        description: e.target.value,
                      })
                    }
                    className="form-control"
                    cols="30"
                    rows="5"
                  ></textarea>
                </li>
                <li class="list-group-item">
                  <span>الميزانية:</span>
                  <input
                    onChange={(e) =>
                      setFormIntputs({
                        ...formInputs,
                        budget: Number(e.target.value),
                      })
                    }
                    min={1}
                    className="form-control"
                    type="number"
                  />
                </li>
                <li class="list-group-item">
                  <span>الميزانية:</span>
                  <select
                    className="form-select"
                    onChange={(e) =>
                      setFormIntputs({
                        ...formInputs,
                        category: Number(e.target.value),
                      })
                    }
                  >
                    <option value="">كل الأصناف</option>
                    {listCategorys.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.nom}
                      </option>
                    ))}
                  </select>
                </li>
                <li class="list-group-item">
                  <span>رقم الهاتف:</span>
                  <input
                    onChange={(e) =>
                      setFormIntputs({
                        ...formInputs,
                        telephone: e.target.value,
                      })
                    }
                    className="form-control"
                    type="text"
                  />
                </li>
                <li class="list-group-item">
                  <span>صورة:</span>
                  <input
                    onChange={(e) =>
                      setFormIntputs({
                        ...formInputs,
                        photo: e.target.files[0],
                      })
                    }
                    accept="image/*"
                    className="form-control"
                    type="file"
                  />
                </li>
                <li class="list-group-item">
                  <span>الوقت المفضل:</span>
                  <input
                    onChange={(e) =>
                      setFormIntputs({
                        ...formInputs,
                        dateExecution: e.target.value,
                      })
                    }
                    className="form-control"
                    type="datetime-local"
                  />
                </li>
                <li class="list-group-item">
                  <span>الموقع:</span>
                  <input
                    onChange={(e) =>
                      setFormIntputs({
                        ...formInputs,
                        adresse: e.target.value,
                      })
                    }
                    className="form-control"
                    type="text"
                  />
                </li>
                <li class="list-group-item">
                  <span>المدينة:</span>
                  <input
                    onChange={(e) =>
                      setFormIntputs({
                        ...formInputs,
                        ville: e.target.value,
                      })
                    }
                    className="form-control"
                    type="text"
                  />
                </li>
              </ul>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              إغلاق
            </Button>
            <Button variant="primary" onClick={handleAddDemande}>
              رفع
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default DashboardSlider;
