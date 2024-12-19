import ReactApexChart from "react-apexcharts";
import { useEffect, useState } from "react";
import VillageApi from "../../../api-clients/VillageApi";
import { AnalyticsAPI } from "../../../api-clients/AnalyticsAPI";
import { escape } from "validator";
import { useSelector } from "react-redux";
import WordApi from "../../../api-clients/WordApi";
import TagApi from "../../../api-clients/TagApi";

const PerformanceIndex = ({ selectedClass, selectedStudent, teacher_id, studentPage }) => {


    const [loading, setLoading] = useState(false);
    const [finalData, setfinalData] = useState([]);

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
        const categories = ["listening A", "reading", "writing", "speaking", "listeningB", "pronunciation"];

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
            const studentResult = { name: studentData.student_name || "" };

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
            results[studentData.student_name] = studentResult;
        }

        return results;
    }

    function transformAggregatedDataToResultFormat(aggregatedData) {
        console.log(aggregatedData)
        const levels = ["level-1", "level-2", "level-3", "level-4"];
        const categories = ["speaking", "writing", "reading", "listening A", "listening B", "pronunciation"];

        const result = {};

        levels.forEach((level) => {
            result[level] = categories.map((category) => {
                if (aggregatedData[category] && aggregatedData[category][level]) {
                    return aggregatedData[category][level].totalQuestions || 0;
                }
                return 0; // Default to 0 if data is not available
            });
        });

        return result;
    }


    function getTotalAnalytics(data) {
        const levels = ["level-1", "level-2", "level-3", "level-4"];
        const categories = ["speaking", "writing", "reading", "listening A", "listening B", "pronunciation"];

        // Initialize the result structure with correct and totalQuestions for percentage calculation
        const result = {
            "level-1": [0, 0, 0, 0, 0, 0],
            "level-2": [0, 0, 0, 0, 0, 0],
            "level-3": [0, 0, 0, 0, 0, 0],
            "level-4": [0, 0, 0, 0, 0, 0],
            totalQuestions: {
                "level-1": [0, 0, 0, 0, 0, 0],
                "level-2": [0, 0, 0, 0, 0, 0],
                "level-3": [0, 0, 0, 0, 0, 0],
                "level-4": [0, 0, 0, 0, 0, 0]
            }
        };

        // Aggregate data across all students
        for (const studentKey in data) {
            const studentData = data[studentKey];
            let totalCorrect = 0;
            for (const level of levels) {
                for (let i = 0; i < categories.length; i++) {
                    const category = categories[i];
                    if (studentData[category] && studentData[category][level]) {
                        const stats = studentData[category][level];
                        const correct = stats.correct || 0;
                        const totalQuestions = stats.totalQuestions || 0;
                        totalCorrect += stats.correct
                        // Add to the correct total
                        result[level][i] += correct;

                        // Add to the total questions for each category and level
                        result.totalQuestions[level][i] += totalQuestions;
                        result.totalCorrect[level][i] += totalCorrect;
                    }
                }
            }
        }

        // Now calculate the percentage for each category at each level
        for (const level of levels) {
            for (let i = 0; i < categories.length; i++) {
                const totalCorrect = result.totalCorrect[level][i];
                const correct = result[level][i];

                if (totalCorrect > 0) {
                    result[level][i] = Math.round((correct / totalCorrect) * 100); // Calculate percentage
                } else {
                    result[level][i] = 0; // No questions, so 0%
                }
            }
        }

        return result;
    }

    const getTotalAnalyticsData = (data) => {
        console.log(data)
        const levels = ["level-1", "level-2", "level-3", "level-4"];
        const categories = ["speaking", "writing", "reading", "listening A", "listening B", "pronunciation"];
        // Helper function to calculate percentage
        const calculatePercentage = (correct, total) => (total > 0 ? Math.round((correct / total) * 100) : 0);

        // Initialize totals for aggregation
        const totals = {};

        levels.forEach((level) => {
            totals[level] = {
                totalQuestions: 0, // For overall correct answers by level
                categories: {}, // To store per-category data
            };
            categories.forEach((category) => {
                totals[level].categories[category] = { correct: 0, totalQuestions: 0 };
            });
        });

        // Iterate through all groups and students
        Object.values(data).forEach((group) => {
            Object.values(group).forEach((studentData) => {
                levels.forEach((level) => {
                    categories.forEach((category) => {
                        const categoryData = studentData[category]?.[level];
                        if (categoryData) {
                            const correct = categoryData.correct || 0;
                            totals[level].categories[category].correct += correct;
                            totals[level].totalQuestions += correct; // Aggregate total correct for the level
                        }
                    });
                });
            });
        });

        // Calculate percentages for each level and category
        const analytics = {};

        levels.forEach((level) => {
            analytics[level] = categories.map((category) => {
                const { correct } = totals[level].categories[category];
                const { totalQuestions } = totals[level];
                console.log(correct, totalQuestions)
                return calculatePercentage(correct, totalQuestions);
            });
        });
        console.log(analytics)
        return analytics;
    };


    function analyzeSingleStudentData(studentData) {
        const categories = ["speaking", "writing", "reading", "listening A", "listening B", "pronunciation"];
        const levels = ["level-1", "level-2", "level-3", "level-4"];
        const result = {};
        // Initialize the result object with level keys
        levels.forEach(level => {
            result[level] = [0, 0, 0, 0, 0, 0]; // Initialize all categories for each level with zeros
        });

        // Loop through each category and calculate percentage for each level
        categories.forEach((category, categoryIndex) => {
            levels.forEach(level => {
                if (studentData[category] && studentData[category][level]) {
                    const data = studentData[category][level];
                    const { correct, totalQuestions } = data;

                    // Calculate percentage score, only if totalQuestions > 0 to avoid division by zero
                    if (totalQuestions > 0) {
                        const percentage = (correct / totalQuestions) * 100;
                        result[level][categoryIndex] = Math.round(percentage); // Round to nearest integer
                    } else {
                        result[level][categoryIndex] = 0; // If no questions, score is 0
                    }
                }
            });
        });

        return result;
    }

    function aggregateStudentsDataByCategoryAndLevel(studentData) {
        const categories = ["speaking", "writing", "reading", "listening A", "listening B", "pronunciation"];
        const levels = ["level-1", "level-2", "level-3", "level-4"];

        // Initialize the structure with all categories and levels
        const aggregatedByCategory = {};
        categories.forEach((category) => {
            aggregatedByCategory[category] = {};
            levels.forEach((level) => {
                aggregatedByCategory[category][level] = {
                    totalScore: 0,
                    totalQuestions: 0,
                    correct: 0,
                    incorrect: 0,
                };
            });
        });

        // Aggregate data from the studentData array
        studentData.forEach((entry) => {
            const { category, level, questions } = entry;

            if (aggregatedByCategory[category] && aggregatedByCategory[category][level]) {
                aggregatedByCategory[category][level].totalScore += parseInt(questions.score, 10);
                aggregatedByCategory[category][level].totalQuestions += parseInt(questions.total, 10);
                aggregatedByCategory[category][level].correct += parseInt(questions.correct, 10);
                aggregatedByCategory[category][level].incorrect += parseInt(questions.inCorrect, 10);
            }
        });

        return aggregatedByCategory;
    }

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
                            
                            aggregatedByCategory = aggregateStudentsDataByCategoryAndLevel(studentInfo.data);
                            console.log(aggregatedByCategory)

                            // Aggregate questions by category for this student
                            const result = aggregateQuestionsByCategoryAndLevel(studentInfo.data);

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
                let finalData = [];
                if (studentPage) {
                    finalData = transformAggregatedDataToResultFormat(aggregatedByCategory)
                } else {
                    if (selectedClass) {
                        const studentsArray = analyzeData(aggregatedData[selectedClass]);
                        if (aggregatedData[selectedClass]) {
                            if (selectedClass && selectedStudent) {
                                const tmpstudentsArray = analyzeData(aggregatedData[selectedClass]);
                                if (tmpstudentsArray[selectedStudent]) {
                                    finalData = analyzeSingleStudentData(tmpstudentsArray[selectedStudent])
                                } else {
                                    finalData = [];
                                }
                            } else {
                                finalData = getTotalAnalytics(studentsArray)
                            }
                        } else {
                            finalData = [];
                        }
                    } else {
                        finalData = getTotalAnalyticsData(aggregatedData)
                    }
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
            colors: ['#D2B48C', '#A0522D', '#8B4513', '#5C4033'],
            dataLabels: {
                enabled: false  // Disable data labels inside the blocks
            },
            stroke: {
                width: 2,  // Line thickness
                curve: 'straight'  // No soft curves
            },
            title: {
                text: 'Performance Index By Level',
                align: 'left'
            },
            markers: {
                size: 5,  // Default marker size
                hover: {
                    size: 6  // Slightly bigger on hover
                },
                colors: ['#D2B48C', '#A0522D', '#8B4513', '#5C4033'],// Marker colors for different series
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