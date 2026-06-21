import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "..//..//style/newOffrePage/newOffrePage.scss";

const NewDemandePage = () => {
  return (
    <div className="newDemandePage ">
      <div className="text">
        <h1>رفع طلب عمل</h1>
        <p>
          قم بملئ البيانات ورفع الطلب, لتلقي عروض عمل وتستطيع اختيار الأنسب لك.
        </p>
      </div>
      <form>
        <div className="row">
          <label htmlFor="title" className="form-control">
            العنوان:
          </label>
          <input type="text" id="title" className="form-control" />
        </div>
        <div className="row">
          <label htmlFor="description" className="form-control">
            الوصف:
          </label>
          <textarea
            id="description"
            className="form-control"
            rows="6"
          ></textarea>
        </div>
        <div className="big-row">
          <div className="row">
            <label htmlFor="budget" className="form-control">
              الميزانية:
            </label>
            <input type="number" id="budget" className="form-control" />
          </div>
          <div className="row">
            <label htmlFor="file" className="form-control">
              صورة أو فيديو:
            </label>
            <input type="file" id="file" className="form-control" />
          </div>
        </div>
        <div className="row">
          <label htmlFor="phone" className="form-control">
            رقم الهاتف:
          </label>
          <input type="text" id="phone" className="form-control" />
        </div>
        <div className="big-row">
          <div className="row">
            <label htmlFor="time" className="form-control">
              الوقت المفضل:
            </label>
            <input type="time" id="time" className="form-control" />
          </div>
          <div className="row">
            <label htmlFor="location" className="form-control">
              الموقع:
            </label>
            <input type="text" id="location" className="form-control" />
          </div>
        </div>
        <button className="btn" type="submit">
          تحميل
        </button>
      </form>
    </div>
  );
};

export default NewDemandePage;
