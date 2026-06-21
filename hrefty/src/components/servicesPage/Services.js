import Service from "./Service";
import ReactPaginate from "react-paginate";
import React, { useEffect, useState } from "react";
import "../../style/servicesPage/Services.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryList,
  demandesList,
  filterServices,
} from "../../redux/Slices/pageServicesSlice";

const Pagination = ({ pageCount, onPageChange }) => {
  return (
    <ReactPaginate
      previousLabel={"السابق"}
      nextLabel={"التالي"}
      breakLabel={"..."}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={onPageChange}
      containerClassName={"pagination"}
      activeClassName={"active"}
    />
  );
};

const Services = () => {
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [ville, setVille] = useState("");

  // lancer la liste des services
  const servs = useSelector((state) => state.services.filtredList);
  const [listServ, setListServ] = useState([]);
  useEffect(() => {
    dispatch(demandesList()); // ← parentheses ici
  }, [dispatch]);
  useEffect(() => {
    setListServ(servs.filter((serv) => serv.status != 'en_cours') || []);
  }, [servs]);

  // lancer la liste des categorys
  const categorys = useSelector((state) => state.services.listCategorys);
  const [listCategorys, setListCategorys] = useState([]);
  useEffect(() => {
    dispatch(categoryList()); // ← parentheses ici
  }, [dispatch]);
  useEffect(() => {
    setListCategorys(categorys || []);
  }, [categorys]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const displayedItems = listServ.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  console.log(displayedItems)

  useEffect(() => {
    dispatch(filterServices({ category: selectedCategory, ville }));
  }, [selectedCategory, ville, dispatch]);

  return (
    <div className="Services">
      <nav className="Search w-50">
        <select
          className="categorysSelect form-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">كل الأصناف</option>
          {categorys.map((category) => (
            <option key={category.id} value={category.nom}>
              {category.nom}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="المدينة"
          className="ville form-control custom-shadow"
          value={ville}
          onChange={(e) => setVille(e.target.value)}
        />
      </nav>
      <div className="cards">
        {displayedItems.map((service, index) => (
          <Service
            key={index}
            id={service.id}
            image={service.photo}
            budget={service.budget}
            titre={service.titre}
            description={service.description}
            dateExecution={service.dateExecution}
          />
        ))}
      </div>
      <Pagination
        pageCount={Math.ceil(listServ.length / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Services;
