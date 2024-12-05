import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { AnalyticsAPI } from '../../../api-clients/AnalyticsAPI';
import VillageApi from '../../../api-clients/VillageApi';
import { useSelector } from 'react-redux';
import WordApi from '../../../api-clients/WordApi';
import TagApi from '../../../api-clients/TagApi';

const TopStudentPerformance = ({ studentPage, selectedClass, selectedStudent, teacher_id }) => {
    const [loading, setLoading] = useState(false);
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

    const processStudents = (data) => {
        const students = [];
        // Iterate over each student in the data
        Object.entries(data).forEach(([studentId, studentInfo]) => {
            const studentName = studentInfo.student_name;
            const studentTotalQuestions = studentInfo.total_questions;

            let studentTotalScore = 0;
            let studentCorrectAnswers = 0;
            let ReadingQuestions = 0;
            let WritingQuestions = 0;
            let SpeakingQuestions = 0;
            let ListeningAQuestions = 0;
            let ListeningBQuestions = 0;
            let ReadingAllQuestions = 0;
            let WritingAllQuestions = 0;
            let SpeakingAllQuestions = 0;
            let ListeningAAllQuestions = 0;
            let ListeningBAllQuestions = 0;
            let PronunciationQuestions = 0;
            let mastered = [];

            // Process each category
            Object.entries(studentInfo).forEach(([category, stats]) => {
                if (category !== "student_name" && category !== "total_questions") {
                    if (stats.correct) {
                        if (category === "listening A") {
                            ListeningAQuestions = stats.correct;
                            ListeningAAllQuestions = stats.totalQuestions;
                        } else if (category === "listening B") {
                            ListeningBQuestions = stats.correct;
                            ListeningBAllQuestions = stats.totalQuestions;
                        } else if (category === "reading") {
                            ReadingQuestions = stats.correct;
                            ReadingAllQuestions = stats.totalQuestions;
                        } else if (category === "writing") {
                            WritingQuestions = stats.correct;
                            WritingAllQuestions = stats.totalQuestions;
                        } else if (category === "speaking") {
                            SpeakingQuestions = stats.correct;
                            SpeakingAllQuestions = stats.totalQuestions;
                        }

                        // Accumulate student totals
                        studentTotalScore += stats.totalScore;
                        studentCorrectAnswers += stats.totalcorrect;
                    }
                }
            });
            // Add the student data to the students array
            students.push({
                name: studentName,
                totalQuestions: studentTotalQuestions,
                R: ReadingAllQuestions != 0 ? Math.round((ReadingQuestions / ReadingAllQuestions) * 20) : 0,
                W: WritingAllQuestions != 0 ? Math.round((WritingQuestions / WritingAllQuestions) * 20) : 0,
                S: SpeakingAllQuestions != 0 ? Math.round((SpeakingQuestions / SpeakingAllQuestions) * 20) : 0,
                LA: ListeningAAllQuestions != 0 ? Math.round((ListeningAQuestions / ListeningAAllQuestions) * 15) : 0,
                LB: ListeningBAllQuestions != 0 ? Math.round((ListeningBQuestions / ListeningBAllQuestions) * 15) : 0,
                SA: 15,
                total: (ReadingAllQuestions != 0 ? Math.round((ReadingQuestions / ReadingAllQuestions) * 20) : 0) +
                    (WritingAllQuestions != 0 ? Math.round((WritingQuestions / WritingAllQuestions) * 20) : 0) +
                    (SpeakingAllQuestions != 0 ? Math.round((SpeakingQuestions / SpeakingAllQuestions) * 20) : 0) +
                    (ListeningAAllQuestions != 0 ? Math.round((ListeningAQuestions / ListeningAAllQuestions) * 15) : 0) +
                    (ListeningBAllQuestions != 0 ? Math.round((ListeningBQuestions / ListeningBAllQuestions) * 15) : 0) +
                    15,
            });
        });
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
            totalAllReadingQuestions: 0,
            totalAllWritingQuestions: 0,
            totalAllSpeakingQuestions: 0,
            totalAllListeningAQuestions: 0,
            totalAllListeningBQuestions: 0,
            totalAllPronunciationQuestions: 0,
            totalCorrectAnswers: 0,
            totalScore: 0,
        };
        const invalidClassName = getClassNameById(classes, className);

        Object.entries(data).forEach(([studentId, studentInfo]) => {
            const studentTotalQuestions = studentInfo.total_questions;
            // Process each category
            Object.entries(studentInfo).forEach(([category, stats]) => {
                if (category !== "student_name" && category !== "total_questions") {
                    if (stats.correct) {
                        if (category === "reading") { classTotals.totalReadingQuestions += stats.correct; classTotals.totalAllReadingQuestions += stats.totalQuestions }
                        if (category === "writing") { classTotals.totalWritingQuestions += stats.correct; classTotals.totalAllWritingQuestions += stats.totalQuestions }
                        if (category === "speaking") { classTotals.totalSpeakingQuestions += stats.correct; classTotals.totalAllSpeakingQuestions += stats.totalQuestions }
                        if (category === "listening A") { classTotals.totalListeningAQuestions += stats.correct; classTotals.totalAllListeningAQuestions += stats.totalQuestions }
                        if (category === "listening B") { classTotals.totalListeningBQuestions += stats.correct; classTotals.totalAllListeningBQuestions += stats.totalQuestions }
                    }
                }
            });

            classTotals.totalQuestions += studentTotalQuestions;
        });
        // Calculate class-wide metrics
        return {
            name: invalidClassName,
            totalQuestions: classTotals.totalQuestions,
            R: classTotals.totalAllReadingQuestions != 0 ? Math.round((classTotals.totalReadingQuestions / classTotals.totalAllReadingQuestions) * 20) : 0,
            W: classTotals.totalAllWritingQuestions != 0 ? Math.round((classTotals.totalWritingQuestions / classTotals.totalAllWritingQuestions) * 20) : 0,
            S: classTotals.totalAllSpeakingQuestions != 0 ? Math.round((classTotals.totalSpeakingQuestions / classTotals.totalAllSpeakingQuestions) * 20) : 0,
            LA: classTotals.totalAllListeningAQuestions != 0 ? Math.round((classTotals.totalListeningAQuestions / classTotals.totalAllListeningAQuestions) * 15) : 0,
            LB: classTotals.totalAllListeningBQuestions != 0 ? Math.round((classTotals.totalListeningBQuestions / classTotals.totalAllListeningBQuestions) * 15) : 0,
            SA: 15,
            total: (classTotals.totalAllReadingQuestions != 0 ? Math.round((classTotals.totalReadingQuestions / classTotals.totalAllReadingQuestions) * 20) : 0) +
                (classTotals.totalAllWritingQuestions != 0 ? Math.round((classTotals.totalWritingQuestions / classTotals.totalAllWritingQuestions) * 20) : 0) +
                (classTotals.totalAllSpeakingQuestions != 0 ? Math.round((classTotals.totalSpeakingQuestions / classTotals.totalAllSpeakingQuestions) * 20) : 0) +
                (classTotals.totalAllListeningAQuestions != 0 ? Math.round((classTotals.totalListeningAQuestions / classTotals.totalAllListeningAQuestions) * 15) : 0) +
                (classTotals.totalAllListeningBQuestions != 0 ? Math.round((classTotals.totalListeningBQuestions / classTotals.totalAllListeningBQuestions) * 15) : 0) +
                15,
        };
    };

    const analyzeStudentData = (studentData) => {
        console.log(studentData)
        const studentName = studentData.student_name;
        const studentTotalQuestions = studentData.total_questions;
        let studentTotalScore = 0;
        let studentCorrectAnswers = 0;
        let ReadingQuestions = 0;
        let WritingQuestions = 0;
        let ListeningAQuestions = 0;
        let ListeningBQuestions = 0;
        let PronunciationQuestions = 0;
        let SpeakingQuestions = 0;
        let ReadingAllQuestions = 0;
        let WritingAllQuestions = 0;
        let ListeningAAllQuestions = 0;
        let ListeningBAllQuestions = 0;
        let PronunciationAllQuestions = 0;
        let SpeakingAllQuestions = 0;

        // Process each category for the student
        Object.entries(studentData).forEach(([category, stats]) => {
            if (category !== "student_name" && category !== "total_questions") {
                if (stats.correct) {
                    // Handle Reading, Writing, and Listening categories
                    if (category === "reading") {
                        ReadingQuestions = stats.correct;
                        ReadingAllQuestions = stats.totalQuestions;
                    } else if (category === "writing") {
                        WritingQuestions = stats.correct;
                        WritingAllQuestions = stats.totalQuestions;
                    } else if (category === "listening A") {
                        ListeningAQuestions = stats.correct;
                        ListeningAAllQuestions = stats.totalQuestions;
                    } else if (category === "listening B") {
                        ListeningBQuestions = stats.correct;
                        ListeningBAllQuestions = stats.totalQuestions;
                    } else if (category === "pronunciation") {
                        PronunciationQuestions = stats.correct;
                        PronunciationAllQuestions = stats.totalQuestions;
                    } else if (category === "speaking") {
                        SpeakingQuestions = stats.correct;
                        SpeakingAllQuestions = stats.totalQuestions;
                    }

                    // Add the total score and totalcorrect answers
                    studentTotalScore += stats.totalScore;
                    studentCorrectAnswers += stats.totalcorrect;
                }
            }
        });

        return {
            name: studentName,
            totalQuestions: studentTotalQuestions,
            R: ReadingAllQuestions != 0 ? Math.round((ReadingQuestions / ReadingAllQuestions) * 20) : 0,
            W: WritingAllQuestions != 0 ? Math.round((WritingQuestions / WritingAllQuestions) * 20) : 0,
            S: SpeakingAllQuestions != 0 ? Math.round((SpeakingQuestions / SpeakingAllQuestions) * 20) : 0,
            LA: ListeningAAllQuestions != 0 ? Math.round((ListeningAQuestions / ListeningAAllQuestions) * 15) : 0,
            LB: ListeningBAllQuestions != 0 ? Math.round((ListeningBQuestions / ListeningBAllQuestions) * 15) : 0,
            SA: 15,
            total: (ReadingAllQuestions != 0 ? Math.round((ReadingQuestions / ReadingAllQuestions) * 20) : 0) +
                (WritingAllQuestions != 0 ? Math.round((WritingQuestions / WritingAllQuestions) * 20) : 0) +
                (SpeakingAllQuestions != 0 ? Math.round((SpeakingQuestions / SpeakingAllQuestions) * 20) : 0) +
                (ListeningAAllQuestions != 0 ? Math.round((ListeningAQuestions / ListeningAAllQuestions) * 15) : 0) +
                (ListeningBAllQuestions != 0 ? Math.round((ListeningBQuestions / ListeningBAllQuestions) * 15) : 0) +
                15,
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
        const SA = [];

        // Iterate over the data array and extract values for each field
        data.forEach(item => {
            name.push(item.name);
            R.push(item.R);
            W.push(item.W);
            S.push(item.S);
            LA.push(item.LA);
            LB.push(item.LB);
            SA.push(15);
        });
        setname(name)
        const tmporiginalSeries = [
            { name: 'Reading', data: R },
            { name: 'Writing', data: W },
            { name: 'Speaking', data: S },
            { name: 'Listening A', data: LA },
            { name: 'Listening B', data: LB },
            { name: 'School Assesment', data: SA }
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
                let aggregatedByCategory = {}; // Use let if reassignment is needed

                const promises = uniqueClasses.map(async (classId) => {
                    try {
                        const studentsData = await AnalyticsAPI.getStudentsData({
                            classId: classId.id,
                        });
                        // Iterate over each student in the response
                        Object.entries(studentsData.data).forEach(([studentId, studentInfo]) => {

                            let studentPageName;
                            // Iterate over each student in the response
                            if (studentPage) {
                                studentPageName = studentsData.data[studentPage].student_name;
                            }

                            const result = aggregateQuestionsByCategory(studentInfo.data);
                            // Temporarily store the aggregated result in the variable
                            if (!aggregatedData[classId.id]) {
                                aggregatedData[classId.id] = {};
                            }
                            if (studentInfo.student_name == studentPageName) {
                                aggregatedByCategory[studentPage] = result
                                aggregatedByCategory[studentPage].student_name = studentInfo.student_name
                                aggregatedByCategory[studentPage].total_questions = studentInfo.total_questions
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
                let top5Students = [];
                let top5Classes = [];

                for (let key in aggregatedData) {
                    if (aggregatedData.hasOwnProperty(key)) {
                        if (studentPage) {
                            StudentsArray[0] = analyzeStudentData(aggregatedByCategory[studentPage])
                        } else {
                            if (selectedClass) {
                                if (selectedStudent) {
                                    console.log(aggregatedData[selectedClass][selectedStudent]);
                                    console.log(aggregatedData[selectedClass]);
                                    if (aggregatedData[selectedClass][selectedStudent]) {
                                        StudentsArray[0] = analyzeStudentData(aggregatedData[selectedClass][selectedStudent])
                                    } else {
                                        StudentsArray = [];
                                    }
                                } else {
                                    if (aggregatedData[selectedClass]) {
                                        allStudentsArray = processStudents(aggregatedData[selectedClass]);
                                        allStudentsArray.sort((a, b) => b.total - a.total)
                                        top5Students = allStudentsArray.slice(0, 5);
                                    } else {
                                        allStudentsArray = [];
                                    }
                                }
                            } else {
                                allClassesArray = allClassesArray.concat(processClass(aggregatedData[key], key, uniqueClasses));
                                allClassesArray.sort((a, b) => b.total - a.total)
                                top5Classes = allClassesArray.slice(0, 5);
                            }
                        }
                    }
                }
                if (studentPage) {
                    getArrays(StudentsArray)
                } else {
                    if (selectedClass) {
                        if (selectedStudent) {
                            getArrays(StudentsArray)
                        } else {
                            getArrays(top5Students)
                        }
                    } else {
                        getArrays(top5Classes)
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

    const series = originalSeries;

    const options = {
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            zoom: {
                enabled: false // Disable zooming
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                legend: {
                    position: 'bottom',
                    offsetX: -10,
                    offsetY: 0
                }
            }
        }],
        title: {
            text: "Top 5 Perfomance ( % )"
        },
        colors: ["#008ffb", "#00e396", "#feb019", "#ff4560", "#775dd0", "#FFFF00"],
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 0, // Remove the border-radius
                dataLabels: {
                    total: {
                        enabled: true,
                        style: {
                            fontSize: '13px',
                            fontWeight: 900,
                            colors: ['#222']
                        }
                    },
                }
            },
        },
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '12px',
                colors: ['#222'] // Color for all percentages
            }
        },
        xaxis: {
            type: 'category', // Set to category for static labels
            categories: name, // Replace with subjects
        },
        legend: {
            position: 'right',
            offsetY: 40
        },
        fill: {
            opacity: 1
        }
    };

    if (loading || (series && series.length === 0)) {
        return <div></div>;
    }

    return (
        <div>
            <Chart
                options={options}
                series={series}
                type="bar"
                height={430}
            />
        </div>
    );
};

export default TopStudentPerformance;