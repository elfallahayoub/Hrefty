import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/Slices/authSlice";
import "../../style/authPages/registerTechnicien.scss";
import { categoryList } from "../../redux/Slices/pageServicesSlice";

const RegisterTechnicien = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    nom: "",
    description: "",
    photo: "null",
    status: "inactif",
    idSpecialite: 0,
    adresse: "",
    genre: "",
    telephone: "",
    ville: "",
    photo: null,
    email: "",
    password: "",
    role: "technicien",
  });

  // lancer la liste des categorys
  const categorys = useSelector((state) => state.services.listCategorys);
  const [listCategorys, setListCategorys] = useState([]);
  useEffect(() => {
    dispatch(categoryList()); // ← parentheses ici
  }, [dispatch]);
  useEffect(() => {
    setListCategorys(categorys || []);
  }, [categorys]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    dispatch(register(formDataToSend));
  };

  return (
    <div className="registerTechnicien">
      <div className="cont">
        <h2>حساب جديد</h2>
        {auth.error && <p style={{ color: "red" }}>{auth.error.message}</p>}
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <div>
            <label className="form-control">الاسم</label>
            <input
              className="form-control"
              type="text"
              name="nom"
              value={formData.nom}
              onChange={(e) =>
                setFormData({ ...formData, nom: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="form-control">الوصف</label>
            <textarea
              cols="30"
              rows="10"
              className="form-control"
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            ></textarea>
          </div>
          <div>
            <label className="form-control">الصنف</label>
            <select
              className="form-select"
              onChange={(e) =>
                setFormData({ ...formData, idSpecialite: e.target.value })
              }
            >
              <option value="">كل الأصناف</option>
              {categorys.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.nom}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="form-control">الموقع</label>
            <input
              className="form-control"
              type="text"
              name="adresse"
              value={formData.adresse}
              onChange={(e) =>
                setFormData({ ...formData, adresse: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="form-control">ألجنس</label>
            <select
              className="form-select"
              onChange={(e) =>
                setFormData({ ...formData, genre: e.target.value })
              }
            >
              <option value="homme">ذكر</option>
              <option value="femme">انثى</option>
            </select>
          </div>
          <div>
            <label className="form-control">الهاتف</label>
            <input
              className="form-control"
              type="text"
              name="telephone"
              value={formData.telephone}
              onChange={(e) =>
                setFormData({ ...formData, telephone: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="form-control">المدينة</label>
            <input
              className="form-control"
              type="text"
              name="ville"
              value={formData.ville}
              onChange={(e) =>
                setFormData({ ...formData, ville: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="form-control">الصورة</label>
            <input
              className="form-control"
              type="file"
              name="photo"
              onChange={(e) =>
                setFormData({ ...formData, photo: e.target.files[0] })
              }
              required
            />
          </div>
          <div>
            <label className="form-control">الايميل</label>
            <input
              className="form-control"
              type="email"
              name="email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="form-control">الرمز السري</label>
            <input
              className="form-control"
              type="password"
              name="password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>
          <button className="btn btn-primary" type="submit">
            تسجيل
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterTechnicien;
