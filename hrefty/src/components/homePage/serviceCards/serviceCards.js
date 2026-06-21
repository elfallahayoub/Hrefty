import React, { useEffect, useState } from "react";
import ServiceCard from "./serviceCard";
import ReactPaginate from "react-paginate";
import "..//..//..//style/homePage/serviceCard/serviceCards.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryList,
  demandesList,
} from "../../../redux/Slices/pageServicesSlice";
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

const ServiceCards = () => {
  const dispatch = useDispatch();
  const [Services, setServices] = useState([]);
  useEffect(() => {
    dispatch(demandesList()); // ✅ maintenant ça utilise le bon thunk
  }, [dispatch]);
  const services = useSelector((state) => state.services.listServices);
  useEffect(() => {
    setServices(services || []);
    console.log(services);
  }, [services]);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const displayedItems = Services.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="serviceCards">
      <div className="cards">
        {displayedItems.map((item, index) => (
          <ServiceCard
            key={index}
            serviceCardTitle={item.titre}
            serviceCardParagraph={item.description}
            serviceCardCategorie={item.category.nom}
          />
        ))}
      </div>
      <Pagination
        pageCount={Math.ceil(Services.length / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ServiceCards;
