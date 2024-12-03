import { Card } from "antd";
import React, { useEffect, useState } from "react";
import { CardBody } from "../../../components/card/card";
import VillageApi from "../../../api-clients/VillageApi";
import WordApi from "../../../api-clients/WordApi";
import TagApi from "../../../api-clients/TagApi";
import { AnalyticsAPI } from "../../../api-clients/AnalyticsAPI";

const NegativeProgress = ({ teacher_id }) => {
    const [loading, setLoading] = useState(false);
    const [data, setdata] = useState([]);

    function analyzeStudentNegativeData(data) {
        const currentDate = new Date();
        const quarters = [
            { start: 1, end: 15 },
            { start: 16, end: 31 },
        ];

        const parseDate = (dateStr) => new Date(dateStr);

        const filterByMonth = (records, year, month) =>
            records.filter((record) => {
                const recordDate = parseDate(record.createdAt);
                return recordDate.getFullYear() === year && recordDate.getMonth() === month;
            });

        const filterByQuarter = (records, year, month, quarter) =>
            records.filter((record) => {
                const recordDate = parseDate(record.createdAt);
                const day = recordDate.getDate();
                return (
                    recordDate.getFullYear() === year &&
                    recordDate.getMonth() === month &&
                    day >= quarter.start &&
                    day <= quarter.end
                );
            });

        const calculateCategoryPercentage = (records, category) => {
            const categoryRecords = records.filter((record) => record.category === category);
            const correct = categoryRecords.reduce((acc, record) => acc + parseInt(record.questions.correct, 10), 0);
            const total = categoryRecords.reduce((acc, record) => acc + parseInt(record.questions.total, 10), 0);
            return total > 0 ? (correct / total) * 100 : 0;
        };

        const calculateGrowth = (current, previous) =>
            previous === 0 ? (current > 0 ? 100 : 0) : ((current - previous) / previous) * 100;

        const results = {};
        const categories = ["reading", "speaking", "writing", "listening A", "listening B", "pronunciation"];

        Object.entries(data).forEach(([studentId, studentData]) => {
            const records = studentData.data;
            const studentResults = { monthly: {}, quarterly: [] };

            // Monthly Growth Calculations
            const thisMonthData = filterByMonth(records, currentDate.getFullYear(), currentDate.getMonth());
            const lastMonthData = filterByMonth(
                records,
                currentDate.getFullYear(),
                currentDate.getMonth() - 1 >= 0 ? currentDate.getMonth() - 1 : 11
            );

            const thisMonthPercentages = {};
            const lastMonthPercentages = {};
            const monthlyGrowthPercentages = {};

            categories.forEach((category) => {
                thisMonthPercentages[category] = calculateCategoryPercentage(thisMonthData, category);
                lastMonthPercentages[category] = calculateCategoryPercentage(lastMonthData, category);
                monthlyGrowthPercentages[category] = calculateGrowth(
                    thisMonthPercentages[category],
                    lastMonthPercentages[category]
                );
            });

            // Total Monthly Growth
            const thisMonthCorrect = thisMonthData.reduce(
                (acc, record) => acc + parseInt(record.questions.correct, 10),
                0
            );
            const thisMonthTotal = thisMonthData.reduce((acc, record) => acc + parseInt(record.questions.total, 10), 0);
            const lastMonthCorrect = lastMonthData.reduce(
                (acc, record) => acc + parseInt(record.questions.correct, 10),
                0
            );
            const lastMonthTotal = lastMonthData.reduce((acc, record) => acc + parseInt(record.questions.total, 10), 0);

            const totalThisMonthPercentage = thisMonthTotal > 0 ? (thisMonthCorrect / thisMonthTotal) * 100 : 0;
            const totalLastMonthPercentage = lastMonthTotal > 0 ? (lastMonthCorrect / lastMonthTotal) * 100 : 0;
            const totalMonthlyGrowth = calculateGrowth(totalThisMonthPercentage, totalLastMonthPercentage);

            studentResults.monthly = {
                thisMonthPercentages,
                lastMonthPercentages,
                monthlyGrowthPercentages,
                totalThisMonthPercentage,
                totalLastMonthPercentage,
                totalMonthlyGrowth,
            };

            // Quarterly Growth Calculations
            quarters.forEach((quarter, index) => {
                const thisQuarterData = filterByQuarter(
                    records,
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    quarter
                );
                const previousQuarterData =
                    index > 0
                        ? filterByQuarter(records, currentDate.getFullYear(), currentDate.getMonth(), quarters[index - 1])
                        : [];

                const thisQuarterPercentages = {};
                const previousQuarterPercentages = {};
                const growthPercentages = {};

                categories.forEach((category) => {
                    thisQuarterPercentages[category] = calculateCategoryPercentage(thisQuarterData, category);
                    previousQuarterPercentages[category] = calculateCategoryPercentage(previousQuarterData, category);
                    growthPercentages[category] = calculateGrowth(
                        thisQuarterPercentages[category],
                        previousQuarterPercentages[category]
                    );
                });

                // Total Quarterly Growth
                const thisQuarterCorrect = thisQuarterData.reduce(
                    (acc, record) => acc + parseInt(record.questions.correct, 10),
                    0
                );
                const thisQuarterTotal = thisQuarterData.reduce((acc, record) => acc + parseInt(record.questions.total, 10), 0);
                const previousQuarterCorrect = previousQuarterData.reduce(
                    (acc, record) => acc + parseInt(record.questions.correct, 10),
                    0
                );
                const previousQuarterTotal = previousQuarterData.reduce(
                    (acc, record) => acc + parseInt(record.questions.total, 10),
                    0
                );

                const totalThisQuarterPercentage =
                    thisQuarterTotal > 0 ? (thisQuarterCorrect / thisQuarterTotal) * 100 : 0;
                const totalPreviousQuarterPercentage =
                    previousQuarterTotal > 0 ? (previousQuarterCorrect / previousQuarterTotal) * 100 : 0;

                const totalQuarterlyGrowth = calculateGrowth(
                    totalThisQuarterPercentage,
                    totalPreviousQuarterPercentage
                );

                studentResults.quarterly.push({
                    quarter: index + 1,
                    thisQuarterPercentages,
                    previousQuarterPercentages,
                    growthPercentages,
                    totalThisQuarterPercentage,
                    totalPreviousQuarterPercentage,
                    totalQuarterlyGrowth,
                });
            });

            results[studentId] = {
                studentName: studentData.student_name,
                results: studentResults,
            };
        });

        return results;
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

                const promises = uniqueClasses.map(async (classId) => {
                    try {
                        const studentsData = await AnalyticsAPI.getStudentsData({
                            classId: classId.id,
                        });
                        console.log(studentsData)
                        const negativeData = analyzeStudentNegativeData(studentsData.data)
                        console.log(negativeData)
                        // Iterate over each student in the response
                    } catch (error) {
                        console.error(`Error fetching data for class ${classId.id}:`, error);
                        setLoading(false);
                    }
                });

                // Wait for all API calls to complete
                await Promise.all(promises);

            } catch (error) {
                console.error('Error fetching classrooms or data:', error);
                setLoading(false);
            }
        };

        fetchAllApis().catch(() => {
            setLoading(false);
        });
    }, []);  // Empty dependency array means this effect runs only once when the component mounts


    return (<StudentsTable data={data} />)

}

const StudentsTable = ({ data }) => {
    // Sort data by totalScore in descending order
    const sortedData = [...data].sort((a, b) => b.total - a.total);

    // Process the data to add serial numbers
    const processedData = sortedData.map((student, index) => ({
        ...student,
        no: index + 1, // Add serial number
    }));

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5; // Number of entries per page
    const totalPages = Math.ceil(processedData.length / pageSize);

    const [filter, setFilter] = useState(null); // State for filter

    // Apply the selected filter
    const filteredData = filter
        ? processedData.filter((student) => student.totalScore > filter)
        : processedData;

    // Pagination logic
    const displayedData = filteredData.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <div>
            <div className="mb-4">
                <Card className="bg-transparent" style={{ border: "solid 1px #a8b6bc" }}>
                    <CardBody>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <div className="fw-bold fs-16px">Student Analysis</div>
                            <select
                                className="form-select w-auto"
                                onChange={(e) => {
                                    setFilter(Number(e.target.value) || null);
                                    setCurrentPage(1); // Reset to first page on filter change
                                }}
                            >
                                <option value="">All Scores</option>
                                <option value="50">{"Scores > 50%"}</option>
                                <option value="70">{"Scores > 70%"}</option>
                                <option value="90">{"Scores > 90%"}</option>
                            </select>
                        </div>
                        <div className="p-3 mb-2" style={{ border: "solid 1px #a8b6bc" }}>
                            <div
                                className="d-flex justify-content-between gap-4 fw-bold"
                                style={{ borderBottom: "solid 1px #a8b6bc" }}
                            >
                                <div className="fs-5">No.</div>
                                <div className="fs-5">Classname</div>
                                <div className="fs-5">Student Name</div>
                                <div className="fs-5">Total Score</div>
                            </div>
                            {displayedData.map((student) => (
                                <div
                                    key={student.no}
                                    className="d-flex justify-content-between gap-4 py-2"
                                    style={{ borderBottom: "solid 1px #a8b6bc" }}
                                >
                                    <div>{student.no}</div>
                                    <div>{student.classname}</div>
                                    <div>{student.studentName}</div>
                                    <div>{student.total}%</div>
                                </div>
                            ))}
                        </div>
                        <div className="btn-group float-end">
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(currentPage - 1)}
                            >
                                Prev
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                disabled={currentPage === totalPages || filteredData.length === 0}
                                onClick={() => setCurrentPage(currentPage + 1)}
                            >
                                Next
                            </button>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default NegativeProgress;