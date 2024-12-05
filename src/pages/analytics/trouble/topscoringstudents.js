import { Card } from "antd";
import React, { useEffect, useState } from "react";
import { CardBody } from "../../../components/card/card";
import VillageApi from "../../../api-clients/VillageApi";
import WordApi from "../../../api-clients/WordApi";
import TagApi from "../../../api-clients/TagApi";
import { AnalyticsAPI } from "../../../api-clients/AnalyticsAPI";

const TopScoringStudents = ({ teacher_id }) => {
    const [loading, setLoading] = useState(false);
    const [data, setdata] = useState([]);

    const analyzeData = (data, classes) => {
        const result = [];

        for (const [className, students] of Object.entries(data)) {
            const originalName = getClassNameById(classes, className)
            for (const [studentId, studentData] of Object.entries(students)) {
                const studentName = studentData.student_name;
                let totalCorrect = 0;
                let totalQuestions = 0;
                let studentTotalScore = 0;
                let studentCorrectAnswers = 0;
                let ReadingQuestions = 0;
                let WritingQuestions = 0;
                let ListeningAQuestions = 0;
                let ListeningBQuestions = 0;
                let SpeakingQuestions = 0;
                let ReadingCorrectQuestions = 0;
                let WritingCorrectQuestions = 0;
                let ListeningACorrectQuestions = 0;
                let ListeningBCorrectQuestions = 0;
                let SpeakingCorrectQuestions = 0;
                let PronunciationQuestions = 0;
                const studentTotalQuestions = studentData.total_questions;
                // Loop through all subjects (listening, reading, writing) and calculate scores
                for (const [subject, subjectData] of Object.entries(studentData)) {
                    if (subject !== "student_name" && subject !== "total_questions") {
                        totalCorrect += subjectData.correct;
                        totalQuestions += subjectData.totalQuestions;
                        if (subject === "reading") {
                            ReadingQuestions = subjectData.totalQuestions;
                            ReadingCorrectQuestions = subjectData.correct
                        } else if (subject === "writing") {
                            WritingQuestions = subjectData.totalQuestions;
                            WritingCorrectQuestions = subjectData.correct
                        } else if (subject === "listening A") {
                            ListeningAQuestions = subjectData.totalQuestions;
                            ListeningACorrectQuestions = subjectData.correct
                        } else if (subject === "listening B") {
                            ListeningBQuestions = subjectData.totalQuestions;
                            ListeningBCorrectQuestions = subjectData.correct
                        } else if (subject === "speaking") {
                            SpeakingQuestions = subjectData.totalQuestions;
                            SpeakingCorrectQuestions = subjectData.correct
                        }
                    }
                }

                const total = (ReadingQuestions != 0 ? Math.round((ReadingCorrectQuestions / ReadingQuestions) * 20) : 0) +
                    (WritingQuestions != 0 ? Math.round((WritingCorrectQuestions / WritingQuestions) * 20) : 0) +
                    (SpeakingQuestions != 0 ? Math.round((SpeakingCorrectQuestions / SpeakingQuestions) * 20) : 0) +
                    (ListeningAQuestions != 0 ? Math.round((ListeningACorrectQuestions / ListeningAQuestions) * 15) : 0) +
                    (ListeningBQuestions != 0 ? Math.round((ListeningBCorrectQuestions / ListeningBQuestions) * 15) : 0) +
                    15;
                const totalScore = totalQuestions != 0 ? ((totalCorrect / totalQuestions) * 100).toFixed(2) : 0; // Calculate percentage
                result.push({ classname: originalName, studentName, totalScore, totalCorrect, totalQuestions, total });
            }
        }

        return result;
    };

    const aggregateQuestionsByCategory = (data) => {
        const result = {};

        data.forEach(entry => {
            const { category, questions } = entry;

            if (!result[category]) {
                result[category] = {
                    totalScore: 0,
                    totalQuestions: 0,
                    correct: 0,
                    incorrect: 0
                };
            }

            result[category].totalScore += parseInt(questions.score, 10);
            result[category].totalQuestions += parseInt(questions.total, 10);
            result[category].correct += parseInt(questions.correct, 10);
            result[category].incorrect += parseInt(questions.inCorrect, 10);
        });

        return result;
    }

    const getClassNameById = (classes, id) => {
        // Find the class with the matching id
        const foundClass = classes.find(classItem => classItem.id === id);
        // Return the name if found, otherwise return null or a default message
        return foundClass ? foundClass.name : null;
    };

    useEffect(() => {
        setLoading(true);

        const fetchAllApis = async () => {
            try {
                // Fetch the classrooms
                const classData = await VillageApi.getClassroomsByTeacherId({
                    teacher_id: teacher_id,
                });
                const WordDashData = await WordApi.getClassroomsByTeacherId({
                    teacher_id: teacher_id,
                });
                const TagData = await TagApi.getClassroomsByTeacherId({
                    teacher_id: teacher_id,
                });

                // Merging data from all three sources
                const allClasses = [
                    ...classData.data.ret, // village classes
                    ...WordDashData.data.ret, // WordDash classes
                    ...TagData.data.ret, // Tag classes
                ];

                // Remove duplicates by class ID
                const uniqueClasses = Array.from(
                    new Map(allClasses.map((item) => [item.id, item])).values()
                );
                // Initialize an array to hold promises for all API calls
                const aggregatedData = {}; // Temporary variable to hold all the aggregated data

                const promises = uniqueClasses.map(async (classId) => {
                    try {
                        const studentsData = await AnalyticsAPI.getStudentsData({
                            classId: classId.id,
                        });
                        // Iterate over each student in the response
                        Object.entries(studentsData.data).forEach(([studentId, studentInfo]) => {

                            // Aggregate questions by category for this student
                            const result = aggregateQuestionsByCategory(studentInfo.data);

                            // Temporarily store the aggregated result in the variable
                            if (!aggregatedData[classId.id]) {
                                aggregatedData[classId.id] = {};
                            }
                            aggregatedData[classId.id][studentId] = result;
                            aggregatedData[classId.id][studentId].student_name = studentInfo.student_name;
                            aggregatedData[classId.id][studentId].total_questions = studentInfo.total_questions;
                        });
                    } catch (error) {
                        console.error(`Error fetching data for class ${classId.id}:`, error);
                        setLoading(false);
                    }
                });

                // Wait for all API calls to complete
                await Promise.all(promises);
                const data = analyzeData(aggregatedData, uniqueClasses)
                setdata(data)

                setLoading(false); // Set loading to false after all API calls are finished

            } catch (error) {
                console.error('Error fetching classrooms or data:', error);
                setLoading(false);
            }
        };

        fetchAllApis().catch(() => {
            setLoading(false);
        });
    }, [teacher_id]);  // Empty dependency array means this effect runs only once when the component mounts

    return (<StudentsTable data={data} />)

}

const StudentsTable = ({ data }) => {
    // Sort data by totalScore in descending order
    const sortedData = [...data].sort((a, b) => b.total - a.total);

    // Process the data to add serial numbers
    const processedData = sortedData.map((student, index) => ({
        ...student,
        no: index + 1, // Add serial number
    }));

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5; // Number of entries per page
    const totalPages = Math.ceil(processedData.length / pageSize);

    const [filter, setFilter] = useState(null); // State for filter

    // Apply the selected filter
    const filteredData = filter
        ? processedData.filter((student) => student.totalScore > filter)
        : processedData;

    // Pagination logic
    const displayedData = filteredData.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <div>
            <div className="mb-4">
                <Card className="bg-transparent" style={{ border: "solid 1px #a8b6bc" }}>
                    <CardBody>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <div className="fw-bold fs-16px">IDENTIFY TOP- SCORING STUDENTS :</div>
                            <select
                                className="form-select w-auto"
                                onChange={(e) => {
                                    setFilter(Number(e.target.value) || null);
                                    setCurrentPage(1); // Reset to first page on filter change
                                }}
                            >
                                <option value="">All Scores</option>
                                <option value="50">{"Scores > 50%"}</option>
                                <option value="70">{"Scores > 70%"}</option>
                                <option value="90">{"Scores > 90%"}</option>
                            </select>
                        </div>
                        <div className="p-3 mb-2" style={{ border: "solid 1px #a8b6bc" }}>
                            <div
                                className="d-flex fw-bold"
                                style={{ borderBottom: "solid 1px #a8b6bc" }}
                            >
                                <div className="fs-5" style={{ width: '25%' }}>No.</div>
                                <div className="fs-5" style={{ width: '25%' }}>Classname</div>
                                <div className="fs-5" style={{ width: '25%' }}>Student Name</div>
                                <div className="fs-5" style={{ width: '25%' }}>Total Score</div>
                            </div>
                            {displayedData.map((student) => (
                                <div
                                    key={student.no}
                                    className="d-flex py-2"
                                    style={{ borderBottom: "solid 1px #a8b6bc" }}
                                >
                                    <div style={{ width: '25%' }}>{student.no}</div>
                                    <div style={{ width: '25%' }}>{student.classname}</div>
                                    <div style={{ width: '25%' }}>{student.studentName}</div>
                                    <div style={{ width: '25%' }}>{student.total}%</div>
                                </div>
                            ))}
                        </div>
                        <div className="btn-group float-end">
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(currentPage - 1)}
                            >
                                Prev
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                disabled={currentPage === totalPages || filteredData.length === 0}
                                onClick={() => setCurrentPage(currentPage + 1)}
                            >
                                Next
                            </button>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default TopScoringStudents;