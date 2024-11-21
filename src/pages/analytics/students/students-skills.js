import React from "react";

const StudentsSkills = ({ data }) => {
  return (
    <div>
      {/* <div className="h5">Students By Skills</div> */}
      <div className="">
        <table className="table table-striped-columns table-bordered">
          <thead className="text-center">
            <tr>
              <th scope="col"></th>
              <th scope="col" colSpan={4}>
                SKILL PROGRESS
              </th>
            </tr>
            <tr>
              <th scope="col"></th>
              <th scope="col">Total questions answered</th>
              <th scope="col">Skills practiced</th>
              <th scope="col">Skills proficient</th>
              <th scope="col">Skills mastered</th>
            </tr>
          </thead>
          <tbody>
            {data?.studentsData.map((item, index) => (
              <tr key={index}>
                <th scope="row" className="bg-gray-600">
                  <div className="fw-bold fs-5 text-theme px-2">
                    {item.student_name}
                  </div>
                </th>
                <td className="text-center">{item.total_questions_answered}</td>
                <td className="text-center">{item.skills_practeced}</td>
                <td className="text-center">{item.skills_proficient}</td>
                <td className="text-center">{item.skills_mastered}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsSkills;
