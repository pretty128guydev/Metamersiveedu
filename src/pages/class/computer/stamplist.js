/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, CardBody } from "../../../components/card/card.jsx";
import { AppSettings } from "../../../config/app-settings.js";
import { useNavigate } from 'react-router-dom';
import BadgeAPI from "../../../api-clients/BadgeApi.js";
import BarsScale from "../../../components/loading/BarsScale.jsx";
import { mock_stamp_list } from "./data.js";
import useLanguageToggle from "../../../hooks/useLanguageToggle.js";

function EvidenceList() {
  const navigate = useNavigate();

  const context = useContext(AppSettings);
  const { student_id } = useParams();

  const [loading, setLoading] = useState(false);
  const { translate } = useLanguageToggle();

  useEffect(() => {
    console.log('hi', student_id)
    setLoading(true);
    BadgeAPI.getEvidenceByUserId({ user_id: "234465" }).then(
      (res) => {
        if (res.data.length) {
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
                <div className="logo-text">{translate("stamp-list")}</div>
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
                        <div className="d-flex flex-wrap">
                          {mock_stamp_list.map((stamp, index) => (
                            <div className="w-25 rounded-circle">
                              <Card style={{ zIndex: "0" }}>
                                <div className="text-primary p-5px">
                                  <div style={{ maxHeight: "250px" }} className="overflow-hidden">
                                    <img src={stamp["img"]} alt="" className="card-img-top rounded-circle" />
                                  </div>
                                </div>
                                <div className="p-5px d-flex justify-content-center">
                                  <p className="card-text text-center">
                                    {
                                      stamp["name"]
                                    }
                                  </p>
                                </div>
                              </Card>
                            </div>
                          ))}
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
