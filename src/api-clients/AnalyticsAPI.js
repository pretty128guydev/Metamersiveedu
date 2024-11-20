import {
  result_time_by_game,
  result_time_by_location,
  result_data_by_teacher,
  result_scores_by_student,
  result_skills_scores_by_student,
  result_skills_progress,
  top_10_wrong_questions,
  top_20_wrong_questions_by_level,
  wrong_questions_by_category,
  wrong_questions_by_level,
  data_by_teacher_for_year,
  time_by_game_student,
  result_time_by_location_student,
  result_data_by_teacher_student,
} from "../config/app-apis";
import { instance } from "./index";

export const AnalyticsAPI = {
  getTotalSpentTimeByGame: (query) => {
    return instance.get(result_time_by_game, { params: query });
  },
  getTotalSpentTimeByGameStudent: (query) => {
    return instance.get(time_by_game_student, { params: query });
  },
  getClassroomsByTeacherId: (query) => {
    return instance.get('analytics/classroom', { params: query });
  },
  getTotalSpentTimeByLocation: (query) => {
    return instance.get(result_time_by_location, { params: query });
  },
  getTotalSpentTimeByLocationStudent: (query) => {
    return instance.get(result_time_by_location_student, { params: query });
  },
  getStudentsData: (query) => {
    return instance.get(result_data_by_teacher, { params: query });
  },
  getStudentsDataStudent: (query) => {
    return instance.get(result_data_by_teacher_student, { params: query });
  },
  getStudentsDataOfYear: (query) => {
    return instance.get(data_by_teacher_for_year, { params: query });
  },
  getScoresByStudent: (query) => {
    return instance.get(result_scores_by_student, { params: query });
  },
  getSkillScoresByStudent: (query) => {
    return instance.get(result_skills_scores_by_student, { params: query });
  },
  getSkillProgressByClass: (query) => {
    return instance.get(result_skills_progress, { params: query });
  },
  getTop10WrongQuestions: (school_id, class_id) => {
    return instance.get(
      top_10_wrong_questions + school_id + (class_id ? "/" + class_id : "")
    );
  },
  getTop20WrongQuestionsByLevel: (school_id, category, level, class_id) => {
    return instance.get(
      top_20_wrong_questions_by_level +
        "?school_id=" +
        school_id +
        "&category=" +
        category +
        "&level=" +
        level +
        (class_id ? "&class_id=" + class_id : "")
    );
  },
  getWrongQuestionsByCategory: (school_id, class_id) => {
    return instance.get(
      wrong_questions_by_category +
        "?school_id=" +
        school_id +
        (class_id ? "&class_id=" + class_id : "")
    );
  },
  getWrongQuestionsByLevel: (school_id, class_id) => {
    return instance.get(
      wrong_questions_by_level +
        "?school_id=" +
        school_id +
        (class_id ? "&class_id=" + class_id : "")
    );
  },
};
