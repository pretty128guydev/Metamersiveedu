import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AnalyticsAPI } from "../../../api-clients/AnalyticsAPI";
import VillageApi from "../../../api-clients/VillageApi";

const SkillProgress = () => {
    const [loading, setLoading] = useState(false);
    const [students, setstudents] = useState([]);

    useEffect(() => {
        setLoading(true);

        const fetchAllApis = async () => {
            try {
                // Fetch the classrooms
                const classData = await VillageApi.getClassroomsByTeacherId({
                    teacher_id: 'HPa1WaUK68bgXNbTGlFw1h022D42',
                });
                const classes = classData.data.ret.map((item) => item.id);

                // Initialize an array to hold promises for all API calls
                const aggregatedData = {}; // Temporary variable to hold all the aggregated data

                const promises = classes.map(async (classId) => {
                    try {
                        const studentsData = await AnalyticsAPI.getStudentsData({
                            classId,
                        });

                        // Iterate over each student in the response
                        Object.entries(studentsData.data).forEach(([studentId, studentInfo]) => {

                            // Aggregate questions by category for this student
                            const result = aggregateQuestionsByCategory(studentInfo.data);

                            // Temporarily store the aggregated result in the variable
                            if (!aggregatedData[classId]) {
                                aggregatedData[classId] = {};
                            }
                            aggregatedData[classId][studentId] = result;
                            aggregatedData[classId][studentId].stdent_name = studentInfo.student_name;
                            aggregatedData[classId][studentId].total_questions = studentInfo.total_questions;
                        });
                    } catch (error) {
                        console.error(`Error fetching data for class ${classId}:`, error);
                    }
                });

                // Wait for all API calls to complete
                await Promise.all(promises);

                // Set the aggregated data to the state after all promises have completed
                setLoading(false); // Set loading to false after all API calls are finished


                const studentsArray = processStudentData(aggregatedData.wx4tuo);
                setstudents(studentsArray)

            } catch (error) {
                console.error('Error fetching classrooms or data:', error);
                setLoading(false);
            }
        };

        fetchAllApis().catch(() => {
            setLoading(false);
        });
    }, []);  // Empty dependency array means this effect runs only once when the component mounts


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

    const processStudentData = (data) => {
        // Initialize an array to hold the transformed student data
        const students = [];

        // Iterate over each student in the data
        Object.entries(data).forEach(([studentId, studentInfo]) => {
            // Extract student name and total questions
            const studentName = studentInfo.stdent_name;
            const totalQuestions = studentInfo.total_questions;

            // Initialize variables for different metrics
            let totalScore = 0;
            let correctAnswers = 0;
            let incorrectAnswers = 0;
            let ReadingQuestions = 0;
            let WritingQuestions = 0;
            let SpeakingQuestions = 0;
            let ListeningAQuestions = 0;
            let ListeningBQuestions = 0;
            let mastered = [];
            let skill;
            let score;

            // Aggregate scores for each category (listening, reading, writing)
            Object.entries(studentInfo).forEach(([category, stats]) => {
                if (category !== "stdent_name" && category !== "total_questions") {
                    // Aggregate total score and questions per category
                    if (stats.totalQuestions) {
                        if (category === "listening") {
                            ListeningAQuestions = stats.totalQuestions;
                            stats.correct > stats.totalQuestions / 2 && mastered.push(category);
                        } else if (category === "listening B") {
                            ListeningBQuestions = stats.totalQuestions;
                            stats.correct > stats.totalQuestions / 2 && mastered.push(category);
                        } else if (category === "reading") {
                            ReadingQuestions = stats.totalQuestions;
                            stats.correct > stats.totalQuestions / 2 && mastered.push(category);
                        } else if (category === "writing") {
                            WritingQuestions = stats.totalQuestions;
                            stats.correct > stats.totalQuestions / 2 && mastered.push(category);
                        } else if (category === "speaking") {
                            SpeakingQuestions = stats.totalQuestions;
                            stats.correct > stats.totalQuestions / 2 && mastered.push(category);
                        }

                        // Accumulate total questions and scores
                        totalScore += stats.totalScore;
                        correctAnswers += stats.correct;
                        incorrectAnswers += stats.incorrect; // Calculate other metrics (Skill, Score, mastered, etc.)
                        skill = (stats.correct / stats.totalQuestions) * 100 || 0; // Assuming skill is based on percentage of correct answers
                        score = stats.totalScore;

                    }
                }
            });


            // Create the student object
            students.push({
                name: studentName,
                totalQuestions: totalQuestions,
                R: Math.round((ReadingQuestions / totalQuestions) * 100), // Correct answers in reading
                W: Math.round((WritingQuestions / totalQuestions) * 100), // Correct answers in writing
                S: Math.round((SpeakingQuestions / totalQuestions) * 100), // Correct answers in speaking
                LA: Math.round((ListeningAQuestions / totalQuestions) * 100), // Correct answers in listening
                LB: Math.round((ListeningBQuestions / totalQuestions) * 100), // Correct answers in listening
                Skill: skill.toFixed(2), // Formatting to 2 decimal points for better readability
                Score: score,
                mastered: mastered,
            });
        });

        return students;
    };

    return (
        <div className="my-4 p-3 rounded bg-light">
            <h5 className="text-muted">Class Breakdown</h5>
            <table className="table table-bordered text-center">
                <thead className="bg-secondary text-white">
                    <tr>
                        <th colSpan={10}>Skill Progress</th>
                    </tr>
                    <tr className="bg-light">
                        <th rowSpan={2} className="align-middle">Students</th>
                        <th rowSpan={2} className="align-middle">Total questions answered</th>
                        <th colSpan={5}>Skills practiced</th>
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
                        <th style={{ width: '9%' }}>Skill</th>
                        <th style={{ width: '9%' }}>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={index}>
                            <td className="bg-dark text-success fw-bold">{student.name}</td>
                            <td>{student.totalQuestions}</td>
                            <td>{student.R}%</td>
                            <td>{student.W}%</td>
                            <td>{student.S}%</td>
                            <td>{student.LA}%</td>
                            <td>{student.LB}%</td>
                            <td>{student.Skill}</td>
                            <td>{student.Score}</td>
                            <td>{student.mastered}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SkillProgress;