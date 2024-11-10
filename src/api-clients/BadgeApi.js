import {
    badge_get_stamp,
    badge_get_evidence,
} from "../config/app-apis";
import { instance } from "./index";

class BadgeAPI {
    static getStampByUserId = (query) => {
        return instance.get(badge_get_stamp, { params: query });
    };

    static getEvidenceByUserId = (query) => {
        return instance.get(badge_get_evidence, { params: query });
    };
}

export default BadgeAPI;