import ReactApexChart from "react-apexcharts";
import { useEffect, useState } from "react";
import VillageApi from "../../../api-clients/VillageApi";
import { AnalyticsAPI } from "../../../api-clients/AnalyticsAPI";

const PerformanceIndex = () => {


    const [loading, setLoading] = useState(false);
    const [students, setstudents] = useState([]);
    const [name, setname] = useState([]);
    const [originalSeries, setoriginalSeries] = useState([]);

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


    function analyzeData(data) {
        // Initialize all levels and categories
        const levels = ["level-1", "level-2", "level-3", "level-4"];
        const categories = ["listening", "reading", "writing"];

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


                const studentsArray = analyzeData(aggregatedData.wx4tuo);
                console.log(studentsArray)
                console.log(aggregatedData.wx4tuo)
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

    const state = {
        series: [
            {
                name: "level 1",
                data: [80, 65, 90, 70, 85, 60]  // Data for level 1
            },
            {
                name: "level 2",
                data: [70, 60, 75, 85, 65, 90]  // Data for level 2
            },
            {
                name: "level 3",
                data: [60, 55, 80, 60, 75, 80]  // Data for level 3
            },
            {
                name: "level 4",
                data: [40, 55, 60, 90, 45, 60]  // Data for level 4
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

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={state.options} series={state.series} type="line" height={350} />
            </div>
        </div>
    );
};

export default PerformanceIndex