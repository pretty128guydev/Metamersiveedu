/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState, useRef } from "react";
import { Form, Input, Modal, notification, Button } from 'antd';
import { useParams } from 'react-router-dom';
import PerfectScrollbar from "react-perfect-scrollbar";
import { Card, CardBody, CardHeader } from "../../../components/card/card.jsx";
import { AppSettings } from "../../../config/app-settings.js";
import clsx from "clsx";
import QBApi from "../../../api-clients/QBApi.js";
import BarsScale from "../../../components/loading/BarsScale.jsx";
import { useNavigate } from "react-router-dom";
import { loadingState } from "../../../utils/state";

import './subject.scss';

function PTADminQBSubject() {
  const context = useContext(AppSettings);
  const { teacher_id } = useParams();
  const [tableData, setTableData] = useState([]);
  // const [sharedTableData, setSharedTableData] = useState([]);
  // const [activeTabKey, setActiveTabKey] = useState("myData");
  const [selectedTable, setSelectedTable] = useState();
  const [loading, setLoading] = useState(false);
  const shareRef = useRef();
  const [shareSubjectLoading, setShareSubjectLoading] = useState(
    loadingState.before
  );
  const navigate = useNavigate();
  const [showShareModal, setShowShareModal] = useState(false);

  const openTopic = (table) => {
    navigate(`${table.id}/topics`, {
      state: { classInfo: table },
    });
  };

  useEffect(() => {
    setLoading(true);
    // if (activeTabKey === 'myData') {
    QBApi.getSubjects({ teacher_id }).then((res) => {
      setTableData(res.data);
    }).catch(() => notification.warning({
      message: 'Error',
      description: 'There was an error while getting the subjects. Please reload this page.'
    })).finally(() => setLoading(false));
    // } else if (activeTabKey === 'sharedData') {
    // QBApi.getSharedSubjects({ teacher_id }).then(res => {
    //   console.log('res:', res.data);
    //   setSharedTableData(res.data);
    // }).catch(() => notification.warning({
    //   message: 'Error',
    //   description: 'There was an error while getting the subjects. Please reload this page.'
    // })).finally(() => setLoading(false));
    // }
    context.setAppSidebarNone(true);
    context.setAppContentFullHeight(true);
    context.setAppContentClass("p-1 ps-xl-4 pe-xl-4 pt-xl-3 pb-xl-3");
  }, []);

  const handleShareSubject = (event) => {
    event.preventDefault();

    shareRef.current.validateFields().then(values => {
      setShareSubjectLoading(loadingState.loading);
      QBApi.shareSubject(
        { teacher_id, subject_id: selectedTable.id },
        { share_to: values.email }
      )
        .then(() => notification.success({
          message: 'Success',
          description: `Successfully shared to ${values.email}`
        })).catch(err => {
          notification.warning({
            message: 'Error',
            description: err.response.data.message,
          });
        }).finally(() => {
          setShareSubjectLoading(loadingState.after);
        });
    });
  };

  const onSelectTable = (table) => {
    setSelectedTable(table);
  };

  const renderMyData = () => {
    return (
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
                style={{ height: "120px" }}
              >
                <div
                  className="pos-checkout-table-container d-flex align-items-center justify-content-center"
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
                </div>
              </Card>
            </div>
          ))
        ) : (
          <div className="col-12">No records found</div>
        )
        }
      </div>
    );
  };

  // const renderSharedData = () => {
  //   return (
  //     <div className="row gx-3">
  //       {sharedTableData && sharedTableData.length > 0 ? (
  //         sharedTableData.map((table, index) => (
  //           <div
  //             className="col-xl-3 col-lg-4 col-md-6 pb-3"
  //             key={index}
  //           >
  //             <Card
  //               className={
  //                 "pos-checkout-table in-use" +
  //                 (selectedTable &&
  //                   table.id === selectedTable.id
  //                   ? " selected"
  //                   : "")
  //               }
  //               style={{ height: "120px" }}
  //             >
  //               <div
  //                 className="pos-checkout-table-container d-flex align-items-center justify-content-center"
  //                 style={{ cursor: "pointer" }}
  //                 onClick={() => onSelectTable(table)}
  //                 onDoubleClick={() => openTopic(table.teacher_id, table)}
  //               >
  //                 <div className="pos-checkout-table-header">
  //                   <div className="status">
  //                     <i
  //                       className={clsx({
  //                         "bi bi-circle-fill text-theme": true,
  //                       })}
  //                     ></i>
  //                   </div>
  //                   <div className="d-flex align-items-center justify-content-center">
  //                     <div
  //                       className="fw-bold"
  //                       style={{ fontSize: "20px" }}
  //                     >
  //                       {table.name.substr(0, 18) +
  //                         (table.name.length > 18
  //                           ? "..."
  //                           : "")}
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>
  //             </Card>
  //           </div>
  //         ))
  //       ) : (
  //         <div className="col-12">No records found</div>
  //       )
  //       }
  //     </div>
  //   );
  // };

  return (
    <div className="h-100 share">
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
                      <div className="mx-3 my-2 d-flex justify-content-between">
                        <div
                          className="tool-but"
                          data-bs-toggle="modal"
                          data-bs-target="#modalShowFAQ"
                        >
                          <i className="fa fa-question-circle" />
                        </div>
                      </div>

                      <hr className="m-0" />

                      <PerfectScrollbar className="pos-content-container p-3 h-100">
                        {/* <Tabs
                          type="card"
                          activeKey={activeTabKey}
                          onChange={e => setActiveTabKey(e)}
                          items={[{
                            label: "My Data",
                            key: 'myData',
                            children: renderMyData(),
                          }, {
                            label: "Shared Data",
                            key: 'sharedData',
                            children: renderSharedData(),
                          }]}
                        /> */}
                        {
                          renderMyData()
                        }
                      </PerfectScrollbar>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardBody >
      </Card >

      <Modal
        open={showShareModal}
        onCancel={() => {
          setShowShareModal(false);
          setShareSubjectLoading(loadingState.before);
        }}
        footer={
          selectedTable !== undefined && [(
            <div className="modal-footer" key="footer">
              {shareSubjectLoading === loadingState.before && (
                <Button className="btn btn-outline-theme" onClick={handleShareSubject}>
                  Share
                </Button>
              )}
              {shareSubjectLoading === loadingState.loading && (
                <BarsScale />
              )}
              {shareSubjectLoading === loadingState.after && (
                <Button
                  className="btn btn-outline-theme"
                  onClick={() => {
                    setShowShareModal(false);
                    setShareSubjectLoading(loadingState.before);
                  }}
                >
                  Done
                </Button>
              )}
            </div>
          )
          ]}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <Form className="was-validated mt-5" ref={shareRef}>
              <Form.Item
                name="email"
                label="Share To"
                required
                rules={[{ required: true, message: 'Please input valid email address', type: 'email' }]}
              >
                <Input
                  type="email"
                  placeholder="Please enter email"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>

      <div className="modal fade" id="modalShowFAQ">
        <div className="modal-dialog">
          <div className="modal-content">
            <Card className="mb-3">
              <CardHeader className="d-flex justify-content-between align-items-center">
                FAQ
              </CardHeader>
              <CardBody>
                <div className="mb-3">
                  <div className="d-flex justify-content-center">
                    <h5>FAQ</h5>
                  </div>
                  <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingOne">
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                        >
                          How to&nbsp;<b>Use</b>?
                        </button>
                      </h2>
                      <div
                        id="collapseOne"
                        className="accordion-collapse collapse show"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          Students answer questions without any hint or skip
                          button.
                        </div>
                      </div>
                    </div>

                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingTwo">
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseTwo"
                        >
                          How to&nbsp;<b>Create Questions</b>?
                        </button>
                      </h2>
                      <div
                        id="collapseTwo"
                        className="accordion-collapse collapse show"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          Students must give correct answer to proceed. They can
                          select hint button to get some help to answer the
                          question.If they still fail to answer correctly can
                          select skip button. After which the student will be
                          given correct answer and can press “read” to skip to
                          proceed to next question
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div >
  );
}

export default PTADminQBSubject;
