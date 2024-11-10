import { instance } from '.';
import {
    tag_question,
    tag_get_question,
} from '../config/app-apis';

const TagApi = {
    uploadQuestion: (body) => {
        return instance.post(tag_question, body);
    },
    getQuestion: (query) => {
        return instance.get(tag_get_question, { params: query });
    },
    updateQuestion: (body) => {
        return instance.put(tag_question, body);
    },
    deleteQuestion: (query) => {
        return instance.delete(tag_question, { params: query });
    },

    uploadPicture: (body) => {
        return instance.post('tag/picture', body);
    },

    getClassroomsByTeacherId: (query) => {
        return instance.get('tag/classroom', { params: query });
    },

    editClassroom: (body) => {
      return instance.post("tag/classroom/edit", body);
    },

    addClassroom: (body) => {
        return instance.post('tag/classroom', body);
    },

    deleteClassroom: (query) => {
        return instance.delete('tag/classroom', { params: query });
    },

    joinClassroom: (body) => {
        return instance.post("tag/joinClassroom", body);
    },

    getJoinedClassrooms: (query) => {
        return instance.get("tag/getJoinedClassrooms", { params: query });
    },
};

export default TagApi;