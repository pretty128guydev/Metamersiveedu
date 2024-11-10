import {
  qb_add_question,
  qb_add_subject,
  qb_add_topic,
  qb_delete_question,
  qb_get_questions,
  qb_get_subjects,
  qb_get_topics,
  qb_share_subject,
  qb_update_question,
  qb_share_topic,
  qb_get_shared_subjects,
  qb_get_shared_topics,
  qb_get_subject_and_topic_list,
  qb_delete_subject,
  qb_delete_topic,
  qb_share_csv,
  qb_upload_csv,
  qb_upload_file
} from "../config/app-apis";
import { instance } from "./index";

class QBApi {
  static getSubjects = (query) => {
    return instance.get(qb_get_subjects, { params: query });
  };

  static addSubject = (query, body) => {
    return instance.post(qb_add_subject, body, { params: query });
  };

  static shareSubject = (query, body) => {
    return instance.post(qb_share_subject, body, { params: query });
  };

  static getTopics = (query) => {
    return instance.get(qb_get_topics, { params: query });
  };

  static addTopic = (query, body) => {
    return instance.post(qb_add_topic, body, { params: query });
  };

  static shareTopic = (query, body) => {
    return instance.post(qb_share_topic, body, { params: query });
  };

  static getQuestions = (query) => {
    return instance.get(qb_get_questions, { params: query });
  };

  static addQuestion = (query, body) => {
    return instance.post(qb_add_question, body, { params: query });
  };

  static updateQuestion = (query, body) => {
    return instance.put(qb_update_question, body, { params: query });
  };

  static deleteQuestion = (query) => {
    return instance.delete(qb_delete_question, { params: query });
  };

  static getSharedSubjects = (query) => {
    return instance.get(qb_get_shared_subjects, { params: query });
  };

  static getSharedTopics = (query) => {
    return instance.get(qb_get_shared_topics, { params: query });
  };

  static getList = (query) => {
    return instance.get(qb_get_subject_and_topic_list, { params: query });
  };

  static deleteSubject = (query) => {
    return instance.delete(qb_delete_subject, { params: query });
  };

  static deleteTopic = (query) => {
    return instance.delete(qb_delete_topic, { params: query });
  };

  static shareToCSV = (query) => {
    return instance.get(qb_share_csv, { params: query });
  };

  static uploadCSV = (query, body) => {
    return instance.post(qb_upload_csv, body, { params: query });
  }

  static uploadFile = (query, body) => {
    return instance.post(qb_upload_file, body, { params: query });
  };
}

export default QBApi;
