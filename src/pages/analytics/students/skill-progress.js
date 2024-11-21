import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AnalyticsAPI } from "../../../api-clients/AnalyticsAPI";
import VillageApi from "../../../api-clients/VillageApi";
import WordApi from "../../../api-clients/WordApi";
import TagApi from "../../../api-clients/TagApi";

const SkillProgress = ({ selectedClass, selectedStudent, teacher_id }) => {
    const [loading, setLoading] = useState(false);
    const [students, setstudents] = useState([]);


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
                            aggregatedData[classId.id][studentId].stdent_name = studentInfo.student_name;
                            aggregatedData[classId.id][studentId].total_questions = studentInfo.total_questions;
                        });
                    } catch (error) {
                        console.error(`Error fetching data for class ${classId.id}:`, error);
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
                                allStudentsArray = allStudentsArray.concat(processStudents(aggregatedData[selectedClass]));
                            } else {
                                allStudentsArray = [];
                            }
                        } else {
                            allClassesArray = allClassesArray.concat(processClass(aggregatedData[key], key));
                        }
                    }
                }

                if (selectedClass) {
                    setstudents(allStudentsArray)
                } else {
                    setstudents(allClassesArray)
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
            const studentName = studentInfo.stdent_name;
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
                if (category !== "stdent_name" && category !== "total_questions") {
                    if (stats.totalQuestions) {
                        if (category === "listening A") {
                            ListeningAQuestions = stats.totalQuestions;
                        } else if (category === "listening B") {
                            ListeningBQuestions = stats.totalQuestions;
                        } else if (category === "reading") {
                            console.log(stats.correct, stats.totalQuestions)
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

    const processClass = (data, className) => {
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

        // Process data for each student
        Object.entries(data).forEach(([studentId, studentInfo]) => {
            const studentTotalQuestions = studentInfo.total_questions;

            // Process each category
            Object.entries(studentInfo).forEach(([category, stats]) => {
                if (category !== "stdent_name" && category !== "total_questions") {
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
            name: className,
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
            <h5 className="text-muted">Class Breakdown</h5>
            <table className="table table-bordered text-center">
                <thead className="bg-secondary text-white">
                    <tr>
                        <th colSpan={11}>Skill Progress</th>
                    </tr>
                    <tr className="bg-light">
                        <th rowSpan={2} className="align-middle">Students</th>
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