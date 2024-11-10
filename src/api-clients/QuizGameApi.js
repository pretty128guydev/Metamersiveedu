import {
  qg_add_classroom,
  qg_update_classroom,
  qg_get_classrooms_by_teacherId,
  qg_delete_classroom,
  qg_add_question,
  qg_update_question,
  qg_get_questions_by_classroomId,
  qg_delete_question,
  qg_get_joined_classrooms,
  qg_join_classroom,
  qg_mark_answer,
  normal_analytics_student_responses
} from "../config/app-apis";
import { instance } from "./index";

class QGApi {
  static addClassroom = (body) => {
    return instance.post(qg_add_classroom, body);
  };

  static updateClassroom = (query, body) => {
    return instance.put(qg_update_classroom, body, { params: query });
  };

  static getClassroomsByTeacherId = (query) => {
    return instance.get(qg_get_classrooms_by_teacherId, { params: query });
  };

  static deleteClassroom = (query) => {
    return instance.delete(qg_delete_classroom, { params: query });
  };


  static addQuestion = (query, body) => {
    return instance.post(qg_add_question, body, { params: query });
  };

  static updateQuestion = (query, body) => {
    return instance.put(qg_update_question, body, { params: query });
  };

  static getAllQuestionsByClassroomId = (query) => {
    return instance.get(qg_get_questions_by_classroomId, { params: query });
  };

  static deleteQuestion = (query) => {
    return instance.delete(qg_delete_question, { params: query });
  };

  static getJoinedClassrooms = (query) => {
    return instance.get(qg_get_joined_classrooms, { params: query });
  };

  static joinClassroom = (body) => {
    return instance.post(qg_join_classroom, body);
  };

  // static getJoinedStudents = (query) => {
  //   return instance.get(qg_get_joined_students, { params: query });
  // }

  static getStudentResponses = (query) => {
    return instance.get(normal_analytics_student_responses, { params: query });
  }

  static markAnswer = (body) => {
    return instance.post(qg_mark_answer, body);
  };
}

export default QGApi;
