import { mock_mark_reading_paper, mock_mark_writing_paper, mock_mark_listening_paper, 
  raw_text_from_image, add_teacher_upload, query_teacher_uploads, get_teacher_upload_file } from "../config/app-apis";
import { instance } from "./index";

class MockApi {
  static mark_reading_paper = (query, data) => {
    return instance.post(mock_mark_reading_paper, data, { params: query });
  };

  static mark_writing_paper = (query, data) => {
    return instance.post(mock_mark_writing_paper, data, { params: query });
  };

  static mark_listening_paper = (query, data) => {
    return instance.post(mock_mark_listening_paper, data, { params: query });
  };

  static raw_text_from_image = (query, data) => {
    return instance.post(raw_text_from_image, data, { params: query });
  };

  static add_teacher_upload = (query, data) => {
    return instance.post(add_teacher_upload, data, { params: query });
  };

  static query_teacher_uploads = (query) => {
    return instance.get(query_teacher_uploads, { params: query });
  };

  static get_teacher_upload_file = (url) => {
    return instance.get(get_teacher_upload_file, { params: url, responseType: 'blob' });
  };

}

export default MockApi;
