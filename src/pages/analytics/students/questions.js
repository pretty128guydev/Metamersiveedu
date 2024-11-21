import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import VillageApi from "../../../api-clients/VillageApi";
import { AnalyticsAPI } from "../../../api-clients/AnalyticsAPI";
import { useSelector } from "react-redux";
import WordApi from "../../../api-clients/WordApi";
import TagApi from "../../../api-clients/TagApi";


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
                            text: 'Performance Index By Skill',
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
                    series={originalSeries.length > 0 ? originalSeries : [{ name: "No Data", data: [] }]}
                    type="bar"
                    height={350}
                    width="100%"
                />
            </div>
            <div id="html-dist"></div>
        </div>
    );
};


const QuestionsChart = ({ selectedClass, selectedStudent, teacher_id }) => {
    const [loading, setLoading] = useState(false);
    const name = ['Pronunciation', 'ListeningB', 'ListeningA', 'Reading', 'Writing', 'Speaking'];
    const [originalSeries, setoriginalSeries] = useState([]);

    function analyzeClassData(classData) {
        const skills = ['Pronunciation', 'ListeningB', 'ListeningA', 'Reading', 'Writing', 'Speaking'];

        let totalCorrect = Array(skills.length).fill(0);
        let totalIncorrect = Array(skills.length).fill(0);
        let totalUnanswered = Array(skills.length).fill(0);
        let totalQuestions = Array(skills.length).fill(0);  // Track the total number of questions for each skill

        // Loop through each student in the class
        for (let studentId in classData) {
            const studentData = classData[studentId];

            // Loop through each skill for the student
            skills.forEach((skill, idx) => {
                const skillKey = skill.toLowerCase();  // Convert to lowercase to match keys

                if (studentData[skillKey]) {
                    const skillInfo = studentData[skillKey];
                    const total = skillInfo.totalQuestions;

                    // Accumulate total questions for each skill
                    totalQuestions[idx] += total;

                    // Accumulate the total correct, incorrect, and unanswered counts for each skill
                    totalCorrect[idx] += skillInfo.correct || 0;
                    totalIncorrect[idx] += skillInfo.incorrect || 0;
                    totalUnanswered[idx] += (total - skillInfo.correct - skillInfo.incorrect) || 0;
                }
            });
        }

        // Calculate the percentages
        let CR = [];
        let E = [];
        let UQ = [];

        skills.forEach((skill, idx) => {
            const total = totalQuestions[idx];

            if (total > 0) {
                // Calculate percentages if there are total questions
                CR.push(Math.round((totalCorrect[idx] / total) * 100));
                E.push(Math.round((totalIncorrect[idx] / total) * 100));
                UQ.push(Math.round((totalUnanswered[idx] / total) * 100));
            } else {
                // If no questions for a skill, set all to 0%
                CR.push(0);
                E.push(0);
                UQ.push(0);
            }
        });

        // Ensure that the sum of CR, E, and UQ for each skill is exactly 100%
        CR.forEach((val, idx) => {
            const sum = CR[idx] + E[idx] + UQ[idx];

            if (sum > 0 && sum !== 100) {
                // Only correct the values if the sum is greater than 0
                const correction = 100 - sum;
                CR[idx] += correction; // Adjust the correct value to make sure it sums to 100%
            }
        });

        return {
            CR: CR,
            E: E,
            UQ: UQ
        };
    }

    function analyzeStudentData(studentData) {
        const skills = ['Pronunciation', 'ListeningB', 'ListeningA', 'Reading', 'Writing', 'Speaking'];

        let correct = Array(skills.length).fill(0);
        let incorrect = Array(skills.length).fill(0);
        let unanswered = Array(skills.length).fill(0);

        // Loop through each skill and calculate the results for the student
        skills.forEach((skill, idx) => {
            const skillKey = skill.toLowerCase();  // Convert to lowercase to match keys

            if (studentData[skillKey]) {
                const skillInfo = studentData[skillKey];
                const totalQuestions = skillInfo.totalQuestions;

                // If there are no total questions for the skill, set everything to 0%
                if (totalQuestions > 0) {
                    correct[idx] = Math.round((skillInfo.correct / totalQuestions) * 100) || 0;
                    incorrect[idx] = Math.round((skillInfo.incorrect / totalQuestions) * 100) || 0;
                    unanswered[idx] = Math.round(((totalQuestions - skillInfo.correct - skillInfo.incorrect) / totalQuestions) * 100);
                }
            }
        });

        return {
            CR: correct,
            E: incorrect,
            UQ: unanswered
        };
    }
    function analyzeClassesData(classesData) {
        const skills = ['Pronunciation', 'ListeningB', 'ListeningA', 'Reading', 'Writing', 'Speaking'];

        let totalCorrect = Array(skills.length).fill(0);
        let totalIncorrect = Array(skills.length).fill(0);
        let totalUnanswered = Array(skills.length).fill(0);
        let totalQuestions = Array(skills.length).fill(0);

        // Loop through each class
        for (let classKey in classesData) {
            const classData = classesData[classKey];

            // Loop through each student in the class
            for (let studentId in classData) {
                const studentData = classData[studentId];

                // Loop through each skill for the student
                skills.forEach((skill, idx) => {
                    const skillKey = skill.toLowerCase();  // Convert to lowercase to match keys

                    if (studentData[skillKey]) {
                        const skillInfo = studentData[skillKey];

                        // Accumulate the total questions for each skill
                        totalQuestions[idx] += skillInfo.totalQuestions;

                        // Accumulate the total correct, incorrect, and unanswered counts for each skill
                        totalCorrect[idx] += skillInfo.correct || 0;
                        totalIncorrect[idx] += skillInfo.incorrect || 0;
                        totalUnanswered[idx] += (skillInfo.totalQuestions - skillInfo.correct - skillInfo.incorrect) || 0;
                    }
                });
            }
        }

        // Calculate the percentages
        let CR = [];
        let E = [];
        let UQ = [];

        skills.forEach((skill, idx) => {
            const total = totalQuestions[idx];

            if (total > 0) {
                CR.push(Math.round((totalCorrect[idx] / total) * 100));
                E.push(Math.round((totalIncorrect[idx] / total) * 100));
                UQ.push(Math.round((totalUnanswered[idx] / total) * 100));
            } else {
                // If there is no data for this skill, set all values to 0%
                CR.push(0);
                E.push(0);
                UQ.push(0);
            }
        });

        // Ensure that the sum of CR, E, and UQ for each skill is exactly 100%
        CR.forEach((val, idx) => {
            const sum = CR[idx] + E[idx] + UQ[idx];

            if (sum > 0 && sum !== 100) {
                // Only correct the values if the sum is greater than 0
                const correction = 100 - sum;
                CR[idx] += correction; // Adjust the correct value to make sure it sums to 100%
            }
        });

        return {
            CR: CR,
            E: E,
            UQ: UQ
        };
    }

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

    const getArrays = (data) => {
        // Iterate over the data array and extract values for each field
        const tmporiginalSeries = [
            { name: 'Correct Responses', data: data.CR ? data.CR : [0, 0, 0, 0, 0, 0] },
            { name: 'Errors', data: data.E ? data.E : [0, 0, 0, 0, 0, 0] },
            { name: 'Unresolved Questions', data: data.UQ ? data.UQ : [0, 0, 0, 0, 0, 0] }
        ];
        setoriginalSeries(tmporiginalSeries)
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
                        setLoading(false);
                    }
                });

                // Wait for all API calls to complete
                await Promise.all(promises);

                let allStudentsArray = [];

                for (let key in aggregatedData) {
                    if (aggregatedData.hasOwnProperty(key)) {
                        if (selectedClass) {
                            if (aggregatedData[selectedClass]) {
                                allStudentsArray = analyzeClassData(aggregatedData[selectedClass]);
                                if (selectedStudent) {
                                    allStudentsArray = analyzeStudentData(aggregatedData[selectedClass][selectedStudent]);
                                }
                            } else {
                                allStudentsArray = [];
                            }
                        } else {
                            allStudentsArray = analyzeClassesData(aggregatedData);
                        }
                    }
                }
                if (selectedClass) {
                    getArrays(allStudentsArray)
                    if (selectedStudent) {
                        getArrays(allStudentsArray)
                    }
                } else {
                    getArrays(allStudentsArray)
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
    }, [selectedClass, selectedStudent]);

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

export default QuestionsChart;