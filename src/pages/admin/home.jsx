import React, { useEffect, useState } from "react";
import {
  DatePicker,
  Tag,
  notification,
  Row,
  Col,
  Card,
  Button,
  Spin,
  Modal,
} from "antd";
import {
  DeleteFilled,
  CheckCircleFilled,
  StopFilled,
  CheckOutlined,
  StopOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

import { AdminAPI } from "../../api-clients/AdminApi";

import "./home.scss";
import useLanguageToggle from "../../hooks/useLanguageToggle";
import { NavLink } from "react-router-dom";
const { Meta } = Card;

const allowed = "#F2BD27";
const blocked = "#303030";
const expired = "#E0282E";

export const appList = [
  {
    label: "Romeo And Juliet",
    value: "rAndJ",
  },
  {
    label: "Computer Project",
    value: "computer",
  },
  {
    label: "Quiz Game",
    value: "quizGame",
  },
  {
    label: "Village",
    value: "village",
  },
];

export const appTabList = [
  {
    key: "rAndJ",
    tab: "Romeo",
  },
  {
    key: "computer",
    tab: "Computer",
  },
  {
    key: "quizGame",
    tab: "Quiz",
  },
  {
    key: "village",
    tab: "Village",
  },
];

const AdminHome = () => {
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState({});
  const [schoolData, setSchoolData] = useState([]);
  const [activeTab, setActiveTab] = useState({});
  const [showModal, setShowModal] = useState({});
  const [rejectModal, setRejectModal] = useState({});
  const [expireDate, setExpireDate] = useState(dayjs());
  const [approveLoading, setApproveLoading] = useState(false);
  const { translate } = useLanguageToggle();

  useEffect(() => {
    setLoading(true);
    AdminAPI.getSchools({})
      .then((data) => {
        console.log("school Data:", data.data);
        setSchoolData(data.data);

        // Set initial data
        const initialTabState = {};
        data.data.forEach((item) => {
          for (const app of appTabList) {
            if (Object.keys(item).includes(app.key)) {
              initialTabState[`${item.id}`] = app.key;
              return;
            }
          }
        });

        setActiveTab(initialTabState);
      })
      .catch((err) =>
        notification.error({
          message: "Error",
          description: err.response.data.message,
        })
      )
      .finally(() => setLoading(false));
  }, []);

  const handleAction = (id, state) => {
    const icon =
      state === "delete" ? (
        <DeleteFilled />
      ) : state === "allow" ? (
        <CheckCircleFilled />
      ) : (
        <StopFilled />
      );

    Modal.confirm({
      title: `Do you want to ${state}?`,
      icon,
      // content: 'Some descriptions',
      onOk: () => {
        setActionLoading({
          ...actionLoading,
          [`${id}`]: true,
        });
        if (state === "delete") {
          AdminAPI.deleteSchool({ id })
            .then(() => {
              notification.success({
                message: "Success",
                description: "Successfully Deleted the school",
              });

              setSchoolData(schoolData.filter((item) => item.id !== id));
            })
            .catch((err) =>
              notification.error({
                message: "Error",
                description: err.response.data.message,
              })
            )
            .finally(() =>
              setActionLoading({
                ...actionLoading,
                [`${id}`]: false,
              })
            );
        } else {
          AdminAPI.updateSchool({
            id,
            state,
          })
            .then(() => {
              notification.success({
                message: "Success",
                description: "Successfully Updated!",
              });
              setSchoolData(
                schoolData.map((item) => ({
                  ...item,
                  state: id === item.id ? state : item.state,
                }))
              );
            })
            .catch((err) =>
              notification.error({
                message: "Error",
                description: err.response.data.message,
              })
            )
            .finally(() =>
              setActionLoading({
                ...actionLoading,
                [`${id}`]: false,
              })
            );
        }
      },
    });
  };

  const onTabChange = (schoolId, key) => {
    setActiveTab({
      ...activeTab,
      [`${schoolId}`]: key,
    });
  };

  const handleApprove = (schoolId, appType) => {
    const formattedDate = expireDate.format("DD.MM.YYYY").toString();

    setApproveLoading(true);
    AdminAPI.approveApp({
      schoolId,
      appType,
      expireDate: formattedDate,
    })
      .then((data) => {
        console.log("date:", data.data);
        notification.success({
          message: "Success",
          description: `${
            appList.filter((app) => app.value === appType)[0].label
          } has been successfully approved to ${formattedDate}`,
        });

        setSchoolData(
          schoolData.map((school) => {
            if (school.id === schoolId) {
              return {
                ...school,
                [`${appType}`]: {
                  ...school[`${appType}`],
                  expireDate: formattedDate,
                  state: "approved",
                },
              };
            }
            return school;
          })
        );
      })
      .catch((err) =>
        notification.error({
          message: "Error",
          description: err.response.data.message,
        })
      )
      .finally(() => setApproveLoading(false));
  };

  const handleReject = (schoolId, appType) => {
    setApproveLoading(true);
    AdminAPI.rejectApp({
      schoolId,
      appType,
    })
      .then((data) => {
        console.log("date:", data.data);
        notification.success({
          message: "Success",
          description: `${
            appList.filter((app) => app.value === appType)[0].label
          } has been successfully rejected`,
        });

        setSchoolData(
          schoolData.map((school) => {
            if (school.id === schoolId) {
              return {
                ...school,
                [`${appType}`]: {
                  ...school[`${appType}`],
                  state: "rejected",
                },
              };
            }
            return school;
          })
        );
      })
      .catch((err) =>
        notification.error({
          message: "Error",
          description: err.response.data.message,
        })
      )
      .finally(() => setApproveLoading(false));
  };

  return (
    <div className="admin-home">
      <div className="header">
        <div className="info">
          <h3>{translate("welcome-to-admin-homepage")}</h3>
          <Tag color={allowed}>{translate("allowed")}</Tag>
          <Tag color={blocked}>{translate("blocked")}</Tag>
          <Tag color={expired}>{translate("expired")}</Tag>
        </div>
      </div>
      <Row className="body">
        {loading ? (
          <Spin />
        ) : (
          schoolData.map((item) => (
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
              key={item.id}
              className=""
            >
              <Card
                className={item.isTrial ? "trial" : "normal"}
                // loading={actionLoading[`${item.id}`] ? actionLoading[`${item.id}`] : false}
                style={{ width: "100%" }}
                title={item.id}
                extra={<NavLink to={"school/" + item.id}>Detail</NavLink>}
                tabList={appTabList.filter((app) =>
                  Object.keys(item).includes(app.key)
                )}
                activeTabKey={activeTab[`${item.id}`]}
                onTabChange={(key) => onTabChange(item.id, key)}
                actions={[
                  <Button
                    key="allow"
                    onClick={() => handleAction(item.id, "allow")}
                  >
                    <CheckOutlined />
                  </Button>,
                  <Button
                    key="block"
                    onClick={() => handleAction(item.id, "block")}
                  >
                    <StopOutlined />
                  </Button>,
                  <Button
                    key="remove"
                    onClick={() => handleAction(item.id, "delete")}
                  >
                    <DeleteOutlined />
                  </Button>,
                ]}
              >
                {item[`${activeTab[`${item.id}`]}`] && (
                  <Meta
                    title={
                      <div className="title">
                        <p>
                          {appList.filter(
                            (app) => app.value === activeTab[`${item.id}`]
                          ).length > 0
                            ? appList.filter(
                                (app) => app.value === activeTab[`${item.id}`]
                              )[0].label
                            : ""}
                        </p>
                        {item[`${activeTab[`${item.id}`]}`].state &&
                        item[`${activeTab[`${item.id}`]}`].state !==
                          "approved" ? (
                          <Button
                            onClick={() =>
                              setShowModal({ [`${item.id}`]: true })
                            }
                          >
                            {activeTab[`${item.id}`] === "village"
                              ? "Off"
                              : "Approve"}
                          </Button>
                        ) : (
                          <Button
                            onClick={() =>
                              setRejectModal({ [`${item.id}`]: true })
                            }
                          >
                            {activeTab[`${item.id}`] === "village"
                              ? "On"
                              : "Reject"}
                          </Button>
                        )}
                      </div>
                    }
                    description={
                      activeTab[`${item.id}`] === "village" ? (
                        <div className="description">
                          <div className="join">
                            {translate("joined-at")}: {`${item.createdAt}`}
                          </div>
                          <div className="expire">
                            {translate("expire-at")}:{" "}
                            {`${item.village.expireDate || "N/A"}`}
                          </div>
                        </div>
                      ) : (
                        <div className="description">
                          <div className="join">
                            {translate("joined-at")}: {`${item.createdAt}`}
                          </div>
                          <div className="expire">
                            {translate("expire-at")}:{" "}
                            {`${item.expireAt || "N/A"}`}
                          </div>
                          <div className="app-count">
                            {translate("apps-bought")}:{" "}
                            {`${item.appList ? item.appList.length : 0}`}
                          </div>
                          <div className="total-paid">
                            {translate("total-paid")}: $
                            {`${item.totalPaid || 0}`}
                          </div>
                        </div>
                      )
                    }
                  />
                )}
              </Card>
              <Modal
                key={`${item.id} - Approve`}
                title={
                  activeTab[`${item.id}`] === "village"
                    ? "Game Mode"
                    : "Approve"
                }
                className="approve-modal"
                open={showModal[`${item.id}`]}
                footer={[
                  <Button
                    key="confirm"
                    onClick={() => {
                      handleApprove(item.id, activeTab[`${item.id}`]);
                    }}
                    loading={approveLoading}
                  >
                    Confirm
                  </Button>,
                  <Button key="cancel" onClick={() => setShowModal(false)}>
                    Cancel
                  </Button>,
                ]}
              >
                <div className="body">
                  <label>Set Expire Date:</label>
                  <DatePicker
                    value={expireDate}
                    onChange={(e) => setExpireDate(e)}
                  />
                </div>
              </Modal>
              <Modal
                key={`${item.id} - Reject`}
                title={
                  activeTab[`${item.id}`] === "village" ? "Game Mode" : "Reject"
                }
                className="reject-modal"
                open={rejectModal[`${item.id}`]}
                footer={[
                  <Button
                    key="confirm"
                    onClick={() => {
                      handleReject(item.id, activeTab[`${item.id}`]);
                    }}
                    loading={approveLoading}
                  >
                    Confirm
                  </Button>,
                  <Button key="cancel" onClick={() => setRejectModal(false)}>
                    Cancel
                  </Button>,
                ]}
              />
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default AdminHome;
