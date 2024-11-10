/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState, useRef } from "react";
import { Tooltip, Form, Input, Modal, Tabs, notification, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import PerfectScrollbar from "react-perfect-scrollbar";
import { Card, CardBody, CardHeader } from "../../../components/card/card.jsx";
import { AppSettings } from "../../../config/app-settings.js";
import { useSelector } from "react-redux";
import clsx from "clsx";
import QBApi from "../../../api-clients/QBApi.js";
import BarsScale from "../../../components/loading/BarsScale.jsx";
import { useNavigate } from "react-router-dom";
import { loadingState } from "../../../utils/state";

import './subject.scss';
import useLanguageToggle from "../../../hooks/useLanguageToggle.js";

function QBSubject() {
  const context = useContext(AppSettings);
  const userInfo = useSelector((store) => store.auth.userInfo);
  const [tableData, setTableData] = useState([]);
  const [sharedTableData, setSharedTableData] = useState([]);
  const [activeTabKey, setActiveTabKey] = useState("myData");
  const [selectedTable, setSelectedTable] = useState();
  const [loading, setLoading] = useState(false);
  const shareRef = useRef();
  const [addSubjectLoading, setAddSubjectLoading] = useState(
    loadingState.before
  );
  const { translate } = useLanguageToggle();

  const [shareSubjectLoading, setShareSubjectLoading] = useState(
    loadingState.before
  );
  const navigate = useNavigate();
  const [showShareModal, setShowShareModal] = useState(false);
  const [importModal, importModalContextHolder] = Modal.useModal();
  const [importFileModal, importFileModalContextHolder] = Modal.useModal();

  const modalAddSubject = document.getElementById("modalAddSubject");
  modalAddSubject?.addEventListener("shown.bs.modal", () => {
    const inputName = document.getElementById("subjectName");
    inputName.value = "";
    inputName.focus();
    setAddSubjectLoading(loadingState.before);
  });

  const modalShareSubject = document.getElementById("modalShareSubject");
  modalShareSubject?.addEventListener("shown.bs.modal", () => {
    setShareSubjectLoading(loadingState.before);
  });

  const openTopic = (user_id, table) => {
    navigate(`${user_id}/${table.id}/topics`, {
      state: { classInfo: table },
    });
  };

  useEffect(() => {
    setLoading(true);
    if (activeTabKey === 'myData') {
      QBApi.getSubjects({ teacher_id: userInfo.uid }).then((res) => {
        setTableData(res.data);
      }).catch(() => notification.warning({
        message: 'Error',
        description: 'There was an error while getting the subjects. Please reload this page.'
      })).finally(() => setLoading(false));
    } else if (activeTabKey === 'sharedData') {
      QBApi.getSharedSubjects({ teacher_id: userInfo.uid }).then(res => {
        console.log('res:', res.data);
        setSharedTableData(res.data);
      }).catch(() => notification.warning({
        message: 'Error',
        description: 'There was an error while getting the subjects. Please reload this page.'
      })).finally(() => setLoading(false));
    }
    context.setAppSidebarNone(false);
    context.setAppContentFullHeight(true);
    context.setAppContentClass("p-1 ps-xl-4 pe-xl-4 pt-xl-3 pb-xl-3");

    return function cleanUp() {
      context.setAppContentFullHeight(false);
      context.setAppContentClass("");
    };
  }, [activeTabKey]);

  const handleAddSubject = (event) => {
    event.preventDefault();
    const subjectName = event.target.subjectName.value;

    if (subjectName !== "") {
      setAddSubjectLoading(loadingState.loading);

      QBApi.addSubject(
        { teacher_id: userInfo.uid }, //query
        { subject_name: subjectName } //body
      )
        .then((res) => {
          setTableData([
            ...tableData,
            { id: res.data.docId, name: subjectName },
          ]);
          setAddSubjectLoading(loadingState.after);
        })
        .catch((_) => {
          setAddSubjectLoading(loadingState.after);
        });
    }
  };

  const handleShareSubject = (event) => {
    event.preventDefault();

    shareRef.current.validateFields().then(values => {
      setShareSubjectLoading(loadingState.loading);
      QBApi.shareSubject(
        { teacher_id: userInfo.uid, subject_id: selectedTable.id },
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

  const handleDeleteSubject = async () => {
    if (!selectedTable) {
      alert("You must select subject to delete.");
      return;
    }

    await QBApi.deleteSubject({
      teacher_id: userInfo.uid,
      subject_id: selectedTable.id
    }).then(async res => {
      setLoading(true);

      await QBApi.getSubjects({ teacher_id: userInfo.uid }).then((res) => {
        setTableData(res.data);
        setLoading(false);
      });

      setLoading(false);
    });
  }

  const onSelectTable = (table) => {
    setSelectedTable(table);
  };

  const renderMyData = () => {
    return (
      <div className="row gx-3">
        <div className="col-xl-3 col-lg-4 col-md-6 pb-3">
          <Card
            className="pos-checkout-table card_hover"
            style={{ height: "120px" }}
          >
            <button
              className="btn pos-checkout-table-container"
              data-bs-toggle="modal"
              data-bs-target="#modalAddSubject"
            >
              <div className="pos-checkout-table-header">
                <div className="status">
                  <i
                    className={clsx({
                      "bi bi-circle-fill text-theme": true,
                    })}
                  ></i>
                </div>
                <div className="fw-bold display-6">+</div>
                <div className="text-primary text-opacity-50">
                  {translate("no-subject")}
                </div>
              </div>
            </button>
          </Card>
        </div>
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
                  onDoubleClick={() => openTopic(userInfo.uid, table)}
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
          <div className="col-12"> {translate("no-records-found")}</div>
        )}
      </div>
    );
  };

  const renderSharedData = () => {
    return (
      <div className="row gx-3">
        {sharedTableData && sharedTableData.length > 0 ? (
          sharedTableData.map((table, index) => (
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
                  onDoubleClick={() => openTopic(table.teacher_id, table)}
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
          <div className="col-12"> {translate("no-records-found")}</div>
        )}
      </div>
    );
  };

  const handleShareToCSV = () => {
    if (!selectedTable) {
      notification.warning({
        message: 'Warning!',
        description: "You must select subject to share"
      });

      return;
    }
    setLoading(true);
    QBApi.shareToCSV({
      teacher_id: userInfo.uid, subject_id: selectedTable.id
    }).then(data => {
      Modal.info({
        title: 'Share Information',
        content: (
          <div className="share-info">
              <h4> {translate("csv-url")}:</h4>
              <p>{translate("csv-url-text")}</p>
            <span>
              <p>{`${data.data.uploadFileUrl}`}</p>
               <Button
                  onClick={() => handleCopyFileUrl(data.data.uploadFileUrl)}
                >
                  {translate("copy")}
                  <i className="fa fa-copy ms-2" />
                </Button>
            </span>
          </div>
        ),
      });
    }).catch(err => {
      notification.error({
        message: 'Error',
        description: err.response.data.message,
      });
    }).finally(() => setLoading(false));
  };

  const handleUploadCSV = (options) => {
    const { file, onSuccess, onError } = options;

    const formData = new FormData();
    formData.append('csvFile', file);

    QBApi.uploadCSV({
      subject_id: selectedTable.id,
      teacher_id: userInfo.uid,
    }, formData).then((data) => {
      notification.success({
        message: 'Success',
        description: data.data.message,
      });
      onSuccess();
    }).catch(err => {
      onError(err);
    });
  };

  const handleUploadFile = (options) => {
    const { file, onSuccess, onError } = options;
    console.log('file:', file);

    const formData = new FormData();
    formData.append('file', file);

    QBApi.uploadFile({
      subject_id: selectedTable.id,
      teacher_id: userInfo.uid,
    }, formData).then((data) => {
      notification.success({
        message: 'Success',
        description: data.data.message,
      });
      onSuccess();
    }).catch(err => {
      onError(err);
    });
  };

  const handleImportFromCSV = () => {
    if (!selectedTable) {
      notification.warning({
        message: 'Warning!',
        description: "Please select a subject you wanna import to"
      });

      return;
    }

    importModal.confirm({
      title: 'Import CSV to Question Bank',
      content: (
        <>
          <Upload
            accept=".csv"
            style={{ width: '100%' }}
            customRequest={handleUploadCSV}
          >
            <Button icon={<UploadOutlined />}>
              {" "}
              {translate("click-to-import-csv-text")}
            </Button>
          </Upload>
        </>
      ),
    });
  };

  const handleCopyFileUrl = async (fileUrl) => {
    navigator.clipboard.writeText(fileUrl).then(() => {
      notification.success({
        message: "Copied!",
        description: "Successfully copied to the clipboard",
      });
    }).catch(err => notification.warning({
      message: 'Error!',
      description: 'There was an error while coping to the clipboard, Please Try Again.',
    }));
  };

  const handleImportFile = () => {
    importFileModal.confirm({
      title: 'Import File to Question Bank',
      content: (
        <>
          <Upload
            accept=".pdf"
            style={{ width: '100%' }}
            customRequest={handleUploadFile}
          >
            <Button icon={<UploadOutlined />}>
              {translate("click-to-import-file")}
            </Button>
          </Upload>
        </>
      ),
    });
  };

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
                          <Tooltip placement="bottom" title="Frequently Asked Questions">
                            <i className="fa fa-question-circle" />
                          </Tooltip>
                        </div>
                        <div className="d-flex gx-4">
                          <div
                            className="tool-but"
                            onClick={() => {
                              if (!selectedTable) {
                                notification.warning({
                                  message: "Warning!",
                                  description: "You must select subject to share.",
                                });

                                return;
                              }
                              setShowShareModal(true);
                            }}
                          >
                            <Tooltip placement="bottom" title="Share to Other Teacher">
                              <i className="fas fa-lg fa-fw me-2 fa-share-alt" />
                            </Tooltip>
                          </div>
                          <div
                            className="tool-but"
                            onClick={handleShareToCSV}
                          >
                            <Tooltip placement="bottom" title="Share With CSV file">
                              <i className="fas fa-lg fa-fw me-2 fa-file-csv" />
                            </Tooltip>
                          </div>
                          <div
                            className="tool-but"
                            onClick={handleImportFile}
                          >
                            <Tooltip placement="bottom" title="Import from file">
                              <i className="fas fa-lg fa-fw me-2 fa-file" />
                            </Tooltip>
                          </div>
                          {{ ...importFileModalContextHolder, key: 'enter' }}
                          <div
                            className="tool-but" onClick={handleImportFromCSV}
                          >
                            <Tooltip placement="bottom" title="Import from CSV file">
                              <i className="fa-lg fa-solid fa-file-import me-2" />
                            </Tooltip>
                          </div>
                          {importModalContextHolder}
                          <div
                            className="tool-but"
                            onClick={handleDeleteSubject}
                          >
                            <Tooltip placement="bottom" title="Delete the subject">
                              <i className="far fa-lg fa-fw me-2 fa-trash-alt" />
                            </Tooltip>
                          </div>
                        </div>
                      </div>

                      <hr className="m-0" />

                      <PerfectScrollbar className="pos-content-container p-3 h-100">
                        <Tabs
                          type="card"
                          activeKey={activeTabKey}
                          onChange={(e) => setActiveTabKey(e)}
                          items={[
                            {
                              label: translate("my-data"),
                              key: "myData",
                              children: renderMyData(),
                            },
                            {
                              label: translate("shared-data"),
                              key: "sharedData",
                              children: renderSharedData(),
                            },
                          ]}
                        />
                      </PerfectScrollbar>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardBody >
      </Card >

      <div className="modal fade" id="modalAddSubject">
        <div className="modal-dialog">
          <div className="modal-content">
            <form className="was-validated" onSubmit={handleAddSubject}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">
                    {translate("subject-name")}
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={
                      "form-control form-control-lg bg-white bg-opacity-5"
                    }
                    id="subjectName"
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                {addSubjectLoading === loadingState.before && (
                  <button type="submit" className="btn btn-outline-theme">
                    {translate("save")}
                  </button>
                )}
                {addSubjectLoading === loadingState.loading && <BarsScale />}
                {addSubjectLoading === loadingState.after && (
                  <button
                    type="button"
                    className="btn btn-outline-theme"
                    data-bs-dismiss="modal"
                  >
                    {translate("done")}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

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
                <Button
                  className="btn btn-outline-theme"
                  onClick={handleShareSubject}
                >
                  {translate("share")}
                </Button>
              )}
              {shareSubjectLoading === loadingState.loading && <BarsScale />}
              {shareSubjectLoading === loadingState.after && (
                <Button
                  className="btn btn-outline-theme"
                  onClick={() => {
                    setShowShareModal(false);
                    setShareSubjectLoading(loadingState.before);
                  }}
                >
                  {translate("done")}
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
                {translate("faq")}
              </CardHeader>
              <CardBody>
                <div className="mb-3">
                  <div className="d-flex justify-content-center">
                    <h5>{translate("faq")}</h5>
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
                          {translate("how-to")}
                          &nbsp;<b>{translate("use")}</b>?
                        </button>
                      </h2>
                      <div
                        id="collapseOne"
                        className="accordion-collapse collapse show"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          {translate("students-answer-without-hint-text")}
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
                          {translate("how-to")}
                          &nbsp;
                          <b>{translate("create-questions")}</b>?
                        </button>
                      </h2>
                      <div
                        id="collapseTwo"
                        className="accordion-collapse collapse show"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          {translate("how-to-create-questions-text-detail")}
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

export default QBSubject;
