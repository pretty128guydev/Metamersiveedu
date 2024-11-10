import React from 'react';

import { UserManage, ItemManage } from '../components/admin';

const AdminRoute = [{
  children: [{
    path: 'teachers',
    element: <UserManage.TeacherManagement />,
  }, {
    path: 'students',
    element: <UserManage.StudentManagement />
  }, {
    path: 'class',
    element: <ItemManage.ClassManagement />,
  }]
}];

export default AdminRoute;