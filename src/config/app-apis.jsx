export const sign_up = "auth/signup";
export const sign_in = "auth/signin";
export const send_verification_email = "auth/verify-email";
export const approveUser = "auth/approve-user";
export const user_list = "user/list";

export const romeo_add_classroom = "game/romeo/addclassroom";
export const romeo_update_classroom = "game/romeo/updateclassroom";
export const romeo_delete_classroom = "game/romeo/deleteclassroom";
export const romeo_get_classrooms_by_teacherId =
  "game/romeo/getAllClassroomsByTeacherId";
export const romeo_get_all_classrooms = "game/romeo/getAllClassrooms";

export const qg_add_classroom = "game/quizgame/addClassroom";
export const qg_update_classroom = "game/quizgame/updateClassroom";
export const qg_get_classrooms_by_teacherId =
  "game/quizgame/getClassroomsByTeacherId";
export const qg_delete_classroom = "game/quizgame/deleteClassroom";
export const qg_add_question = "game/quizgame/addQuestion";
export const qg_update_question = "game/quizgame/updateQuestion";
export const qg_get_questions_by_classroomId = "game/quizgame/getAllQuestions";
export const qg_delete_question = "game/quizgame/deleteQuestion";
export const qg_get_joined_classrooms = "game/quizgame/getJoinedClassrooms";
export const qg_join_classroom = "game/quizgame/joinClassroom";
export const qg_mark_answer = "game/quizgame/markAnswer";

export const qg_get_joined_students = "game/quizgame/joinedStudents";
export const normal_analytics_student_responses = "analysis/getResponses";

export const skilldrill_add_classroom = "skillDrill/addClassroom";
export const skilldrill_update_classroom = "skillDrill/updateClassroom";
export const skilldrill_get_classrooms_by_teacherId =
  "skillDrill/getClassrooms";
export const skilldrill_get_joined_classrooms =
  "game/quizgame/getJoinedClassrooms";
export const skilldrill_delete_classroom = "game/quizgame/deleteClassroom";
export const skilldrill_join_classroom = "game/quizgame/joinClassroom";
export const skilldrill_get_questions_by_classroomId =
  "game/quizgame/getAllQuestions";
export const skilldrill_max_question_count = "analytics/max_question_count";
export const skilldrill_set_bank_info = "skillDrill/setBankInfo";
export const skilldrill_get_bank_info = "skillDrill/getBankInfo";
export const skilldrill_get_analytic_skilldrill_classroom =
  "skillDrill/analytics/getClassrooms";
export const skilldrill_get_batch_result = "skillDrill/getBatchResult";

export const qb_add_subject = "qb/subject/add";
export const qb_get_subjects = "qb/subject/getAll";
export const qb_share_subject = "qb/subject/share";
export const qb_add_topic = "qb/topic/add";
export const qb_get_topics = "qb/topic/getAll";
export const qb_share_topic = "qb/topic/share";
export const qb_add_question = "qb/question/add";
export const qb_update_question = "qb/question/update";
export const qb_get_questions = "qb/question/getAll";
export const qb_delete_question = "qb/question/delete";
export const qb_get_shared_subjects = "qb/subject/getSharedAll";
export const qb_get_shared_topics = "qb/topic/getSharedAll";
export const qb_get_subject_and_topic_list = "qb/getList";
export const qb_delete_subject = "qb/subject";
export const qb_delete_topic = "qb/topic";
export const qb_share_csv = "qb/share/csv";
export const qb_upload_csv = "qb/upload-csv";
export const qb_upload_file = "qb/upload-file";

export const cp_add_classroom = "game/computer/addClassroom";
export const cp_update_classroom = "game/computer/updateClassroom";
export const cp_get_classrooms_by_teacherId =
  "game/computer/getClassroomsByTeacherId";
export const cp_delete_classroom = "game/computer/deleteClassroom";
export const cp_get_users_by_classroomId =
  "game/romeo/getAllUsersByClassroomId";

export const badge_get_stamp = "badge/stamp";
export const badge_get_evidence = "badge/evidence";

// from here.. write SG, PT admin apis.
export const sg_principal_teacher = "sg-pt/principal_teacher";
export const sg_school = "sg-pt/school";
export const sg_teacher = "sg-pt/teacher";

// Tag Question API Url
export const tag_question = "tag/question";
export const tag_get_question = "tag/hp-question";

// Analytics
export const result_time_by_game = "analytics/game_result/time_by_game";
export const time_by_game_student =
  "analytics/game_result/time_by_game_student";
export const time_by_game_one_student =
  "analytics/game_result/time_by_game_one_student";
export const result_time_by_location = "analytics/game_result/time_by_location";
export const result_time_by_one_student_location =
  "analytics/game_result/time_by_one_stdent_location";
export const result_time_by_location_student =
  "analytics/game_result/time_by_location_student";
export const result_data_by_teacher = "analytics/game_result/data_by_teacher";
export const result_data_by_teacher_student =
  "analytics/game_result/data_by_teacher_student";
export const data_by_teacher_for_year =
  "analytics/game_result/data_by_teacher_for_year";
export const result_scores_by_student =
  "analytics/game_result/scores_by_student";
export const result_scores_by_one_student =
  "analytics/game_result/scores_by_one_student";
export const result_skills_scores_by_one_student =
  "analytics/game_result/skills_scores_by_one_student";
export const result_skills_scores_by_student =
  "analytics/game_result/skills_scores_by_student";
export const result_skills_progress = "analytics/game_result/skills_progress";
export const top_10_wrong_questions = "analytics/trouble/wrong-top10/";
export const top_20_wrong_questions_by_level = "analytics/trouble/wrong-top20";
export const wrong_questions_by_category = "analytics/trouble/category-rank";
export const wrong_questions_by_level = "analytics/trouble/level-rank";

export const mock_mark_reading_paper = "mock/mark_reading_paper";
export const mock_mark_writing_paper = "mock/mark_writing_paper";
export const mock_mark_listening_paper = "mock/mark_listening_paper";
export const raw_text_from_image = "mock/raw_text_from_image";
export const add_teacher_upload = "mock/add_teacher_upload";
export const query_teacher_uploads = "mock/query_teacher_uploads";
export const get_teacher_upload_file = "mock/get_teacher_upload_file";
