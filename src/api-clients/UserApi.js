import { sign_in, sign_up, user_list, send_verification_email, approveUser } from "../config/app-apis";
import { instance } from "./index";

class UserApi {
  static register = (data) => {
    return instance.post(sign_up, data);
  };

  static login = (data) => {
    return instance.post(sign_in, data);
  };

  static getUserList = (query) => {
    return instance.get(user_list, { params: query });
  };

  static forgotPassword = (data) => {
    return instance.post('auth/forgot-password', data);
  };

  static sendVerificationEmail = (data) => {
    return instance.post(send_verification_email, data);
  };

  static approveUser = (data) => {
    return instance.post(approveUser, data);
  };
}

export default UserApi;
