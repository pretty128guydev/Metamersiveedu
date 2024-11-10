import {
  cp_add_classroom,
  cp_update_classroom,
  cp_get_classrooms_by_teacherId,
  cp_delete_classroom,
  cp_get_users_by_classroomId,
} from "../config/app-apis";
import { instance } from "./index";

class CPApi {
  static addClassroom = (body) => {
    return instance.post(cp_add_classroom, body);
  };

  static updateClassroom = (query, body) => {
    return instance.put(cp_update_classroom, body, { params: query });
  };

  static getClassroomsByTeacherId = (query) => {
    return instance.get(cp_get_classrooms_by_teacherId, { params: query });
  };

  static deleteClassroom = (query) => {
    return instance.delete(cp_delete_classroom, { params: query });
  };

  static getUsersbyClassroomId = (query) => {
    return instance.get(cp_get_users_by_classroomId, {params: query});
  }
}

export default CPApi;
