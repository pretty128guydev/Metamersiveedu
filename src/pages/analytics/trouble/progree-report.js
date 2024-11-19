import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { AnalyticsAPI } from '../../../api-clients/AnalyticsAPI';
import VillageApi from '../../../api-clients/VillageApi';
import { useSelector } from 'react-redux';

const Progress_Report = ({ selectedClass }) => {
    const [loading, setLoading] = useState(false);
    const [months, setmonths] = useState([]);
    const [chartdata, setchartdata] = useState([]);
    const userInfo = useSelector((store) => store.auth.userInfo);

    function analyzeDataByLevelAndCategoryWithDate(data) {
        const result = {}; // Final result to store the aggregated data

        // Loop through each student's data
        Object.keys(data).forEach(studentId => {
            const student = data[studentId];
            const { student_name, data: activities } = student; // Destructure to get student name and activities

            // Initialize an entry for this student if it doesn't already exist
            if (!result[student_name]) {
                result[student_name] = {};
            }

            // Loop through each activity for this student
            activities.forEach(activity => {
                const activityDate = new Date(activity.createdAt); // Convert the createdAt string to Date object
                const monthYear = `${activityDate.getFullYear()}-${String(activityDate.getMonth() + 1).padStart(2, '0')}`; // Format as YYYY-MM

                // Initialize the month entry if it doesn't exist for this student
                if (!result[student_name][monthYear]) {
                    result[student_name][monthYear] = {};
                }

                // Extract the category and level from the activity
                const category = activity.category;
                const level = activity.level;

                // Initialize the category entry if it doesn't exist for this month
                if (!result[student_name][monthYear][category]) {
                    result[student_name][monthYear][category] = {};
                }

                // Initialize the level entry if it doesn't exist for this category
                if (!result[student_name][monthYear][category][level]) {
                    result[student_name][monthYear][category][level] = {
                        spentTime: 0,
                        questions: 0,
                        correct: 0,
                        incorrect: 0,
                        score: 0,
                        activities: [] // Store each activity's createdAt here
                    };
                }

                // Get the category-level data to update
                const levelData = result[student_name][monthYear][category][level];

                // Aggregate statistics for this level/category combination
                levelData.spentTime += activity.spent_time;
                levelData.questions += parseInt(activity.questions.total, 10);
                levelData.correct += parseInt(activity.questions.correct, 10);
                levelData.incorrect += parseInt(activity.questions.inCorrect, 10);
                levelData.score += parseInt(activity.questions.score, 10);

                // Add the createdAt date for this activity
                levelData.activities.push(activity.createdAt);
            });
        });

        return result; // Return the aggregated result
    }

    function getLast12Months(currentMonth) {
        const result = [];
        const current = new Date(currentMonth + "-01");

        for (let i = 11; i >= 0; i--) {
            const date = new Date(current.getFullYear(), current.getMonth() - i, 1);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            result.push(`${year}-${month}`);
        }

        return result;
    }

    function getCurrentMonth() {
        const now = new Date(); // Get the current date
        const year = now.getFullYear(); // Get the full year (e.g., 2024)
        const month = String(now.getMonth() + 1).padStart(2, "0"); // Get the month (1-based) and pad with "0"
        return `${year}-${month}`; // Combine year and month
    }

    function formatData(data) {
        const result = {};

        for (const studentName in data) {
            result[studentName] = {}; // Initialize the student in the result

            const studentData = data[studentName];

            for (const month in studentData) {
                if (!result[studentName][month]) {
                    result[studentName][month] = {}; // Initialize the month for the student
                }

                const monthData = studentData[month];

                for (const category in monthData) {
                    const categoryData = monthData[category];

                    for (const level in categoryData) {
                        const levelData = categoryData[level];
                        const { questions, correct } = levelData;

                        if (!result[studentName][month][level]) {
                            result[studentName][month][level] = {}; // Initialize the level for the month
                        }

                        if (!result[studentName][month][level][category]) {
                            result[studentName][month][level][category] = {
                                totalQuestions: 0,
                                correctQuestions: 0,
                            };
                        }

                        // Aggregate questions and correct answers
                        result[studentName][month][level][category].totalQuestions += questions;
                        result[studentName][month][level][category].correctQuestions += correct;
                    }
                }
            }
        }

        return result;
    }

    function analyzeStudentPerformance(data, months) {
        const result = [];

        // Iterate over each student in the data
        for (const studentName in data) {
            const monthlyData = Array(months.length).fill(0); // Initialize the data array for months

            // Iterate over the months in the student's data
            for (const month in data[studentName]) {
                const monthIndex = months.indexOf(month); // Find the index of the month in the months array
                if (monthIndex !== -1) {
                    let totalQuestions = 0;
                    let correctQuestions = 0;

                    // Iterate over levels in the month
                    for (const level in data[studentName][month]) {
                        for (const category in data[studentName][month][level]) {
                            const categoryData = data[studentName][month][level][category];
                            totalQuestions += categoryData.totalQuestions || 0;
                            correctQuestions += categoryData.correctQuestions || 0;
                        }
                    }

                    // Calculate the percentage for the month
                    if (totalQuestions > 0) {
                        monthlyData[monthIndex] = Math.round((correctQuestions / totalQuestions) * 100);
                    }
                }
            }

            // Push the student's performance data
            result.push({
                [studentName]: monthlyData
            });
        }

        return result;
    }

    function analyzeDataByLevels(data, months) {
        const levels = ["level-1", "level-2", "level-3", "level-4"];
        const result = [];

        levels.forEach((level) => {
            const levelData = Array(months.length).fill(0); // Initialize level data for each month

            months.forEach((month, monthIndex) => {
                let totalQuestions = 0;
                let correctQuestions = 0;

                // Iterate over each student
                for (const student in data) {
                    if (data[student][month] && data[student][month][level]) {
                        const levelCategories = data[student][month][level];

                        // Accumulate questions and correct answers across categories
                        for (const category in levelCategories) {
                            totalQuestions += levelCategories[category].totalQuestions || 0;
                            correctQuestions += levelCategories[category].correctQuestions || 0;
                        }
                    }
                }

                // Calculate percentage if there are questions for the level in the month
                if (totalQuestions > 0) {
                    levelData[monthIndex] = Math.round((correctQuestions / totalQuestions) * 100);
                }
            });

            result.push({
                [level]: levelData,
            });
        });

        return result;
    }

    // Function to analyze data
    function analyzeData(data, months) {
        const result = [];  // Result should be an array of objects

        // Loop through each user's data
        for (const [key, userData] of Object.entries(data)) {
            // Calculate percentages for each month for this user
            const percentages = months.map((month) => {
                if (userData[month]) {
                    const { totalCorrect, totalQuestions } = userData[month];
                    // Calculate percentage and round it to the nearest integer
                    return totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
                } else {
                    return 0; // If no data for the month, return 0
                }
            });

            // Push the result as an object with the user key and their percentages
            result.push({ [key]: percentages });
        }

        return result;
    }

    function analyzeDataByClass(data, months) {
        const result = {}; // This will store the result for each class

        // Iterate through each student in the data
        for (const studentId in data) {
            const studentData = data[studentId];

            // Iterate through each class data (s1, s4, S5, etc.) for each student
            for (const className in studentData) {
                const classData = studentData[className];

                // Initialize the result array for this class if it doesn't exist
                if (!result[className]) {
                    result[className] = Array(months.length).fill(0); // 12 months, all initialized to 0
                }

                // If classData is empty, just skip this student for that class and continue to the next class
                if (Object.keys(classData).length === 0) {
                    continue;
                }

                // Iterate through each month and calculate the percentage
                months.forEach((month, index) => {
                    const monthData = classData[month];
                    if (monthData && monthData.totalQuestions > 0) {
                        // Calculate the percentage of correct answers
                        const percentage = (monthData.totalCorrect / monthData.totalQuestions) * 100;
                        // Add to the class's result (rounding to avoid decimals)
                        result[className][index] += Math.round(percentage);
                    }
                });
            }
        }

        // Ensure that all classes with no data for any student have an array of zeroes
        for (const className in result) {
            if (result[className].length === 0) {
                result[className] = Array(months.length).fill(0); // Add zeroes if no data was added for that class
            }
        }

        return result; // Returns an object where the key is the class name
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
                        console.log(studentsData.data)
                        // Iterate over each student in the response
                        const result = analyzeDataByLevelAndCategoryWithDate(studentsData.data);

                        // Temporarily store the aggregated result in the variable
                        if (!aggregatedData[classId]) {
                            aggregatedData[classId] = {};
                        }
                        aggregatedData[classId] = result;
                    } catch (error) {
                        console.error(`Error fetching data for class ${classId}:`, error);
                        setLoading(false);
                    }
                });

                // Wait for all API calls to complete
                await Promise.all(promises);

                console.log(aggregatedData)

                // Set the aggregated data to the state after all promises have completed
                setLoading(false); // Set loading to false after all API calls are finished
                let newSeries = [];
                const currentMonth = getCurrentMonth(); // Change this to the current month dynamically if needed
                const months = getLast12Months(currentMonth);
                setmonths(months)

                for (let key in aggregatedData) {
                    if (aggregatedData.hasOwnProperty(key)) {
                        if (selectedClass) {
                            if (aggregatedData[selectedClass]) {
                                // Process data for selectedClass
                                const allStudentsArray = formatData(aggregatedData[selectedClass]);
                                const finalData = analyzeDataByLevels(allStudentsArray, months)
                                newSeries = finalData.map((data) => {
                                    const studentName = Object.keys(data)[0]; // Extract student name
                                    const percentages = data[studentName]; // Get percentages for the months

                                    return {
                                        name: studentName,
                                        data: percentages,
                                    };
                                });
                            }
                        } else {
                            const allClassesArray = analyzeDataByClass(aggregatedData, months);
                            console.log(allClassesArray)
                            newSeries = Object.keys(allClassesArray).map((className) => {
                                const percentages = allClassesArray[className];
                                return {
                                    name: className,
                                    data: percentages,  // Ensure this is an array of percentages per month
                                };
                            });
                        }
                    }
                }

                if (selectedClass) {
                    setchartdata(newSeries)
                } else {
                    setchartdata(newSeries)
                }

                console.log(months)

            } catch (error) {
                console.error('Error fetching classrooms or data:', error);
                setLoading(false);
            }
        };

        fetchAllApis().catch(() => {
            setLoading(false);
        });
    }, [selectedClass]);  // Empty dependency array means this effect runs only once when the component mounts

    const options = {
        chart: {
            type: 'bar',
            height: 430
        },
        plotOptions: {
            bar: {
                horizontal: false, // Vertical bars
                dataLabels: {
                    position: 'top',
                },
            }
        },
        dataLabels: {
            enabled: true,
            offsetX: -6,
            style: {
                fontSize: '12px',
                colors: ['#fff']
            }
        },
        stroke: {
            show: true,
            width: 1,
            colors: ['#fff']
        },
        tooltip: {
            shared: true,
            intersect: false
        },
        xaxis: {
            categories: months,
        }
    };

    if (loading || chartdata && chartdata.length === 0) {
        return <div></div>;
    }

    return (
        <div>
            <Chart
                options={options}
                series={chartdata}
                type="bar"
                height={430}
            />
        </div>
    );
};

export default Progress_Report;
