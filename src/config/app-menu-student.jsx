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
  {
    path: "/mock",
    icon: "bi bi-envelope",
    title: "Practice Drills",
    children: [
      {
        path: "",
        title: "2015",
        children: [
          { path: "/mock/reading-2015", title: "Reading" },
          { path: "/mock/writing-2015", title: "Writing" },
        ],
      },
      {
        path: "",
        title: "2016",
        children: [
          { path: "/mock/reading-2016", title: "Reading" },
          { path: "/mock/writing-2016", title: "Writing" },
        ],
      },
      {
        path: "",
        title: "2017",
        children: [
          { path: "/mock/reading-2017", title: "Reading" },
          { path: "/mock/writing-2017", title: "Writing" },
        ],
      },
      {
        path: "",
        title: "2021",
        children: [
          { path: "/mock/reading-2021", title: "Reading" },
          { path: "/mock/writing-2021", title: "Writing" },
        ],
      },
      {
        path: "",
        title: "2022",
        children: [
          { path: "/mock/reading-2022", title: "Reading" },
          { path: "/mock/writing-2022", title: "Writing" },
        ],
      },
      {
        path: "/student_submissions",
        title: "Student Submissions",
        children: [
          {
            path: "/student_submissions/writing-parta",
            title: "Writing Part A",
          },
          {
            path: "/student_submissions/writing-partb",
            title: "Writing Part B",
          },
          {
            path: "/student_submissions/listening-partb1",
            title: "Listening Part B1",
          },
          {
            path: "/student_submissions/listening-partb2",
            title: "Listening Part B2",
          },
        ],
      },
    ],
  },
  {
    path: "/class",
    icon: "bi bi-pen",
    title: "Class",
    children: [
      // {
      //   path: "/class/old",
      //   title: "Old Projects",
      //   children: [
      //     { path: "/class/RJ", title: "Romeo and Juliet" },
      //     // { path: "/class/CP", title: "Computer Project" },
      //     {
      //       path: "/class/quiz",
      //       title: "Quiz Game",
      //       children: [
      //         { path: "/class/quiz/SA", title: "Stand Alone Quiz" },
      //         { path: "/class/quiz/SD", title: "Skill Drill Quiz" },
      //       ],
      //     },
      //   ],
      // },
      { path: "/class/TG", title: "Tag Game" },
      { path: "/class/WD", title: "Word Dash" },
      { path: "/class/village", title: "Village" },
    ],
  },
  {
    path: "/analytics",
    icon: "bi bi-bar-chart",
    title: "Analytics",
    children: [
      // { path: "/analytics/normalQuiz", title: "Stand Alone Quiz" },
      // { path: "/analytics/adaptiveQuiz", title: "Skill Drill" },
      { path: "/analytics/dashboard", title: "DASHBOARD" },
      { path: "/analytics/score-chart", title: "SCORE CHART" },
      { path: "/analytics/activity", title: "ACTIVITY" },
      {
        path: "/analytics/progress-improvement",
        title: "PROGRESS & IMPROVEMENT",
        // children: [
        //   { path: "/analytics/progress-improvement/practiced", title: "Skills Practiced" },
        //   { path: "/analytics/progress-improvement/analysis", title: "Skills Analysis" },
        // ],
      },
    ],
  },
];

export default Menu;
