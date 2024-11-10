/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useNavigate } from "react-router-dom";
import { Tabs } from 'antd';
import { Card, CardBody } from "../../../components/card/card.jsx";
import { AppSettings } from "../../../config/app-settings.js";
import { useSelector } from "react-redux";
import clsx from "clsx";
import QBApi from "../../../api-clients/QBApi.js";
import BarsScale from "../../../components/loading/BarsScale.jsx";
import useLanguageToggle from "../../../hooks/useLanguageToggle.js";

// import './subject.scss';

function QBSharedSubject() {
  const context = useContext(AppSettings);
  const userInfo = useSelector((store) => store.auth.userInfo);
  const [tableData, setTableData] = useState([]);
  const [selectedTable, setSelectedTable] = useState();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("shared_to_me");
  const { translate } = useLanguageToggle();

  const navigate = useNavigate();

  const openTopic = (table) => {
    navigate(`${table.subjectId}/topics`, {
      state: { subjectInfo: table },
    });
  };

  useEffect(() => {
    setLoading(true);

    QBApi.getSharedSubjects({ teacher_id: userInfo.uid }).then((res) => {
      setTableData(res.data);
      setLoading(false);
    });

    context.setAppContentFullHeight(true);
    context.setAppContentClass("p-1 ps-xl-4 pe-xl-4 pt-xl-3 pb-xl-3");

    return function cleanUp() {
      context.setAppContentFullHeight(false);
      context.setAppContentClass("");
    };

    // eslint-disable-next-line
  }, []);

  const onSelectTable = (table) => {
    setSelectedTable(table);
  };

  return (
    <div className="h-100 share">
      <Tabs
        type="card"
        activeKey={activeTab}
        onChange={(e) => setActiveTab(e)}
      >
        <Tabs.TabPane
          key="shared_to_me"
          tab="Shared with me"
        >
        {translate("shared-items-with-me")}
        </Tabs.TabPane>
        <Tabs.TabPane
          key="shared_with_others"
          tab="I Shared with the others"
        >
          <Card className={"pos pos-vertical"} id="pos">
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
                        <div>
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
                                        className="pos-checkout-table-container p-3 h-100"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => onSelectTable(table)}
                                        onDoubleClick={() => openTopic(table)}
                                      >
                                        <div className="pos-checkout-table-header">
                                          <div className="status">
                                            <i
                                              className={clsx({
                                                "bi bi-circle-fill text-theme": true,
                                              })}
                                            ></i>
                                          </div>
                                          <div className="d-flex align-items-center justify-content-center">
                                            <div
                                              className="fw-bold"
                                              style={{ fontSize: "20px" }}
                                            >
                                              {table.name.substr(0, 18) +
                                                (table.name.length > 18
                                                  ? "..."
                                                  : "")}
                                            </div>
                                          </div>
                                        </div>
                                        <div className="pos-checkout-table-info small">
                                          <div className="d-flex justify-content-end gx-2">
                                            {table.owner.name}
                                            <i className="bi bi-person-fill"></i>
                                          </div>
                                        </div>
                                      </a>
                                    </Card>
                                  </div>
                                ))
                              ) : (
                                <div className="col-12">
                                  {translate("no-records-found")}
                                </div>
                              )}
                            </div>
                          </PerfectScrollbar>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default QBSharedSubject;
