import React, { useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { Card } from "../../../components/card/card";
import TheVillage from "../../../assets/img/TheVillage.jpg";

const fileInfo = {
  win: {
    uri: "https://metamersive-project.s3.amazonaws.com/Village/jonathankh-village-default-windows-desktop-64-bit-30.zip",
    fileName: "Village(Windows)",
  },
  mac: {
    uri: "https://metamersive-project.s3.amazonaws.com/Village/jonathankh-village-default-mac-desktop-universal-52.zip",
    fileName: "Village(Mac)",
  },
};

const Village = () => {
  const toastId = useRef(null);

  const downloadFile = async (type) => {
    const { uri, fileName } = fileInfo[type];
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
        new Blob([response.data], { type: "application/zip" })
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
  };

  return (
    <div>
      <h3>The Village</h3>
      <div className="row mt-3">
        <div className="col-lg-4 mb-4">
          <Card>
            <img src={TheVillage} alt="" className="card-img-top" />
          </Card>
        </div>
        <div className="col-lg-8">
          <Card>
            <div className="p-3">
              <div>
                <div className="fs-3">Focus</div>
                <div className="mt-2">
                  Enhance listening, reading, speaking and writing abilities of
                  students for the HKDSE at their own pace at home and in school
                </div>
              </div>
              <div className="mt-4">
                <div className="fs-3">Concept</div>
                <div className="mt-2">
                  This game focuses on teaching kids some of the best practices
                  and skills when taking examinations. It features over 40
                  learning videos that given students autonomy and ownership to
                  equip themselves with the skills to bump their listening,
                  reading, speaking and writing abilities. Students can then put
                  their skills into practice by doing the skill drills specific
                  to these different disciplines, earning Lumen Dollars every
                  time they do. The money can be used to upgrade their homes
                  with new furniture, open up new rooms and many more!
                </div>
              </div>
              <div className="mt-4">
                <div className="fs-3">Teacher</div>
                <div className="mt-2">
                  The Village enables analytics to provide teachers with
                  insights into student progress and engagement in a wider array
                  of language development. It tracks proficiency levels in 4
                  main areas, points earned across content, question analysis,
                  engagement levels, and preferred learning styles. These
                  analytics inform instructional strategies, identify areas for
                  improvement, and personalize support to enhance student
                  learning and motivation.
                </div>
              </div>
              <div className="d-flex justify-content-end mt-4">
                <div className="dropdown-toggle">
                  <a
                    href="#/"
                    data-bs-toggle="dropdown"
                    className="text-white text-opacity-75 text-decoration-none"
                  >
                    <i className="fas fa-lg fa-fw me-2 fa-download text-theme "></i>
                    Download
                  </a>

                  <div
                    className="dropdown-menu mt-2"
                    style={{ zIndex: "1001 !important" }}
                  >
                    <div
                      className="dropdown-item"
                      onClick={() => downloadFile("win")}
                    >
                      <i className="far fa-folder fa-fw fa-lg text-theme me-1"></i>{" "}
                      Windows
                    </div>
                    <div
                      className="dropdown-item"
                      onClick={() => downloadFile("mac")}
                    >
                      <i className="far fa-folder fa-fw fa-lg text-theme me-1"></i>{" "}
                      Mac
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="fs-3">The Village Gameplay</div>
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/UBJtcSI6Ano?si=5QOaUoO_z3BE9oXJ"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Village;
