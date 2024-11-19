import ReactApexChart from "react-apexcharts";
import { useEffect, useState } from "react";
import VillageApi from "../../../api-clients/VillageApi";
import { AnalyticsAPI } from "../../../api-clients/AnalyticsAPI";
import { escape } from "validator";
import { useSelector } from "react-redux";

const PerformanceIndex = ({ selectedClass, selectedStudent }) => {


    const [loading, setLoading] = useState(false);
    const [students, setstudents] = useState([]);
    const [name, setname] = useState([]);
    const [originalSeries, setoriginalSeries] = useState([]);
    const [finalTotalData, setfinalTotalData] = useState([]);
    const [finalData, setfinalData] = useState([]);
    const userInfo = useSelector((store) => store.auth.userInfo);
  

    const aggregateQuestionsByCategoryAndLevel = (data) => {
        const result = {};

        data.forEach(entry => {
            const { category, level, questions } = entry;

            if (!result[category]) {
                result[category] = {};
            }

            if (!result[category][level]) {
                result[category][level] = {
                    totalScore: 0,
                    totalQuestions: 0,
                    correct: 0,
                    incorrect: 0
                };
            }

            result[category][level].totalScore += parseInt(questions.score, 10);
            result[category][level].totalQuestions += parseInt(questions.total, 10);
            result[category][level].correct += parseInt(questions.correct, 10);
            result[category][level].incorrect += parseInt(questions.inCorrect, 10);
        });

        return result;
    };

    const analyzeData = (data) => {
        // Initialize all levels and categories
        const levels = ["level-1", "level-2", "level-3", "level-4"];
        const categories = ["listening", "reading", "writing", "speaking", "listeningB", "pronunciation"];

        // Template for an empty level
        const emptyLevel = {
            totalScore: 0,
            totalQuestions: 0,
            correct: 0,
            incorrect: 0
        };

        // Process each student
        const results = {};
        for (const studentId in data) {
            const studentData = data[studentId];
            const studentResult = { name: studentData.stdent_name || "" };

            // Process each category
            categories.forEach(category => {
                const categoryData = {};
                levels.forEach(level => {
                    // Fill with actual data if exists, otherwise use empty template
                    categoryData[level] = studentData[category]?.[level] || { ...emptyLevel };
                });
                studentResult[category] = categoryData;
            });

            // Add to final results
            results[studentData.stdent_name] = studentResult;
        }

        return results;
    }

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

    const getAnalyticsData = (data) => {
        const levels = ["level-1", "level-2", "level-3", "level-4"];
        const categories = ["speaking", "writing", "reading", "listening A", "listening B", "pronunciation"];

        // Helper function to calculate percentage
        function calculatePercentage(correct, total) {
            return total > 0 ? Math.round((correct / total) * 100) : 0;
        }

        // Prepare result structure
        const analytics = {};

        levels.forEach((level) => {
            const levelData = [];

            // Calculate percentages for each category
            const speaking = calculatePercentage(data.speaking[level]?.correct || 0, data.speaking[level]?.totalQuestions || 0);
            const writing = calculatePercentage(data.writing[level]?.correct || 0, data.writing[level]?.totalQuestions || 0);
            const reading = calculatePercentage(data.reading[level]?.correct || 0, data.reading[level]?.totalQuestions || 0);
            const listeningA = calculatePercentage(data.listening[level]?.correct || 0, data.listening[level]?.totalQuestions || 0);
            const listeningB = calculatePercentage(data.listeningB[level]?.correct || 0, data.listeningB[level]?.totalQuestions || 0); // No listening B data in provided input
            const pronunciation = calculatePercentage(data.pronunciation[level]?.correct || 0, data.pronunciation[level]?.totalQuestions || 0);

            // Push percentages to level data
            levelData.push(speaking, writing, reading, listeningA, listeningB, pronunciation);

            // Add to analytics object
            analytics[level] = levelData;
        });

        return analytics;
    }

    function getTotalAnalytics(data) {
        const levels = ["level-1", "level-2", "level-3", "level-4"];
        const categories = ["speaking", "writing", "reading", "listening A", "listening B", "pronunciation"];

        // Helper function to calculate percentage (rounded to nearest whole number)
        function calculatePercentage(correct, total) {
            return total > 0 ? Math.round((correct / total) * 100) : 0;
        }

        // Initialize total data structure
        const totalData = {};
        levels.forEach(level => {
            totalData[level] = {
                speaking: { correct: 0, totalQuestions: 0 },
                writing: { correct: 0, totalQuestions: 0 },
                reading: { correct: 0, totalQuestions: 0 },
                listeningA: { correct: 0, totalQuestions: 0 },
                listeningB: { correct: 0, totalQuestions: 0 },
                pronunciation: { correct: 0, totalQuestions: 0 }
            };
        });

        // Aggregate data across all students
        for (const studentKey in data) {
            const studentData = data[studentKey];
            levels.forEach(level => {
                const writingData = studentData.writing[level] || { correct: 0, totalQuestions: 0 };
                const readingData = studentData.reading[level] || { correct: 0, totalQuestions: 0 };
                const listeningData = studentData.listening[level] || { correct: 0, totalQuestions: 0 };

                // Add correct and totalQuestions to totals
                totalData[level].writing.correct += writingData.correct;
                totalData[level].writing.totalQuestions += writingData.totalQuestions;

                totalData[level].reading.correct += readingData.correct;
                totalData[level].reading.totalQuestions += readingData.totalQuestions;

                totalData[level].listeningA.correct += listeningData.correct;
                totalData[level].listeningA.totalQuestions += listeningData.totalQuestions;

                // No data for speaking, listeningB, or pronunciation in this example
            });
        }

        // Compute percentages
        const result = {};
        levels.forEach(level => {
            result[level] = [
                calculatePercentage(0, 0), // Speaking (No data)
                calculatePercentage(totalData[level].writing.correct, totalData[level].writing.totalQuestions),
                calculatePercentage(totalData[level].reading.correct, totalData[level].reading.totalQuestions),
                calculatePercentage(totalData[level].listeningA.correct, totalData[level].listeningA.totalQuestions),
                calculatePercentage(0, 0), // Listening B (No data)
                calculatePercentage(0, 0)  // Pronunciation (No data)
            ];
        });

        return result;
    }

    const getTotalAnalyticsData = (data) => {
        const levels = ["level-1", "level-2", "level-3", "level-4"];
        const categories = ["speaking", "writing", "reading", "listening", "listeningB", "pronunciation"];

        // Helper function to calculate percentage
        const calculatePercentage = (correct, total) => (total > 0 ? Math.round((correct / total) * 100) : 0);

        // Initialize totals for aggregation
        const totals = {};

        levels.forEach((level) => {
            totals[level] = {};
            categories.forEach((category) => {
                totals[level][category] = { correct: 0, totalQuestions: 0 };
            });
        });

        // Iterate through all groups and students
        Object.values(data).forEach((group) => {
            Object.values(group).forEach((studentData) => {
                levels.forEach((level) => {
                    categories.forEach((category) => {
                        const categoryData = studentData[category]?.[level];
                        if (categoryData) {
                            totals[level][category].correct += categoryData.correct || 0;
                            totals[level][category].totalQuestions += categoryData.totalQuestions || 0;
                        }
                    });
                });
            });
        });

        // Calculate percentages for each level and category
        const analytics = {};

        levels.forEach((level) => {
            analytics[level] = categories.map((category) => {
                const { correct, totalQuestions } = totals[level][category];
                return calculatePercentage(correct, totalQuestions);
            });
        });

        return analytics;
    };



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
                            const result = aggregateQuestionsByCategoryAndLevel(studentInfo.data);

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
                console.log(classData.data.ret)
                console.log(aggregatedData)


                let finalData = [];
                let studentsArray = [];
                if (selectedClass) {
                    studentsArray = analyzeData(aggregatedData[selectedClass]);
                    if (aggregatedData[selectedClass]) {
                        finalData = getTotalAnalytics(studentsArray)
                    } else {
                        finalData = [];
                    }
                }
                if (selectedClass && selectedStudent) {
                    const tmpstudentsArray = analyzeData(aggregatedData[selectedClass]);
                    console.log(tmpstudentsArray)
                    if (tmpstudentsArray[selectedStudent]) {
                        finalData = getAnalyticsData(tmpstudentsArray[selectedStudent])
                    } else {
                        finalData = [];
                    }
                }
                if (!selectedClass && !selectedStudent) {
                    finalData = getTotalAnalyticsData(aggregatedData)
                }

                setfinalData(finalData)

                setLoading(false); // Set loading to false after all API calls are finished

            } catch (error) {
                console.error('Error fetching classrooms or data:', error);
                setLoading(false);
            }
        };

        fetchAllApis().catch(() => {
            setLoading(false);
        });
    }, [selectedClass, selectedStudent]);

    // Only render the chart if originalSeries and name have valid data
    // if (loading || originalSeries.length === 0 || name.length === 0) {
    //     return <div>Loading...</div>;
    // }

    const state = {
        series: [
            {
                name: "level 1",
                data: finalData['level-1']  // Data for level 1
            },
            {
                name: "level 2",
                data: finalData['level-2'] // Data for level 2
            },
            {
                name: "level 3",
                data: finalData['level-3'] // Data for level 3
            },
            {
                name: "level 4",
                data: finalData['level-4'] // Data for level 4
            }
        ],
        options: {
            chart: {
                height: 350,
                type: 'line',  // Line chart type
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: true
                },
                margin: {
                    left: 50,   // Left margin for some space from the y-axis
                    right: 0    // No right padding
                }
            },
            dataLabels: {
                enabled: false  // Disable data labels inside the blocks
            },
            stroke: {
                width: 2,  // Line thickness
                curve: 'straight'  // No soft curves
            },
            title: {
                text: 'Language Skills Progress',
                align: 'left'
            },
            markers: {
                size: 5,  // Default marker size
                hover: {
                    size: 6  // Slightly bigger on hover
                },
                colors: ['#FF4560', '#00E396', '#FEB019'],  // Marker colors for different series
                strokeColor: '#fff',  // White stroke around the markers
                strokeWidth: 2
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'],  // Grid line colors
                    opacity: 0.5
                }
            },
            xaxis: {
                categories: ['Speaking', 'Writing', 'Reading', 'Listening A', 'Listening B', 'Pronunciation'],  // X-axis labels
                axisBorder: {
                    show: false  // Hide the axis border
                },
                axisTicks: {
                    show: true  // Show axis ticks
                },
                labels: {
                    show: true,  // Show x-axis labels
                    style: {
                        fontSize: '12px'  // Adjust font size of x-axis labels
                    }
                },
                padding: {
                    left: 50,  // Adds space between the y-axis and the first category (Speaking)
                    right: 0   // No padding for the last category (Pronunciation)
                }
            },
            yaxis: {
                min: 0,
                max: 100,
                tickAmount: 5,  // Number of ticks on the y-axis
                title: {
                    text: 'Percentage (%)'  // Y-axis title
                }
            }
        }
    };

    // Only render the chart if originalSeries and name have valid data
    if (loading || !state.series[0].data) {
        return <div></div>;
    }

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={state.options} series={state.series} type="line" height={350} />
            </div>
        </div>
    );
};

export default PerformanceIndex