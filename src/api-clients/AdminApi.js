import {
  get_teacher,
  get_student,
  update_user,
  delete_user,
  class_api_url,
  school_url,
  app_url,
  get_requests,
  approve_request,
  school_limits,
  block_school,
} from "../config/admin-api";

import { instance } from "./index";

export const AdminAPI = {
  getTeacher: (query) => {
    return instance.get(get_teacher, { params: query });
  },

  getTeacherBySchoolId: (query) => {
    return instance.get(get_teacher, { params: query });
  },

  getStudent: (query) => {
    return instance.get(get_student, { params: query });
  },

  updateUser: (query, body) => {
    return instance.put(update_user, body, { params: query });
  },

  deleteUser: (query) => {
    return instance.delete(delete_user, { params: query });
  },

  getClassrooms: (query) => {
    return instance.get(class_api_url, { params: query });
  },

  deleteClass: (query) => {
    return instance.delete(class_api_url, { params: query });
  },

  updateClass: (query, body) => {
    return instance.put(class_api_url, body, { params: query });
  },

  // School APIs
  getSchools: (query) => {
    return instance.get(school_url, { params: query });
  },

  addSchool: (body) => {
    return instance.post(school_url, body);
  },

  updateSchool: (body) => {
    return instance.put(school_url, body);
  },

  deleteSchool: (query) => {
    return instance.delete(school_url, { params: query });
  },

  approveApp: (body) => {
    return instance.post(app_url, body);
  },

  rejectApp: (body) => {
    return instance.put(app_url, body);
  },

  getRequests: () => {
    return instance.get(get_requests);
  },

  sendRequest: (body) => {
    return instance.post(get_requests, body);
  },

  approveRequest: (body) => {
    return instance.post(approve_request, body);
  },

  BlockSchool: (body) => {
    return instance.post(block_school, body);
  },

  getSchoolLimits: (query) => {
    return instance.get(school_limits, { params: query });
  },
};
