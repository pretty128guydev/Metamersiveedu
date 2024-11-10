import React, { useRef, useState } from "react";
import axios from "axios";
import { Card, CardImgOverlay } from "./../../components/card/card.jsx";
import TheVillageOverview from "../../assets/img/TheVillageOverview.jpg";
import TagOverview from "../../assets/img/TagOverview.jpg";
import WordDashOverview from "../../assets/img/WordDashOverview.jpg";
import { toast } from "react-toastify";
import { WordDash_title, Tag_title, Village_title } from "./title.js";

const apps = {
  Tag_Win: {
    name: "Tag(Windows)",
    link: "https://metamersive-project.s3.amazonaws.com/Tag/metamersive_tag_windows.zip",
  },
  Tag_Mac: {
    name: "Tag(Mac)",
    link: "https://metamersive-project.s3.amazonaws.com/Tag/metamersive_tag_mac.zip",
  },
  Village_Win: {
    name: "Village(Windows)",
    link: "https://metamersive-project.s3.amazonaws.com/Village/jonathankh-village-default-windows-desktop-64-bit-30.zip",
  },
  Village_Mac: {
    name: "Village(Mac)",
    link: "https://metamersive-project.s3.amazonaws.com/Village/jonathankh-village-default-mac-desktop-universal-52.zip",
  },
  WordDash_Win: {
    name: "WordDash(Windows)",
    link: "https://metamersive-project.s3.amazonaws.com/WordDash/worddash_win.zip",
  },
  WordDash_Mac: {
    name: "WordDash(Mac)",
    link: "https://metamersive-project.s3.amazonaws.com/WordDash/worddash_mac.zip",
  },
};

function Home() {
  const toastId = useRef(null);
  const [showMoreRM, setShowMoreRM] = useState(true);
  const [showMoreQG, setShowMoreQG] = useState(true);
  const [showMoreCP, setShowMoreCP] = useState(true);
  const strLength = 350;

  const onDownloadApp = (app_info) => {
    downloadFile(app_info.link, app_info.name);
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
        <div className="col-md-6 col-lg-4 d-flex">
          <Card>
            <div className="text-primary p-5px">
              <div style={{ maxHeight: "250px" }} className="overflow-hidden">
                <img src={TagOverview} alt="" className="card-img-top" />
              </div>
              <CardImgOverlay
                className="d-flex flex-column m-5px"
                style={{ zIndex: "20" }}
              >
                <div className="flex-fill">
                  <div className="d-flex align-items-center">
                    <div className="dropdown dropdown-icon ms-auto">
                      <a
                        href="https://www.youtube.com/watch?v=YocegAEtGGg"
                        className="text-white"
                        data-bs-toggle="dropdown"
                        target="_blank"
                      >
                        <i className="fa fa-ellipsis-h"></i>
                      </a>
                      <div className="dropdown-menu dropdown-menu-end">
                        <a
                          href="https://www.youtube.com/watch?v=YocegAEtGGg"
                          className="dropdown-item"
                          target="_blank"
                        >
                          <div className="text-default">View</div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <a
                    href="https://www.youtube.com/watch?v=YocegAEtGGg"
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
                        Tag
                      </div>
                    </div>
                  </a>
                </div>
              </CardImgOverlay>
            </div>
            <div className="p-5px">
              <p className="card-text ">
                {showMoreRM
                  ? Tag_title.substr(0, strLength) +
                    (Tag_title.length > strLength ? "..." : "")
                  : Tag_title}
              </p>
              {Tag_title.length > strLength && (
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
                    <div
                      className="dropdown-item text-white"
                      onClick={() => onDownloadApp(apps.Tag_Win)}
                    >
                      <i className="far fa-folder fa-fw fa-lg text-white me-1"></i>{" "}
                      Tag (Windows)
                    </div>
                    <div
                      className="dropdown-item text-white"
                      onClick={() => onDownloadApp(apps.Tag_Mac)}
                    >
                      <i className="far fa-folder fa-fw fa-lg text-white me-1"></i>{" "}
                      Tag (Mac)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="col-md-6 col-lg-4 d-flex">
          <Card style={{ zIndex: "1" }}>
            <div className="text-primary p-5px">
              <div style={{ maxHeight: "250px" }} className="overflow-hidden">
                <img src={WordDashOverview} alt="" className="card-img-top" />
              </div>
              <CardImgOverlay
                className="d-flex flex-column m-5px"
                style={{ zIndex: "20" }}
              >
                <div className="flex-fill">
                  <div className="d-flex align-items-center">
                    <div className="dropdown dropdown-icon ms-auto">
                      <a
                        href="https://www.youtube.com/watch?v=uGT46_ugoKc"
                        className="text-white"
                        data-bs-toggle="dropdown"
                        target="_blank"
                      >
                        <i className="fa fa-ellipsis-h"></i>
                      </a>
                      <div className="dropdown-menu dropdown-menu-end">
                        <a
                          href="https://www.youtube.com/watch?v=uGT46_ugoKc"
                          className="dropdown-item"
                          target="_blank"
                        >
                          <div className="text-default">View</div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <a
                    href="https://www.youtube.com/watch?v=uGT46_ugoKc"
                    data-lity
                    className="text-white text-decoration-none d-flex align-items-center bg-gray-600 bg-opacity-50 rounded-3"
                    target="_blank"
                  >
                    <div className="bg-red w-50px h-50px rounded-3 d-flex align-items-center justify-content-center">
                      <i className="fa fa-play"></i>
                    </div>
                    <div className="ms-3 flex-1">
                      <div className="fw-bold">
                        <i className="fas fa-lg fa-fw me-2 fa-question"></i>Word
                        Dash
                      </div>
                    </div>
                  </a>
                </div>
              </CardImgOverlay>
            </div>

            <div className="p-5px">
              <p className="card-text ">
                {showMoreQG
                  ? WordDash_title.substr(0, strLength) +
                    (WordDash_title.length > strLength ? "..." : "")
                  : WordDash_title}
              </p>
              {WordDash_title.length > strLength && (
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
                      onClick={() => onDownloadApp(apps.WordDash_Win)}
                    >
                      <i className="far fa-folder fa-fw fa-lg text-white me-1"></i>{" "}
                      Word Dash (Windows)
                    </div>
                    <div
                      className="dropdown-item text-white"
                      onClick={() => onDownloadApp(apps.WordDash_Mac)}
                    >
                      <i className="far fa-folder fa-fw fa-lg text-white me-1"></i>{" "}
                      Word Dash (Mac)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="col-md-6 col-lg-4 d-flex">
          <Card style={{ zIndex: "0" }}>
            <div className="text-primary p-5px">
              <div style={{ maxHeight: "250px" }} className="overflow-hidden">
                <img src={TheVillageOverview} alt="" className="card-img-top" />
              </div>
              <CardImgOverlay
                className="d-flex flex-column m-5px"
                style={{ zIndex: "20" }}
              >
                <div className="flex-fill">
                  <div className="d-flex align-items-center">
                    <div className="dropdown dropdown-icon ms-auto">
                      <a
                        href="https://www.youtube.com/watch?v=UBJtcSI6Ano"
                        className="text-white"
                        data-bs-toggle="dropdown"
                        target="_blank"
                      >
                        <i className="fa fa-ellipsis-h"></i>
                      </a>
                      <div className="dropdown-menu dropdown-menu-end">
                        <a
                          href="https://www.youtube.com/watch?v=UBJtcSI6Ano"
                          className="dropdown-item"
                          target="_blank"
                        >
                          <div className="text-default">View</div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <a
                    href="https://www.youtube.com/watch?v=UBJtcSI6Ano"
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
                        The Village
                      </div>
                    </div>
                  </a>
                </div>
              </CardImgOverlay>
            </div>
            <div className="p-5px">
              <p className="card-text ">
                {showMoreCP
                  ? Village_title.substr(0, strLength) +
                    (Village_title.length > strLength ? "..." : "")
                  : Village_title}
              </p>
              {Village_title.length > strLength && (
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
                    <i className="fas fa-lg fa-fw me-2 fa-download text-black "></i>
                    Download
                  </a>

                  <div className="dropdown-menu">
                    <div
                      className="dropdown-item text-white"
                      onClick={() => onDownloadApp(apps.Village_Win)}
                    >
                      <i className="far fa-folder fa-fw fa-lg text-white me-1"></i>{" "}
                      The Village (Windows)
                    </div>
                    <div
                      className="dropdown-item text-white"
                      onClick={() => onDownloadApp(apps.Village_Mac)}
                    >
                      <i className="far fa-folder fa-fw fa-lg text-white me-1"></i>{" "}
                      The Village (Mac)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Home;
