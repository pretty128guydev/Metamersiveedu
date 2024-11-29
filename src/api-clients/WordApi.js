import { instance } from '.';

const WordApi = {
    // uploadQuestion: (body) => {
    //     return instance.post(tag_question, body);
    // },
    // getQuestion: (query) => {
    //     return instance.get(tag_get_question, { params: query });
    // },
    // updateQuestion: (body) => {
    //     return instance.put(tag_question, body);
    // },
    // deleteQuestion: (query) => {
    //     return instance.delete(tag_question, { params: query });
    // },

    // uploadPicture: (body) => {
    //     return instance.post('tag/picture', body);
    // },

    getClassroomsByTeacherId: (query) => {
        return instance.get('word-dash/classroom', { params: query });
    },

    getClassroomsByStudentId: (query) => {
      return instance.get("word-dash/studentclassroom", { params: query });
    },

    editClassroom: (body) => {
      return instance.post("word-dash/classroom/edit", body);
    },

    addClassroom: (body) => {
        return instance.post('word-dash/classroom', body);
    },

    deleteClassroom: (query) => {
        return instance.delete('word-dash/classroom', { params: query });
    },

    joinClassroom: (body) => {
      return instance.post("word-dash/joinClassroom", body);
    },
  
    getJoinedClassrooms: (query) => {
      return instance.get("word-dash/getJoinedClassrooms", { params: query });
    },
};

export default WordApi;