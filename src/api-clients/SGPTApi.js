import {
  sg_principal_teacher,
  sg_school,
  sg_teacher,
} from '../config/app-apis';

import { instance } from '.';

export const SGPTAPI = {
  getSchoolData: (query) => {
    return instance.get(sg_school, { params: query });
  },
  getTeachersBySchoolId: (query) => {
    return instance.get(sg_teacher, { params: query });
  },
  updatePrincipalTeacher: (body) => {
    return instance.put(sg_principal_teacher, body);
  },
  deletePrincipalTeacher: (query) => {
    return instance.delete(sg_principal_teacher, { params: query });
  },
};