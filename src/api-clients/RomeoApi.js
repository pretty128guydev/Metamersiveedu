import {
  romeo_add_classroom,
  romeo_get_classrooms_by_teacherId,
  romeo_get_all_classrooms,
  romeo_update_classroom,
  romeo_delete_classroom,
} from "../config/app-apis";
import { instance } from "./index";

class RomeoApi {
  static addClassroom = (body) => {
    return instance.post(romeo_add_classroom, body);
  };

  static getClassroomsByTeacherId = (query) => {
    return instance.get(romeo_get_classrooms_by_teacherId, { params: query });
  };

  static getAllClassrooms = (query) => {
    return instance.get(romeo_get_all_classrooms, { params: query });
  };

  static updateClassroom = (body) => {
    return instance.put(romeo_update_classroom, body);
  };

  static deleteClassroom = (query) => {
    return instance.delete(romeo_delete_classroom, { params: query });
  };
}

export default RomeoApi;
