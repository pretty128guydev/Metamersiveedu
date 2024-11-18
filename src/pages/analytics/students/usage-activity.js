import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import VillageApi from "../../../api-clients/VillageApi";
import { AnalyticsAPI } from "../../../api-clients/AnalyticsAPI";


const UsageBySkill = ({ originalSeries, name }) => {

    useEffect(() => {
        if (originalSeries.length === 0 || name.length === 0) {
            console.error("Invalid data for chart rendering: originalSeries or name is empty.");
            return;
        }
        console.log('Valid originalSeries:', originalSeries);
        console.log('Valid categories (name):', name);
    }, [originalSeries, name]);

    return (
        <div>
            <div id="chart">
                <ReactApexChart
                    options={{
                        chart: {
                            type: 'bar',
                            height: 350,
                            stacked: true,
                        },
                        plotOptions: {
                            bar: {
                                horizontal: true,
                            },
                        },
                        stroke: {
                            width: 1,
                            colors: ['#fff'],
                        },
                        title: {
                            text: 'Stacked Bar (100% Width)',
                        },
                        xaxis: {
                            categories: name, // Categories for the X-axis
                            max: 100, // Max value for X-axis is 100% (so bars take up 100%)
                        },
                        tooltip: {
                            enabled: false, // Disable tooltips completely
                        },
                        fill: {
                            opacity: 1,
                        },
                        dataLabels: {
                            enabled: false,
                        },
                        legend: {
                            position: 'top',
                            horizontalAlign: 'left',
                            offsetX: 40,
                        },
                        yaxis: {
                            labels: {
                                formatter: function (value) {
                                    return value; // Remove decimals from the Y-axis labels
                                },
                            },
                        },
                    }}
                    series={originalSeries}
                    type="bar"
                    height={350}
                    width="100%"
                />
            </div>
            <div id="html-dist"></div>
        </div>
    );
};


const UsageActivity = () => {
    const [loading, setLoading] = useState(false);
    const [students, setstudents] = useState([]);
    const [name, setname] = useState([]);
    const [originalSeries, setoriginalSeries] = useState([]);

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

    const getArrays = (data) => {
        // Initialize arrays to hold the values
        const name = [];
        const R = [];
        const W = [];
        const S = [];
        const LA = [];
        const LB = [];

        // Iterate over the data array and extract values for each field
        data.forEach(item => {
            name.push(item.name);
            R.push(item.R);
            W.push(item.W);
            S.push(item.S);
            LA.push(item.LA);
            LB.push(item.LB);
        });
        setname(name)
        const tmporiginalSeries = [
            { name: 'Reading', data: R.length ? R : [0, 0, 0] },
            { name: 'Writing', data: W.length ? W : [0, 0, 0] },
            { name: 'Speaking', data: S.length ? S : [0, 0, 0] },
            { name: 'Listening A', data: LA.length ? LA : [0, 0, 0] },
            { name: 'Listening B', data: LB.length ? LB : [0, 0, 0] },
            { name: 'Pronunciation', data: [0, 0, 0] },
        ];

        setoriginalSeries(tmporiginalSeries)
    }

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
                        setLoading(false);
                    }
                });

                // Wait for all API calls to complete
                await Promise.all(promises);

                const studentsArray = processStudentData(aggregatedData.wx4tuo);
                console.log(studentsArray)
                setstudents(studentsArray)
                getArrays(studentsArray)

                setLoading(false); // Set loading to false after all API calls are finished

            } catch (error) {
                console.error('Error fetching classrooms or data:', error);
                setLoading(false);
            }
        };

        fetchAllApis().catch(() => {
            setLoading(false);
        });
    }, []);

    // Only render the chart if originalSeries and name have valid data
    if (loading || originalSeries.length === 0 || name.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <UsageBySkill originalSeries={originalSeries} name={name} />
        </div>
    )

}


export default UsageActivity;