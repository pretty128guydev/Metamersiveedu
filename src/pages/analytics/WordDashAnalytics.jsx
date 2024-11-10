import React, {useEffect, useState, useContext} from 'react';
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link, useNavigate } from "react-router-dom";
import WordApi from '../../api-clients/WordApi';
import { Card, CardBody } from "../../components/card/card.jsx";
import { useSelector } from 'react-redux';
import { AppSettings } from "../../config/app-settings.js";
import clsx from "clsx";

import BarsScale from "../../components/loading/BarsScale.jsx";

const WordDashAnalytics = () => {
    const navigate = useNavigate();
    const context = useContext(AppSettings);
    const [loading, setLoading] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [selectedTable, setSelectedTable] = useState();
    const [posMobileSidebarToggled, setPosMobileSidebarToggled] = useState(false);
    const userInfo = useSelector(store => store.auth.userInfo);

    useEffect(() => {
        setLoading(true);

        WordApi.getClassroomsByTeacherId({ teacher_id: userInfo.uid }).then(res => {
            console.log('d:', res.data)
            setTableData(res.data);
        }).catch(err => {
            console.log('err:', err);
        }).finally(() => setLoading(false));

        context.setAppContentFullHeight(true);
        context.setAppContentClass("p-1 ps-xl-4 pe-xl-4 pt-xl-3 pb-xl-3");

    return function cleanUp() {
      context.setAppContentFullHeight(false);
      context.setAppContentClass("");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

    const openDetail = () => {
        navigate(`view/${selectedTable.id}`, {
          state: { classInfo: selectedTable },
        });
      };

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
          <div className="pos-content">
            <div className="pos">
              <div className="pos-container">
                <div className="pos-content h-100">
                  {loading ? (
                    <div className="d-flex align-items-center justify-content-center h-100">
                      <BarsScale />
                    </div>
                  ) : (
                    <PerfectScrollbar className="pos-content-container p-3 h-100">
                      <div className="row gx-3">
                        {tableData && tableData.length > 0 ? (
                          tableData.map((table, index) => (
                            <div
                              className="col-xl-3 col-lg-4 col-md-6 pb-3"
                              key={index}
                            >
                              <Card
                                className={
                                  "pos-checkout-table in-use" +
                                  (selectedTable &&
                                    table.id === selectedTable.id
                                    ? " selected"
                                    : "")
                                }
                              >
                                <a
                                  href="#/"
                                  className="pos-checkout-table-container"
                                  onClick={(event) =>
                                    toggleMobileSidebar(event, table)
                                  }
                                >
                                  <div className="pos-checkout-table-header">
                                    <div className="status">
                                      <i
                                        className={clsx({
                                          "bi bi-circle-fill text-theme": true,
                                        })}
                                      ></i>
                                    </div>
                                    <div className="fw-bold">Class</div>
                                    <div className="fw-bold display-6">
                                      {table.name.substr(0, 5) +
                                        (table.name.length > 5 ? "..." : "")}
                                    </div>
                                    <div className="text-primary text-opacity-50">
                                      ID: {table.id}
                                    </div>
                                  </div>
                                </a>
                              </Card>
                            </div>
                          ))
                        ) : (
                          <div className="col-12">No records found</div>
                        )}
                      </div>
                    </PerfectScrollbar>
                  )}
                </div>

                <div className="pos-sidebar" id="pos-sidebar">
                  <div className="pos-sidebar-header">
                    <div className="back-btn">
                      <button
                        type="button"
                        onClick={dismissMobileSidebar}
                        className="btn"
                      >
                        <i className="bi bi-chevron-left"></i>
                      </button>
                    </div>
                    <div className="title">
                      <Link className="icon" to="/home">
                        <i className="fas fa-lg fa-fw me-2 fa-sign-out-alt"></i>{" "}
                        Return
                      </Link>
                    </div>
                    <div className="order">
                      ID:{" "}
                      <b className="text-theme">
                        {selectedTable ? selectedTable.id : "-"}
                      </b>
                    </div>
                  </div>
                  <hr className="m-0 opacity-3 text-primary" />
                  <PerfectScrollbar className="pos-sidebar-body">
                    <div>
                      <div className="py-3 px-3">
                        <div className="mb-3">
                          <h5>{selectedTable?.name}</h5>
                        </div>
                        <div className="mb-3">{selectedTable?.description}</div>
                      </div>
                    </div>
                  </PerfectScrollbar>

                  {selectedTable && (
                    <div className="pos-sidebar-footer">
                      <div className="mt-3">
                        <div className="btn-group d-flex">
                          <div
                            className="btn btn-outline-theme rounded-0 w-150px"
                            onClick={openDetail}
                          >
                            <i className="fas fa-lg fa-fw fa-chart-line"></i>
                            <br />
                            <span className="small">View Analytics</span>
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
};

export default WordDashAnalytics;