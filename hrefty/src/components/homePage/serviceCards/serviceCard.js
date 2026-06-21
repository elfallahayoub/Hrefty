import React from 'react'
import '..//..//..//style/homePage/serviceCard/serviceCard.scss'

const ServiceCard = ({serviceCardCategorie, serviceCardTitle, serviceCardParagraph}) => {
  return (
    <div className='serviceCard'>
      <div className='contentLeft'>
        <img src="/imgs/images.jpeg" alt="" />
        <button className='btn'>طلب</button>
      </div>
      <div className='contentRight'>
        <span>{serviceCardCategorie}</span>
        <h1>{serviceCardTitle}</h1>
        <p>{serviceCardParagraph}</p>
      </div>  
    </div>
  )
}

export default ServiceCard
