/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, CardBody } from "../../../components/card/card.jsx";
import { AppSettings } from "../../../config/app-settings.js";
import { useNavigate } from 'react-router-dom';
import clsx from "clsx";
import BarsScale from "../../../components/loading/BarsScale.jsx";
import { mock_missing_item } from "./data.js";
import useLanguageToggle from "../../../hooks/useLanguageToggle.js";

function EvidenceList() {
  const navigate = useNavigate();

  const context = useContext(AppSettings);
  const { student_id } = useParams();
  // const [posMobileSidebarToggled, setPosMobileSidebarToggled] = useState(false);

  // const [lang, setLang] = useState("ch");
  const lang = 'ch';
  const { translate } = useLanguageToggle();

  // const [loading, setLoading] = useState(false);
  const loading = false;

  useEffect(() => {
    console.log('hi', student_id)
    // context.setAppHeaderNone(true);
    // context.setAppSidebarNone(true);
    context.setAppContentFullHeight(true);
    context.setAppContentClass("p-1 ps-xl-4 pe-xl-4 pt-xl-3 pb-xl-3");

    return function cleanUp() {
      // context.setAppHeaderNone(false);
      // context.setAppSidebarNone(false);
      context.setAppContentFullHeight(false);
      context.setAppContentClass("");
    };

    // eslint-disable-next-line
  }, []);

  function goBack() {
    navigate(-1);
  }

  return (
    <div className="h-100">
      <Card
        className={
          "pos pos-vertical "
        }
        id="pos"
      >
        <CardBody className="pos-container">
          <div className="pos-header d-flex justify-content-between">
            <div className="logo">
              <Link to="#/" href="pos_counter_checkout.html">
                <div className="logo-img">
                  <i
                    className="bi bi-x-diamond"
                    style={{ fontSize: "1.5rem" }}
                  ></i>
                </div>
                <div className="logo-text">{translate("missing-item")}</div>
              </Link>
            </div>
          </div>

          <div className="pos-content">
            <div className="pos">
              <div className="pos-container">
                <div className="pos-content h-100">
                  {loading ? (
                    <div className="d-flex align-items-center justify-content-center h-100">
                      <BarsScale />
                    </div>
                  ) : (
                    <div>
                      <div className="m-4 mt-3 mb-0">
                        <Link className="icon" to="" onClick={goBack}>
                          <i className="fas fa-lg fa-fw me-2 fa-sign-out-alt"></i>{" "}
                          {translate("return")}
                        </Link>
                      </div>
                      <div className="pos-content-container p-3 h-100">
                        <div className="d-flex flex-wrap mb-3">
                          {
                            mock_missing_item["meta_group1"].map((item, index) => (
                              <div className="w-50 mb-1 p-2 pt-0" key={item["field"]["en"]}>
                                {item["field"][lang]} :
                                {
                                  item["isSign"] ?
                                    <input className={clsx({ "w-100 mt-1 form-control form-control-md bg-whitebg-opacity-5 border-success text-primary": true })} disabled value={item[lang]} style={{
                                      fontFamily: 'cursive',
                                      fontSize: '24px',
                                    }} />
                                    :
                                    <input className={clsx({ "w-100 mt-1 form-control form-control-md bg-whitebg-opacity-5 border-success": true })} disabled value={item[lang]} />
                                }
                              </div>
                            ))
                          }
                        </div>
                        <div className="d-flex flex-column align-items-center mb-3 p-2">
                          <h4><u>{mock_missing_item["description_of_missing_item"]["field"][lang]}</u></h4>
                        </div>
                        <div className="d-flex flex-column mb-3 p-2">
                          <div className="w-100">
                            {mock_missing_item["brief_description_given_by_victim/witness"]["field"][lang]} : <textarea className="w-100 mt-1  form-control form-control-md bg-whitebg-opacity-5 border-success" rows={10} disabled value={mock_missing_item["brief_description_given_by_victim/witness"][lang]} />
                          </div>
                        </div>
                        <div className="d-flex mb-3 p-2">
                          <div className="w-100">
                            {mock_missing_item["quantity_missing"]["field"][lang]} : <input className="w-100 mt-1  form-control form-control-md bg-whitebg-opacity-5 border-success" disabled value={mock_missing_item["quantity_missing"][lang]} />
                          </div>
                        </div>
                        <div className="d-flex mb-3 p-2">
                          <div className="d-flex flex-column mb-3 w-50">
                            <h6><u>{mock_missing_item["indicate_handling_of_evidence_needed"]["field"][lang]}</u></h6>
                            <ul>
                              {mock_missing_item["indicate_handling_of_evidence_needed"]["list"].map((item, index) => (
                                <li key={item[lang]}>
                                  {item[lang]}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="d-flex flex-column w-50">
                            <h6><u>{mock_missing_item["specifies"]["field"][lang]}</u></h6>
                            <ul>
                              {mock_missing_item["specifies"]["list"].map((item, index) => (
                                <li key={item[lang]}>
                                  {item[lang]}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="d-flex flex-column mb-3 p-2">
                          <div className="w-100">
                            {mock_missing_item["picture_of_item"]["field"][lang]} : <textarea className="w-100 mt-1  form-control form-control-md bg-whitebg-opacity-5 border-success" rows={10} disabled value={mock_missing_item["picture_of_item"][lang]} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default EvidenceList;
