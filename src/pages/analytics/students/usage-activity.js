import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import VillageApi from "../../../api-clients/VillageApi";
import { AnalyticsAPI } from "../../../api-clients/AnalyticsAPI";
import { useSelector } from "react-redux";
import TagApi from "../../../api-clients/TagApi";
import WordApi from "../../../api-clients/WordApi";


const UsageBySkill = ({ originalSeries, name }) => {
    useEffect(() => {
        if (!Array.isArray(originalSeries) || originalSeries.length === 0) {
            console.error("Invalid data for chart rendering: originalSeries is empty or not an array.");
        }
        if (!Array.isArray(name) || name.length === 0) {
            console.error("Invalid data for chart rendering: name is empty or not an array.");
        }
    }, [originalSeries, name]);

    const chartOptions = {
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
        },
        colors: ["#008ffb", "#00e396", "#feb019", "#ff4560", "#775dd0", "#FFFF00"],
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
            text: 'Usage By Skill ( % )',
        },
        xaxis: {
            categories: Array.isArray(name) ? name : [], // Ensure name is an array
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
    };

    const chartSeries = Array.isArray(originalSeries) && originalSeries.length > 0
        ? originalSeries
        : [{ name: "No Data", data: [] }]; // Default series if originalSeries is invalid

    return (
        <div>
            <div id="chart">
                <ReactApexChart
                    options={chartOptions}
                    series={chartSeries}
                    type="bar"
                    height={350}
                    width="100%"
                />
            </div>
            <div id="html-dist"></div>
        </div>
    );
};


const UsageActivity = ({ selectedClass, selectedStudent, teacher_id, studentPage }) => {
    const [loading, setLoading] = useState(false);
    const [name, setname] = useState([]);
    const [originalSeries, setoriginalSeries] = useState([]);



    const processStudentData = (data) => {
        const students = [];
        const studentInfo = data;
        const studentName = studentInfo.name || "Unknown";
        const categories = studentInfo;

        const categoryTotals = {};
        let studentTotalQuestions = 0;

        // First, calculate the total number of questions answered correctly
        Object.entries(categories).forEach(([category, stats]) => {
            if (category === "name") return; // Skip the name field
            const totalCorrect = stats.totalCorrect || 0;
            studentTotalQuestions += totalCorrect;
        });

        // Now calculate the percentage for each category
        Object.entries(categories).forEach(([category, stats]) => {
            if (category === "name") return; // Skip the name field
            const totalCorrect = stats.totalCorrect || 0;

            const categoryShortNames = {
                reading: "R",
                writing: "W",
                speaking: "S",
                "listening A": "LA",
                "listening B": "LB",
                pronunciation: "P",
            };

            const shortName = categoryShortNames[category];
            // Store the percentage for each category
            if (shortName && studentTotalQuestions > 0) {
                categoryTotals[shortName] = Math.round(
                    (totalCorrect / studentTotalQuestions) * 100
                );
            }
        });

        // Calculate mastery and highest skill category
        const mastered = Object.entries(categoryTotals)
            .filter(([_, value]) => value > 50)
            .map(([key]) => key);

        const [highestCategory, highestPercentage] = Object.entries(categoryTotals).reduce(
            (max, curr) => (curr[1] > max[1] ? curr : max),
            ["", 0]
        );

        // Push the processed student info
        students.push({
            name: studentName,
            totalQuestions: studentTotalQuestions,
            R: categoryTotals.R || 0,
            W: categoryTotals.W || 0,
            S: categoryTotals.S || 0,
            LA: categoryTotals.LA || 0,
            LB: categoryTotals.LB || 0,
            P: categoryTotals.P || 0,
            Skill: highestCategory,
            Score: highestPercentage,
            mastered: mastered,
        });
        return students;
    };

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
            const studentName = studentInfo.student_name;

            let studentTotalCorrect = 0;
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
                if (category !== "student_name" && category !== "total_questions") {
                    if (stats.correct) {
                        if (category === "listening A") {
                            ListeningAQuestions = stats.correct;
                            studentTotalCorrect += stats.correct
                            stats.correct > stats.correct / 2 && mastered.push(category);
                        } else if (category === "listening B") {
                            ListeningBQuestions = stats.correct;
                            studentTotalCorrect += stats.correct
                            stats.correct > stats.correct / 2 && mastered.push(category);
                        } else if (category === "reading") {
                            ReadingQuestions = stats.correct;
                            studentTotalCorrect += stats.correct
                            stats.correct > stats.correct / 2 && mastered.push(category);
                        } else if (category === "writing") {
                            WritingQuestions = stats.correct;
                            studentTotalCorrect += stats.correct
                            stats.correct > stats.correct / 2 && mastered.push(category);
                        } else if (category === "speaking") {
                            SpeakingQuestions = stats.correct;
                            studentTotalCorrect += stats.correct
                            stats.correct > stats.correct / 2 && mastered.push(category);
                        } else if (category === "pronunciation") {
                            PronunciationQuestions = stats.correct;
                            studentTotalCorrect += stats.correct
                            stats.correct > stats.correct / 2 && mastered.push(category);
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
                totalQuestions: studentTotalCorrect,
                R: studentTotalCorrect > 0 ? Math.round((ReadingQuestions / studentTotalCorrect) * 100) : 0,
                W: studentTotalCorrect > 0 ? Math.round((WritingQuestions / studentTotalCorrect) * 100) : 0,
                S: studentTotalCorrect > 0 ? Math.round((SpeakingQuestions / studentTotalCorrect) * 100) : 0,
                LA: studentTotalCorrect > 0 ? Math.round((ListeningAQuestions / studentTotalCorrect) * 100) : 0,
                LB: studentTotalCorrect > 0 ? Math.round((ListeningBQuestions / studentTotalCorrect) * 100) : 0,
                P: studentTotalCorrect > 0 ? Math.round((PronunciationQuestions / studentTotalCorrect) * 100) : 0,
                Skill: studentTotalCorrect > 0 ? ((studentCorrectAnswers / studentTotalCorrect) * 100).toFixed(2) : 0,
                Score: studentTotalScore,
                mastered: mastered,
            });
        });
        console.log(students)
        return students;

    };

    const processClass = (data, className, classes) => {
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
        const invalidClassName = getClassNameById(classes, className);

        Object.entries(data).forEach(([studentId, studentInfo]) => {

            // Process each category
            Object.entries(studentInfo).forEach(([category, stats]) => {
                if (category !== "student_name" && category !== "total_questions") {
                    if (stats.correct) {
                        if (category === "reading") classTotals.totalReadingQuestions += stats.correct;
                        if (category === "writing") classTotals.totalWritingQuestions += stats.correct;
                        if (category === "speaking") classTotals.totalSpeakingQuestions += stats.correct;
                        if (category === "listening A") classTotals.totalListeningAQuestions += stats.correct;
                        if (category === "listening B") classTotals.totalListeningBQuestions += stats.correct;
                        if (category === "pronunciation") classTotals.totalPronunciationQuestions += stats.correct;

                        // Accumulate overall totals
                        classTotals.totalScore += stats.totalScore;
                        classTotals.totalCorrectAnswers += stats.correct;
                    }
                }
            });
        });

        // Calculate class-wide metrics
        return {
            name: invalidClassName,
            totalQuestions: classTotals.totalQuestions,
            R: Math.round((classTotals.totalReadingQuestions / classTotals.totalCorrectAnswers) * 100),
            W: Math.round((classTotals.totalWritingQuestions / classTotals.totalCorrectAnswers) * 100),
            S: Math.round((classTotals.totalSpeakingQuestions / classTotals.totalCorrectAnswers) * 100),
            LA: Math.round((classTotals.totalListeningAQuestions / classTotals.totalCorrectAnswers) * 100),
            LB: Math.round((classTotals.totalListeningBQuestions / classTotals.totalCorrectAnswers) * 100),
            P: Math.round((classTotals.totalPronunciationQuestions / classTotals.totalCorrectAnswers) * 100),
            TotalScore: classTotals.totalScore,
            AverageSkill: ((classTotals.totalCorrectAnswers / classTotals.totalQuestions) * 100).toFixed(2),
        };
    };

    const analyzeStudentData = (studentData) => {
        const studentName = studentData.student_name;

        let studentTotalQuestions = 0;
        let studentTotalScore = 0;
        let studentCorrectAnswers = 0;
        let ReadingQuestions = 0;
        let WritingQuestions = 0;
        let ListeningAQuestions = 0;
        let ListeningBQuestions = 0;
        let PronunciationQuestions = 0;
        let SpeakingQuestions = 0;

        // Process each category for the student
        Object.entries(studentData).forEach(([category, stats]) => {
            if (category !== "student_name" && category !== "total_questions") {
                if (stats.correct) {
                    // Handle Reading, Writing, and Listening categories
                    if (category === "reading") {
                        ReadingQuestions = stats.correct;
                        studentTotalQuestions += stats.correct;
                    } else if (category === "writing") {
                        WritingQuestions = stats.correct;
                        studentTotalQuestions += stats.correct;
                    } else if (category === "listening A") {
                        ListeningAQuestions = stats.correct;
                        studentTotalQuestions += stats.correct;
                    } else if (category === "listening B") {
                        ListeningBQuestions = stats.correct;
                        studentTotalQuestions += stats.correct;
                    } else if (category === "pronunciation") {
                        PronunciationQuestions = stats.correct;
                        studentTotalQuestions += stats.correct;
                    } else if (category === "speaking") {
                        SpeakingQuestions = stats.correct;
                        studentTotalQuestions += stats.correct;
                    }

                    // Add the total score and correct answers
                    studentTotalScore += stats.totalScore;
                    studentCorrectAnswers += stats.correct;
                }
            }
        });

        // Calculate skill and percentage in each category
        const skill = ((studentCorrectAnswers / studentTotalQuestions) * 100).toFixed(2);
        const averageSkill = (studentCorrectAnswers / studentTotalQuestions).toFixed(2);

        return {
            name: studentName,
            totalQuestions: studentTotalQuestions,
            R: studentTotalQuestions ? Math.round((ReadingQuestions / studentTotalQuestions) * 100) : 0,
            W: studentTotalQuestions ? Math.round((WritingQuestions / studentTotalQuestions) * 100) : 0,
            S: studentTotalQuestions ? Math.round((SpeakingQuestions / studentTotalQuestions) * 100) : 0,
            LA: studentTotalQuestions ? Math.round((ListeningAQuestions / studentTotalQuestions) * 100) : 0,
            LB: studentTotalQuestions ? Math.round((ListeningBQuestions / studentTotalQuestions) * 100) : 0,
            P: studentTotalQuestions ? Math.round((PronunciationQuestions / studentTotalQuestions) * 100) : 0,
            TotalScore: studentTotalScore,
            AverageSkill: averageSkill
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

    const getClassNameById = (classes, id) => {
        // Find the class with the matching id
        const foundClass = classes.find(classItem => classItem.id === id);
        // Return the name if found, otherwise return null or a default message
        return foundClass ? foundClass.name : null;
    };

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
                let aggregatedByCategory = {};

                const promises = uniqueClasses.map(async (classId) => {
                    try {
                        const studentsData = await AnalyticsAPI.getStudentsData({
                            classId: classId.id,
                        });
                        // Iterate over each student in the response
                        Object.entries(studentsData.data).forEach(([studentId, studentInfo]) => {
                            const result = aggregateQuestionsByCategory(studentInfo.data);

                            if (studentPage && studentPage === studentId) {
                                aggregatedByCategory = studentInfo.data.reduce(
                                    (acc, activity) => {
                                        const category = activity.category;
                                        if (!acc[category]) {
                                            acc[category] = {
                                                totalSpentTime: 0,
                                                totalQuestions: 0,
                                                totalCorrect: 0,
                                                totalIncorrect: 0,
                                            };
                                        }
                                        acc.name = studentInfo.student_name
                                        acc[category].totalSpentTime += activity.spent_time || 0;
                                        acc[category].totalQuestions += parseInt(activity.questions.total, 10) || 0;
                                        acc[category].totalCorrect += parseInt(activity.questions.correct, 10) || 0;
                                        acc[category].totalIncorrect += parseInt(activity.questions.inCorrect, 10) || 0;
                                        return acc;
                                    },
                                    {}
                                );
                            }

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


                let allStudentsArray = [];
                let StudentsArray = [];
                let allClassesArray = [];

                for (let key in aggregatedData) {
                    if (aggregatedData.hasOwnProperty(key)) {
                        if (selectedClass) {
                            if (selectedStudent) {
                                if (aggregatedData[selectedClass][selectedStudent]) {
                                    StudentsArray[0] = analyzeStudentData(aggregatedData[selectedClass][selectedStudent])
                                } else {
                                    StudentsArray = [];
                                }
                            } else {
                                if (aggregatedData[selectedClass]) {
                                    allStudentsArray = processStudents(aggregatedData[selectedClass]);
                                } else {
                                    allStudentsArray = [];
                                }
                            }
                        } else {
                            allClassesArray = allClassesArray.concat(processClass(aggregatedData[key], key, uniqueClasses));
                        }
                    }
                }

                if (studentPage) {
                    const studentPageData = processStudentData(aggregatedByCategory)
                    getArrays(studentPageData)
                }
                // If the user is not a student:
                else {
                    if (selectedClass) {
                        if (selectedStudent) {
                            getArrays(StudentsArray)
                        } else {
                            getArrays(allStudentsArray)
                        }
                    } else {
                        getArrays(allClassesArray)
                    }
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