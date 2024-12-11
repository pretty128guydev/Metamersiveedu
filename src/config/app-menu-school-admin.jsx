const Menu = [
  { is_header: true, title: "Navigation" },
  { path: "/home", icon: "bi bi-cpu", title: "Home" },
  {
    path: "/projects",
    icon: "bi bi-hdd-network",
    title: "Our Projects",
    children: [
      // { path: "/projects/old", title: "Old Projects" },
      {
        path: "/projects/english-dse",
        title: "English DSE",
        children: [
          { path: "/projects/english-dse/village", title: "The Village" },
          { path: "/projects/english-dse/tag", title: "Tag" },
          { path: "/projects/english-dse/word-dash", title: "Word Dash" },
        ],
      },
    ],
  },
  // {
  //   path: "/mock",
  //   icon: "bi bi-envelope",
  //   title: "Practice Drills",
  //   children: [
  //     {
  //       path: "",
  //       title: "2015",
  //       children: [
  //         { path: "/mock/reading-2015", title: "Reading" },
  //         { path: "/mock/writing-2015", title: "Writing" },
  //       ],
  //     },
  //     {
  //       path: "",
  //       title: "2016",
  //       children: [
  //         { path: "/mock/reading-2016", title: "Reading" },
  //         { path: "/mock/writing-2016", title: "Writing" },
  //       ],
  //     },
  //     {
  //       path: "",
  //       title: "2017",
  //       children: [
  //         { path: "/mock/reading-2017", title: "Reading" },
  //         { path: "/mock/writing-2017", title: "Writing" },
  //       ],
  //     },
  //     {
  //       path: "",
  //       title: "2021",
  //       children: [
  //         { path: "/mock/reading-2021", title: "Reading" },
  //         { path: "/mock/writing-2021", title: "Writing" },
  //       ],
  //     },
  //     {
  //       path: "",
  //       title: "2022",
  //       children: [
  //         { path: "/mock/reading-2022", title: "Reading" },
  //         { path: "/mock/writing-2022", title: "Writing" },
  //       ],
  //     },
  //     {
  //       path: "/teacher_uploads",
  //       title: "Teacher Uploads",
  //       children: [
  //         { path: "/teacher_uploads/writing-parta", title: "Writing Part A" },
  //         { path: "/teacher_uploads/writing-partb", title: "Writing Part B" },
  //         {
  //           path: "/teacher_uploads/listening-partb1",
  //           title: "Listening Part B1",
  //         },
  //         {
  //           path: "/teacher_uploads/listening-partb2",
  //           title: "Listening Part B2",
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   path: "/class",
  //   icon: "bi bi-pen",
  //   title: "Class Management",
  //   children: [
  //     // {
  //     //   path: "/class/old",
  //     //   title: "Old Projects",
  //     //   children: [
  //     //     { path: "/class/RJ", title: "Romeo and Juliet" },
  //     //     { path: "/class/CP", title: "Computer Project" },
  //     //     {
  //     //       path: "/class/quiz",
  //     //       title: "Quiz Game",
  //     //       children: [
  //     //         { path: "/class/quiz/SA", title: "Stand Alone Quiz" },
  //     //         { path: "/class/quiz/SD", title: "Skill Drill Quiz" },
  //     //       ],
  //     //     },
  //     //   ],
  //     // },
  //     { path: "/class/TG", title: "Tag Game" },
  //     { path: "/class/WD", title: "Word Dash" },
  //     { path: "/class/village", title: "Village" },
  //   ],
  // },
  {
    path: "/analytics",
    icon: "bi bi-bar-chart",
    title: "Analytics",
    children: [
      { path: "/analytics/dashboard", title: "DASHBOARD" },
      { path: "/analytics/score-chart", title: "SCORE CHART" },
      { path: "/analytics/activity", title: "ACTIVITY" },
      {
        path: "/analytics/progress-improvement",
        title: "PROGRESS & IMPROVEMENT",
        // children: [
        //   // { path: "/analytics/skills/practiced", title: "Skills Practiced" },
        //   { path: "/analytics/skills/analysis", title: "Skills Analysis" },
        // ],
      },
      // { path: "/analytics/progress", title: "Progress" },
    ],
  },

  // {
  //   path: "/QB",
  //   icon: "bi bi-bank",
  //   title: "Question Bank",
  //   children: [{ path: "/QB/subjects", title: "My Bank" }],
  // },

  {
    path: "/school-admin",
    icon: "bi bi-gear",
    title: "Contact Support",
  },

  {
    path: "/teacher-management",
    icon: "bi bi-pen",
    title: "Teacher Management",
  },
];

export default Menu;
