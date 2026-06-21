import React from 'react'
import SwiperSilde from './swiperSilde'
import '..//..//style/homePage/homeSection.scss'

const HomeSection = () => {
  return (
    <div className='homeSection'>
      <div className='aboutContent'>
        <h1>فكرة عنا!</h1>
        <p>مرحبًا بك في منصتنا الرائدة التي تربط بين العملاء والحرفيين! نحن نوفر لك طريقة سهلة وفعالة للعثور على الحرفي المناسب لمختلف احتياجاتك اليومية مثل الإصلاحات الكهربائية، السباكة، والديكور. انشئ طلبك الآن، قارن العروض المقدمة من الحرفيين المحترفين، واختر الأنسب لك بكل سهولة وشفافية. انضم إلينا لتعزيز تجربتك في البحث عن خدمات ذات جودة عالية بثقة وأمان!</p>
        <button onClick={()=>window.location.href = '/about_us'} className='btn'>المزيد عنا</button>
      </div>
      <SwiperSilde/>
    </div>
  )
}

export default HomeSection
