import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AnalyticsAPI } from "../../../api-clients/AnalyticsAPI";
import VillageApi from "../../../api-clients/VillageApi";

const SkillProgress = () => {
    const [loading, setLoading] = useState(false);
    const [totalTimeByGame, setTotalTimeByGame] = useState(null);
    const [totalTimeByLocation, setTotalTimeByLocation] = useState(null);
    const [studentsData, setStudentsData] = useState([]);
    const [classData, setClassData] = useState([]);

    const userInfo = useSelector((store) => store.auth.userInfo);

    useEffect(() => {
        setLoading(true);

        const fetchAllApis = async () => {
            try {
                // Fetch the classrooms
                const classData = await VillageApi.getClassroomsByTeacherId({
                    teacher_id: 'HPa1WaUK68bgXNbTGlFw1h022D42',
                });
                const classes = classData.data.ret.map((item) => item.id);
                setClassData(classes);
                console.log(classes);

                // Initialize an array to hold promises for all API calls
                const promises = classes.map(async (classId) => {
                    try {
                        // Fetch data for each class
                        const timeData = await AnalyticsAPI.getTotalSpentTimeByGame({
                            classId,
                        });
                        console.log(`Time data for class ${classId}:`, timeData.data);

                        const locationData = await AnalyticsAPI.getTotalSpentTimeByLocation({
                            classId,
                        });
                        console.log(`Location data for class ${classId}:`, locationData.data);

                        const studentsData = await AnalyticsAPI.getStudentsData({
                            classId,
                        });
                        console.log(`Students data for class ${classId}:`, studentsData.data);

                        // Set state for each class
                        setTotalTimeByGame((prevData) => ({
                            ...prevData,
                            [classId]: timeData.data,
                        }));
                        setTotalTimeByLocation((prevData) => ({
                            ...prevData,
                            [classId]: locationData.data,
                        }));
                        setStudentsData((prevData) => ({
                            ...prevData,
                            [classId]: studentsData.data,
                        }));

                    } catch (error) {
                        console.error(`Error fetching data for class ${classId}:`, error);
                    }
                });

                // Wait for all API calls to complete
                await Promise.all(promises);
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


    const students = [
        { name: 'student1', totalQuestions: 693, R: 0, W: 0, S: 0, L: 0, Skill: 0, Score: 0, mastered: 0 },
        { name: 'student4', totalQuestions: 19, R: 0, W: 0, S: 0, L: 0, Skill: 0, Score: 0, mastered: 0 },
        { name: 's5', totalQuestions: 218, R: 0, W: 0, S: 0, L: 0, Skill: 0, Score: 0, mastered: 0 },
        { name: 'student2', totalQuestions: 36, R: 0, W: 0, S: 0, L: 0, Skill: 0, Score: 0, mastered: 0 },
    ];

    return (
        <div className="my-4 p-3 rounded bg-light">
            <h5 className="text-muted">Class Breakdown</h5>
            <table className="table table-bordered text-center">
                <thead className="bg-secondary text-white">
                    <tr>
                        <th colSpan={9}>Skill Progress</th>
                    </tr>
                    <tr className="bg-light">
                        <th rowSpan={2} className="align-middle">Students</th>
                        <th rowSpan={2} className="align-middle">Total questions answered</th>
                        <th colSpan={4}>Skills practiced</th>
                        <th colSpan={2}>Skills proficient</th>
                        <th rowSpan={2} className="align-middle">Skills mastered</th>
                    </tr>
                    <tr className="bg-light">
                        {/* Set fixed width to these columns for uniformity */}
                        <th style={{ width: '9%' }}>R</th>
                        <th style={{ width: '9%' }}>W</th>
                        <th style={{ width: '9%' }}>S</th>
                        <th style={{ width: '9%' }}>L</th>
                        <th style={{ width: '9%' }}>Skill</th>
                        <th style={{ width: '9%' }}>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={index}>
                            <td className="bg-dark text-success fw-bold">{student.name}</td>
                            <td>{student.totalQuestions}</td>
                            <td>{student.R}</td>
                            <td>{student.W}</td>
                            <td>{student.S}</td>
                            <td>{student.L}</td>
                            <td>{student.Skill}</td>
                            <td>{student.Score}</td>
                            <td>{student.mastered}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SkillProgress;