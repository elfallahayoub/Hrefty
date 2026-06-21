import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import WebFont from "webfontloader";
import Navbar from "./components/homePage/Navbar";
import Footer from "./components/homePage/Footer";

// Lazy loaded components
const AboutUs = lazy(() => import("./components/pages/aboutUs"));
const SignCards = lazy(() =>
  import("./components/homePage/signCards/signCards")
);
const HomeSection = lazy(() => import("./components/homePage/homeSection"));
const Features = lazy(() => import("./components/homePage/Features/Features"));
const Artisans = lazy(() => import("./components/homePage/Artisans/Artisans"));
const Steps = lazy(() => import("./components/homePage/Steps/Steps"));

const Services = lazy(() => import("./components/servicesPage/Services"));
const ArtisansPage = lazy(() => import("./components/artisansPage/Artisans"));
const RegisterTechnicien = lazy(() =>
  import("./components/authPages/registerTechnicien")
);
const RegisterClient = lazy(() =>
  import("./components/authPages/registerClient")
);
const Login = lazy(() => import("./components/authPages/Login"));
const Profile = lazy(() => import("./components/technicienProfile/profile"));
const AdminDashboard = lazy(() =>
  import("./components/adminDashboard/adminDashboard")
);
const ClientDashboard = lazy(() =>
  import("./components/clientDashboard/clientDashboard")
);
const ArtisanDashboard = lazy(() =>
  import("./components/artisanDashboard/artisanDashboard")
);
const Overview = lazy(() =>
  import("./components/adminDashboard/dashboardPages/overview")
);
const Demandes_offres = lazy(() =>
  import("./components/adminDashboard/dashboardPages/demandes_offres")
);
const Techniciens = lazy(() =>
  import("./components/adminDashboard/dashboardPages/techniciens")
);
const OverviewClient = lazy(() =>
  import("./components/clientDashboard/dashboardPages/overview")
);
const OverviewTechnicien = lazy(() =>
  import("./components/artisanDashboard/dashboardPages/overview")
);
const Chat = lazy(() => import("./components/chat/chat"));

// Composants simples
const Acceuil = () => {
  return (
    <div style={{ fontFamily: "Tajawal" }}>
      <Navbar />
      <Suspense fallback={<div>Chargement...</div>}>
        <SignCards />
        <HomeSection />
        <Features />
        <Artisans />
        <Steps />
      </Suspense>
      <Footer />
    </div>
  );
};

const ServicesPage = () => {
  return (
    <div style={{ fontFamily: "Tajawal, sans-serif" }}>
      <Navbar />
      <Suspense fallback={<div>Chargement...</div>}>
        <Services />
      </Suspense>
      <Footer />
    </div>
  );
};

const TechniciensPage = () => {
  return (
    <div style={{ fontFamily: "Tajawal, sans-serif" }}>
      <Navbar />
      <Suspense fallback={<div>Chargement...</div>}>
        <ArtisansPage />
      </Suspense>
      <Footer />
    </div>
  );
};

const DashboardClient = () => (
  <div style={{ fontFamily: "Tajawal, sans-serif" }}>
    <Suspense fallback={<div>Chargement...</div>}>
      <ClientDashboard />
    </Suspense>
  </div>
);

const DashboardTechnicien = () => (
  <div style={{ fontFamily: "Tajawal, sans-serif" }}>
    <Suspense fallback={<div>Chargement...</div>}>
      <ArtisanDashboard />
    </Suspense>
  </div>
);

const DashboardAdmin = () => (
  <div style={{ fontFamily: "Tajawal, sans-serif" }}>
    <Suspense fallback={<div>Chargement...</div>}>
      <AdminDashboard />
    </Suspense>
  </div>
);

const About_Us = () => (
  <div style={{ fontFamily: "Tajawal, sans-serif" }}>
    <Suspense fallback={<div>Chargement...</div>}>
      <Navbar />
      <Suspense fallback={<div>Chargement...</div>}>
        <AboutUs />
      </Suspense>
      <Footer />
    </Suspense>
  </div>
);

// Auth Guard
const RoleRoute = ({ allowedRole, children }) => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  if (!user || user.role !== allowedRole) {
    return <Navigate to="/login" />;
  }
  return children;
};

const App = () => {
  WebFont.load({
    google: {
      families: ["Tajawal:200,300,400,500,600,700,800,900", "sans-serif"],
    },
  });

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Chargement de la page...</div>}>
        <Routes>
          <Route path="/" element={<Acceuil />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/techniciens" element={<TechniciensPage />} />
          <Route path="/register_technicien" element={<RegisterTechnicien />} />
          <Route path="/register_client" element={<RegisterClient />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/about_us" element={<About_Us />} />

          <Route
            path="/admin_panel"
            element={
              <RoleRoute allowedRole="admin">
                <DashboardAdmin />
              </RoleRoute>
            }
          >
            <Route index element={<Overview />} />
            <Route path="demandes_offres" element={<Demandes_offres />} />
            <Route path="techniciens" element={<Techniciens />} />
          </Route>

          <Route
            path="/client_panel"
            element={
              <RoleRoute allowedRole="client">
                <DashboardClient />
              </RoleRoute>
            }
          >
            <Route index element={<OverviewClient />} />
            <Route path="chat" element={<Chat />} />
          </Route>

          <Route
            path="/technicien_panel"
            element={
              <RoleRoute allowedRole="technicien">
                <DashboardTechnicien />
              </RoleRoute>
            }
          >
            <Route index element={<OverviewTechnicien />} />
            <Route path="chat" element={<Chat />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
