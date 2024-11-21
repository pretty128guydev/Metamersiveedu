import React, { useState } from "react";
import { Divider } from "antd";

import { Card, CardBody, CardHeader } from "../../../components/card/card";
import { studentsData, classData } from "../dummy-data";

const SkillsPracticed = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedGame, setSelectedGame] = useState("village");

  const handleSelectClass = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleSelectGame = (e) => {
    setSelectedGame(e.target.value);
  };

  return (
    <div>
      <div className="h5">SKILLS PRACTICED</div>
      <div className="mt-4 row">
        {/* <div className="col">
          <div class="input-group">
            <label class="input-group-text" for="inputGroupSelect01">
              Game
            </label>
            <select
              class="form-select"
              id="inputGroupSelect01"
              value={selectedGame}
              onChange={handleSelectGame}
            >
              <option>Choose...</option>
              <option value="village" selected>
                The Village
              </option>
              <option value="tag">Tag</option>
              <option value="word-dash">Word Dash</option>
            </select>
          </div>
        </div> */}
        <div className="col">
          <div className="input-group">
            <label className="input-group-text" htmlFor="inputGroupSelect02">
              Class
            </label>
            <select
              className="form-select"
              id="inputGroupSelect02"
              value={selectedClass}
              onChange={handleSelectClass}
            >
              <option defaultValue={""}>Select All</option>
              {classData.map((item, index) => (
                <option value={item.value} key={index}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Card>
          <CardHeader>
            <div className="">Practice Overview</div>
          </CardHeader>
          <CardBody>
            <div className="row">
              <div className="col">
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <div className="d-flex align-items-center text-green-600">
                    <i className="far fa-2xl fa-fw fa-user"></i>
                    <div className="fs-2">2</div>
                  </div>
                  <div className="fs-4">Students Active</div>
                </div>
              </div>
              <div className="col">
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <div className="d-flex align-items-center text-indigo-600">
                    <i className="fas fa-2xl fa-fw fa-puzzle-piece"></i>
                    <div className="text-indigo-600 fs-2">2</div>
                  </div>
                  <div className="fs-4">Skills Practiced</div>
                </div>
              </div>
              <div className="col">
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <div className="d-flex align-items-center text-red-600">
                    <i className="fas fa-2xl fa-fw fa-recycle"></i>
                    <div className="text-red-600 fs-2">0</div>
                  </div>
                  <div className="fs-4">Trouble Spots</div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="mt-4">
        <Card>
          <CardHeader>
            <div className="">Class Breakdown</div>
          </CardHeader>
          <CardBody>
            <div>
              <div className="bg-green-600 d-flex justify-content-between">
                <div className="d-flex align-items-center gap-2 px-3 py-1">
                  <i className="fas fa-xl fa-fw fa-star text-yellow-400"></i>
                  <div className="fs-5">MASTERED</div>
                </div>
                <div className="bg-green-800 d-flex px-3 gap-1 align-items-center">
                  <i className="far fa-ls fa-fw fa-user text-white"></i>
                  <div className="">0</div>
                </div>
              </div>
              <div className="d-flex flex-column gap-1 px-4 py-2">
                {studentsData.slice(0, 0).map((item, index) => (
                  <div className="d-flex gap-1 align-items-center" key={index}>
                    <i className="fas fa-ls fa-fw fa-user text-white"></i>
                    <div>{item.name}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="bg-blue-700 d-flex justify-content-between">
                <div className="d-flex align-items-center gap-2 px-3 py-1">
                  <div className="fs-5">LEVEL 4</div>
                </div>
                <div className="bg-blue-800 d-flex px-3 gap-1 align-items-center">
                  <i className="far fa-ls fa-fw fa-user text-white"></i>
                  <div className="">0</div>
                </div>
              </div>
              <div className="d-flex flex-column gap-1 px-4 py-2">
                {studentsData.slice(0, 0).map((item, index) => (
                  <div className="d-flex gap-1 align-items-center" key={index}>
                    <i className="fas fa-ls fa-fw fa-user text-white"></i>
                    <div>{item.name}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="bg-blue-700 d-flex justify-content-between">
                <div className="d-flex align-items-center gap-2 px-3 py-1">
                  <div className="fs-5">LEVEL 3</div>
                </div>
                <div className="bg-blue-800 d-flex px-3 gap-1 align-items-center">
                  <i className="far fa-ls fa-fw fa-user text-white"></i>
                  <div className="">0</div>
                </div>
              </div>
              <div className="d-flex flex-column gap-1 px-4 py-2">
                {studentsData.slice(0, 0).map((item, index) => (
                  <div className="d-flex gap-1 align-items-center" key={index}>
                    <i className="fas fa-ls fa-fw fa-user text-white"></i>
                    <div>{item.name}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="bg-blue-700 d-flex justify-content-between">
                <div className="d-flex align-items-center gap-2 px-3 py-1">
                  <div className="fs-5">LEVEL 2</div>
                </div>
                <div className="bg-blue-800 d-flex px-3 gap-1 align-items-center">
                  <i className="far fa-ls fa-fw fa-user text-white"></i>
                  <div className="">0</div>
                </div>
              </div>
              <div className="d-flex flex-column gap-1 px-4 py-2">
                {studentsData.slice(0, 0).map((item, index) => (
                  <div className="d-flex gap-1 align-items-center" key={index}>
                    <i className="fas fa-ls fa-fw fa-user text-white"></i>
                    <div>{item.name}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="bg-blue-700 d-flex justify-content-between">
                <div className="d-flex align-items-center gap-2 px-3 py-1">
                  <div className="fs-5">LEVEL 1</div>
                </div>
                <div className="bg-blue-800 d-flex px-3 gap-1 align-items-center">
                  <i className="far fa-ls fa-fw fa-user text-white"></i>
                  <div className="">0</div>
                </div>
              </div>
              <div className="d-flex flex-column gap-1 px-4 py-2">
                {studentsData.slice(0, 0).map((item, index) => (
                  <div className="d-flex gap-1 align-items-center" key={index}>
                    <i className="fas fa-ls fa-fw fa-user text-white"></i>
                    <div>{item.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default SkillsPracticed;
