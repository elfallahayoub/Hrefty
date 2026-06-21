import React from 'react'
import "..//..//style/clientDashboard/Search.scss"
const Search = () => {
  return (
    <nav className='dashboardSearch'>
      {/* <select className='status form-select' aria-label="Default select example">
        <option value="طلبات مكتملة" key="">طلبات مكتملة</option>
        <option value="طلبات قيد التنفيذ" key="">طلبات قيد التنفيذ</option>
        <option value="طلبات ملغية" key="">طلبات ملغية</option>
      </select> */}
      <input type="text" className='serviceName form-control custom-shadow'/>
      <button className='btn'>ابحث</button>
    </nav>
  )
}

export default Search
