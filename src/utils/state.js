export const loadingState = {
  before: 0,
  loading: 1,
  after: 2,
};

export const quiz_category = [
  {
    icon: "fa fa-fw fa-hand-peace",
    text: "True/False",
    type: 0,
  },
  {
    icon: "fa fa-fw  fa-hand-spock ",
    text: "Multiple Choice",
    type: 1,
  },
  {
    icon: "fa fa-fw fa-handshake ",
    text: "Multiple Choice(Extra)",
    type: 6,
  },
  {
    icon: "fa fa-fw fa-hand-lizard",
    text: "Filling Gap",
    type: 2,
  },
  {
    icon: "fa fa-fw fa-hand-paper",
    text: "Long Answer",
    type: 3,
  },
  {
    icon: "fa fa-fw fa-hand-scissors",
    text: "Drag and Match",
    type: 4,
  },
  {
    icon: "fa fa-fw fa-hand-rock",
    text: "Drag and Order",
    type: 5,
  },
  {
    icon: "fa fa-fw fa-question-circle",
    text: "FAQ",
    type: 7,
  }
];

export const TF_Quiz_Template = {
  question: "",
  type: 0,
  answer: false,
  normalHint: "",
  exactHint: "",
  point: "",
  isEditing: true,
};

export const MC_Quiz_Template = {
  question: "",
  type: 1,
  subQuestions: ["", ""],
  answer: "A",
  normalHint: "",
  exactHint: "",
  point: "",
  isEditing: true,
};

export const MC_Quiz_Extra_Template = {
  question: "",
  type: 6,
  subQuestions: ["", ""],
  answer: "A",
  normalHint: "",
  exactHint: "",
  point: "",
  isEditing: true,
};

export const FG_Quiz_Template = {
  question: "",
  type: 2,
  answer: [],
  normalHint: "",
  exactHint: "",
  point: "",
  isEditing: true,
};

export const LA_Quiz_Template = {
  question: "",
  type: 3,
  answer: "",
  keyPhrases: [],
  normalHint: "",
  exactHint: "",
  point: "",
  isEditing: true,
};

export const DM_Quiz_Template = {
  question: "",
  type: 4,
  subQuestions: ["", ""],
  subMatches: ["", ""],
  normalHint: "",
  exactHint: "",
  point: "",
  isEditing: true,
};

export const DO_Quiz_Template = {
  question: "",
  type: 5,
  subQuestions: ["", ""],
  normalHint: "",
  exactHint: "",
  point: "",
  isEditing: true,
};
