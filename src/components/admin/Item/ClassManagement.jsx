import React, { useEffect, useState } from 'react';
import { CheckOutlined, StopOutlined, DeleteOutlined } from '@ant-design/icons';
import { Modal, notification, Table, Pagination, Button } from 'antd';
import { useParams } from 'react-router-dom';
import ButtonGroup from 'antd/es/button/button-group';
import { AdminAPI } from '../../../api-clients/AdminApi';

import "./ClassManagement.scss";
import useLanguageToggle from "../../../hooks/useLanguageToggle";

const { Column } = Table;

const ClassManagement = () => {
  const [classData, setClassData] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [curPage, setCurPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { schoolId } = useParams();
  const { translate } = useLanguageToggle();

  useEffect(() => {
    setLoading(true);
    AdminAPI.getClassrooms({
      schoolId
    }).then(data => {
      setTotalPage(data.data.totalCount);
      setClassData(data.data.rows.map(item => ({
        ...item,
        key: item.id,
      })));
    }).catch(err => notification.error({
      message: 'Error',
      description: err.response.data.message,
    })).finally(() => setLoading(false));
  }, []);

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
      AdminAPI.deleteClass({
        class_id: record.id,
      }).then(() => {
        setClassData(classData.filter(item => item.id !== record.id));
        notification.success({
          message: 'Success',
          description: `${record.name} Class has been deleted!`,
        });
      }).catch(err => notification.error({
        message: 'Error',
        description: err.response.data.message,
      })).finally(() => setLoading(false));
    } else {
      AdminAPI.updateClass({
        class_id: record.id,
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
    <div className="class-manage">
      <div className="title">
        <h6>{translate("class-management")}</h6>
        <div className="tool-bar"></div>
      </div>
      <div className="body">
        <Table
          dataSource={classData}
          loading={loading}
        >
          <Column title="Id" key="id" dataIndex="id" />
          <Column title="Participants" key="participants" dataIndex="participants" />
          <Column title="Name" key="name" dataIndex="name" />
          <Column title="Description" key="name" dataIndex="description" />
          <Column title="Action" key="action" render={renderAction} />
        </Table>
        {/* <div className="pagination">
          <Pagination
            current={curPage}
            pageSize={pageSize}
            showSizeChanger={false}
            responsive={true}
            total={totalPage}
            onChange={(page) => setCurPage(page)}
          />
        </div> */}
      </div>
    </div>
  );
};

export default ClassManagement;