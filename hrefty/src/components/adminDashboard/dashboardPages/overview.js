import React, { useEffect, useState } from "react";
import "../../../style/adminDashboard/dashboardPages/overview.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  addAds,
  deleteAds,
  listAds,
  updateAds,
} from "../../../redux/Slices/adminSlice";

const Overview = () => {
  const dispatch = useDispatch();
  const [formInputs, setFormInputs] = useState({
    link: "",
    image: null,
  });
  const handleAddAds = () => {
    const data = new FormData();
    data.append("link", formInputs.link);
    data.append("image", formInputs.image);

    dispatch(addAds(data));
  };
  useEffect(() => {
    dispatch(listAds());
  }, [dispatch]);
  const ads = useSelector((state) => state.admin.ads);

  const handlePauseAds = (id) => {
    const etat = 'inactif'
    dispatch(updateAds({ id, etat }));
  };
  
  const handlePlayAds = (id) => {
    const etat = 'actif'
    dispatch(updateAds({ id, etat }));
  };

  const handleDeleteAds = (id) => {
    dispatch(deleteAds(id));
  };

  return (
    <div className="Overview">
      <div className="statistiques">
        <div className="row">
          <p>عدد العملاء:</p> <span>0</span>
        </div>
        <div className="row">
          <p>عدد الحرفيين:</p> <span>0</span>
        </div>
        <div className="row">
          <p>عدد الطلبات:</p> <span>0</span>
        </div>
        <div className="row">
          <p>عدد العروض:</p> <span>0</span>
        </div>
      </div>
      <div className="ads">
        <div className="add_ads">
          <form
            onSubmit={(e) => e.preventDefault()}
            encType="multipart/form-data"
          >
            <input
              onChange={(e) =>
                setFormInputs({ ...formInputs, link: e.target.value })
              }
              type="text"
              className="form-control"
              placeholder="رابط الاعلان"
            />
            <input
              onChange={(e) =>
                setFormInputs({ ...formInputs, image: e.target.files[0] })
              }
              type="file"
              className="form-control"
            />
            <button onClick={() => handleAddAds()} className="btn btn-primary">
              رفع
            </button>
          </form>
        </div>
        <div className="list_ads">
          <table className="table table-bordered table-hover">
            <tbody>
              {ads &&
                ads.map((ad) => (
                  <tr>
                    <td className="img">
                      <img src={`http://localhost:8000/${ad.image}`} alt="" />
                    </td>
                    <td className="info">
                      <ul>
                        <li>
                          الحالة: {ad.actif == true ? "مفعل" : "غير مفعل"}
                        </li>
                        <li>الرابط: {ad.link}</li>
                        <li className="buttons">
                          <button
                            onClick={() => handlePauseAds(ad.id)}
                            className="btn"
                          >
                            تعليق
                          </button>
                          <button
                            onClick={() => handlePlayAds(ad.id)}
                            className="btn"
                          >
                            رفع
                          </button>
                          <button
                            onClick={() => handleDeleteAds(ad.id)}
                            className="btn"
                          >
                            حذف
                          </button>
                        </li>
                      </ul>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Overview;
