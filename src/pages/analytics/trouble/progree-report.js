import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { AnalyticsAPI } from '../../../api-clients/AnalyticsAPI';
import VillageApi from '../../../api-clients/VillageApi';
import { useSelector } from 'react-redux';
import WordApi from '../../../api-clients/WordApi';
import TagApi from '../../../api-clients/TagApi';

const Progress_Report = ({ selectedClass, selectedCategory, selectedStudent, teacher_id }) => {
    const [loading, setLoading] = useState(false);
    const [months, setmonths] = useState([]);
    const [chartdata, setchartdata] = useState([]);

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

    function analyzeDataByLevels(data, months, selectedCategory = null) {
        const levels = ["level-1", "level-2", "level-3", "level-4"];
        const result = [];

        // Iterate through each level
        levels.forEach((level) => {
            const levelData = Array(12).fill(0); // Initialize level data for each of the 12 months (January to December)

            // Iterate over each month (assumed that months array contains all 12 months)
            months.forEach((month, monthIndex) => {
                let totalQuestions = 0;
                let correctQuestions = 0;

                // Iterate over each student in the data
                for (const student in data) {
                    const studentData = data[student];

                    // Check if the student has data for the specific month
                    if (studentData[month]) {
                        // If a category is selected, filter by category, otherwise, include all categories
                        const categories = selectedCategory
                            ? { [selectedCategory]: studentData[month][selectedCategory] }
                            : studentData[month];

                        // Iterate over each category in the month
                        for (const category in categories) {
                            const categoryData = categories[category];

                            // Check if the level exists within the category
                            if (categoryData && categoryData[level]) {
                                const levelDataForCategory = categoryData[level];

                                // Accumulate the total number of questions and correct answers for this level
                                totalQuestions += levelDataForCategory.questions || 0;
                                correctQuestions += levelDataForCategory.correct || 0;
                            }
                        }
                    }
                }

                // If there are questions for this level and month, calculate the percentage
                if (totalQuestions > 0) {
                    levelData[monthIndex] = Math.round((correctQuestions / totalQuestions) * 100);
                }
            });

            // Push the result for the current level
            result.push({
                [level]: levelData,
            });
        });

        return result;
    }
    function analyzeStudentDataByMonth(data, months, selectedCategory = null) {
        const result = [
            { "level-1": Array(12).fill(0) },
            { "level-2": Array(12).fill(0) },
            { "level-3": Array(12).fill(0) },
            { "level-4": Array(12).fill(0) }
        ];

        // Iterate through each month
        months.forEach((month, monthIndex) => {
            const monthData = data[month];

            if (!monthData) return;

            // If a category is selected, limit to that category; otherwise, iterate through all categories
            const categories = selectedCategory ? { [selectedCategory]: monthData[selectedCategory] } : monthData;

            // Iterate through each category in the month
            for (const category in categories) {
                const categoryData = categories[category];

                // Iterate through each level in the category
                for (const level in categoryData) {
                    const levelData = categoryData[level];
                    const levelIndex = parseInt(level.split('-')[1]) - 1; // Extracts the level number (e.g., "level-3" -> 3)

                    // Calculate accuracy if there are questions for this level
                    if (levelData.questions > 0) {
                        const accuracy = Math.round((levelData.correct / levelData.questions) * 100);
                        result[levelIndex][level][monthIndex] = accuracy;
                    }
                }
            }
        });

        return result;
    }

    function transformDataToLevelArrays(data, selectedCategory, months) {
        // Initialize result structure to track totals
        const totals = {
            "level-1": Array(months.length).fill(0),
            "level-2": Array(months.length).fill(0),
            "level-3": Array(months.length).fill(0),
            "level-4": Array(months.length).fill(0),
        };

        const questions = {
            "level-1": Array(months.length).fill(0),
            "level-2": Array(months.length).fill(0),
            "level-3": Array(months.length).fill(0),
            "level-4": Array(months.length).fill(0),
        };

        // Iterate through all students
        for (const studentId in data) {
            const studentData = data[studentId];

            if (!studentData || Object.keys(studentData).length === 0) continue;

            for (const className in studentData) {
                const classData = studentData[className];

                for (const month in classData) {
                    const monthIndex = months.indexOf(month);

                    if (monthIndex === -1) {
                        console.error(`Invalid month: ${month}, available months: ${months}`);
                        continue;
                    }

                    const categories = selectedCategory
                        ? { [selectedCategory]: classData[month][selectedCategory] }
                        : classData[month];

                    for (const category in categories) {
                        const categoryData = categories[category];
                        if (!categoryData) continue;

                        for (const level in categoryData) {
                            const levelData = categoryData[level];

                            if (!totals[level]) {
                                console.error(`Unexpected level: ${level}, available levels: ${Object.keys(totals)}`);
                                continue;
                            }

                            if (!levelData || levelData.questions === 0 || typeof levelData.correct !== "number") {
                                console.warn(`Skipping invalid level data: ${JSON.stringify(levelData)}`);
                                continue;
                            }

                            totals[level][monthIndex] += levelData.correct;
                            questions[level][monthIndex] += levelData.questions;
                        }
                    }
                }
            }
        }

        // Compute averages and scale to percentages
        const result = {};
        for (const level in totals) {
            result[level] = totals[level].map((correct, index) => {
                const totalQuestions = questions[level][index];
                return totalQuestions > 0 ? Math.round((correct / totalQuestions) * 100) : 0;
            });
        }

        // Transform the result object into the desired format
        return Object.keys(result).map(level => ({
            [level]: result[level],
        }));
    }
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
                        const result = analyzeDataByLevelAndCategoryWithDate(studentsData.data);

                        // Temporarily store the aggregated result in the variable
                        if (!aggregatedData[classId.id]) {
                            aggregatedData[classId.id] = {};
                        }
                        aggregatedData[classId.id] = result;
                    } catch (error) {
                        console.error(`Error fetching data for class ${classId.id}:`, error);
                        setLoading(false);
                    }
                });

                // Wait for all API calls to complete
                await Promise.all(promises);

                // Set the aggregated data to the state after all promises have completed
                setLoading(false); // Set loading to false after all API calls are finished
                let newSeries = [];
                const currentMonth = getCurrentMonth(); // Change this to the current month dynamically if needed
                const months = getLast12Months(currentMonth);
                setmonths(months)

                for (let key in aggregatedData) {
                    if (aggregatedData.hasOwnProperty(key)) {
                        if (selectedClass) {
                            if (selectedStudent) {
                                const studentData = analyzeStudentDataByMonth(aggregatedData[selectedClass][selectedStudent], months, selectedCategory ? selectedCategory : null)
                                newSeries = studentData.map((data) => {
                                    const studentName = Object.keys(data)[0]; // Extract student name
                                    const percentages = data[studentName]; // Get percentages for the months

                                    return {
                                        name: studentName,
                                        data: percentages,
                                    };
                                });
                            } else {
                                if (aggregatedData[selectedClass]) {
                                    // Process data for selectedClass
                                    const finalData = analyzeDataByLevels(aggregatedData[selectedClass], months, selectedCategory ? selectedCategory : null)
                                    newSeries = finalData.map((data) => {
                                        const studentName = Object.keys(data)[0]; // Extract student name
                                        const percentages = data[studentName]; // Get percentages for the months

                                        return {
                                            name: studentName,
                                            data: percentages,
                                        };
                                    });
                                }
                            }
                        } else {
                            const allClassesArray = transformDataToLevelArrays(aggregatedData, selectedCategory ? selectedCategory : null, months);
                            newSeries = allClassesArray.map((data) => {
                                const studentName = Object.keys(data)[0]; // Extract student name
                                const percentages = data[studentName]; // Get percentages for the months

                                return {
                                    name: studentName,
                                    data: percentages,
                                };
                            });
                        }
                    }
                }

                setchartdata(newSeries)

            } catch (error) {
                console.error('Error fetching classrooms or data:', error);
                setLoading(false);
            }
        };

        fetchAllApis().catch(() => {
            setLoading(false);
        });
    }, [selectedClass, selectedCategory, selectedStudent]);  // Empty dependency array means this effect runs only once when the component mounts

    const options = {
        chart: {
            type: 'bar',
            height: 430
        },
        colors: ['#D2B48C', '#A0522D', '#8B4513', '#5C4033'],
        plotOptions: {
            bar: {
                horizontal: false, // Vertical bars
                dataLabels: {
                    position: 'top',
                },
            }
        },
        title: {
            text: "Progress Report by Month"
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
