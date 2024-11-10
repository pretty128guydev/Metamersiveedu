import React, { useEffect, useContext, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link, useParams } from "react-router-dom";
import { Card, CardBody, CardHeader } from "../../../components/card/card.jsx";
import { AppSettings } from "../../../config/app-settings.js";
import QBApi from "../../../api-clients/QBApi";
import BarsScale from "../../../components/loading/BarsScale.jsx";
import {
    quiz_category,
    TF_Quiz_Template,
    MC_Quiz_Template,
    MC_Quiz_Extra_Template,
    FG_Quiz_Template,
    LA_Quiz_Template,
    DM_Quiz_Template,
    DO_Quiz_Template
} from "../../../utils/state.js";
import QGApi from "../../../api-clients/QuizGameApi";
import { FillingGapQuiz, MultiChoiceExtraQuiz, TrueFalseQuiz, MultiChoiceQuiz, LongAnswerQuiz, DragAndMatchQuiz, DragAndOrderQuiz } from "../../../components/QBQuiz";
import { loadingState } from "../../../utils/state";
import clsx from "clsx";

// import { useSelector } from "react-redux";

function PTAdminQBQuestion() {
    const context = useContext(AppSettings);
    const [posMobileSidebarToggled, setPosMobileSidebarToggled] = useState(true);
    const [categoryType, setCategoryType] = useState(-1);
    const [quizList, setQuizList] = useState([]);
    const [FAQ, setFAQ] = useState(false);
    // const userInfo = useSelector((store) => store.auth.userInfo);
    const { subject_id, topic_id, teacher_id } = useParams();
    const [classData, setClassData] = useState([]);
    const [subject, setSubject] = useState({ name: undefined });
    const [topic, setTopic] = useState({ name: undefined });
    const [getQuestionsLoading, setGetQuestionsLoading] = useState(false);
    const [curLevel, setCurLevel] = useState(1);
    const [selectedQuizs, setSelectedQuizs] = useState([]);
    const [selectedClass, setSelectedClass] = useState(0);
    const [exportLoading, setExportLoading] = useState(loadingState.before);

    const modalImport = document.getElementById("modalImportClass");
    modalImport?.addEventListener("shown.bs.modal", () => {
        // setEmailsToShare([]);
        setExportLoading(loadingState.before);
    });

    useEffect(() => {
        setGetQuestionsLoading(true);

        QBApi.getQuestions({
            teacher_id,
            subject_id: subject_id,
            topic_id: topic_id,
        })
            .then((res) => {
                setGetQuestionsLoading(true);
                res.data = res.data.filter((quiz, index) => Number(quiz.level) === curLevel);
                console.log("quizs === >>> ", res.data);
                setQuizList(res.data);
                setGetQuestionsLoading(false);
            })
            .catch((_) => {
                setGetQuestionsLoading(false);
            });

        QBApi.getSubjects({ teacher_id }).then((res) => {
            const t_subject = res.data.filter((subject) => subject.id === subject_id);
            if (t_subject.length > 0)
                setSubject(t_subject[0]);
        });

        QBApi.getTopics({ teacher_id, subject_id: subject_id }).then(
            (res) => {
                const t_topic = res.data.filter((topic) => topic.id === topic_id);
                if (t_topic.length > 0)
                    setTopic(t_topic[0]);
            }
        );

        QGApi.getClassroomsByTeacherId({ teacher_id }).then(res => {
            setClassData(res.data);
            if (res.data.length > 0) setSelectedClass(res.data[0].id);
        });

        // context.setAppHeaderNone(true);
        context.setAppSidebarNone(true);
        context.setAppContentFullHeight(true);
        context.setAppContentClass("p-1 ps-xl-4 pe-xl-4 pt-xl-3 pb-xl-3");

        return function cleanUp() {
            // context.setAppHeaderNone(false);
            // context.setAppSidebarNone(false);
            context.setAppContentFullHeight(false);
            context.setAppContentClass("");
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setGetQuestionsLoading(true);

        setSelectedQuizs([]);
        QBApi.getQuestions({
            teacher_id,
            subject_id: subject_id,
            topic_id: topic_id,
            show_state: 0,
        })
            .then((res) => {
                setGetQuestionsLoading(true);
                res.data = curLevel === 0 ? res.data : res.data.filter(quiz => Number(quiz.level) === curLevel);
                console.log("quizs === >>> ", res.data);
                setQuizList(res.data);
            }).finally(() => {
                setGetQuestionsLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [curLevel]);


    var toggleMobileSidebar = (event) => {
        event.preventDefault();
        setPosMobileSidebarToggled(true);
    };

    var dismissMobileSidebar = (event) => {
        event.preventDefault();
        setPosMobileSidebarToggled(false);
    };

    var showType = (event, type) => {
        event.preventDefault();
        if (type !== 7) {
            setFAQ(false)
            selectCategory(type);
        }
        else
            setFAQ(true);
    };

    const selectCategory = (type) => {
        const t_quizList = [...quizList];
        const len = t_quizList.length;

        if (len > 0 && t_quizList[len - 1].isEditing === true) {
            t_quizList.splice(len - 1, 1);
        }

        switch (type) {
            case 0:
                t_quizList.push(TF_Quiz_Template);
                break;
            case 1:
                t_quizList.push(MC_Quiz_Template);
                break;
            case 6:
                t_quizList.push(MC_Quiz_Extra_Template);
                break;
            case 2:
                t_quizList.push(FG_Quiz_Template);
                break;
            case 3:
                t_quizList.push(LA_Quiz_Template);
                break;
            case 4:
                t_quizList.push(DM_Quiz_Template);
                break;
            case 5:
                t_quizList.push(DO_Quiz_Template);
                break;
            default:
                break;
        }
        setQuizList(t_quizList);
        setCategoryType(type);
    }

    const updateQuizData = (index, data) => {
        const t_quizList = [...quizList];
        t_quizList[index] = data;
        setQuizList(t_quizList);
    };

    const handleClassChange = (e) => {
        e.preventDefault();

        setSelectedClass(e.target.value);
    };

    const handleExport = async (e) => {
        e.preventDefault();
        console.log('se:', selectedQuizs);

        if (selectedQuizs.length <= 0 || selectedClass === 0) {
            alert("Please select at least one question");
            return;
        }

        setExportLoading(loadingState.loading);
        const class_id = selectedClass;

        for (const quizId of selectedQuizs) {
            for (const item of quizList) {
                if (item.id === quizId) {
                    console.log('item:', item);
                    const body = new FormData();
                    if ("type" in item)
                        body.append("type", item["type"]);
                    if ("question" in item)
                        body.append("question", item["question"]);
                    if ("point" in item) {
                        if (typeof item['point'] === 'object') {
                            item['point'].forEach(point => body.append('point', point));
                        } else {
                            body.append("point", item["point"]);
                        }
                    }
                    if ("answer" in item)
                        body.append("answer", item["answer"]);
                    if ("normalHint" in item)
                        body.append("normalHint", item["normalHint"]);
                    if ("level" in item)
                        body.append("level", item["level"]);
                    if ("subQuestions" in item) {
                        if (typeof item["subQuestions"] === 'object') {
                            item["subQuestions"].forEach((_, subQuizId) => {
                                body.append("subQuestions", item["subQuestions"][subQuizId]);
                            });
                        } else {
                            body.append('subQuestions', item["subQuestions"]);
                        }
                    }
                    if ('subQuestion' in item) {
                        body.append('subQuestion', item['subQuestion']);
                    }
                    if ('questionImages' in item) {
                        item['questionImages'].forEach(image => {
                            body.append('questionImageUrls', image);
                        });
                        // body.append('questionImageUrls', item["questionImages"]);
                    }
                    if ('answerImages' in item) {
                        item['answerImages'].forEach(image => {
                            body.append('answerImagesUrls', image);
                        });
                        // body.append('answerImagesUrls', item["answerImages"]);
                    }
                    if ("subMatches" in item) {
                        if (typeof item["subMatches"] === 'object') {
                            item['subMatches'].forEach(match => body.append('subMatches', match));
                        } else {
                            body.append("subMatches", item["subMatches"]);
                        }
                    }
                    if ("keyPhrases" in item) {
                        if (typeof item['keyPhrases'] === 'object') {
                            item['keyPhrases'].forEach(ph => body.append('keyPhrases', ph));
                        } else {
                            body.append("keyPhrases", item["keyPhrases"]);
                        }
                    }
                    if ("imageFile" in item)
                        body.append("imageFile", item["imageFile"]);

                    await QGApi.addQuestion({ class_id }, body);
                }
            }
        };

        setExportLoading(loadingState.after);
    };

    const handleSelect = (index, isSelected) => {
        console.log('selected', index);
        let tmpSelectedQuizs = selectedQuizs;

        if (index === undefined)
            return;

        if (!isSelected && tmpSelectedQuizs.includes(index)) {
            const idx = tmpSelectedQuizs.indexOf(index);
            if (idx > -1) {
                tmpSelectedQuizs.splice(idx, 1);
            }
        }

        if (isSelected && !tmpSelectedQuizs.includes(index))
            tmpSelectedQuizs.push(index);

        setSelectedQuizs(tmpSelectedQuizs);
    }

    return (
        <div className="h-100">
            <Card
                className={
                    "pos " + (posMobileSidebarToggled ? "pos-mobile-sidebar-toggled" : "")
                }
                id="pos"
            >
                <CardBody className="pos-container">
                    <div className="pos-sidebar" id="pos-sidebar">
                        <div className="h-100 d-flex flex-column p-0">
                            <CardHeader>
                                <div className="d-flex justify-content-between align-items-center py-2">
                                    <div className="title">Question Bank Infomations</div>
                                    <Link className="icon" to={`/pt-admin/QB/${teacher_id}/subjects/${subject_id}/topics`}>
                                        <i className="fas fa-lg fa-fw me-2 fa-sign-out-alt"></i>{" "}
                                        Return
                                    </Link>
                                </div>
                            </CardHeader>

                            <div className="pos-sidebar-header">
                                <div className="back-btn">
                                    <button
                                        type="button"
                                        onClick={dismissMobileSidebar}
                                        className="btn"
                                    >
                                        <i className="bi bi-chevron-left me-2"></i>
                                        Back
                                    </button>
                                </div>
                            </div>

                            <PerfectScrollbar className="pos-sidebar-body tab-content h-100">
                                <div className="px-3">
                                    <div className="mb-3">
                                        <Card>
                                            <CardBody className="bg-theme bg-opacity-10">
                                                <b>Subject</b> : {subject.name}
                                            </CardBody>
                                        </Card>
                                    </div>
                                    <div className="mb-3">
                                        <Card>
                                            <CardBody className="bg-theme bg-opacity-10">
                                                Topic : {topic.name}
                                            </CardBody>
                                        </Card>
                                    </div>
                                    {/* <div className="mb-3">
                    <Card>
                      <CardBody className="bg-theme bg-opacity-10">
                        <fieldset>
                          All
                          <input
                            className="form-check-input mx-2"
                            type="radio"
                            name="shared"
                            id="All"
                            checked
                            onChange={handleSelectAll}
                          />
                          Shared
                          <input
                            className="form-check-input mx-2"
                            type="radio"
                            name="shared"
                            id="Public"
                            onChange={handleSelectPublic}
                          />
                          Private
                          <input
                            className="form-check-input mx-2"
                            type="radio"
                            name="shared"
                            id="Private"
                            onChange={handleSelectPrivate}
                          />
                        </fieldset>
                      </CardBody>
                    </Card>
                  </div> */}
                                </div>
                                <br />
                            </PerfectScrollbar>
                        </div>
                    </div>
                    <div className="pos-menu">
                        <div className="nav-container">
                            <PerfectScrollbar className="h-100">
                                <ul className="nav nav-tabs">
                                    {quiz_category.map((category, index) => (
                                        <li className="nav-item" key={`quizCategory${index}`}>
                                            <div
                                                className={
                                                    "nav-link" +
                                                    (category.type === categoryType ? " active" : "")
                                                }
                                                onClick={(event) => showType(event, category.type)}
                                                style={{ cursor: "pointer" }}
                                            >
                                                <Card>
                                                    <CardBody>
                                                        <i className={category.icon}></i>
                                                        <div style={{ whiteSpace: "pre-wrap" }}>
                                                            {category.text}
                                                        </div>
                                                    </CardBody>
                                                </Card>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </PerfectScrollbar>
                        </div>
                    </div>

                    <div className="pos-content">
                        <div className="d-flex justify-content-between" style={{ poisition: 'relative' }}>
                            <div className="d-flex">
                                <ul className="nav nav-tabs nav-tabs-v2 px-4 border" style={{ borderColor: "rgba(255, 255, 255, 0.3) !important" }}>
                                    {[0, 1, 2, 3].map((level) => (
                                        <li className="nav-item me-3" key={`level${level}`}>
                                            <div
                                                className={clsx({
                                                    "nav-link px-2": true,
                                                    active: level === 1,
                                                })}
                                                data-bs-toggle="tab"
                                                style={{ cursor: "pointer" }}
                                                onClick={() => setCurLevel(level)}
                                            >
                                                level {level === 0 ? 'All' : level}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                {/* <span className="m-auto mx-2">Select All in Level{curLevel === 0 ? 'All' : curLevel}</span> <input className=" mx-0 m-auto form-check-input " type="checkbox" onChange={() => selectAll()} checked={areAllSelected} /> */}
                            </div>
                        </div>
                        {!FAQ && (
                            <PerfectScrollbar className="pos-content-container p-4" style={{ height: "auto" }}>
                                {getQuestionsLoading && (
                                    <div className="d-flex justify-content-center align-items-center h-100">
                                        <BarsScale />
                                    </div>
                                )}
                                {!getQuestionsLoading &&
                                    quizList.map((quiz, index) => {
                                        switch (parseFloat(quiz.type)) {
                                            case 0:
                                                return (
                                                    <TrueFalseQuiz
                                                        key={`QB_TF_Quiz-${index}`}
                                                        index={index}
                                                        teacher_id={teacher_id}
                                                        subject_id={subject_id}
                                                        topic_id={topic_id}
                                                        level={curLevel}
                                                        data={quiz}
                                                        updateData={updateQuizData}
                                                        selected={selectedQuizs.includes(quiz.id)}
                                                        selectedQuizs={selectedQuizs}
                                                        handleSelect={handleSelect}
                                                    />
                                                );
                                            case 1:
                                                return (
                                                    <MultiChoiceQuiz
                                                        key={`QB_MC_Quiz-${index}`}
                                                        index={index}
                                                        teacher_id={teacher_id}
                                                        subject_id={subject_id}
                                                        topic_id={topic_id}
                                                        level={curLevel}
                                                        data={quiz}
                                                        updateData={updateQuizData}
                                                        selected={selectedQuizs.includes(quiz.id)}
                                                        selectedQuizs={selectedQuizs}
                                                        handleSelect={handleSelect}
                                                    />
                                                );
                                            case 6:
                                                return (
                                                    <MultiChoiceExtraQuiz
                                                        key={`QB_MCE_Quiz-${index}`}
                                                        index={index}
                                                        teacher_id={teacher_id}
                                                        subject_id={subject_id}
                                                        topic_id={topic_id}
                                                        level={curLevel}
                                                        data={quiz}
                                                        updateData={updateQuizData}
                                                        selected={selectedQuizs.includes(quiz.id)}
                                                        selectedQuizs={selectedQuizs}
                                                        handleSelect={handleSelect}
                                                    />
                                                );
                                            case 2:
                                                return (
                                                    <FillingGapQuiz
                                                        key={`QB_FG_Quiz-${index}`}
                                                        index={index}
                                                        teacher_id={teacher_id}
                                                        subject_id={subject_id}
                                                        topic_id={topic_id}
                                                        level={curLevel}
                                                        data={quiz}
                                                        updateData={updateQuizData}
                                                        selected={selectedQuizs.includes(quiz.id)}
                                                        selectedQuizs={selectedQuizs}
                                                        handleSelect={handleSelect}
                                                    />
                                                );
                                            case 3:
                                                return (
                                                    <LongAnswerQuiz
                                                        key={`QB_LA_Quiz-${index}`}
                                                        index={index}
                                                        teacher_id={teacher_id}
                                                        subject_id={subject_id}
                                                        topic_id={topic_id}
                                                        level={curLevel}
                                                        data={quiz}
                                                        updateData={updateQuizData}
                                                        selected={selectedQuizs.includes(quiz.id)}
                                                        selectedQuizs={selectedQuizs}
                                                        handleSelect={handleSelect}
                                                    />
                                                );
                                            case 4:
                                                return (
                                                    <DragAndMatchQuiz
                                                        key={`QB_DM_Quiz-${index}`}
                                                        index={index}
                                                        teacher_id={teacher_id}
                                                        subject_id={subject_id}
                                                        topic_id={topic_id}
                                                        level={curLevel}
                                                        data={quiz}
                                                        updateData={updateQuizData}
                                                        selected={selectedQuizs.includes(quiz.id)}
                                                        selectedQuizs={selectedQuizs}
                                                        handleSelect={handleSelect}
                                                    />
                                                );
                                            case 5:
                                                return (
                                                    <DragAndOrderQuiz
                                                        key={`QB_DO_Quiz-${index}`}
                                                        index={index}
                                                        teacher_id={teacher_id}
                                                        subject_id={subject_id}
                                                        topic_id={topic_id}
                                                        level={curLevel}
                                                        data={quiz}
                                                        updateData={updateQuizData}
                                                        selected={selectedQuizs.includes(quiz.id)}
                                                        selectedQuizs={selectedQuizs}
                                                        handleSelect={handleSelect}
                                                    />
                                                );
                                            default:
                                                return <></>;
                                        }
                                    })
                                }
                            </PerfectScrollbar>
                        )}
                        {
                            FAQ && (
                                <Card className="mb-3">
                                    <CardHeader className="d-flex justify-content-between align-items-center">
                                        FAQ
                                    </CardHeader>
                                    <CardBody>
                                        <div className="mb-3">
                                            <div className="d-flex justify-content-center">
                                                <h5>FAQ</h5>
                                            </div>
                                            <div className="accordion" id="accordionExample">
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id="headingOne">
                                                        <button
                                                            className="accordion-button"
                                                            type="button"
                                                            data-bs-toggle="collapse"
                                                            data-bs-target="#collapseOne"
                                                        >
                                                            How to&nbsp;<b>Use</b>?
                                                        </button>
                                                    </h2>
                                                    <div
                                                        id="collapseOne"
                                                        className="accordion-collapse collapse show"
                                                        data-bs-parent="#accordionExample"
                                                    >
                                                        <div className="accordion-body">
                                                            Students answer questions without any hint or skip
                                                            button.
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id="headingTwo">
                                                        <button
                                                            className="accordion-button"
                                                            type="button"
                                                            data-bs-toggle="collapse"
                                                            data-bs-target="#collapseTwo"
                                                        >
                                                            How to&nbsp;<b>Create Questions</b>?
                                                        </button>
                                                    </h2>
                                                    <div
                                                        id="collapseTwo"
                                                        className="accordion-collapse collapse show"
                                                        data-bs-parent="#accordionExample"
                                                    >
                                                        <div className="accordion-body">
                                                            Students must give correct answer to proceed. They can
                                                            select hint button to get some help to answer the
                                                            question.If they still fail to answer correctly can
                                                            select skip button. After which the student will be
                                                            given correct answer and can press “read” to skip to
                                                            proceed to next question
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            )
                        }
                    </div>
                </CardBody>
            </Card>
            <div className="modal fade" id="modalImportClass">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Export the Questions to Stand Alone Quiz Game</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>
                        <form onSubmit={handleExport}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">
                                        Class Id <span className="text-danger">*</span>
                                    </label>
                                    <select
                                        className="form-select form-select-lg bg-white bg-opacity-5"
                                        id="questionSubject"
                                        onChange={handleClassChange}
                                    >
                                        {classData && classData.length > 0 ? (
                                            classData.map((subject, index) => (
                                                <option key={index} value={subject.id}>{subject.name}</option>
                                            ))
                                        ) : <option value="0" disabled>No Class</option>}
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                {exportLoading === loadingState.before && (
                                    <button type="submit" className="btn btn-outline-theme">
                                        Export
                                    </button>
                                )}
                                {exportLoading === loadingState.loading && (
                                    <BarsScale />
                                )}
                                {exportLoading === loadingState.after && (
                                    <div className="d-flex">
                                        <input className="form-control form-control-md bg-white bg-opacity-5 mx-3" disabled value={`Imported ${selectedQuizs.length} questions`} />
                                        <button
                                            type="button"
                                            className="btn btn-outline-theme"
                                            data-bs-dismiss="modal"
                                        >
                                            Done
                                        </button>
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <a
                href="#/"
                className="pos-mobile-sidebar-toggler"
                onClick={toggleMobileSidebar}
            >
                <i className="far fa-lg fa-fw fa-edit"></i>
            </a>
        </div>
    );
}

export default PTAdminQBQuestion;
