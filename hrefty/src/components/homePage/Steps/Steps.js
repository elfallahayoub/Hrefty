import React from "react";
import Step from "./Step";
import "..//..//..//style/homePage/Steps/Steps.scss";

const Steps = () => {
  const steps = [
    {
      titre: "للعميل: خطوات طلب الخدمات بسهولة",
      steps: [
        "إرسال الطلبات: اشرح احتياجاتك واحصل على عروض أسعار من المهنيين.",
        "البحث والاختيار: ابحث عن الحرفي المناسب بناءً على التخصص والموقع.",
        "قبول العرض: اختر أفضل عرض، تابع تقدم العمل، وقيّم الخدمة عند الانتهاء.",
      ],
      image: "imgs/personnes/client2.jpg",
    },
    {
      titre: "للمهنّي: خطوات الانضمام وتقديم الخدمات",
      steps: [
        "إنشاء حساب: قم بإنشاء ملف تعريف يعكس مهاراتك وتخصصاتك.",
        "إدارة العروض: استجب لطلبات العملاء وقدّم عروضك بناءً على احتياجاتهم.",
        "تنفيذ الطلبات: تابع الطلبات المكتملة واحصل على تقييمات إيجابية لتحسين ملفك الشخصي.",
      ],
      image: "imgs/personnes/technicien2.jpg",
    },
  ];
  return (
    <div className="Steps">
      <h1>~ كيف يعمل الموقع ~</h1>
      <div className="steps">
        {steps.map((step, index) => (
          <Step Titre={step.titre} Image={step.image} key={index} Steps={step.steps} />
        ))}
      </div>
    </div>
  );
};

export default Steps;
