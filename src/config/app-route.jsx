import React from "react";
import App from "./../app.jsx";
import { Navigate } from "react-router-dom";
import RequireAuth from "../utils/RequireAuth";

import FAQ from "../pages/FAQ.jsx";
import OPENAI from "../pages/OPENAI.jsx";
import SGAdmin from "../pages/sg-admin/SGAdminLayout.jsx";
import SGAdminRomeoAndJuliet from "../pages/sg-admin/rAndJ/RomeoAndJuliet.jsx";
import SGAdminComputer from "../pages/sg-admin/computer/Computer.jsx";
import SGAdminQuizGame from "../pages/sg-admin/quizgame/QuizGame.jsx";
import PTAdmin from "../pages/pt-admin/PTAdminLayout.jsx";
import PTAdminQBSubject from "../pages/pt-admin/QuestionBank/PTAdminQBSubject.jsx";
import PtAdminQBQuestion from "../pages/pt-admin/QuestionBank/PTAdminQBQuestion.jsx";
import PTAdminQBTopic from "../pages/pt-admin/QuestionBank/PTAdminQBTopic.jsx";
import Home from "./../pages/home/home.js";
import Login from "./../pages/login.js";
import Register from "./../pages/register.js";
import Landing from "./../pages/landing.js";
import TagOverview from "./../pages/tag_overview.js";
import WordDashOverview from "./../pages/worddash_overview.js";
import VillageOverview from "./../pages/village_overview.js";
import PagesError from "./../pages/error.js";

import Romeo from "./../pages/class/romeo/romeo.js";
import TagGame from "../pages/class/taggame/TagGame.jsx";
import Computer from "./../pages/class/computer/computer";
import ComputerClassInfo from "./../pages/class/computer/computerclassInfo";
// import CPEditClass from "./../pages/class/computer/editclass";
import QuizGame from "./../pages/class/quizgame/quizgame";
import QGEditClass from "./../pages/class/quizgame/editclass";
import SkillDrill from "./../pages/class/skilldrill/skilldrill";
import SDEditClass from "./../pages/class/skilldrill/editclass";
import VillageGame from "../pages/class/village/Village.jsx";
import NormalQuizAnalytics from "./../pages/analytics/normalQuizAnalytics";
import NormalAnalytics from "./../pages/analytics/normalAnalytics";
import WordDashAnalytics from "../pages/analytics/WordDashAnalytics.jsx";
import WordDashAnalyticsDetail from "../pages/analytics/WordDashAnalyticsDetail.jsx";
import TagGameAnalytics from "../pages/analytics/TagGameAnalytics.jsx";
import TagGameAnalyticsDetail from "../pages/analytics/TagGameAnalyticsDetail.jsx";

import QBSubject from "../pages/questionBank/myBank/subject";
import QBTopic from "../pages/questionBank/myBank/topic";
import QBQuestion from "../pages/questionBank/myBank/question.js";

import QBSharedSubject from "../pages/questionBank/shared/subject";
import QBSharedTopic from "../pages/questionBank/shared/topic.js";
import QBSharedQuestion from "../pages/questionBank/shared/question.js";
import EvidenceList from "../pages/class/computer/evidencelist";
import StampList from "../pages/class/computer/stamplist";
import MissingItem from "../pages/class/computer/missingitem";
import SkillDrillHome from "../pages/analytics/SkillDrillHome.jsx";
import SkillDrillDetail from "../pages/analytics/SkillDrillDetail.jsx";

import TagQuestionUpload from "../pages/tag/TagQuestionUpload.jsx";
import TagQuestionCheck from "../pages/tag/TagQuestionCheck.jsx";
import WordDash from "../pages/class/worddash/WordDash.jsx";

import ListeningA from "../pages/upload/ListeningA";
import CreateListeningA from "../pages/upload/ListeningA/create.jsx";
import UpdateListeningA from "../pages/upload/ListeningA/update.jsx";
import ListeningB from "../pages/upload/ListeningB";
import CreateListeningB from "../pages/upload/ListeningB/create.jsx";
import UpdateListeningB from "../pages/upload/ListeningB/update.jsx";
import Speaking from "../pages/upload/Speaking";
import CreateSpeaking from "../pages/upload/Speaking/create.jsx";
import UpdateSpeaking from "../pages/upload/Speaking/update.jsx";
import Reading from "../pages/upload/Reading";
import CreateReading from "../pages/upload/Reading/create.jsx";
import UpdateReading from "../pages/upload/Reading/update.jsx";
import Writing from "../pages/upload/Writing";
import CreateWriting from "../pages/upload/Writing/create.jsx";
import UpdateWriting from "../pages/upload/Writing/update.jsx";

import Students from "../pages/analytics/Students.js";
import Scores from "../pages/analytics/scores/scores.js";
import Progress from "../pages/analytics/progress/progress.js";
import SkillsPracticed from "../pages/analytics/skills/skills-practiced.js";
import SkillsAnalysis from "../pages/analytics/skills/skills-analysis.js";
import TroubleZone from "../pages/analytics/trouble/trouble-zone.js";
import Old from "../pages/projects/old/Old.js";
import Village from "../pages/projects/english-dse/Village.js";
import Tag from "../pages/projects/english-dse/Tag.js";
import WordDashGame from "../pages/projects/english-dse/WordDash.js";
import EnglishDSE from "../pages/projects/english-dse/index.js";
import Reading01 from "../pages/Reading/Reading01.js";
import Writing01 from "../pages/Writing/Writing01.js";
import Reading2016 from "../pages/Reading/Reading2016.js";
import Writing2016 from "../pages/Writing/Writing2016.js";
import Writing2017 from "../pages/Writing/Writing2017.js";
import Reading2017 from "../pages/Reading/Reading2017.js";
import Reading2021 from "../pages/Reading/Reading2021.js";
import Writing2021 from "../pages/Writing/Writing2021.js";
import Reading2022 from "../pages/Reading/Reading2022.js";
import Writing2022 from "../pages/Writing/Writing2022.js";

import TeacherUploadsWritingPartA from "../pages/TeacherUploads/WritingPartA.js";
import TeacherUploadsWritingPartB from "../pages/TeacherUploads/WritingPartB.js";
import TeacherUploadsListeningPartB1 from "../pages/TeacherUploads/ListeningPartB1.js";
import TeacherUploadsListeningPartB2 from "../pages/TeacherUploads/ListeningPartB2.js";

import StudentSubmissionsWritingPartA from "../pages/StudentSubmissions/WritingPartA.js";
import StudentSubmissionsWritingPartB from "../pages/StudentSubmissions/WritingPartB.js";
import StudentSubmissionsListeningPartB1 from "../pages/StudentSubmissions/ListeningPartB1.js";
import StudentSubmissionsListeningPartB2 from "../pages/StudentSubmissions/ListeningPartB2.js";
import SchoolAdmin from "../pages/school-admin/SchoolAdmin.jsx";
import TeacherManagement from "../pages/teacher/TeacherManagement.jsx";
import VillageForAdmin from "../pages/class/village/VillageForAdmin.jsx";
import TagGameForAdmin from "../pages/class/taggame/TagGameForAdmin.jsx";
import WordDashForAdmin from "../pages/class/worddash/WordDashForAdmin.jsx";
import SchoolManagement from "../pages/school/SchoolManagement.jsx";
import TeacherManagementForAdmin from "../pages/teacher/TeacherManagementForAdmin.jsx";
import Activity from "../pages/analytics/activity/activity.js";
import AdminPanel from "../pages/admin/PendingApproval.jsx";

const AppRoute = [
  {
    path: "",
    element: (
      <RequireAuth>
        <App />
      </RequireAuth>
    ),
    children: [
      { path: "", element: <Navigate to="/home" /> },
      {
        path: "sg-admin",
        children: [
          {
            path: "",
            element: <SGAdmin />,
          },
          {
            path: "rAndJ",
            element: <SGAdminRomeoAndJuliet />,
          },
          {
            path: "computer",
            element: <SGAdminComputer />,
          },
          {
            path: "quizGame",
            element: <SGAdminQuizGame />,
          },
        ],
      },
      {
        path: "pt-admin",
        children: [
          {
            path: "",
            element: <PTAdmin />,
          },
          {
            path: "rAndJ",
            element: <SGAdminRomeoAndJuliet />,
          },
          {
            path: "computer",
            element: <SGAdminComputer />,
          },
          {
            path: "quizGame",
            element: <SGAdminQuizGame />,
          },
          {
            path: "QB/:teacher_id",
            children: [
              {
                path: "",
              },
              {
                path: "subjects",
                element: <PTAdminQBSubject />,
              },
              {
                path: "subjects/:subject_id",
                children: [
                  {
                    path: "topics",
                    element: <PTAdminQBTopic />,
                  },
                  {
                    path: "topics/:topic_id",
                    element: <PtAdminQBQuestion />,
                  },
                ],
              },
            ],
          },
        ],
      },
      { path: "home", element: <Home /> },
      {
        path: "projects",
        children: [
          { path: "old", element: <Old /> },
          {
            path: "english-dse",
            children: [
              { path: "", element: <Home /> },
              { path: "village", element: <Village /> },
              { path: "tag", element: <Tag /> },
              { path: "word-dash", element: <WordDashGame /> },
            ],
          },
        ],
      },
      {
        path: "class",
        children: [
          { path: "RJ", element: <Romeo /> },
          { path: "TG", element: <TagGame /> },
          { path: "WD", element: <WordDash /> },
          {
            path: "quiz/SA",
            children: [
              { path: "", element: <QuizGame /> },
              { path: "editClass/:classId", element: <QGEditClass /> },
            ],
          },
          {
            path: "quiz/SD",
            children: [
              { path: "", element: <SkillDrill /> },
              { path: "editClass/:classId", element: <SDEditClass /> },
            ],
          },
          {
            path: "CP",
            children: [
              { path: "", element: <Computer /> },
              {
                path: ":classId",
                children: [
                  { path: "", element: <ComputerClassInfo /> },
                  { path: ":student_id/missingItem", element: <MissingItem /> },
                  { path: ":student_id/stampList", element: <StampList /> },
                  {
                    path: ":student_id/evidenceList",
                    element: <EvidenceList />,
                  },
                ],
              },
            ],
          },
          { path: "village", element: <VillageGame /> },
        ],
      },
      {
        path: "analytics",
        children: [
          {
            path: "dashboard",
            children: [
              {
                path: "",
                element: <Students />,
              },
            ],
          },
          {
            path: "score-chart",
            children: [
              {
                path: "",
                element: <Scores />,
              },
            ],
          },
          {
            path: "progress-improvement",
            children: [
              {
                path: "",
                element: <Progress />,
              },
              // {
              //   path: "practiced",
              //   element: <SkillsPracticed />,
              // },
              // {
              //   path: "analysis",
              //   element: <SkillsAnalysis />,
              // },
            ],
          },
          {
            path: "activity",
            children: [
              {
                path: "",
                element: <Activity />,
              },
            ],
          },
          {
            path: "progress",
            children: [
              {
                path: "",
                element: <Progress />,
              },
            ],
          },
          // {
          //   path: "normalQuiz",
          //   children: [
          //     { path: "", element: <NormalQuizAnalytics /> },
          //     { path: "view/:classId", element: <NormalAnalytics /> },
          //   ],
          // },
          // {
          //   path: "adaptiveQuiz",
          //   children: [
          //     {
          //       path: "",
          //       element: <SkillDrillHome />,
          //     },
          //     {
          //       path: "view/:classId",
          //       element: <SkillDrillDetail />,
          //     },
          //   ],
          // },
          // {
          //   path: "word-dash",
          //   children: [
          //     {
          //       path: "",
          //       element: <WordDashAnalytics />,
          //     },
          //     {
          //       path: "view/:classId",
          //       element: <WordDashAnalyticsDetail />,
          //     },
          //   ],
          // },
          // {
          //   path: "tag-game",
          //   children: [
          //     {
          //       path: "",
          //       element: <TagGameAnalytics />,
          //     },
          //     {
          //       path: "view/:classId",
          //       element: <TagGameAnalyticsDetail />,
          //     },
          //   ],
          // },
        ],
      },
      {
        path: "QB",
        children: [
          { path: "subjects", element: <QBSubject /> },
          {
            path: "subjects/:teacher_id/:subject_id",
            children: [
              { path: "topics", element: <QBTopic /> },
              { path: "topics/:topic_id", element: <QBQuestion /> },
            ],
          },
          { path: "sharedSubjects", element: <QBSharedSubject /> },
          {
            path: "sharedSubjects/:subject_id",
            children: [
              { path: "topics", element: <QBSharedTopic /> },
              { path: "topics/:topic_id", element: <QBSharedQuestion /> },
            ],
          },
        ],
      },
      {
        path: "teacher-management",
        element: <TeacherManagement />,
      },
      {
        path: "school-management",
        element: <SchoolManagement />,
      },
      {
        path: "village/:teacher_id",
        element: <VillageForAdmin />,
      },
      {
        path: "tag/:teacher_id",
        element: <TagGameForAdmin />,
      },
      {
        path: "word-dash/:teacher_id",
        element: <WordDashForAdmin />,
      },
      {
        path: "school-management/:school_id",
        element: <TeacherManagementForAdmin />,
      },
      // {
      //   path: 'FAQ',
      //   element: <FAQ />,
      // },
      // {
      //   path: 'OPENAI',
      //   element: <OPENAI />,
      // },
      // {
      //   path: "upload-data",
      //   children: [
      //     {
      //       path: "listening-a",
      //       element: <ListeningA />,
      //     },
      //     {
      //       path: "listening-a/create",
      //       element: <CreateListeningA />,
      //     },
      //     {
      //       path: "listening-a/update",
      //       element: <UpdateListeningA />,
      //     },
      //     {
      //       path: "listening-b",
      //       element: <ListeningB />,
      //     },
      //     {
      //       path: "listening-b/create",
      //       element: <CreateListeningB />,
      //     },
      //     {
      //       path: "listening-b/update",
      //       element: <UpdateListeningB />,
      //     },
      //     {
      //       path: "speaking",
      //       element: <Speaking />,
      //     },
      //     {
      //       path: "speaking/create",
      //       element: <CreateSpeaking />,
      //     },
      //     {
      //       path: "speaking/update",
      //       element: <UpdateSpeaking />,
      //     },
      //     {
      //       path: "reading",
      //       element: <Reading />,
      //     },
      //     {
      //       path: "reading/create",
      //       element: <CreateReading />,
      //     },
      //     {
      //       path: "reading/update",
      //       element: <UpdateReading />,
      //     },
      //     {
      //       path: "writing",
      //       element: <Writing />,
      //     },
      //     {
      //       path: "writing/create",
      //       element: <CreateWriting />,
      //     },
      //     {
      //       path: "writing/update",
      //       element: <UpdateWriting />,
      //     },
      //   ],
      // },
      {
        path: "mock",
        children: [
          { path: "reading-2015", element: <Reading01 /> },
          { path: "writing-2015", element: <Writing01 /> },
          { path: "reading-2016", element: <Reading2016 /> },
          { path: "writing-2016", element: <Writing2016 /> },
          { path: "reading-2017", element: <Reading2017 /> },
          { path: "writing-2017", element: <Writing2017 /> },
          { path: "reading-2021", element: <Reading2021 /> },
          { path: "writing-2021", element: <Writing2021 /> },
          { path: "reading-2022", element: <Reading2022 /> },
          { path: "writing-2022", element: <Writing2022 /> },
        ],
      },
      {
        path: "teacher_uploads",
        children: [
          { path: "writing-parta", element: <TeacherUploadsWritingPartA /> },
          { path: "writing-partb", element: <TeacherUploadsWritingPartB /> },
          {
            path: "listening-partb1",
            element: <TeacherUploadsListeningPartB1 />,
          },
          {
            path: "listening-partb2",
            element: <TeacherUploadsListeningPartB2 />,
          },
        ],
      },
      {
        path: "student_submissions",
        children: [
          {
            path: "writing-parta",
            element: <StudentSubmissionsWritingPartA />,
          },
          {
            path: "writing-partb",
            element: <StudentSubmissionsWritingPartB />,
          },
          {
            path: "listening-partb1",
            element: <StudentSubmissionsListeningPartB1 />,
          },
          {
            path: "listening-partb2",
            element: <StudentSubmissionsListeningPartB2 />,
          },
        ],
      },
      {
        path: "school-admin",
        element: <SchoolAdmin />,
      },
    ],
  },

  // { path: "tag-question-upload", element: <TagQuestionUpload /> },
  // {
  //   path: "tag-question-check",
  //   children: [
  //     {
  //       path: "",
  //       element: <TagQuestionCheck />,
  //     },
  //     {
  //       path: ":internId",
  //       element: <TagQuestionCheck />,
  //     },
  //   ],
  // },
  { path: "login", element: <Login /> },
  { path: "register", element: <Register /> },
  { path: "approve_user", element: <AdminPanel /> },
  { path: "landing", element: <Landing /> },
  { path: "tag_overview", element: <TagOverview /> },
  { path: "worddash_overview", element: <WordDashOverview /> },
  { path: "village_overview", element: <VillageOverview /> },
  { path: "*", element: <PagesError /> },
];

export default AppRoute;
