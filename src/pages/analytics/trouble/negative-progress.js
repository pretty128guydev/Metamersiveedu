import { Card } from "antd";
import React, { useEffect, useState } from "react";
import { CardBody } from "../../../components/card/card";
import VillageApi from "../../../api-clients/VillageApi";
import WordApi from "../../../api-clients/WordApi";
import TagApi from "../../../api-clients/TagApi";
import { AnalyticsAPI } from "../../../api-clients/AnalyticsAPI";

const NegativeProgress = ({ teacher_id }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    function analyzeStudentData(data) {
        const currentDate = new Date();
        const parseDate = (dateStr) => new Date(dateStr);

        const filterByMonth = (records, year, month) =>
            records.filter((record) => {
                const recordDate = parseDate(record.createdAt);
                return recordDate.getFullYear() === year && recordDate.getMonth() === month;
            });

        const filterByQuarter = (records, year, quarter) => {
            const monthRange = getQuarterMonthRange(quarter);
            return records.filter((record) => {
                const recordDate = parseDate(record.createdAt);
                return recordDate.getFullYear() === year && monthRange.includes(recordDate.getMonth());
            });
        };

        const getQuarterMonthRange = (quarter) => {
            switch (quarter) {
                case 1: return [0, 1, 2]; // Jan-Mar
                case 2: return [3, 4, 5]; // Apr-Jun
                case 3: return [6, 7, 8]; // Jul-Sep
                case 4: return [9, 10, 11]; // Oct-Dec
                default: return [];
            }
        };

        const calculateCategoryPercentage = (records, category) => {
            const categoryRecords = records.filter((record) => record.category === category);
            const correct = categoryRecords.reduce((acc, record) => acc + parseInt(record.questions.correct, 10), 0);
            const inCorrect = categoryRecords.reduce((acc, record) => acc + parseInt(record.questions.inCorrect, 10), 0);
            const total = categoryRecords.reduce((acc, record) => acc + parseInt(record.questions.total, 10), 0);
            return correct + inCorrect;
        };

        const calculateGrowth = (current, previous) => {
            return previous !== 0 ? ((current - previous) / previous) * 100 : 0
        }

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
            const thisMonthInCorrect = thisMonthData.reduce(
                (acc, record) => acc + parseInt(record.questions.inCorrect, 10),
                0
            );
            const lastMonthCorrect = lastMonthData.reduce(
                (acc, record) => acc + parseInt(record.questions.correct, 10),
                0
            );
            const lastMonthInCorrect = lastMonthData.reduce(
                (acc, record) => acc + parseInt(record.questions.inCorrect, 10),
                0
            );
            const lastMonthTotal = lastMonthData.reduce((acc, record) => acc + parseInt(record.questions.total, 10), 0);

            const totalThisMonthPercentage = thisMonthCorrect + thisMonthInCorrect;
            const totalLastMonthPercentage = lastMonthCorrect + lastMonthInCorrect;
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
            const currentQuarter = Math.floor(currentDate.getMonth() / 3) + 1;
            const lastQuarter = currentQuarter === 1 ? 4 : currentQuarter - 1;

            const thisQuarterData = filterByQuarter(records, currentDate.getFullYear(), currentQuarter);
            const lastQuarterData = filterByQuarter(
                records,
                currentDate.getFullYear(),
                lastQuarter
            );

            const thisQuarterPercentages = {};
            const lastQuarterPercentages = {};
            const quarterlyGrowthPercentages = {};

            categories.forEach((category) => {
                thisQuarterPercentages[category] = calculateCategoryPercentage(thisQuarterData, category);
                lastQuarterPercentages[category] = calculateCategoryPercentage(lastQuarterData, category);
                quarterlyGrowthPercentages[category] = calculateGrowth(
                    thisQuarterPercentages[category],
                    lastQuarterPercentages[category]
                );
            });

            // Total Quarterly Growth
            const thisQuarterCorrect = thisQuarterData.reduce(
                (acc, record) => acc + parseInt(record.questions.correct, 10),
                0
            );
            const thisQuarterInCorrect = thisQuarterData.reduce(
                (acc, record) => acc + parseInt(record.questions.inCorrect, 10),
                0
            );
            const thisQuarterTotal = thisQuarterData.reduce(
                (acc, record) => acc + parseInt(record.questions.total, 10),
                0
            );
            const lastQuarterCorrect = lastQuarterData.reduce(
                (acc, record) => acc + parseInt(record.questions.correct, 10),
                0
            );
            const lastQuarterInCorrect = lastQuarterData.reduce(
                (acc, record) => acc + parseInt(record.questions.inCorrect, 10),
                0
            );
            const lastQuarterTotal = lastQuarterData.reduce(
                (acc, record) => acc + parseInt(record.questions.total, 10),
                0
            );

            const totalThisQuarterPercentage = thisQuarterCorrect + thisQuarterInCorrect;
            const totalLastQuarterPercentage = lastQuarterCorrect + lastQuarterInCorrect;
            const totalQuarterlyGrowth = calculateGrowth(totalThisQuarterPercentage, totalLastQuarterPercentage);

            studentResults.quarterly = {
                thisQuarterPercentages,
                lastQuarterPercentages,
                quarterlyGrowthPercentages,
                totalThisQuarterPercentage,
                totalLastQuarterPercentage,
                totalQuarterlyGrowth,
            };

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

                const results = {};

                // Fetch student data for each class and analyze
                const promises = uniqueClasses.map(async (classId) => {
                    try {
                        const studentsData = await AnalyticsAPI.getStudentsData({
                            classId: classId.id,
                        });
                        const negativeData = analyzeStudentData(studentsData.data);
                        Object.entries(negativeData).forEach(([studentId, studentInfo]) => {
                            results[studentInfo.studentName] = studentInfo; // Add analyzed data to results
                        })
                    } catch (error) {
                        console.error(`Error fetching data for class ${classId.id}:`, error);
                    }
                });

                await Promise.all(promises);
                setData(results);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching classrooms or data:', error);
                setLoading(false);
            }
        };

        fetchAllApis().catch(() => setLoading(false));
    }, [teacher_id]);

    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <StudentsTable data={data} />
            )}
        </div>
    );
};

const StudentsTable = ({ data }) => {
    const [timeFilter, setTimeFilter] = useState("monthly"); // Default to "monthly"
    const [skillFilter, setSkillFilter] = useState(""); // Default to showing all skills
    const [scoreFilter, setScoreFilter] = useState(null); // New filter for scores
    const [currentPage, setCurrentPage] = useState(1); // Pagination control
    const itemsPerPage = 5; // Define how many students to show per page

    // Function to handle time and skill-based filtering
    const getFilteredData = () => {
        const filteredData = Object.values(data)
            .map((student) => {
                const studentData = student.results[timeFilter]; // Get data based on time filter (monthly/quarterly)

                // If a skill filter is applied, include only the relevant skill's data
                if (skillFilter) {
                    const skillData = studentData[`${timeFilter}GrowthPercentages`]; // Access relevant percentage data based on time filter
                    return {
                        ...student,
                        skillData: skillData[skillFilter] ? skillData[skillFilter] : null,
                        growth: skillData[skillFilter] || null,
                    };
                } else {
                    // If no skill filter is applied, show total percentage and growth
                    return {
                        ...student,
                        total: studentData[`totalThis${timeFilter.charAt(0).toUpperCase() + timeFilter.slice(1)}Percentage`] || 0,
                        growth: studentData[`total${timeFilter.charAt(0).toUpperCase() + timeFilter.slice(1)}Growth`] || 0,
                    };
                }
            })
            .filter((student) => {
                // Apply skill filter
                const matchesSkill = skillFilter ? student.skillData !== null : true;

                // Apply score filter
                const matchesScore = scoreFilter !== null ? student.growth <= scoreFilter : true;

                return matchesSkill && matchesScore;
            });

        const sortedData = [...filteredData].sort((a, b) => b.growth - a.growth);

        return sortedData;
    };

    // Get the filtered students based on the filters
    const displayedData = getFilteredData();

    // Pagination: Calculate total pages
    const totalPages = Math.ceil(displayedData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Slice the data for the current page and filter out students with negative growth
    const currentPageData = displayedData.slice(startIndex, endIndex)
        .filter((item) => item.growth < 0);

    return (
        <div className="mb-4">
            <Card className="bg-transparent" style={{ border: "solid 1px #a8b6bc" }}>
                <CardBody>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <div className="fw-bold fs-16px">IDENTIFY STUDENTS WITH NEGATIVE PROGRESS:</div>
                        <div className="d-flex align-items-center gap-2">
                            {/* Time Filter */}
                            <select
                                className="form-select w-auto"
                                onChange={(e) => {
                                    setTimeFilter(e.target.value);
                                    setCurrentPage(1); // Reset to first page
                                }}
                            >
                                <option value="monthly">Monthly</option>
                                <option value="quarterly">Quarterly</option>
                            </select>

                            {/* Skill Filter */}
                            <select
                                className="form-select w-auto"
                                onChange={(e) => {
                                    setSkillFilter(e.target.value);
                                    setCurrentPage(1); // Reset to first page
                                }}
                            >
                                <option value="">All Skills</option>
                                <option value="reading">Reading</option>
                                <option value="speaking">Speaking</option>
                                <option value="listening A">Listening A</option>
                                <option value="listening B">Listening B</option>
                                <option value="writing">Writing</option>
                                <option value="pronunciation">Pronunciation</option>
                            </select>

                            {/* Score Filter */}
                            <select
                                className="form-select w-auto"
                                onChange={(e) => {
                                    setScoreFilter(Number(e.target.value) || null);
                                    setCurrentPage(1); // Reset to first page on filter change
                                }}
                            >
                                <option value="">All Scores</option>
                                <option value="-10">{"Scores < -10%"}</option>
                                <option value="-30">{"Scores < -30%"}</option>
                                <option value="-50">{"Scores < -50%"}</option>
                            </select>
                        </div>
                    </div>
                    <div className="p-3 mb-2" style={{ border: "solid 1px #a8b6bc" }}>
                        <div
                            className="d-flex fw-bold"
                            style={{ borderBottom: "solid 1px #a8b6bc" }}
                        >
                            <div className="fs-5" style={{ width: '25%' }}>No.</div>
                            <div className="fs-5" style={{ width: '25%' }}>Student Name</div>
                            <div className="fs-5" style={{ width: '25%' }}>Category</div>
                            <div className="fs-5" style={{ width: '25%' }}>Growth</div>
                        </div>
                        {currentPageData.map((student, index) => (
                            <div
                                key={student.studentName}
                                className="d-flex py-2"
                                style={{ borderBottom: "solid 1px #a8b6bc" }}
                            >
                                <div style={{ width: '25%' }}>{startIndex + index + 1}</div>
                                <div style={{ width: '25%' }}>{student.studentName}</div>
                                <div style={{ width: '25%' }}>{skillFilter || "All Skills"}</div>
                                <div style={{ width: '25%' }}>{student.growth !== null ? student.growth.toFixed(2) + "%" : "N/A"}</div>
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
                            disabled={currentPage === totalPages || displayedData.length === 0}
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            Next
                        </button>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};



export default NegativeProgress;
