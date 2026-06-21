import React from "react";
import SignCard from "./signCard";
import '..//..//..//style/homePage/signCard/signCards.scss'

const SignCards = () => {
  return (
    <div className="signCards">
        <div className="signCardsTop">
          <h1>ابدأ معنا رحلة من الجودة والتميز لتحقيق أهدافك بكل ثقة.</h1>
          <p>نربط بين العملاء وأفضل الحرفيين والمتخصصين في مختلف المجالات، حيث تلتقي الاحترافية بالحلول المبتكرة لتلبية جميع احتياجاتك بطريقة سهلة وسريعة.</p>
        </div>
        <div className="signCardsBottom">
          <SignCard
              signCardImage={'imgs/personnes/client1.jpg'}
              signCardTitle={"هل تبحث عن مهني؟"}
              signCardParagraph={
              "هل لديك عطب منزلي (مشكل كهربائي, تسريب ماء...) وتبحث عن محترف لإصلاح المشكل إختر فردا من أفراد Hrefty.com"
              }
              buttonContent={'تسجيل كعميل'}
              buttonPath={"/register_client"}
          />
          <SignCard
              signCardImage={'imgs/personnes/technicien1.jpg'}
              signCardTitle={"هل انت شخص مهني؟"}
              signCardParagraph={
              "هل تمتلك حرفة او مهنة وتبحث عن مصدر دخل إضافي. قم بالإنضمام إلى فريق عمل Hrefty.com"
              }
              buttonContent={'تسجيل كمهني'}
              buttonPath={"/register_technicien"}
          />
        </div>
    </div>
  );
};

export default SignCards;
