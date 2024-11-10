import React, { useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { Card } from "../../../components/card/card";
import WordDashImg from "../../../assets/img/WordDash.jpg";

const fileInfo = {
  win: {
    uri: "https://metamersive-project.s3.amazonaws.com/WordDash/worddash_win.zip",
    fileName: "WordDash(Windows)",
  },
  mac: {
    uri: "https://metamersive-project.s3.amazonaws.com/WordDash/worddash_mac.zip",
    fileName: "WordDash(Mac)",
  },
};

const WordDash = () => {
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
      <h3>Word Dash</h3>
      <div className="row mt-3">
        <div className="col-lg-4 mb-4">
          <Card>
            <img src={WordDashImg} alt="" className="card-img-top" />
          </Card>
        </div>
        <div className="col-lg-8">
          <Card>
            <div className="p-3">
              <div>
                <div className="fs-3">Focus</div>
                <div className="mt-2">
                  Enhance spelling and HKDSE vocabulary terms
                </div>
              </div>
              <div className="mt-4">
                <div className="fs-3">Concept</div>
                <div className="mt-2">
                  The game has multiplayer and single player capabilities.
                  Players can choose to collaborate in teams of up to 5 or
                  compete against friends in a free-for-all. The aim of the game
                  is to get the most points by answering the mystery words,
                  collecting letters, and spelling out as many different words
                  as possible. Like some word games, certain letters are worth
                  more than others. This game also features the use of power ups
                  that can either help you and your team, or hinder your
                  opponents. This game has 3 different maps. Each pose it’s own
                  unique obstacle. It also gives students the chance to learn
                  from one another, see what the highest scoring words were,
                  what mystery words they missed and even who scored the highest
                  in one game. Can have up to 8 multiplayers in a game.
                </div>
              </div>
              <div className="mt-4">
                <div className="fs-3">Teacher</div>
                <div className="mt-2">
                  Word Dash uses analytics to provide teachers with insights
                  into students' progress and performance. It tracks mystery
                  words, spelling words, and mistakes made to identify areas of
                  struggle. Teachers can assess overall progress through game
                  results and customize settings for a tailored experience. The
                  analytics also provide insights into language skills,
                  creativity, and areas needing attention. By analyzing these
                  data, teachers can scaffold learning, personalize instruction,
                  and promote engagement in vocabulary for language development
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
                <div className="fs-3">Word Dash Gameplay</div>
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/uGT46_ugoKc?si=5QOaUoO_z3BE9oXJ"
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

export default WordDash;
