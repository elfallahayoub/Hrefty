import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "..//..//..//style/adminDashboard/dashboardPages/techniciens.scss";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDemande,
  listTechniciens,
  updateTechnicien,
} from "../../../redux/Slices/adminSlice";

const Techniciens = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listTechniciens());
  }, [dispatch]);
  const techniciens = useSelector((state) => state.admin.TechniciensProfiles);
  console.log(techniciens);

  const handleUpdate = (id) => {
    const info = {
      status: "actif",
      id: id,
    };
    dispatch(updateTechnicien(info));
  };

  const handleDelete = (id) => {
    dispatch(deleteDemande(id));
  };
  return (
    <div className="techniciens">
      {techniciens.map((technicien) => (
        <div className="technicien">
          <div className="cols1">
            <img src={`http://localhost:8000/${technicien.photo}`} />
          </div>
          <div className="cols2">
            <div className="buttons">
              <button
                onClick={() => handleUpdate(technicien.id)}
                className="btn btn-success"
              >
                قبول الملف
              </button>
              <button
                onClick={() => handleDelete(technicien?.id)}
                className="btn btn-danger"
              >
                رفض الملف
              </button>
            </div>
            <table className="table table-hover table-bordered">
              <thead>
                <tr>
                  <th>الاسم</th>
                  <th>الوصف</th>
                  <th>العنوان</th>
                  <th>المدينة</th>
                  <th>الجنس</th>
                  <th>رقم الهاتف</th>
                  <th>الحالة</th>
                  <th>القطاع</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{technicien?.nom}</td>
                  <td>{technicien?.description}</td>
                  <td>{technicien?.adresse}</td>
                  <td>{technicien?.ville}</td>
                  <td>{technicien?.genre}</td>
                  <td>{technicien?.telephone}</td>
                  <td>{technicien?.status}</td>
                  <td>{technicien?.specialite?.nom}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Techniciens;
