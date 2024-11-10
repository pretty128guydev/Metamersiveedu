import React, { useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { Card } from "../../../components/card/card";
import TagImg from "../../../assets/img/Tag.jpg";

const fileInfo = {
  win: {
    uri: "https://metamersive-project.s3.amazonaws.com/Tag/metamersive_tag_windows.zip",
    fileName: "Tag(Windows)",
  },
  mac: {
    uri: "https://metamersive-project.s3.amazonaws.com/Tag/metamersive_tag_mac.zip",
    fileName: "Tag(Mac)",
  },
};

const Tag = () => {
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
  };
  return (
    <div>
      <h3>Tag</h3>
      <div className="row mt-3">
        <div className="col-lg-4 mb-4">
          <Card>
            <img src={TagImg} alt="" className="card-img-top" />
          </Card>
        </div>
        <div className="col-lg-8">
          <Card>
            <div className="p-3">
              <div>
                <div className="fs-3">Focus</div>
                <div className="mt-2">
                  Enhance reading and vocabulary by practicing 2,300 HKDSE
                  centric vocabulary terms through pictures, symbols, fill in
                  the blanks and MCQ
                </div>
              </div>
              <div className="mt-4">
                <div className="fs-3">Concept</div>
                <div className="mt-2">
                  The game has multiplayer and single player capabilities. The
                  game runs like a children’s game of freeze tag. The tagger’s
                  aim is to catch as many people as possible. The other players
                  aim to beat the tagger by finishing their 3 builds before the
                  timer runs out. Each player selects a character with a
                  specific ability to use throughout that round. The game has
                  multiple maps and levels of difficulty to let students play at
                  a level that challenges them. Can have up to 8 multiplayers in
                  a game.
                </div>
              </div>
              <div className="mt-4">
                <div className="fs-3">Teacher</div>
                <div className="mt-2">
                  TAG allows analytics to provide teachers with valuable
                  insights into student performance and engagement in other
                  areas of language development. The analytics include accuracy
                  of answers, tracking the number of games played, question
                  difficulty, and individual student performance. These
                  analytics enable teachers to assess engagement, tailor
                  instruction, identify areas for improvement to support student
                  growth.
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
                <div className="fs-3">Tag Gameplay</div>
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/YocegAEtGGg?si=ZTXit3sTh4mDPfnd"
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

export default Tag;
