import React, { useEffect, useState, useContext } from 'react';
import { useSelector } from "react-redux";
import { Table, notification } from 'antd';

import RomeoApi from '../../../api-clients/RomeoApi';
import { AppSettings } from "../../../config/app-settings";

import "./RomeoAndJuliet.scss";
import useLanguageToggle from "../../../hooks/useLanguageToggle";

const { Column } = Table;

const RomeoAndJuliet = () => {
  const context = useContext(AppSettings);
  const [classData, setClassData] = useState([]);
  const [loading, setLoading] = useState(false);
  const userInfo = useSelector((store) => store.auth.userInfo);
  const { translate } = useLanguageToggle();

  useEffect(() => {
    context.setAppSidebarNone(true);

    setLoading(true);
    RomeoApi.getClassroomsBySchoolId({
      school_id: userInfo.schoolId,
    }).then(data => {
      console.log('d:', data.data);
      setClassData(data.data.map(item => ({ ...item, key: item.id })));
    }).catch(err => notification.error({
      message: 'Error',
      description: err.response.data.message,
    })).finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="quiz-game">
      <div className="header">
        <h6>{translate("romeo-and-juliet-classes")}</h6>
      </div>
      <Table
        dataSource={classData}
        loading={loading}
        pagination={false}
      >
        <Column title="ID" key="id" dataIndex="id" />
        <Column title="Teacher" key="teacher" dataIndex="teacherName" />
        <Column title="Joined Students" key="students" dataIndex="studentsCount" />
        <Column title="Name" key="name" dataIndex="name" />
        {/* <Column title="Description" key="description" dataIndex="description" /> */}
      </Table>
    </div>
  );
};

export default RomeoAndJuliet;