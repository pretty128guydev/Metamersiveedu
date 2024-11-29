import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AnalyticsAPI } from "../../../api-clients/AnalyticsAPI";
import VillageApi from "../../../api-clients/VillageApi";
import WordApi from "../../../api-clients/WordApi";
import TagApi from "../../../api-clients/TagApi";

const SkillProgress = ({ selectedClass, selectedStudent, teacher_id, studentPage }) => {
    const [loading, setLoading] = useState(false);
    const [students, setstudents] = useState([]);

    useEffect(() => {
        setLoading(true);
        const fetchAllApis = async () => {
            try {
                let VillagestudentData;
                let WordDashstudentData;
                let TagstudentData;
                if (studentPage) {
                    VillagestudentData = await VillageApi.getClassroomsByStudentId({
                        student_id: studentPage
                    });
                    WordDashstudentData = await WordApi.getClassroomsByStudentId({
                        student_id: studentPage
                    });
                    TagstudentData = await TagApi.getClassroomsByStudentId({
                        student_id: studentPage
                    });
                }
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
                let allClasses = [];
                // Merging data from all three sources
                studentPage ?
                    allClasses = [
                        ...VillagestudentData.data, // village classes
                        ...WordDashstudentData.data, // WordDash classes
                        ...TagstudentData.data, // Tag classes
                    ] :
                    allClasses = [
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
                let aggregatedByCategory = {}; // Use let if reassignment is needed

                const promises = uniqueClasses.map(async (classId) => {
                    try {
                        const studentsData = await AnalyticsAPI.getStudentsData({
                            classId: classId.id,
                        });

                        // Iterate over each student in the response
                        Object.entries(studentsData.data).forEach(([studentId, studentInfo]) => {
                            const result = aggregateQuestionsByCategory(studentInfo.data);

                            if (studentPage && studentPage === studentId) {
                                aggregatedByCategory = studentInfo.data.reduce(
                                    (acc, activity) => {
                                        const category = activity.category;
                                        if (!acc[category]) {
                                            acc[category] = {
                                                totalSpentTime: 0,
                                                totalQuestions: 0,
                                                totalCorrect: 0,
                                                totalIncorrect: 0,
                                            };
                                        }
                                        acc.name = studentInfo.student_name
                                        acc[category].totalSpentTime += activity.spent_time || 0;
                                        acc[category].totalQuestions += parseInt(activity.questions.total, 10) || 0;
                                        acc[category].totalCorrect += parseInt(activity.questions.correct, 10) || 0;
                                        acc[category].totalIncorrect += parseInt(activity.questions.inCorrect, 10) || 0;
                                        return acc;
                                    },
                                    {}
                                );
                            }

                            if (!aggregatedData[classId.id]) {
                                aggregatedData[classId.id] = {};
                            }
                            aggregatedData[classId.id][studentId] = result;
                            aggregatedData[classId.id][studentId].student_name = studentInfo.student_name;
                            aggregatedData[classId.id][studentId].total_questions = studentInfo.total_questions;
                        });
                    } catch (error) {
                        console.error(`Error fetching data for class ${classId.name}:`, error);
                    }
                });

                // Wait for all API calls to complete
                await Promise.all(promises);
                // Set the aggregated data to the state after all promises have completed
                setLoading(false); // Set loading to false after all API calls are finished
                let allStudentsArray = [];
                let allClassesArray = [];
                for (let key in aggregatedData) {
                    if (aggregatedData.hasOwnProperty(key)) {
                        if (selectedClass) {
                            if (aggregatedData[selectedClass]) {
                                allStudentsArray = processStudents(aggregatedData[selectedClass]);
                            } else {
                                allStudentsArray = [];
                            }
                        } else {
                            allClassesArray = allClassesArray.concat(processClass(aggregatedData[key], key, uniqueClasses));
                        }
                    }
                }
                // If the user is student:
                if (studentPage) {
                    const studentPageData = processStudentData(aggregatedByCategory)
                    setstudents(studentPageData)
                }
                // If the user is not a student:
                else {
                    if (selectedClass) {
                        setstudents(allStudentsArray);
                    } else {
                        setstudents(allClassesArray);
                    }
                }

            } catch (error) {
                console.error('Error fetching classrooms or data:', error);
                setLoading(false);
            }
        };

        fetchAllApis().catch(() => {
            setLoading(false);
        });
    }, [selectedClass]);  // Empty dependency array means this effect runs only once when the component mounts


    function aggregateQuestionsByCategory(data) {
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

    const processStudents = (data) => {
        const students = [];

        // Iterate over each student in the data
        Object.entries(data).forEach(([studentId, studentInfo]) => {
            const studentName = studentInfo.student_name;
            const studentTotalQuestions = studentInfo.total_questions;

            let studentTotalScore = 0;
            let studentCorrectAnswers = 0;
            let ReadingQuestions = 0;
            let WritingQuestions = 0;
            let SpeakingQuestions = 0;
            let ListeningAQuestions = 0;
            let ListeningBQuestions = 0;
            let PronunciationQuestions = 0;

            // Process each category
            Object.entries(studentInfo).forEach(([category, stats]) => {
                if (category !== "student_name" && category !== "total_questions") {
                    if (stats.totalQuestions) {
                        if (category === "listening A") {
                            ListeningAQuestions = stats.totalQuestions;
                        } else if (category === "listening B") {
                            ListeningBQuestions = stats.totalQuestions;
                        } else if (category === "reading") {
                            ReadingQuestions = stats.totalQuestions;
                        } else if (category === "writing") {
                            WritingQuestions = stats.totalQuestions;
                        } else if (category === "speaking") {
                            SpeakingQuestions = stats.totalQuestions;
                        } else if (category === "pronunciation") {
                            PronunciationQuestions = stats.totalQuestions;
                        }

                        // Accumulate student totals
                        studentTotalScore += stats.totalScore;
                        studentCorrectAnswers += stats.correct;
                    }
                }
            });

            // Calculate percentages for each category
            const categories = {
                R: Math.round((ReadingQuestions / studentTotalQuestions) * 100),
                W: Math.round((WritingQuestions / studentTotalQuestions) * 100),
                S: Math.round((SpeakingQuestions / studentTotalQuestions) * 100),
                LA: Math.round((ListeningAQuestions / studentTotalQuestions) * 100),
                LB: Math.round((ListeningBQuestions / studentTotalQuestions) * 100),
                P: Math.round((PronunciationQuestions / studentTotalQuestions) * 100),
            };

            const mastered = Object.entries(categories)
                .filter(([key, value]) => value > 50) // Filter categories with percentage > 50
                .map(([key]) => key);

            // Find the category with the highest percentage
            const [highestCategory, highestPercentage] = Object.entries(categories).reduce(
                (max, curr) => (curr[1] > max[1] ? curr : max),
                ["", 0]
            );

            // Add the student data to the students array
            students.push({
                name: studentName,
                totalQuestions: studentTotalQuestions,
                R: categories.R,
                W: categories.W,
                S: categories.S,
                LA: categories.LA,
                LB: categories.LB,
                P: categories.P,
                Skill: highestCategory, // Skill is the category with the highest percentage
                Score: highestPercentage, // Score is the highest percentage
                mastered: mastered,
            });
        });
        return students;
    };

    const processStudentData = (data) => {
        const students = [];
        const studentInfo = data
        const studentName = studentInfo.name || "Unknown";
        const categories = studentInfo;

        let studentTotalQuestions = 0;
        let studentCorrectAnswers = 0;

        let ReadingQuestions = 0;
        let WritingQuestions = 0;
        let SpeakingQuestions = 0;
        let ListeningAQuestions = 0;
        let ListeningBQuestions = 0;
        let PronunciationQuestions = 0;

        const categoryTotals = {};

        Object.entries(categories).forEach(([category, stats]) => {
            if (category === "name") return; // Skip the name field

            const totalQuestions = stats.totalQuestions || 0;
            const correctAnswers = stats.totalCorrect || 0;

            studentTotalQuestions += totalQuestions;
            studentCorrectAnswers += correctAnswers;

            switch (category.toLowerCase()) {
                case "reading":
                    ReadingQuestions = totalQuestions;
                    break;
                case "writing":
                    WritingQuestions = totalQuestions;
                    break;
                case "speaking":
                    SpeakingQuestions = totalQuestions;
                    break;
                case "listening A":
                    ListeningAQuestions = totalQuestions;
                    break;
                case "listening B":
                    ListeningBQuestions = totalQuestions;
                    break;
                case "pronunciation":
                    PronunciationQuestions = totalQuestions;
                    break;
                default:
                    break;
            }

            // Store the percentage for each category
            categoryTotals[category.charAt(0).toUpperCase()] = Math.round(
                (totalQuestions / studentTotalQuestions) * 100
            );
        });

        // Calculate mastery and highest skill category
        const mastered = Object.entries(categoryTotals)
            .filter(([_, value]) => value > 50)
            .map(([key]) => key);

        const [highestCategory, highestPercentage] = Object.entries(categoryTotals).reduce(
            (max, curr) => (curr[1] > max[1] ? curr : max),
            ["", 0]
        );

        // Push the processed student info
        students.push({
            name: studentName,
            totalQuestions: studentTotalQuestions,
            R: categoryTotals.R || 0,
            W: categoryTotals.W || 0,
            S: categoryTotals.S || 0,
            LA: categoryTotals.LA || 0,
            LB: categoryTotals.LB || 0,
            P: categoryTotals.P || 0,
            Skill: highestCategory,
            Score: highestPercentage,
            mastered: mastered,
        });
        return students;
    };

    const getClassNameById = (classes, id) => {
        // Find the class with the matching id
        const foundClass = classes.find(classItem => classItem.id === id);
        // Return the name if found, otherwise return null or a default message
        return foundClass ? foundClass.name : null;
    };

    const processClass = (data, className, classes) => {
        const classTotals = {
            totalQuestions: 0,
            totalReadingQuestions: 0,
            totalWritingQuestions: 0,
            totalSpeakingQuestions: 0,
            totalListeningAQuestions: 0,
            totalListeningBQuestions: 0,
            totalPronunciationQuestions: 0,
            totalCorrectAnswers: 0,
            totalScore: 0,
        };
        const invalidClassName = getClassNameById(classes, className);
        // Process data for each student
        Object.entries(data).forEach(([studentId, studentInfo]) => {
            const studentTotalQuestions = studentInfo.total_questions;

            // Process each category
            Object.entries(studentInfo).forEach(([category, stats]) => {
                if (category !== "student_name" && category !== "total_questions") {
                    if (stats.totalQuestions) {
                        if (category === "reading") {
                            classTotals.totalReadingQuestions += stats.totalQuestions;
                        }
                        if (category === "writing") {
                            classTotals.totalWritingQuestions += stats.totalQuestions;
                        }
                        if (category === "speaking") {
                            classTotals.totalSpeakingQuestions += stats.totalQuestions;
                        }
                        if (category === "listening A") {
                            classTotals.totalListeningAQuestions += stats.totalQuestions;
                        }
                        if (category === "listening B") {
                            classTotals.totalListeningBQuestions += stats.totalQuestions;
                        }
                        if (category === "pronunciation") {
                            classTotals.totalPronunciationQuestions += stats.totalQuestions;
                        }

                        // Accumulate overall totals
                        classTotals.totalScore += stats.totalScore;
                        classTotals.totalCorrectAnswers += stats.correct;
                    }
                }
            });

            classTotals.totalQuestions += studentTotalQuestions;
        });

        // Calculate percentages for each category
        const categories = {
            R: Math.round((classTotals.totalReadingQuestions / classTotals.totalQuestions) * 100),
            W: Math.round((classTotals.totalWritingQuestions / classTotals.totalQuestions) * 100),
            S: Math.round((classTotals.totalSpeakingQuestions / classTotals.totalQuestions) * 100),
            LA: Math.round((classTotals.totalListeningAQuestions / classTotals.totalQuestions) * 100),
            LB: Math.round((classTotals.totalListeningBQuestions / classTotals.totalQuestions) * 100),
            P: Math.round((classTotals.totalPronunciationQuestions / classTotals.totalQuestions) * 100),
        };

        // Find the category with the highest percentage
        const [highestCategory, highestPercentage] = Object.entries(categories).reduce(
            (max, curr) => (curr[1] > max[1] ? curr : max),
            ["", 0]
        );

        // Return class-wide metrics
        return {
            name: invalidClassName,
            totalQuestions: classTotals.totalQuestions,
            R: categories.R,
            W: categories.W,
            S: categories.S,
            LA: categories.LA,
            LB: categories.LB,
            P: categories.P,
            Skill: highestCategory, // Skill is the category with the highest percentage
            Score: highestPercentage, // Score is the percentage of the highest category
            TotalScore: classTotals.totalScore,
            AverageSkill: ((classTotals.totalCorrectAnswers / classTotals.totalQuestions) * 100).toFixed(2),
            mastered: (() => {
                const masteredCategories = [];
                if (classTotals.totalReadingQuestions > classTotals.totalQuestions / 2) {
                    masteredCategories.push("Reading");
                }
                if (classTotals.totalWritingQuestions > classTotals.totalQuestions / 2) {
                    masteredCategories.push("Writing");
                }
                if (classTotals.totalSpeakingQuestions > classTotals.totalQuestions / 2) {
                    masteredCategories.push("Speaking");
                }
                if (classTotals.totalListeningAQuestions > classTotals.totalQuestions / 2) {
                    masteredCategories.push("Listening A");
                }
                if (classTotals.totalListeningBQuestions > classTotals.totalQuestions / 2) {
                    masteredCategories.push("Listening B");
                }
                if (classTotals.totalPronunciationQuestions > classTotals.totalQuestions / 2) {
                    masteredCategories.push("Pronunciation");
                }
                return masteredCategories.join(", ");
            })(),
        };
    };


    return (
        <div className="my-4 p-3 rounded bg-light">
            <h5 className="text-muted">{selectedClass ? selectedStudent ? "Student" : "Student Breakdown" : "Class Breakdown"}</h5>
            <table className="table table-bordered text-center">
                <thead className="bg-secondary text-white">
                    <tr>
                        <th colSpan={11}>Skill Progress</th>
                    </tr>
                    <tr className="bg-light">
                        <th rowSpan={2} className="align-middle">{selectedClass ? selectedStudent ? "Student" : "Student" : studentPage ? "Student" : "Class"}</th>
                        <th rowSpan={2} className="align-middle">Total questions answered</th>
                        <th colSpan={6}>Skills practiced</th>
                        <th colSpan={2}>Skills proficient</th>
                        <th rowSpan={2} className="align-middle">Skills mastered</th>
                    </tr>
                    <tr className="bg-light">
                        {/* Set fixed width to these columns for uniformity */}
                        <th style={{ width: '9%' }}>R</th>
                        <th style={{ width: '9%' }}>W</th>
                        <th style={{ width: '9%' }}>S</th>
                        <th style={{ width: '9%' }}>LA</th>
                        <th style={{ width: '9%' }}>LB</th>
                        <th style={{ width: '9%' }}>P</th>
                        <th style={{ width: '9%' }}>Skill</th>
                        <th style={{ width: '9%' }}>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {students
                        .filter(student => !selectedStudent || student.name === selectedStudent)
                        .map((student, index) => (
                            <tr key={index}>
                                <td className="bg-dark text-success fw-bold">{student.name}</td>
                                <td>{student.totalQuestions}</td>
                                <td>{student.R}%</td>
                                <td>{student.W}%</td>
                                <td>{student.S}%</td>
                                <td>{student.LA}%</td>
                                <td>{student.LB}%</td>
                                <td>{student.P}%</td>
                                <td>{student.Skill}</td>
                                <td>{student.Score}%</td>
                                <td>{student.mastered}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default SkillProgress;