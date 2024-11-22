import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { AnalyticsAPI } from '../../../api-clients/AnalyticsAPI';
import VillageApi from '../../../api-clients/VillageApi';
import { useSelector } from 'react-redux';
import WordApi from '../../../api-clients/WordApi';
import TagApi from '../../../api-clients/TagApi';

const YTD_Growth = ({ selectedClass, selectedCategory, selectedStudent, teacher_id }) => {
  const [loading, setLoading] = useState(false);
  const [months, setmonths] = useState([]);
  const [chartdata, setchartdata] = useState([]);

  function analyzeDataByMonth(data) {
    const result = {};

    Object.keys(data).forEach(studentId => {
      const student = data[studentId];
      const { student_name, data: activities } = student;

      if (!result[student_name]) {
        result[student_name] = {};
      }

      activities.forEach(activity => {
        const activityDate = new Date(activity.createdAt);
        const monthYear = `${activityDate.getFullYear()}-${String(activityDate.getMonth() + 1).padStart(2, '0')}`;

        if (!result[student_name][monthYear]) {
          result[student_name][monthYear] = {
            totalSpentTime: 0,
            totalQuestions: 0,
            totalCorrect: 0,
            totalIncorrect: 0,
            totalScore: 0,
            categories: {} // To track per-category stats
          };
        }

        const monthData = result[student_name][monthYear];
        monthData.totalSpentTime += activity.spent_time;
        monthData.totalQuestions += parseInt(activity.questions.total, 10);
        monthData.totalCorrect += parseInt(activity.questions.correct, 10);
        monthData.totalIncorrect += parseInt(activity.questions.inCorrect, 10);
        monthData.totalScore += parseInt(activity.questions.score, 10);

        const category = activity.category;
        if (!monthData.categories[category]) {
          monthData.categories[category] = {
            spentTime: 0,
            questions: 0,
            correct: 0,
            incorrect: 0,
            score: 0
          };
        }

        const categoryData = monthData.categories[category];
        categoryData.spentTime += activity.spent_time;
        categoryData.questions += parseInt(activity.questions.total, 10);
        categoryData.correct += parseInt(activity.questions.correct, 10);
        categoryData.incorrect += parseInt(activity.questions.inCorrect, 10);
        categoryData.score += parseInt(activity.questions.score, 10);
      });
    });

    return result;
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

  const getClassNameById = (classes, id) => {
      // Find the class with the matching id
      const foundClass = classes.find(classItem => classItem.id === id);
      // Return the name if found, otherwise return null or a default message
      return foundClass ? foundClass.name : null;
  };

  // Function to analyze data
  function analyzeData(data, months, category = null) {
    const result = {};

    // Loop through each session (s1, s4, s5, etc.)
    for (const sessionKey in data) {
      const sessionData = data[sessionKey];
      const sessionResult = [];

      // Loop through each month in the provided months array
      for (const month of months) {
        let correct = 0;
        let totalQuestions = 0;

        // Check if the month exists in the session data
        if (sessionData[month]) {
          // If a category is specified, calculate only for that category
          if (category) {
            if (sessionData[month].categories[category]) {
              const categoryData = sessionData[month].categories[category];
              correct += categoryData.correct;
              totalQuestions += categoryData.questions;
            }
          } else {
            // If no category specified, aggregate across all categories
            for (const cat in sessionData[month].categories) {
              const categoryData = sessionData[month].categories[cat];
              correct += categoryData.correct;
              totalQuestions += categoryData.questions;
            }
          }
        }

        // Calculate the correct percentage for the month and round to the nearest integer
        const correctPercentage = totalQuestions > 0 ? Math.round((correct / totalQuestions) * 100) : 0;
        sessionResult.push(correctPercentage);
      }

      result[sessionKey] = sessionResult;
    }

    return result;
  }

  function analyzeStudentData(data, months, category = null) {
    const result = [];

    // Loop through each month in the provided months array
    for (const month of months) {
      let correct = 0;
      let totalQuestions = 0;

      // Check if the given month exists in the student's data
      if (data[month]) {
        // If a category is specified, calculate for that category
        if (category) {
          if (data[month].categories[category]) {
            const categoryData = data[month].categories[category];
            correct += categoryData.correct;
            totalQuestions += categoryData.questions;
          }
        } else {
          // If no category is specified, aggregate across all categories
          for (const cat in data[month].categories) {
            const categoryData = data[month].categories[cat];
            correct += categoryData.correct;
            totalQuestions += categoryData.questions;
          }
        }

        // Calculate the correct percentage for the month and push it to the result array
        const correctPercentage = totalQuestions > 0 ? Math.round((correct / totalQuestions) * 100) : 0;
        result.push(correctPercentage);
      } else {
        // If the month is not found, push 0 (no data for that month)
        result.push(0);
      }
    }

    return result;
  }

  function analyzeDataByClass(data, category = null, months = []) {
    const result = {};

    // Initialize result structure
    for (const user in data) {
      result[user] = Array(months.length).fill(0);
    }

    // Process each user
    for (const user in data) {
      const userData = data[user];
      if (!userData || Object.keys(userData).length === 0) continue;

      // Process monthly data
      for (const section in userData) {
        const sectionData = userData[section];
        for (const month in sectionData) {
          const monthIndex = months.indexOf(month);
          if (monthIndex === -1) continue;

          const monthDetails = sectionData[month];

          // Calculate data for the specified category or total
          let correct = 0, questions = 0;
          if (category && monthDetails.categories[category]) {
            const catData = monthDetails.categories[category];
            correct += catData.correct;
            questions += catData.questions;
          } else if (!category) {
            correct += monthDetails.totalCorrect;
            questions += monthDetails.totalQuestions;
          }

          // Calculate percentage and update the result
          result[user][monthIndex] += questions > 0 ? Math.round((correct / questions) * 100) : 0;
        }
      }
    }

    return result;
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
            const result = analyzeDataByMonth(studentsData.data);

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
                if (aggregatedData[selectedClass][selectedStudent]) {
                  const oneStudentArray = analyzeStudentData(aggregatedData[selectedClass][selectedStudent], months, selectedCategory ? selectedCategory : null)
                  const finalOneStudentArray = {
                    [selectedStudent]: oneStudentArray
                  }
                  newSeries = Object.keys(finalOneStudentArray).map((studetname) => {
                    const percentages = finalOneStudentArray[studetname];
                    return {
                      name: studetname,
                      data: percentages,  // Ensure this is an array of percentages per month
                    };
                  });
                }
              } else {
                if (aggregatedData[selectedClass]) {
                  // Process data for selectedClass
                  const allStudentsArray = analyzeData(aggregatedData[selectedClass], months, selectedCategory ? selectedCategory : null);
                  newSeries = Object.keys(allStudentsArray).map((className) => {
                    const percentages = allStudentsArray[className];
                    return {
                      name: className,
                      data: percentages,  // Ensure this is an array of percentages per month
                    };
                  });
                }
              }
            } else {
              const allClassesArray = analyzeDataByClass(aggregatedData, selectedCategory ? selectedCategory : null, months);
              newSeries = Object.keys(allClassesArray).map((className) => {
                const invalidClassName = getClassNameById(uniqueClasses, className);
                const percentages = allClassesArray[className];
                return {
                  name: invalidClassName,
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

export default YTD_Growth;
