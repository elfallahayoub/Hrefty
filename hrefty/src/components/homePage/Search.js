import React, { useEffect, useState } from 'react';
import '..//..//style/homePage/Search.scss';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { categoryList } from '../../redux/Slices/pageServicesSlice';


const Search = () => {
  const dispatch = useDispatch();

  // lancer la liste des categorys
  const categorys = useSelector((state) => state.services.listCategorys);
  const [listCategorys, setListCategorys] = useState([]);
  useEffect(() => {
    dispatch(categoryList()); // ← parentheses ici
  }, [dispatch]);
  useEffect(() => {
    setListCategorys(categorys || []);
    console.log(categorys)
  }, [categorys]);

  return (
    <nav className='Search'>
      <select className='categorysSelect form-select' aria-label="Default select example">
        {categorys.map((category) => (
          <option key={category.id} value={category.nom}>
            {category.nom}
          </option>
        ))}
      </select>
      <select className='villesSelect form-select' aria-label="Default select example">

      </select>
      <input type="text" className='serviceName form-control custom-shadow'/>
    </nav>
  );
};

export default Search;
