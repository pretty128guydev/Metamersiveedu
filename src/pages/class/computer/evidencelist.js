/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link, useParams } from "react-router-dom";
import { Card, CardBody } from "../../../components/card/card.jsx";
import { AppSettings } from "../../../config/app-settings.js";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import clsx from "clsx";
import BadgeAPI from "../../../api-clients/BadgeApi.js";
import BarsScale from "../../../components/loading/BarsScale.jsx";
import { mock_evidence_data } from "./data.js";

function EvidenceList() {
  const navigate = useNavigate();

  const context = useContext(AppSettings);
  const { student_id } = useParams();
  const [posMobileSidebarToggled, setPosMobileSidebarToggled] = useState(false);

  const [tableData, setTableData] = useState([]);
  const [selectedTable, setSelectedTable] = useState();
  const [lang, setLang] = useState("ch");

  const [loading, setLoading] = useState(false);

  const userInfo = useSelector((store) => store.auth.userInfo);

  //   const openEditClass = () => {
  //     navigate(`editClass/${selectedTable.id}`, {
  //       state: { classInfo: selectedTable },
  //     });
  //   };
  function toggleMobileSidebar(event, table) {
    event.preventDefault();

    setPosMobileSidebarToggled(true);
    setSelectedTable(table);
  }

  function dismissMobileSidebar(event) {
    event.preventDefault();

    setPosMobileSidebarToggled(false);
    setSelectedTable([]);
  }

  useEffect(() => {
    console.log('hi', student_id)
    setLoading(true);
    BadgeAPI.getEvidenceByUserId({ user_id: "234465" }).then(
      (res) => {
        if (res.data.length) {
          setTableData(res.data);
        }
        setLoading(false);
      }
    );
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
          "pos pos-vertical " +
          (posMobileSidebarToggled ? "pos-mobile-sidebar-toggled" : "")
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
                <div className="logo-text">Evidence List</div>
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
                          <i className="fas fa-lg fa-fw me-2 fa-sign-out-alt"></i> Return
                        </Link>
                      </div>
                      <div className="pos-content-container p-3 h-100">
                        <div className="d-flex flex-wrap mb-3">
                          {
                            mock_evidence_data["meta_group1"].map((item, index) => (
                              <div className="w-50 mb-1 p-2 pt-0" key={item["field"]["en"]}>
                                {item["field"][lang]} : <input className="w-100 mt-1 form-control form-control-md bg-whitebg-opacity-5 border-success" disabled value={item[lang]} />
                              </div>
                            ))
                          }
                        </div>
                        <div className="d-flex mb-3 p-2">
                          <div className="w-100">
                            {mock_evidence_data["people_involved"]["field"][lang]} : <input className="w-100 mt-1  form-control form-control-md bg-whitebg-opacity-5 border-success" disabled value={mock_evidence_data["people_involved"][lang]} />
                          </div>
                        </div>
                        <div className="d-flex flex-column mb-3 p-2">
                          <div className="w-100">
                            {mock_evidence_data["brief_description_of_the_incident"]["field"][lang]} : <textarea className="w-100 mt-1  form-control form-control-md bg-whitebg-opacity-5 border-success" rows={10} disabled>{mock_evidence_data["brief_description_of_the_incident"][lang]}</textarea>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between">
                          <div className="d-flex flex-column mb-3 p-2">
                            <h6><u>{mock_evidence_data["indicate_handling_of_evidence_needed"]["field"][lang]}</u></h6>
                            <ul>
                              {mock_evidence_data["indicate_handling_of_evidence_needed"]["list"].map((item, index) => (
                                <li>
                                  {item[lang]}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="p-3">
                            {mock_evidence_data["req_approoved_by"]["field"][lang]}:
                            <input className={clsx({ "w-100 mt-1 form-control form-control-md bg-whitebg-opacity-5 border-success text-primary": true })} disabled value={mock_evidence_data["req_approoved_by"][lang]} style={{
                              fontFamily: 'cursive',
                              fontSize: '24px',
                            }} />
                          </div>
                        </div>
                        <div className="d-flex flex-column align-items-center mb-3 p-2">
                          <h4><u>{mock_evidence_data["list_of_items_to_be_submitted_into_evidence"]["field"][lang]}</u></h4>
                          <table className="table table-striped table-bordered w-100">
                            <thead>
                              <tr>
                                {mock_evidence_data["list_of_items_to_be_submitted_into_evidence"]["subfield"].map((item, index) => (
                                  <th width={item["width"]}>{item[lang]}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {mock_evidence_data["list_of_items_to_be_submitted_into_evidence"]["list"].map((item, index) => (
                                <tr>
                                  <td>{item["no"]}</td>
                                  <td>{item["description"][lang]}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
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
