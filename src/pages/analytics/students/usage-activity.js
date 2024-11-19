import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import VillageApi from "../../../api-clients/VillageApi";
import { AnalyticsAPI } from "../../../api-clients/AnalyticsAPI";
import { useSelector } from "react-redux";


const UsageBySkill = ({ originalSeries, name }) => {

    useEffect(() => {
        if (originalSeries.length === 0 || name.length === 0) {
            console.error("Invalid data for chart rendering: originalSeries or name is empty.");
            return;
        }
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


const UsageActivity = ({ selectedClass }) => {
    const [loading, setLoading] = useState(false);
    const [students, setstudents] = useState([]);
    const [name, setname] = useState([]);
    const [originalSeries, setoriginalSeries] = useState([]);
    const userInfo = useSelector((store) => store.auth.userInfo);

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
            let mastered = [];

            // Process each category
            Object.entries(studentInfo).forEach(([category, stats]) => {
                if (category !== "stdent_name" && category !== "total_questions") {
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
                        } else if (category === "pronunciation") {
                            PronunciationQuestions = stats.totalQuestions;
                            stats.correct > stats.totalQuestions / 2 && mastered.push(category);
                        }

                        // Accumulate student totals
                        studentTotalScore += stats.totalScore;
                        studentCorrectAnswers += stats.correct;
                    }
                }
            });

            // Add the student data to the students array
            students.push({
                name: studentName,
                totalQuestions: studentTotalQuestions,
                R: Math.round((ReadingQuestions / studentTotalQuestions) * 100),
                W: Math.round((WritingQuestions / studentTotalQuestions) * 100),
                S: Math.round((SpeakingQuestions / studentTotalQuestions) * 100),
                LA: Math.round((ListeningAQuestions / studentTotalQuestions) * 100),
                LB: Math.round((ListeningBQuestions / studentTotalQuestions) * 100),
                P: Math.round((PronunciationQuestions / studentTotalQuestions) * 100),
                Skill: ((studentCorrectAnswers / studentTotalQuestions) * 100).toFixed(2),
                Score: studentTotalScore,
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

        Object.entries(data).forEach(([studentId, studentInfo]) => {
            const studentTotalQuestions = studentInfo.total_questions;

            // Process each category
            Object.entries(studentInfo).forEach(([category, stats]) => {
                if (category !== "stdent_name" && category !== "total_questions") {
                    if (stats.totalQuestions) {
                        if (category === "reading") classTotals.totalReadingQuestions += stats.totalQuestions;
                        if (category === "writing") classTotals.totalWritingQuestions += stats.totalQuestions;
                        if (category === "speaking") classTotals.totalSpeakingQuestions += stats.totalQuestions;
                        if (category === "listening") classTotals.totalListeningAQuestions += stats.totalQuestions;
                        if (category === "listening B") classTotals.totalListeningBQuestions += stats.totalQuestions;
                        if (category === "pronunciation") classTotals.totalPronunciationQuestions += stats.totalQuestions;

                        // Accumulate overall totals
                        classTotals.totalScore += stats.totalScore;
                        classTotals.totalCorrectAnswers += stats.correct;
                    }
                }
            });

            classTotals.totalQuestions += studentTotalQuestions;
        });

        // Calculate class-wide metrics
        return {
            name: className,
            totalQuestions: classTotals.totalQuestions,
            R: Math.round((classTotals.totalReadingQuestions / classTotals.totalQuestions) * 100),
            W: Math.round((classTotals.totalWritingQuestions / classTotals.totalQuestions) * 100),
            S: Math.round((classTotals.totalSpeakingQuestions / classTotals.totalQuestions) * 100),
            LA: Math.round((classTotals.totalListeningAQuestions / classTotals.totalQuestions) * 100),
            LB: Math.round((classTotals.totalListeningBQuestions / classTotals.totalQuestions) * 100),
            P: Math.round((classTotals.totalPronunciationQuestions / classTotals.totalQuestions) * 100),
            TotalScore: classTotals.totalScore,
            AverageSkill: ((classTotals.totalCorrectAnswers / classTotals.totalQuestions) * 100).toFixed(2),
        };
    };

    const getArrays = (data) => {
        // Initialize arrays to hold the values
        const name = [];
        const R = [];
        const W = [];
        const S = [];
        const LA = [];
        const LB = [];
        const P = [];

        // Iterate over the data array and extract values for each field
        data.forEach(item => {
            name.push(item.name);
            R.push(item.R);
            W.push(item.W);
            S.push(item.S);
            LA.push(item.LA);
            LB.push(item.LB);
            P.push(item.P);
        });
        setname(name)
        const tmporiginalSeries = [
            { name: 'Reading', data: R },
            { name: 'Writing', data: W },
            { name: 'Speaking', data: S },
            { name: 'Listening A', data: LA },
            { name: 'Listening B', data: LB },
            { name: 'Pronunciation', data: P },
        ];

        setoriginalSeries(tmporiginalSeries)
    }

    useEffect(() => {
        setLoading(true);

        const fetchAllApis = async () => {
            try {
                // Fetch the classrooms
                const classData = await VillageApi.getClassroomsByTeacherId({
                    teacher_id: userInfo.uid,
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
                    getArrays(allStudentsArray)
                } else {
                    getArrays(allClassesArray)
                }

                setLoading(false); // Set loading to false after all API calls are finished

            } catch (error) {
                console.error('Error fetching classrooms or data:', error);
                setLoading(false);
            }
        };

        fetchAllApis().catch(() => {
            setLoading(false);
        });
    }, [selectedClass]);

    // Only render the chart if originalSeries and name have valid data
    if (loading || originalSeries.length === 0 || name.length === 0) {
        return <div></div>;
    }

    return (
        <div>
            <UsageBySkill originalSeries={originalSeries} name={name} />
        </div>
    )

}


export default UsageActivity;