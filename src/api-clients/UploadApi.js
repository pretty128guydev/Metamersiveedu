import { instance } from "./index";

class UploadApi {
    static uploadData = (skillType, level, data) => {
        return instance.post('/upload_data/' + skillType + '/' + level, data);
    }
    static getAllData = (skillType, level, params) => {
        return instance.get('/upload_data/' + skillType + '/' + level, {
            params: {
                limit: params.limit,
                skip: params.skip,
            }
        });
    }
    static getData = (skillType, level, id) => {
        return instance.get('/upload_data/' + skillType + '/' + level + '/' + id);
    }
    static updateData = (skillType, level, id, data) => {
        return instance.post('/upload_data/' + skillType + '/' + level + '/' + id, data);
    }
    static deleteData = (skillType, level, id) => {
        return instance.delete('/upload_data/' +  skillType + '/' + level + '/' + id);
    }
}

export default UploadApi;