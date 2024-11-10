import { instance } from ".";

const VillageApi = {
  getClassroomsByTeacherId: (query) => {
    return instance.get("game/village/classroom", { params: query });
  },

  getAllClassroomsByTeacherId: (query) => {
    return instance.get("game/village/getallclassroombyteacherid", { params: query });
  },

  addClassroom: (body) => {
    return instance.post("game/village/classroom", body);
  },

  editClassroom: (body) => {
    return instance.post("game/village/classroom/edit", body);
  },

  deleteClassroom: (query) => {
    return instance.delete("game/village/classroom", { params: query });
  },

  joinClassroom: (body) => {
    return instance.post("game/village/joinClassroom", body);
  },

  getJoinedClassrooms: (query) => {
    return instance.get("game/village/getJoinedClassrooms", { params: query });
  },
};

export default VillageApi;
