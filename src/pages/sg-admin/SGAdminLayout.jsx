import React, { useEffect, useContext, useState } from 'react';
import { Spin, Row, Col, Button, Modal, Input, notification, Form, Select, InputNumber, Collapse } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { SGPTAPI } from '../../api-clients/SGPTApi';
import { AppSettings } from "../../config/app-settings";
import { Card } from "./../../components/card/card.jsx";
import RomeoJuliet from "../../assets/img/RomeoJuliet.jpg";
import QuizGame from "../../assets/img/QuizGame.png";
import ComputerProjectImg from "../../assets/img/Computer.png";

import "./SGAdminLayout.scss";
import useLanguageToggle from "../../hooks/useLanguageToggle";

const { Panel } = Collapse;

export const appItems = [{
  text: 'Romeo and Juliet',
  image: RomeoJuliet,
  type: 'rAndJ',
}, {
  text: 'Quiz Game',
  image: QuizGame,
  type: 'quizGame',
}, {
  text: 'Computer Project',
  image: ComputerProjectImg,
  type: 'computer',
}];

export const payMethod = [{
  label: 'Online Payment (Under Update)',
  value: 'online',
  disabled: true,
}, {
  label: 'Manual Payment',
  value: 'manual',
}];

export const currenyList = [{
  label: 'USD (United States Dollar)',
  value: 'USD',
}, {
  label: 'HKD (Hong Kong Dollar)',
  value: 'HKD',
}, {
  label: 'CNY (Chinese Yen)',
  value: 'CNY',
}];

const SGAdminLayout = () => {
  const context = useContext(AppSettings);
  const [loading, setLoading] = useState(false);
  const [schoolData, setSchoolData] = useState({});
  const [visible, setVisible] = useState({});
  const [buyVisible, setBuyVisible] = useState({});
  const [buyLoading, setBuyLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState({});
  const [currentCurrency, setCurrentCurrency] = useState('USD');
  const [email, setEmail] = useState('');
  const [form] = Form.useForm();
  const userInfo = useSelector((store) => store.auth.userInfo);
  const { translate } = useLanguageToggle();

  useEffect(() => {
    context.setAppSidebarNone(true);

    setLoading(true);
    SGPTAPI.getSchoolData({
      schoolId: userInfo.schoolId,
    }).then(data => {
      console.log('dat:', data);
      setSchoolData(data.data);
    }).catch(err => {
      notification.error({
        message: 'Error',
        description: err.response.data.message,
      });
    }).finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openModal = (type) => {
    setVisible({
      [`${type}`]: true,
    });
  };

  const handleSetPrincipal = (type) => {
    setUpdateLoading({
      [`${type}`]: true,
    });

    SGPTAPI.updatePrincipalTeacher({
      schoolId: userInfo.schoolId,
      type,
      email,
    }).then(data => {
      setSchoolData({
        ...schoolData,
        [`${type}`]: {
          ...schoolData[`${type}`],
          ptTeacher: {
            name: data.data.name,
            id: data.data.id,
          },
        }
      });
      setVisible({
        [`${type}`]: false
      });
      notification.success({
        message: 'Success',
        description: 'Successfully updated Principal Teacher',
      });
    }).catch(err => notification.warning({
      message: 'Error',
      description: err.response.data.message,
    })).finally(() => {
      setUpdateLoading({
        [`${type}`]: false,
      });
    });
  };

  const handleConfirm = (appType) => {
    form.validateFields().then(data => {
      setBuyLoading(true);
      SGPTAPI.buyApp({
        schoolId: userInfo.schoolId,
        appType,
        ...data,
      }).then(data => {
        setSchoolData({
          ...schoolData,
          ...data.data,
        });
        setBuyVisible({ [`${appType}`]: false });
      }).catch(err => notification.error({
        message: 'Error',
        description: err.response.data.message,
      })).finally(() => setBuyLoading(false));
    });
  };

  const handleShowFAQ = () => {
    Modal.info({
      title: 'FAQ for Admin Page',
      width: '',
      content: (
        <Collapse defaultActiveKey={['1']}>
          <Panel header="Question: Where can I create class?" key="1">
            <div className='d-flex'>
              <h5 className='me-2'>Answer:</h5>
              <p className='text-primary'>
                Every apps has its own class.
                You can create class by pressing this
              </p>
            </div>
          </Panel>
        </Collapse>
      )
    });
  };

  return (
    <div className="sg-admin-layout">
      <div className='d-flex justify-content-between align-items-center'>
        <h4 className='ms-2'>Welcome to School Group Admin Page!</h4>
        <Button onClick={handleShowFAQ}>FAQ</Button>
      </div>
      <div className='px-3'>
        <h5> Your School Infomation:</h5>
        <p>{`School ID: ${userInfo.schoolId}`}</p>
        <p>{`School Admin Name: ${userInfo.schoolEmail}`}</p>
        <p>{`School Email: ${userInfo.email}`}</p>
        <p>{`School Website: ${userInfo.websiteUrl}`}</p>
      </div>
      <Row className="body">
        {
          loading ? <Spin /> :
            appItems.map((item, index) => {
              return (
                <Col xs={24} sm={12} md={8} lg={8} xl={8} key={`item-${index + 1}`}>
                  <div className="card-container">
                    <Card>
                      <div className="card-back">
                        <img src={item.image} alt="" className="card-img-top" />
                      </div>
                      <div className="body">

                        <h5>{item.text}</h5>
                        {
                          schoolData[`${item.type}`] && schoolData[`${item.type}`].state === 'approved' &&
                          <div>
                            <div className="show-pt">
                              {`Principal Teacher: ${schoolData[`${item.type}`] && schoolData[`${item.type}`].ptTeacher ? schoolData[`${item.type}`].ptTeacher.name : 'None'}`}
                            </div>
                            <Button onClick={e => openModal(item.type)}>{translate("set-principal-teacher")}</Button>
                            <div className="expire-date">
                              {`Expire Date: ${schoolData[`${item.type}`].expireDate}`}
                            </div>
                          </div>
                        }
                        {
                          schoolData[`${item.type}`] && schoolData[`${item.type}`].state === 'requesting' &&
                          <div>
                            <p>Request Date: {schoolData[`${item.type}`].requestDate}</p>
                            <p>Purchased Amount: {`${schoolData[`${item.type}`].amount}${schoolData[`${item.type}`].currency}`}</p>
                          </div>
                        }
                        {
                          (!schoolData[`${item.type}`] || schoolData[`${item.type}`].state === 'none') &&
                          <div>
                            <Button onClick={() => setBuyVisible({ [`${item.type}`]: true })}>Buy</Button>
                            <Modal
                              className='buy-modal'
                              open={buyVisible[`${item.type}`]}
                              footer={[
                                <Button key="confirm" loading={buyLoading} onClick={() => handleConfirm(item.type)}>Confirm</Button>,
                                <Button onClick={() => setBuyVisible({ [`${item.type}`]: false })} key="cancel">Cancel</Button>
                              ]}
                            >
                              <h3>{`Buy ${item.text}`}</h3>
                              <Form
                                form={form}
                                initialValues={{
                                  currency: currentCurrency,
                                }}
                              >
                                <Form.Item
                                  required
                                  name="payMethod"
                                  label="Payment Method"
                                  rules={[{ required: true, message: 'Please select Payment Method' }]}
                                >
                                  <Select
                                    options={payMethod}
                                  />
                                </Form.Item>
                                <Form.Item
                                  name="currency"
                                  label="Select Currency"
                                >
                                  <Select
                                    options={currenyList}
                                    onChange={e => setCurrentCurrency(e)}
                                  />
                                </Form.Item>
                                <Form.Item
                                  required
                                  name="amount"
                                  label="Input Amount"
                                  rules={[{ required: true, message: 'Please input amount' }]}
                                >
                                  <InputNumber prefix={currentCurrency} min={1} max={10000000000} step={0.5} />
                                </Form.Item>
                              </Form>
                            </Modal>
                          </div>
                        }
                      </div>
                    </Card>
                    <Modal
                      open={visible[`${item.type}`]}
                      onOk={() => handleSetPrincipal(item.type)}
                      onCancel={() => setVisible({ [`${item.type}`]: false })}
                      maskClosable={false}
                      confirmLoading={updateLoading[`${item.type}`]}
                    >
                      <p>{`Please write ${item.text} Principal Teacher's email`}</p>
                      <Input value={email} onChange={e => setEmail(e.target.value)} />
                    </Modal>
                    {
                      schoolData[`${item.type}`] && schoolData[`${item.type}`].state === 'approved' &&
                      <div className='link-tab'>
                        <Link to={item.type}>{translate("view-details")}</Link>
                      </div>
                    }
                  </div>
                </Col >
              );
            })
        }
      </Row >
    </div >
  );
};

export default SGAdminLayout;