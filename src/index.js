import React from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  useRoutes,
  useLocation,
  Routes,
  Route,
} from "react-router-dom";
import AppRoute from "./config/app-route.jsx";
import { Tolgee, DevTools, TolgeeProvider, FormatSimple } from "@tolgee/react";

// bootstrap
import "bootstrap";

// css
import "bootstrap-icons/font/bootstrap-icons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "./index.css";
import "./scss/styles.scss";

import { Provider } from "react-redux";
import { store } from "./redux-store";
import AdminHome from "./pages/admin/home.jsx";
import AdminLayout from "./pages/admin/adminLayout.jsx";
import AdminRequests from "./pages/admin/requests.jsx";

import "./translations/conifg.js";

const tolgee = Tolgee()
  .use(DevTools())
  .use(FormatSimple())
  .init({
    availableLanguages: ["en", "zh"],
    defaultLanguage: "en",
    apiUrl: process.env.REACT_APP_TOLGEE_APP_API_URL,
    projectId: process.env.REACT_APP_TOLGEE_APP_PROJECT_ID,
    apiKey: process.env.REACT_APP_TOLGEE_APP_API_KEY,
  });

console.log("tolgee:", process.env.REACT_APP_TOLGEE_APP_API_URL);

const container = document.getElementById("root");
const root = createRoot(container);
function App() {
  let element = useRoutes(AppRoute);
  let location = useLocation();

  // on every route change
  React.useEffect(() => {
    var elm = document.querySelector(".app");
    if (elm) {
      elm.classList.remove("app-sidebar-mobile-toggled");
    }
  }, [location]);

  return element;
}

const AdminApp = () => {
  const route = [
    {
      // path: '',
      children: [
        {
          path: "*",
          // element: <AdminHome />,
          element: <AdminRequests />,
        },
        {
          path: "school/:schoolId/*",
          element: <AdminLayout />,
        },
      ],
    },
  ];
  let element = useRoutes(route);
  return element;
};

root.render(
  <BrowserRouter>
    <TolgeeProvider tolgee={tolgee} fallback="Loading...">
      {/* <div style={{
        position: 'fixed',
        left: '20px',
        top: 'calc(50%)',
        zIndex: '1000'
      }}>
        <Button className="me-1" onClick={() => {
          tolgee.changeLanguage('en');
        }}>English</Button>
        <Button className="ms-1" onClick={() => {
          tolgee.changeLanguage('zh').then(() => console.log('changed'))
            .catch(err => console.log('changing errror:', err))
        }}>Chinese</Button>
      </div> */}
      <Provider store={store}>
        <Routes>
          <Route path="/admin/*" element={<AdminApp />} />
          <Route path="*" element={<App />} />
        </Routes>
      </Provider>
    </TolgeeProvider>
  </BrowserRouter>
);
