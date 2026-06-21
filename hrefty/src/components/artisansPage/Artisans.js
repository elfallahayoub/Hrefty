import ReactPaginate from "react-paginate";
import React, { useEffect, useState } from "react";
import Artisan from "./Artisan";
import "..//..//style/artisansPage/Artisans.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  artisansList,
  filterArtisans,
} from "../../redux/Slices/pageArtisansSlice";
import { categoryList } from "../../redux/Slices/pageServicesSlice";
// import { artisansList } from '../../redux/Slices/artisansSlice';

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
const ArtisansPage = () => {
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [ville, setVille] = useState("");

  // lancer la liste des categorys
  const categorys = useSelector((state) => state.services.listCategorys);
  const [listCategorys, setListCategorys] = useState([]);
  useEffect(() => {
    dispatch(categoryList()); // ← parentheses ici
  }, [dispatch]);
  useEffect(() => {
    setListCategorys(categorys || []);
  }, [categorys]);

  // lancer la liste des artisans
  const filtredArtisans = useSelector((state) => state.artisans.filtredList);
  const [listArtisans, setListArtisans] = useState([]);
  useEffect(() => {
    dispatch(artisansList()); // ← parentheses ici
  }, [dispatch]);
  useEffect(() => {
    setListArtisans(filtredArtisans || []);
  }, [filtredArtisans]);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const displayedItems = listArtisans.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  console.log(displayedItems)

  useEffect(() => {
    dispatch(filterArtisans({ category: selectedCategory, ville }));
  }, [selectedCategory, ville, dispatch]);

  return (
    <div className="artisans">
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
        {displayedItems.map((artisan, index) => (
          <Artisan
            key={index}
            image={artisan.photo}
            userId={artisan.user.id}
            nom={artisan.nom}
            description={artisan.description}
            specialite={artisan.specialite.nom}
            status={artisan.status}
            telephone={artisan.telephone}
            email={artisan.user.email}
          />
        ))}
      </div>
      <Pagination
        className="pagination"
        pageCount={Math.ceil(artisansList.length / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ArtisansPage;
