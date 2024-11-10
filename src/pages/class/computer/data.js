import { badge_get_evidence } from "../../../config/app-apis";
import AudioStampImage from "../../../assets/img/stamps/Audio Input device Stamp Chinese ver.png";
import AutomaticStampImage from "../../../assets/img/stamps/Automatic Input device Stamp Chinese ver.png";
import ImageStampImage from "../../../assets/img/stamps/Image Input device Stamp Chinese ver.png";
import KeyboardStampImage from "../../../assets/img/stamps/Keyboard Stamp Chinese ver.png";
import PointingStampImage from "../../../assets/img/stamps/Pointing input device Stamp Chinese ver.png";
import VideoStampImage from "../../../assets/img/stamps/Video Input device Stamp Chinese ver.png";

export const students = [
    {
        name: "Ivan Andres",
        id: 123123,
    },
    {
        name: "Edwin Lopez",
        id: 234465,
    },
    {
        name: "Frank Castilo",
        id: 234212,
    },
    {
        name: "Asly Norvod",
        id: 456352,
    },
    {
        name: "Luiz Santos",
        id: 635353,
    },
];

export const badges = [
    {
        student_id: 635353,
        stamps: [
            {
                stamp_id: 'bsdfq234',
                stamp_string: 'This is a simple Stamp',
            }
        ],
        evidence: [
            {
                evidence_id: '12341324',
                evidence_data: {
                    'the less': "that's ok",
                    'the most important': 'blabla',
                }
            }
        ]
    }
]

export const mock_evidence_data = {
    "meta_group1": [
        {
            "field": {
                "en": "REQUESTED BY",
                "ch": "請求者"
            },
            "en": "RandomMan1",
            "ch": "請求者"
        },
        {
            "field": {
                "en": "LOCATION OF ITEM",
                "ch": "專案位置"
            },
            "en": "Hongkong",
            "ch": "專案位置"
        },
        {
            "field": {
                "en": "DATE LOGGED",
                "ch": "記錄日期"
            },
            "en": "04-24-2023",
            "ch": "04-24-2023"
        },
        {
            "field": {
                "en": "BADGE NUMBER",
                "ch": "徽章號碼"
            },
            "en": "3",
            "ch": "3"
        },
        {
            "field": {
                "en": "TYPE OF CRIME",
                "ch": "犯罪型別"
            },
            "en": "4",
            "ch": "4"
        },
        {
            "field": {
                "en": "TIME LOGGED",
                "ch": "記錄時間"
            },
            "en": "05-03-2023",
            "ch": "05-03-2023"
        },
    ],
    "people_involved": {
        "field": {
            "en": "PEOPLE INVOLVED",
            "ch": "相關人員"
        },
        "en": ["Person1", "Person2"],
        "ch": ["人1", "人2"]
    },
    "brief_description_of_the_incident": {
        "field": {
            "en": "BRIEF DESCRIPTION OF THE INCIDENT",
            "ch": "事件的簡要描述"
        },
        "en": "this is the brief description of the incident, so this is very interesting and excited and also horroed at the same time. ya!",
        "ch": "需要進行指紋分析起訴和審判所需的證據,之後必須歸還給所有者傳送給保險公司進行調查案件結案後的銷燬"
    },
    "indicate_handling_of_evidence_needed":
    {
        "field": {
            "en": "INDICATE HANDLING OF EVIDENCE NEEDED",
            "ch": "表明所需的證據處理"
        },
        "list": [
            {
                "en": "FINGERPRINT ANALYSIS NEEDED",
                "ch": "需要進行指紋分析"
            },
            {
                "en": "EVIDENCE NEEDED FOR PROSECUTION AND TRIAL",
                "ch": "起訴和審判所需的證據"
            },
            {
                "en": "MUST BE RETURNED TO OWNER AFTER",
                "ch": "之後必須歸還給所有者"
            },
            {
                "en": "SEND TO INSURANCE COMPANY FOR INVESTIGATION PURPOSES",
                "ch": "傳送給保險公司進行調查"
            },
            {
                "en": "DESTROY AFTER CASE CLOSED",
                "ch": "案件結案後的銷燬"
            },
        ],
    },
    "req_approoved_by":{
        "field" : {
            "en" : "REQ. APPROVED BY",
            "ch" : "REQ. 批准人"
        },
        "en" : "Officer Wong",
        "ch" : "王警官"
    },
    "list_of_items_to_be_submitted_into_evidence":
    {
        "field": {
            "en": "LIST OF ITEMS TO BE SUBMITTED INTO EVIDENCE",
            "ch": "提交給證據的專案清單清單中"
        },
        "subfield": [
            {
                "en": "EVIDENCE ITEM NO",
                "ch": "證據專案編號",
                "width": "30%"
            },
            {
                "en": "DESCRIPTION OF",
                "ch": "物品描述",
                "width": "70%"
            },
        ],
        "list": [
            {
                "no": 1,
                "description": {
                    "en": "description1",
                    "ch": "物品描述1"
                },
            },
            {
                "no": 2,
                "description": {
                    "en": "description2",
                    "ch": "物品描述2"
                },
            },
        ],
    },
    // "extra_notes": {
    //   "field": {
    //     "en": "EXTRA NOTES(if any)",
    //     "ch": "額外註釋（如果有的話）"
    //   },
    //   "en": "extra notes",
    //   "ch": "額外註釋"
    // }
}


export const mock_missing_item = {
    "meta_group1": [
        {
            "field": {
                "en": "REQUESTED BY",
                "ch": "請求者"
            },
            "en": "RandomMan1",
            "ch": "請求者"
        },
        {
            "field": {
                "en": "LOCATION OF ITEM",
                "ch": "專案位置"
            },
            "en": "Hongkong",
            "ch": "專案位置"
        },
        {
            "field": {
                "en": "BADGE NUMBER",
                "ch": "徽章號碼"
            },
            "en": "3",
            "ch": "3"
        },
        {
            "field": {
                "en": "DETECTIVE IN CHARGE",
                "ch": "主管偵探"
            },
            "en": "Det. Akira Li",
            "ch": "Det. Akira Li",
            "isSign" : true,
        },
    ],
    "description_of_missing_item":
    {
        "field": {
            "en": "DESCRIPTION OF MISSING ITEM",
            "ch": "缺失物品的描述"
        },
    },
    "brief_description_given_by_victim/witness": {
        "field": {
            "en": "BRIEF DESCRIPTION GIVEN BY VICTIM/WITNESS",
            "ch": "受害者/證人給出的簡要描述"
        },
        "en": "this is the brief description of the incident, so this is very interesting and excited and also horroed at the same time. ya!",
        "ch": "需要進行指紋分析起訴和審判所需的證據,之後必須歸還給所有者傳送給保險公司進行調查案件結案後的銷燬"
    },
    "quantity_missing": {
        "field": {
            "en": "QUANTITY MISSING",
            "ch": "數量缺失"
        },
        "en": "missing quantity example 1",
        "ch": "數量缺失 數量缺失 1"
    },
    "indicate_handling_of_evidence_needed":
    {
        "field": {
            "en": "PURPOSE OF ITEM",
            "ch": "專案目的"
        },
        "list": [
            {
                "en": "Business",
                "ch": "業務"
            },
            {
                "en": "Personal",
                "ch": "個人"
            },
            {
                "en": "Education",
                "ch": "教育"
            },
        ],
    },
    "specifies":
    {
        "field": {
            "en": "SPECIFICS",
            "ch": "細節"
        },
        "list": [
            {
                "en": "Video conferencing",
                "ch": "影片會議"
            },
            {
                "en": "Paper receipt",
                "ch": "紙質收據"
            },
            {
                "en": "POS terminal",
                "ch": "POS終端"
            },
        ],
    },
    "picture_of_item": {
        "field": {
            "en": "PICTURE OF ITEM",
            "ch": "數量缺失"
        },
        "en": "",
        "ch": ""
    },
    // "extra_notes": {
    //   "field": {
    //     "en": "EXTRA NOTES(if any)",
    //     "ch": "額外註釋（如果有的話）"
    //   },
    //   "en": "extra notes",
    //   "ch": "額外註釋"
    // }
}

export const mock_stamp_list = [
    {
        name : "Audio Input device Stamp",
        img : AudioStampImage
    },
    {
        name : "Automatic Input device Stamp",
        img : AutomaticStampImage
    },
    {
        name : "Image Input device Stamp",
        img : ImageStampImage
    },
    {
        name : "Keyboard Stamp",
        img : KeyboardStampImage
    },
    {
        name : "Pointing input device Stamp",
        img : PointingStampImage
    },
    {
        name : "Video Input device Stamp",
        img : VideoStampImage
    },
]