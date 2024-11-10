import {
  skilldrill_add_classroom,
  skilldrill_update_classroom,
  skilldrill_get_classrooms_by_teacherId,
  skilldrill_get_joined_classrooms,
  skilldrill_delete_classroom,
  skilldrill_join_classroom,
  skilldrill_get_questions_by_classroomId,
  skilldrill_set_bank_info,
  skilldrill_get_bank_info,
  skilldrill_get_analytic_skilldrill_classroom,
  skilldrill_get_batch_result,
} from "../config/app-apis";
import { instance } from "./index";

class SkillDrillApi {
  static addClassroom = (body) => {
    return instance.post(skilldrill_add_classroom, body);
  };

  static updateClassroom = (query, body) => {
    return instance.put(skilldrill_update_classroom, body, { params: query });
  }
  static getClassroomsByTeacherId = (query) => {
    return instance.get(skilldrill_get_classrooms_by_teacherId, { params: query });
  };

  static getAnalyticClassrooms = (query) => {
    return instance.get(skilldrill_get_analytic_skilldrill_classroom, { params: query });
  }

  static getJoinedClassrooms = (query) => {
    return instance.get(skilldrill_get_joined_classrooms, { params: query });
  };

  static deleteClassroom = (query) => {
    return instance.delete(skilldrill_delete_classroom, { params: query });
  };

  static joinClassroom = (body) => {
    return instance.post(skilldrill_join_classroom, body);
  };

  static getAllQuestionsByClassroomId = (query) => {
    return instance.get(skilldrill_get_questions_by_classroomId, { params: query });
  };

  static setBankInfo = (body) => {
    return instance.put(skilldrill_set_bank_info, body);
  };

  static getBankInfo = (query) => {
    return instance.get(skilldrill_get_bank_info, { params: query });
  }

  static getBatchResult = (query) => {
    return instance.get(skilldrill_get_batch_result, { params: query });
  };
}

export default SkillDrillApi;
