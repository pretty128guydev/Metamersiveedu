import React, { useRef, useState } from "react";
import axios from "axios";
import { Modal } from "bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { TagsInput } from "react-tag-input-component";

import RomeoJuliet from "../../../assets/img/RomeoJuliet.jpg";
import QuizGame from "../../../assets/img/QuizGame.png";
import ComputerProjectImg from "../../../assets/img/Computer.png";
import { Card, CardImgOverlay } from "./../../../components/card/card.jsx";
import { quizGame_title, RM_title, CP_title } from "./title.js";

const appType = {
  RJ: 0,
  QG: 1,
  CP: 2,
};

const apps = {
  RAndJ_Teacher_WIN: {
    name: "R&J_Teacher_App(win).zip",
    link: "https://metamersive-project.s3.amazonaws.com/Romeo+and+Juliet/win_teacher.zip",
    checkPermision: true,
  },
  RAndJ_Teacher_IOS: {
    name: "R&J_Teacher_App(mac).zip",
    link: "https://metamersive-project.s3.amazonaws.com/Romeo+and+Juliet/mac_teacher.zip",
    checkPermision: true,
  },
  RAndJ_Student_WIN: {
    name: "R&J_Student_App(win).zip",
    link: "https://metamersive-project.s3.amazonaws.com/Romeo+and+Juliet/Romeo_Juliet_stu_win.zip",
    checkPermision: false,
  },
  RAndJ_Student_IOS: {
    name: "R&J_Student_App(mac).zip",
    link: "https://metamersive-project.s3.amazonaws.com/Romeo+and+Juliet/mac_student.zip",
    checkPermision: false,
  },
  RAndJ_Teaser_WIN: {
    name: "R&J_Teaser_App(win).zip",
    link: "https://mega.nz/file/gAlgDBoS#WdKVvdDRiLa_JHq2J0xIVNV6LwGng0h_67COSKAShGE",
    checkPermision: false,
  },
  QG_WIN: {
    name: "Quiz Game(win).zip",
    link: "https://metamersive-project.s3.amazonaws.com/Quiz+Game/QuizGame.zip",
    checkPermision: false,
  },
  QG_IOS: {
    name: "Quiz Game(mac).zip",
    link: "https://mega.nz/file/FVly3BYQ#zx83H29sLRmef3sAE1irlVuc5DAINiSuonzoUdLz8wQ",
    checkPermision: false,
  },
  QG_Pro_WIN: {
    name: "QG_Pro_App(win).zip",
    link: "",
    checkPermision: true,
  },
  QG_Pro_IOS: {
    name: "QG_Pro_App(mac).zip",
    link: "",
    checkPermision: true,
  },
  CP_UNIT1_WIN: {
    name: "Computer_Project_Unit1_App(win).zip",
    link: "https://metamersive-project.s3.amazonaws.com/Computer+Project/unit1_win_64.zip",
    checkPermision: false,
  },
  CP_UNIT2_WIN: {
    name: "Computer_Project_Unit2_App(win).zip",
    link: "https://metamersive-project.s3.amazonaws.com/Computer+Project/unit2_win_64.zip",
    checkPermision: false,
  },
  CP_UNIT1_IOS: {
    name: "Computer_Project_App(mac).zip",
    link: "https://metamersive-project.s3.amazonaws.com/Computer+Project/unit+1.zip",
    checkPermision: false,
  },
  CP_UNIT2_IOS: {
    name: "Computer_Project_App(mac).zip",
    link: "https://metamersive-project.s3.amazonaws.com/Computer+Project/unit+2.zip",
    checkPermision: false,
  },
};

function Old() {
  // const [curAppType, setCurAppType] = useState();
  const userInfo = useSelector((store) => store.auth.userInfo);
  const toastId = useRef(null);
  const [showMoreRM, setShowMoreRM] = useState(true);
  const [showMoreQG, setShowMoreQG] = useState(true);
  const [showMoreCP, setShowMoreCP] = useState(true);
  const strLength = 400;

  const onDownloadApp = (app_type, app_info) => {
    // setCurAppType(app_type);
    if (app_info.checkPermision) {
      // switch (app_type) {
      //   case appType.RJ:
      //     if (!userInfo.permission?.romeo) {
      //       handleOpenModal();
      //       return;
      //     }
      //     break;
      //   case appType.QG:
      //     if (!userInfo.permission?.quizPro) {
      //       handleOpenModal();
      //       return;
      //     }
      //     break;
      //   default:
      //     break;
      // }
    }
    downloadFile(app_info.link, app_info.name);
  };

  const handleOpenModal = () => {
    const modalSubscribe = new Modal(
      document.getElementById("modalCoverSubscribe")
    );
    modalSubscribe.show();
  };

  const downloadFile = async (uri, fileName) => {
    try {
      toastId.current = toast("Downloading " + fileName, {
        className: "customized-toast",
        progress: 0,
      });

      const response = await axios({
        url: uri,
        method: "GET",
        responseType: "blob",
        onDownloadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          toast.update(toastId.current, {
            render: `Downloading... ${progress}%`,
            type: toast.TYPE.INFO,
          });
        },
      });
      const downloadUrl = window.URL.createObjectURL(
        new Blob([response.data]),
        { type: "application/zip" }
      );
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.dismiss(toastId.current);
      toast.success("Download complete!");
    } catch (error) {
      console.error("Error downloading file:", error);
      toast.dismiss(toastId.current);
      toast.error("Error downloading file!");
    }
    // const file = File.fromURL(uri);

    // const stream = file.download(
    //   {
    //     maxConnections: 8,
    //     maxChunkSize: 5242880,
    //   },
    //   (err, data) => {
    //     if (err) {
    //       toast.done(toastId.current);
    //       toast.error("Failed to download" + fileName, {
    //         closeButton: true,
    //         autoClose: false,
    //       });
    //       throw err;
    //     }
    //     const link = document.createElement("a");
    //     const blob = new Blob([data]);
    //     link.href = window.URL.createObjectURL(blob);
    //     link.download = fileName;
    //     link.click();
    //     toast.done(toastId.current);
    //     toast.success("Completed downloading" + fileName, {
    //       closeButton: true,
    //       autoClose: false,
    //     });
    //   }
    // );

    // stream.on("progress", (data) => {
    //   toast.update(toastId.current, {
    //     className: "customized-toast",
    //     progress: data.bytesLoaded / data.bytesTotal,
    //     render: (
    //       <div>
    //         {fileName} <br /> {convertBytes(data.bytesLoaded)} /{" "}
    //         {convertBytes(data.bytesTotal)}{" "}
    //         {`(${Math.floor((100 * data.bytesLoaded) / data.bytesTotal)}%)`}
    //       </div>
    //     ),
    //   });
    // });
  };

  return (
    <>
      <div className="row">
        <div className="col-md-6 col-lg-4">
          <Card>
            <div className="text-white p-5px">
              <div style={{ maxHeight: "250px" }} className="overflow-hidden">
                <img src={RomeoJuliet} alt="" className="card-img-top" />
              </div>
              <CardImgOverlay
                className="d-flex flex-column m-5px"
                style={{ zIndex: "20" }}
              >
                <div className="flex-fill">
                  <div className="d-flex align-items-center">
                    <h6 className="text-white">Youtube</h6>
                    <div className="dropdown dropdown-icon ms-auto">
                      <a
                        href="//www.youtube.com/watch?v=BwV9EmMHAA8"
                        className="text-white"
                        data-bs-toggle="dropdown"
                        target="_blank"
                      >
                        <i className="fa fa-ellipsis-h"></i>
                      </a>
                      <div className="dropdown-menu dropdown-menu-end">
                        <a
                          href="//www.youtube.com/watch?v=BwV9EmMHAA8"
                          className="dropdown-item"
                          target="_blank"
                        >
                          View
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <a
                    href="//www.youtube.com/watch?v=BwV9EmMHAA8"
                    data-lity
                    className="text-white text-decoration-none d-flex align-items-center bg-gray-600 bg-opacity-50 rounded-3"
                    target="_blank"
                  >
                    <div className="bg-red w-50px h-50px rounded-3 d-flex align-items-center justify-content-center">
                      <i className="fa fa-play"></i>
                    </div>
                    <div className="ms-3 flex-1">
                      <div className="fw-bold">
                        <i className="fas fa-lg fa-fw me-2 fa-heartbeat"></i>
                        Romeo and Juliet
                      </div>
                      {/* <div className="fs-13px">
                        <i className="far fa-eye"></i> 892 views
                        <i className="far fa-clock ms-3"></i> 39min ago
                      </div> */}
                    </div>
                  </a>
                </div>
              </CardImgOverlay>
            </div>
            <div className="p-5px">
              <p className="card-text ">
                {showMoreRM
                  ? RM_title.substr(0, strLength) +
                    (RM_title.length > strLength ? "..." : "")
                  : RM_title}
              </p>
              {RM_title.length > strLength && (
                <>
                  {showMoreRM ? (
                    <div
                      className="d-flex justify-content-end mb-3"
                      onClick={() => setShowMoreRM(false)}
                    >
                      Show more
                    </div>
                  ) : (
                    <div
                      className="d-flex justify-content-end mb-3"
                      onClick={() => setShowMoreRM(true)}
                    >
                      Less
                    </div>
                  )}
                </>
              )}

              <div className="d-flex justify-content-end">
                <div className="dropdown-toggle me-2">
                  <a
                    href="#/"
                    data-bs-toggle="dropdown"
                    className="text-black text-opacity-75 text-decoration-none"
                  >
                    <i className="fas fa-lg fa-fw me-2 fa-download text-black "></i>
                    Download
                  </a>

                  <div
                    className="dropdown-menu"
                    style={{ zIndex: "1001 !important" }}
                  >
                    {userInfo.type === "Teacher" && (
                      <>
                        <div
                          className="dropdown-item text-white"
                          onClick={() =>
                            onDownloadApp(appType.RJ, apps.RAndJ_Teacher_WIN)
                          }
                        >
                          <i className="far fa-folder fa-fw fa-lg me-1"></i>{" "}
                          Teacher (win)
                        </div>

                        <div
                          className="dropdown-item text-white"
                          onClick={() =>
                            onDownloadApp(appType.RJ, apps.RAndJ_Teacher_IOS)
                          }
                        >
                          <i className="far fa-folder fa-fw fa-lg me-1"></i>{" "}
                          Teacher (mac)
                        </div>
                      </>
                    )}
                    <div
                      className="dropdown-item text-white"
                      onClick={() =>
                        onDownloadApp(appType.RJ, apps.RAndJ_Student_WIN)
                      }
                    >
                      <i className="far fa-folder fa-fw fa-lg me-1"></i> Student
                      (win)
                    </div>
                    <div
                      className="dropdown-item text-white"
                      onClick={() =>
                        onDownloadApp(appType.RJ, apps.RAndJ_Student_IOS)
                      }
                    >
                      <i className="far fa-folder fa-fw fa-lg me-1"></i> Student
                      (mac)
                    </div>
                    {/* <div
                      className="dropdown-item"
                      onClick={() =>
                        onDownloadApp(appType.RJ, apps.RAndJ_Teaser_WIN)
                      }
                    >
                      <i className="far fa-folder fa-fw fa-lg text-theme me-1"></i>{" "}
                      Teaser (win)
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="col-md-6 col-lg-4">
          <Card style={{ zIndex: "1" }}>
            <div className="text-white p-5px">
              <div style={{ maxHeight: "250px" }} className="overflow-hidden">
                <img src={QuizGame} alt="" className="card-img-top" />
              </div>
              <CardImgOverlay
                className="d-flex flex-column m-5px"
                style={{ zIndex: "20" }}
              >
                <div className="flex-fill">
                  <div className="d-flex align-items-center">
                    <h6 className="text-white">Youtube</h6>
                    <div className="dropdown dropdown-icon ms-auto">
                      <a
                        href="//www.youtube.com/watch?v=SxpRrYzSbzk"
                        className="text-white"
                        data-bs-toggle="dropdown"
                        target="_blank"
                      >
                        <i className="fa fa-ellipsis-h"></i>
                      </a>
                      <div className="dropdown-menu dropdown-menu-end">
                        <a
                          href="//www.youtube.com/watch?v=SxpRrYzSbzk"
                          className="dropdown-item"
                          target="_blank"
                        >
                          View
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <a
                    href="//www.youtube.com/watch?v=SxpRrYzSbzk"
                    data-lity
                    className="text-white text-decoration-none d-flex align-items-center bg-gray-600 bg-opacity-50 rounded-3"
                    target="_blank"
                  >
                    <div className="bg-red w-50px h-50px rounded-3 d-flex align-items-center justify-content-center">
                      <i className="fa fa-play"></i>
                    </div>
                    <div className="ms-3 flex-1">
                      <div className="fw-bold">
                        <i className="fas fa-lg fa-fw me-2 fa-question"></i>Quiz
                        Game
                      </div>
                      {/* <div className="fs-13px">
                        <i className="far fa-eye"></i> 892 views
                        <i className="far fa-clock ms-3"></i> 39min ago
                      </div> */}
                    </div>
                  </a>
                </div>
              </CardImgOverlay>
            </div>

            <div className="p-5px">
              <p className="card-text ">
                {showMoreQG
                  ? quizGame_title.substr(0, strLength) +
                    (quizGame_title.length > strLength ? "..." : "")
                  : quizGame_title}
              </p>
              {quizGame_title.length > strLength && (
                <>
                  {showMoreQG ? (
                    <div
                      className="d-flex justify-content-end mb-3"
                      onClick={() => setShowMoreQG(false)}
                    >
                      Show more
                    </div>
                  ) : (
                    <div
                      className="d-flex justify-content-end mb-3"
                      onClick={() => setShowMoreQG(true)}
                    >
                      Less
                    </div>
                  )}
                </>
              )}

              <div className="d-flex justify-content-end">
                <div className="dropdown-toggle me-2">
                  <a
                    href="#/"
                    data-bs-toggle="dropdown"
                    className="text-black text-opacity-75 text-decoration-none"
                  >
                    <i className="fas fa-lg fa-fw me-2 fa-download text-black "></i>
                    Download
                  </a>

                  <div className="dropdown-menu">
                    <div
                      className="dropdown-item text-white"
                      onClick={() => onDownloadApp(appType.QG, apps.QG_WIN)}
                    >
                      <i className="far fa-folder fa-fw fa-lg me-1"></i> Quiz
                      Game(Windows)
                    </div>
                    {/* <div
                      className="dropdown-item"
                      onClick={() =>
                        onDownloadApp(appType.QG, apps.QG_IOS)
                      }
                    >
                      <i className="far fa-folder fa-fw fa-lg text-theme me-1"></i>{" "}
                      Quiz Game(Mac)
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="col-md-6 col-lg-4">
          <Card style={{ zIndex: "0" }}>
            <div className="text-white p-5px">
              <div style={{ maxHeight: "250px" }} className="overflow-hidden">
                <img src={ComputerProjectImg} alt="" className="card-img-top" />
              </div>
              <CardImgOverlay
                className="d-flex flex-column m-5px"
                style={{ zIndex: "20" }}
              >
                <div className="flex-fill">
                  <div className="d-flex align-items-center">
                    <h6 className="text-white">Youtube</h6>
                    <div className="dropdown dropdown-icon ms-auto">
                      <a
                        href="//www.youtube.com/watch?v=9HEsBh0a5yg"
                        className="text-white"
                        data-bs-toggle="dropdown"
                        target="_blank"
                      >
                        <i className="fa fa-ellipsis-h"></i>
                      </a>
                      <div className="dropdown-menu dropdown-menu-end">
                        <a
                          href="//www.youtube.com/watch?v=9HEsBh0a5yg"
                          className="dropdown-item"
                          target="_blank"
                        >
                          View
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <a
                    href="//www.youtube.com/watch?v=9HEsBh0a5yg"
                    data-lity
                    className="text-white text-decoration-none d-flex align-items-center bg-gray-600 bg-opacity-50 rounded-3"
                    target="_blank"
                  >
                    <div className="bg-red w-50px h-50px rounded-3 d-flex align-items-center justify-content-center">
                      <i className="fa fa-play"></i>
                    </div>
                    <div className="ms-3 flex-1">
                      <div className="fw-bold">
                        <i className="fas fa-lg fa-fw me-2 fa-heartbeat"></i>
                        Computer Project
                      </div>
                      {/* <div className="fs-13px">
                        <i className="far fa-eye"></i> 892 views
                        <i className="far fa-clock ms-3"></i> 39min ago
                      </div> */}
                    </div>
                  </a>
                </div>
              </CardImgOverlay>
            </div>
            <div className="p-5px">
              <p className="card-text ">
                {showMoreCP
                  ? CP_title.substr(0, strLength) +
                    (CP_title.length > strLength ? "..." : "")
                  : CP_title}
              </p>
              {CP_title.length > strLength && (
                <>
                  {showMoreCP ? (
                    <div
                      className="d-flex justify-content-end mb-3"
                      onClick={() => setShowMoreCP(false)}
                    >
                      Show more
                    </div>
                  ) : (
                    <div
                      className="d-flex justify-content-end mb-3"
                      onClick={() => setShowMoreCP(true)}
                    >
                      Less
                    </div>
                  )}
                </>
              )}

              <div className="d-flex justify-content-end">
                <div className="dropdown-toggle me-2">
                  <a
                    href="#/"
                    data-bs-toggle="dropdown"
                    className="text-black text-opacity-75 text-decoration-none"
                  >
                    <i className="fas fa-lg fa-fw me-2 fa-download text-black"></i>
                    Download
                  </a>

                  <div className="dropdown-menu">
                    <div
                      className="dropdown-item"
                      onClick={() =>
                        onDownloadApp(appType.CP, apps.CP_UNIT1_WIN)
                      }
                    >
                      <i className="far fa-folder fa-fw fa-lg me-1"></i>{" "}
                      Unit1-Windows
                    </div>
                    <div
                      className="dropdown-item"
                      onClick={() =>
                        onDownloadApp(appType.CP, apps.CP_UNIT2_WIN)
                      }
                    >
                      <i className="far fa-folder fa-fw fa-lg me-1"></i>{" "}
                      Unit2-Windows
                    </div>
                    <div
                      className="dropdown-item"
                      onClick={() =>
                        onDownloadApp(appType.CP, apps.CP_UNIT1_IOS)
                      }
                    >
                      <i className="far fa-folder fa-fw fa-lg me-1"></i>{" "}
                      Unit1-MAC
                    </div>
                    <div
                      className="dropdown-item"
                      onClick={() =>
                        onDownloadApp(appType.CP, apps.CP_UNIT2_IOS)
                      }
                    >
                      <i className="far fa-folder fa-fw fa-lg me-1"></i>{" "}
                      Unit2-MAC
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="modal modal-cover fade" id="modalCoverSubscribe">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">You are not subscribed</h3>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <p className="mb-5">
                Excuse me, you do not have permission to download this app.
                <br />
                To purchase an app, please contact us with your email and your
                partners' emails. Thank you.
              </p>
              <div className="row" style={{ rowGap: "15px" }}>
                <div className="col-md-9">
                  <input
                    type="text"
                    placeholder="Your principal email"
                    className="form-control form-control-md"
                    name="icon-filter"
                  />
                </div>
                <div className="col-md-3">
                  <button
                    type="button"
                    className="btn btn-outline-theme btn-md btn-block"
                    // onClick={() => handleRequestPaidApp()}
                  >
                    Contact us
                  </button>
                </div>

                <div className="col-md-12">
                  <TagsInput
                    className="form-control-lg"
                    name="emails"
                    placeHolder="Please nominate up to 5 emails."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Old;
