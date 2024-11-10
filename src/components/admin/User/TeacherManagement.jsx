import React, { useEffect, useState } from 'react';
import { AdminAPI } from '../../../api-clients/AdminApi';
import { CheckOutlined, StopOutlined, DeleteOutlined } from '@ant-design/icons';
import { Modal, notification, Table, Input, Button } from 'antd';
import { useParams } from 'react-router-dom';
import ButtonGroup from 'antd/es/button/button-group';

import "./TeacherManagement.scss";
import useLanguageToggle from "../../../hooks/useLanguageToggle";

const { Column } = Table;

const TeacherManagement = () => {
  const [teacherData, setTeacherData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [searchStr, setSearchStr] = useState('');
  const [loading, setLoading] = useState(false);
  const { schoolId } = useParams();
  const { translate } = useLanguageToggle();

  useEffect(() => {
    setLoading(true);
    AdminAPI.getTeacher({
      schoolId,
    }).then(data => {
      setAllData(data.data.rows.map(item => ({ ...item, key: item.id })));
      setTeacherData(data.data.rows.map(item => ({
        ...item,
        key: item.id,
      })));
    }).catch(err => notification.error({
      message: 'Error',
      description: err.response.data.message,
    })).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setTeacherData(allData.filter(item => item.name.includes(searchStr)));
  }, [searchStr]);

  const handleAction = (record, state) => {
    let text = '', icon = '';
    switch (state) {
      case 'Allow': {
        text = 'allow';
        icon = <CheckOutlined />;
        break;
      }
      case 'Disable': {
        text = 'disable';
        icon = <StopOutlined />;
        break;
      }
      case 'Delete': {
        text = 'remove';
        icon = <DeleteOutlined />;
        break;
      }
      default: break;
    }
    Modal.confirm({
      title: `Do you want to ${text} ${record.name}?`,
      icon,
      // content: 'Some descriptions',
      onOk: () => confirmAction(record, state)
    });
  };

  const confirmAction = (record, state) => {
    setLoading(true);
    if (state === 'Delete') {
      AdminAPI.deleteUser({
        user_id: record.id,
      }).then(() => {
        setAllData(allData.filter(item => item.id !== record.id));
        setTeacherData(teacherData.filter(item => item.id !== record.id));
        notification.success({
          message: 'Success',
          description: `${record.name} User has been deleted!`,
        });
      }).catch(err => notification.error({
        message: 'Error',
        description: err.response.data.message,
      })).finally(() => setLoading(false));
    } else {
      AdminAPI.updateUser({
        user_id: record.id,
      }, {
        state
      }).then(() => notification.success({
        message: 'Success',
        description: 'Successfully updated!'
      })).catch(err => notification.error({
        message: 'Error',
        description: err.response.data.message,
      })).finally(() => setLoading(false));
    }
  }

  const renderAction = (text, record, index) => {
    return (
      <ButtonGroup>
        <Button onClick={() => handleAction(record, 'Allow')}><CheckOutlined /></Button>
        <Button onClick={() => handleAction(record, 'Disable')}><StopOutlined /></Button>
        <Button onClick={() => handleAction(record, 'Delete')}><DeleteOutlined /></Button>
      </ButtonGroup>
    );
  };

  return (
    <div className="teacher-manage">
      <div className="title">
        <h6>{translate("teacher-management")}</h6>
        <div className="tool-bar">
          <div>{translate("user-name")}:</div>
          <Input
            value={searchStr}
            onChange={(e) => setSearchStr(e.target.value)}
          />
        </div>
      </div>
      <div className="body">
        <Table
          dataSource={teacherData}
          loading={loading}
        // pagination={false}
        >
          <Column title="Name" key="name" dataIndex="name" />
          <Column title="Email" key="email" dataIndex="email" />
          <Column title="Action" key="action" render={renderAction} />
        </Table>
        {/* <div className="pagination">
          <Pagination
            current={curPage}
            pageSize={pageSize}
            responsive={true}
            total={totalPage}
            onChange={(page) => setCurPage(page)}
          />
        </div> */}
      </div>
    </div>
  );
};

export default TeacherManagement;