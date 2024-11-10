import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, notification, Table } from 'antd';
import { Link } from 'react-router-dom';
import Column from 'antd/es/table/Column';

import { Card } from '../../components/card/card';
import { SGPTAPI } from '../../api-clients/SGPTApi';
import { AppSettings } from "../../config/app-settings";
import { appItems } from '../sg-admin/SGAdminLayout';

import "./PTAdminLayout.scss";
import useLanguageToggle from "../../hooks/useLanguageToggle";

const PTAdminLayout = () => {
  const context = useContext(AppSettings);
  const userInfo = useSelector((store) => store.auth.userInfo);
  const [loading, setLoading] = useState(false);
  const [teacherData, setTeacherData] = useState([]);
  const { translate } = useLanguageToggle();
  useEffect(() => {
    context.setAppSidebarNone(true);

    setLoading(true);
    SGPTAPI.getTeachersBySchoolId({ schoolId: userInfo.schoolId }).then(data => {
      console.log('d:', data.data);
      setTeacherData(data.data.map(item => ({ key: item.id, ...item })));
    }).catch(err => notification.error({
      message: 'Error',
      description: err.response.data.message,
    })).finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderAction = (text, record, index) => {
    return (
      <Link to={`QB/${record.id}/subjects`}>Show Question Bank</Link>
    );
  };

  return (
    <div className="pt-admin-layout">
      {translate("welcome-principal-admin-text")}
      <Row className='body'>
        {
          Object.keys(userInfo.ptAdmin).map(key => {
            if (userInfo.ptAdmin[key]) {
              return (
                <Col className="app-item" span={24} key={`item-${key}`} onClick={() => {
                  document.getElementById(`link-to-${key}`).click();
                }}>
                  <Link to={`${key}`} hidden id={`link-to-${key}`} />
                  {
                    appItems.filter(app => app.type === key).map(app => {
                      return (
                        <div className="card-container" key={app.type}>
                          <Card>
                            <div className="card-back">
                              <img src={app.image} alt="" className="card-img-top" />
                            </div>
                            <div className="body">
                              <h5>{app.text}</h5>
                            </div>
                          </Card>
                        </div>
                      );
                    })
                  }
                </Col>
              );
            } else {
              return <div key={`item-${key}`} />;
            }
          })
        }
      </Row>
      <Table
        loading={loading}
        dataSource={teacherData}
      >
        <Column title="Name" key="name" dataIndex="name" />
        <Column title="Email" key="email" dataIndex="email" />
        <Column title="Action" key="action" render={renderAction} />
      </Table>
    </div>
  );
};

export default PTAdminLayout;