import React, {useEffect, useState, useContext, useCallback} from 'react';
import { useRef } from 'react';
import { useSelector } from "react-redux";
import useFileUpload from 'react-use-file-upload';
import { AppSettings } from "../../config/app-settings.js";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Card, CardBody } from "../card/card.jsx";
import DocViewer, {DocViewerRenderers } from "@cyntler/react-doc-viewer";
import MockApi from '../../api-clients/MockApi.js';
import { notification } from 'antd';
import clsx from "clsx";
import BarsScale from "../../components/loading/BarsScale.jsx";
import VillageApi from '../../api-clients/VillageApi.js';

var path = require('path');


const UploadWidget = (props) => {
  const { multiple, fileUploadComponent, setTextFunc} = props;
  const {
    files,
    fileNames,
    fileTypes,
    totalSize,
    totalSizeInBytes,
    handleDragDropEvent,
    clearAllFiles,
    createFormData,
    setFiles,
    removeFile,
  } = fileUploadComponent;

  const inputRef = useRef();

  const clearButton = () => {
    clearAllFiles()
  }

  return (
    <div>

      <div className="form-container">
        {/* Display the files to be uploaded */}


        {/* Provide a drop zone and an alternative button inside it to upload files. */}
        <button type="button" className="btn btn-theme btn-sm" onClick={() => inputRef.current.click()}>Select file{multiple ? "s" : ""}</button> 
          {/* { multiple == false && <button type="button" className="btn btn-theme btn-sm" onClick={() => inputRef.current.click()}>Select file</button> } */}
          <p></p>
          {/* Hide the crappy looking default HTML input */}
          <input
            ref={inputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            multiple = {multiple}
            style={{ display: 'none' }}
            onChange={async (e) => {
              if (e.target.files?.length > 0) {
                var ext = e.target.value.match(/\.([^\.]+)$/)[1];
                if (ext.match(/(jpg|jpeg|png|pdf)$/i)) {
                  if (multiple) {
                      setFiles(e, 'a'); 
                  } else {
                      setFiles(e, 'w');  
                  }
                }
              }

              if (setTextFunc !== undefined) {
                const formData = new FormData();
                formData.append("file", files[0]);
                
                try {
                  const r = await MockApi.raw_text_from_image({ filetype: fileTypes[0]}, formData);
                  if (r.status == 200) {
                    setTextFunc(r.data['Text']);
                  }    
                } catch (error) {
                  console.error('Failed to submit files.');
                }
              }
          
              inputRef.current.value = null;
            }}
          />
      </div>
      <div class="container" style={{height:'400px'}}>
        <DocViewer pluginRenderers={DocViewerRenderers} documents={
          files.map((file) => (
            {uri: window.URL.createObjectURL(file), fileName: file.name}
          ))
        }
        />

        </div>    
        <ul>
          {fileNames.map((name) => (
            <li key={name}>
              <span>{name}</span>

              <span onClick={() => removeFile(name)}>
                <i className="fa fa-times" />
              </span>
            </li>
          ))}
        </ul>
        {files.length > 0 && (
          <button type="button" className="btn btn-theme btn-sm" onClick={() => clearButton()}>Clear All</button>
        )}

    </div>
);

}

const TeacherUpload = (props) => {
    const { has_data_files, mock_paper_type } = props;
    const [loading, setLoading] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const userInfo = useSelector((store) => store.auth.userInfo);
    const [classes, setclasses] = useState([]);

    const questionUpload = useFileUpload();
    const datafileUpload = useFileUpload();

    useEffect(() => {
      setLoading(true);
  
      if (userInfo.type === "Student") {
        const query = { student_id: userInfo.uid };
        VillageApi.getJoinedClassrooms(query)
          .then((res) => {
            setclasses(res.data);
            setLoading(false);
          })
          .catch((_err) => {
            setLoading(false);
          });
      } else {
        VillageApi.getClassroomsByTeacherId({ teacher_id: userInfo.uid })
          .then((res) => {
            setclasses(res.data);
  
          })
          .finally(() => setLoading(false));
      }
    }, []);
    
    const handleSubmit = async (e) => {
      e.preventDefault();

      setLoading(true);
      const title = document.getElementById('title').value;
      const cl = document.getElementById('cl').value;

      if (title.length <= 0) {
        console.info("Title cannot be null");
        return;
      }
      const formData = new FormData();
      formData.append("uploads", questionUpload.files[0]);
      if (has_data_files) {
        formData.append("uploads", datafileUpload.files[0]);
      }

      try {                  
        const r = await MockApi.add_teacher_upload(
          { teacher_id: userInfo.uid,
            class_id: cl,
            mock_paper_type: mock_paper_type,
            // filetype: questionUpload.fileTypes[0],
            title: title
          }, formData);
        if (r.status == 201) {
          console.log("Done");
          setSubmitSuccess(true);
        }    
      } catch (error) {
        console.error('Failed to submit files.');
      }
    }

    return (
      <div>  
          <Card className={"mb-3"}>
            <CardBody className="bg-white bg-opacity-5">
                <h5>Title</h5>
                <input 
                  type="text" 
                  name="title" 
                  id="title" 
                  className ="form-control"
                  // className={clsx({
                  //   "form-control form-control-lg bg-white bg-opacity-5": true,
                  //   "is-invalid": title === ""
                  // })}
                  // value={title}
                  // onChange={(e) => setTitle(e.target.value)}
                />
            </CardBody>

            <CardBody className="bg-white bg-opacity-5">
              <h5>Class</h5>
                <select class="form-select" name="cl" id="cl">
                  { 
                    classes.map((c) => (
                      <option value={c.name}>{c.name}</option>            
                      )
                    )
                  }
                </select>
            </CardBody>
          </Card>

          <Card className={"mb-3"}>
            <CardBody className="bg-white bg-opacity-5">
                <h5>Select pdf/image containing questions</h5>
                <UploadWidget multiple={false} fileUploadComponent={questionUpload}/>
              </CardBody>
          </Card>

          { has_data_files ?
          <Card className={"mb-3"}>
            <CardBody className="bg-white bg-opacity-5">
                <h5>Select pdf/image containing data files</h5>
                <UploadWidget multiple={false} fileUploadComponent={datafileUpload}/>
              </CardBody>
          </Card>
          : ''}

          <div className="submit">
            { submitSuccess ?
                <button className="btn btn-outline-theme rounded-sm" disabled="disabled"> 
                  Success
                </button>
                : (
                  loading ?
                    <button className="btn btn-outline-theme active rounded-sm" disabled="disabled"> 
                      <BarsScale/>
                    </button>
                    :
                    <button type="button" className="btn btn-outline-theme rounded-sm" 
                      onClick={handleSubmit} {...((questionUpload.files.length === 0 ||
                      (has_data_files && datafileUpload.files.length === 0)  )&& { disabled: 'disabled' })}>
                    Submit
                    </button>
                )
            }

          </div>
      </div>
    );
  };

  const StudentSubmissionInput = (props) => {
    const context = useContext(AppSettings);
    const { topic } = props;
    const [rawText, setRawText] = useState('Edit answer here');
    const [questionUrl, setQuestionUrl] = useState('');
    const [dataFileUrl, setDataFileUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState([]);
    const fileUpload = useFileUpload();

    useEffect( () => {
      context.setAppContentFullHeight(true);
      context.setAppContentClass("");

      if ('questionUrl' in topic) {
        setLoading(true);
        MockApi.get_teacher_upload_file({ url: topic.questionUrl }).then((res) => {
          const url = window.URL.createObjectURL(res.data);
          setQuestionUrl(url);
        }).catch(() => notification.warning({
          message: 'Error',
          description: 'There was an error while getting question. Please reload this page.'
        })).finally(() => setLoading(false));
      }

      if ('dataFileUrl' in topic) {
        setLoading(true);
        MockApi.get_teacher_upload_file({ url: topic.dataFileUrl }).then((res) => {
          const url = window.URL.createObjectURL(res.data);
          setDataFileUrl(url);
        }).catch(() => notification.warning({
          message: 'Error',
          description: 'There was an error while getting data file. Please reload this page.'
        })).finally(() => setLoading(false));
      }

    }, []);
  
    const delay = ms => new Promise(res => setTimeout(res, ms));

    const handleSubmit = async (event) => {
      event.preventDefault();

      setLoading(true);
      const body = {
        'answer': document.getElementById('answer').value,
        'question': topic.questionRawText
      };
      if ('dataRawText' in topic) {
        body['data'] = topic.dataRawText;
      }

      console.info('Submitting answers');
      console.info(body);

      const r = await (
        props.mock_paper_type == 'writing_part_a' ?
          MockApi.mark_writing_paper({year: '2024', essaywords: '200'}, body) :
        (
          props.mock_paper_type == 'writing_part_b' ?
          MockApi.mark_writing_paper({year: '2024', essaywords: '400'}, body) :
          MockApi.mark_listening_paper({mock_paper_type: props.mock_paper_type}, body)
        )
      );
  
      if (r.status == 200) {
        setResult(r.data);
      }
      // await delay(1000);

      // const sample_answer = {
      //   'Content Score': 5,
      //   'Content evaluation': "The student's answer does touch upon the topic of the high cost of sports equipment, but it does not directly address the issue of parents' reluctance to buy these items for their children. The student also does not provide three reasons to support their opinion, as requested in the question.",
      //   'Language Score': 7,
      //   'Language evaluation': "The student's answer is free from any grammatical, spelling, or punctuation errors.",
      //   'Organization Score': 6,
      //   'Organization evaluation': "The student's answer has a clear structure with an introduction and main body. However, it lacks a clear conclusion or summary of the points made.",
      //   'Final Total Score': 8.6,
      //   'Recommendation': 'The student should ensure that they fully address the question asked, including providing the requested number of reasons to support their opinion. They should also include a clear conclusion to summarize their points. For example, they could discuss the financial strain on families, the potential for children to feel excluded if they cannot participate in certain sports, and the risk of children losing interest in physical activity due to the high cost of equipment.',
      //   'Sample Essay/Letter/Article': "Dear Editor, I am writing to express my concern about the rising prices of sports accessories, which are making it difficult for many parents to afford these items for their children. Firstly, these high costs place a significant financial strain on families, particularly those with multiple children who are interested in different sports. Secondly, the high cost of sports equipment can lead to children feeling excluded if they are unable to participate in certain sports due to the cost of the necessary equipment. Finally, the high cost of sports accessories could potentially discourage children from engaging in physical activity, which is crucial for their health and development. I believe it is essential for the prices of sports accessories to be made more affordable, to ensure that all children have the opportunity to participate in sports. Yours sincerely, [Student's Name]"
      // }
      
      // setResult(sample_answer);

      setLoading(false);
    };

    const handleChange = (event) => {
      setRawText(event.target.value);
    };

    const showResult = (result) => {
      return (
        <div className="row gx-3">
          <div className="col-xl-3 col-lg-4 col-md-6 pb-3">
            <Card
              className="pos-checkout-table"
              style={{ height: "120px" }}
            >
              <center>
                <div className="fw-bold display-2">{result['Content Score']}</div>
                <div className="text-primary text-opacity-50">Content Score</div>
                <br></br>
                <div className="text-primary text-opacity-50">{result['Content evaluation']}</div>
                </center>  
            </Card>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6 pb-3">
            <Card
              className="pos-checkout-table"
              style={{ height: "120px" }}
            >
              <center>
                <div className="fw-bold display-2">{result['Organization Score']}</div>
                <div className="text-primary text-opacity-50">Organization Score</div>
                <br></br>
                <div className="text-primary text-opacity-50">{result['Organization evaluation']}</div>
                </center>
            </Card>
          </div>
  
          <div className="col-xl-3 col-lg-4 col-md-6 pb-3">
            <Card
              className="pos-checkout-table"
              style={{ height: "120px" }}
            >
              <center>                
                <div className="fw-bold display-2">{result['Language Score']}</div>
                <div className="text-primary text-opacity-50">Language Score</div>
                <br></br>
                <div className="text-primary text-opacity-50">{result['Language evaluation']}</div>
              </center>
            </Card>
          </div>
  
          <div className="col-xl-3 col-lg-4 col-md-6 pb-3">
            <Card
              className="pos-checkout-table"
              style={{ height: "120px" }}
            >
              <center>
                <div className="fw-bold display-2">{result['Final Total Score']}</div>
                <div className="text-primary text-opacity-50">Final Total Score</div>
                <br></br>
                <div className="text-primary text-opacity-50">{result['Recommendation']}</div>
                </center>
            </Card>
          </div>
  
        </div>
      );
    };
  
    return (
      <div>
      <div className="modal fade" id="modalContent">
        <div className="modal-dialog">
          <div className="modal-content">
            <form className="was-validated">
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">
                    <h6>Content Evaluation</h6>
                    {result['Content evaluation']}
                  </label>
                </div>
              </div>
              <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-theme"
                    data-bs-dismiss="modal"
                  >OK
                  </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="modal fade" id="modalLanguage">
        <div className="modal-dialog">
          <div className="modal-content">
            <form className="was-validated">
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">
                    <h6>Language Evaluation</h6>
                    {result['Language evaluation']}
                  </label>
                </div>
              </div>
              <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-theme"
                    data-bs-dismiss="modal"
                  >OK
                  </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="modal fade" id="modalOrganization">
        <div className="modal-dialog">
          <div className="modal-content">
            <form className="was-validated">
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">
                    <h6>Organization Evaluation</h6>
                    {result['Organization evaluation']}
                  </label>
                </div>
              </div>
              <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-theme"
                    data-bs-dismiss="modal"
                  >OK
                  </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="modal fade" id="modalFinal">
        <div className="modal-dialog">
          <div className="modal-content">
            <form className="was-validated">
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">
                    <h6>Recommendation</h6>
                    {result['Recommendation']}
                  </label>
                </div>
              </div>
              <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-theme"
                    data-bs-dismiss="modal"
                  >OK
                  </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {loading ? (
          <div className="d-flex align-items-center justify-content-center h-100">
            <BarsScale />
          </div>
        )
        : 
        (
          (result.length == 0) ? 
            <>
              <Card>
                <CardBody className="bg-white bg-opacity-5">
                    <h4>{topic.title}</h4>
                    Class ID: {topic.class_id}<br/>
                    Creation date: {topic.createdAt}<br/>
                </CardBody>

                { (questionUrl.length == 0) ? '' :
                <CardBody className="bg-white bg-opacity-5">
                    <div class="container" style={{height:'600px'}}>
                      <h5>Question</h5>
                      <DocViewer pluginRenderers={DocViewerRenderers} documents={[ {uri: questionUrl } ]} />
                    </div>     
                </CardBody>
                }

                { (dataFileUrl.length == 0) ? '' :
                <CardBody className="bg-white bg-opacity-5">
                  <div class="container" style={{height:'600px'}}>
                    <br></br>
                    <h5>Data File</h5>
                    <DocViewer pluginRenderers={DocViewerRenderers} documents={[ {uri: dataFileUrl } ]} />
                  </div>
                </CardBody>
                }
                  
              </Card>
              <br/>

              <Card className={"mb-3"}>
                <CardBody className="bg-white bg-opacity-5">
                    <h4>Select file containing answers:</h4>
                    <UploadWidget multiple={false} fileUploadComponent={fileUpload} setTextFunc={setRawText}/>
                  </CardBody>
              </Card>
    
              <Card className={"mb-3"}>
                <CardBody className="bg-white bg-opacity-5">
                  <h4>Edit answer:</h4>
                  <textarea
                          type="text"
                          id="answer"
                          rows="30"
                          className="form-control my-2"
                          value={rawText}
                          onChange={handleChange}
                  />
              </CardBody>
              </Card>
    
              <div className="submit">
                <button type="button" className="btn btn-theme btn-sm"
                  onClick={handleSubmit} {...(rawText.length === 0 && { disabled: 'disabled' })}>Submit</button>
              </div>
              </>
            : showResult(result)
    )
    }
    </div>
    )
  }

  const StudentSubmissionMain = (props) => {
    const context = useContext(AppSettings);
    const { class_id, mock_paper_type } = props;
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [topicData, setTopicData] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState();
    const userInfo = useSelector((store) => store.auth.userInfo);
    const cls = ["Class A", "Class B", "Class C"];
    const qes = ["Task 1:  Jan 5, 2024", "Task 2:   Feb 5, 2024", "Task 3:  Mar 18, 2024"];

    const onSelectTopic = (topic) => {
      setSelectedTopic(topic);
    };
  
    const renderTeacherTopics = () => {
      return (
        <div className="mx-3 my-2 d-flex justify-content-between">
        <div className="row gx-3">
        {topicData && topicData.length > 0 ? (
          topicData.map((topic, index) => (
            <div
              className="col-6 pb-3"
              key={index}
            >
              <Card
                className={"pos-checkout-table in-use"}
                style={{ height: "120px", width: "120px" }}
              >
                <div
                  className="pos-checkout-table-container d-flex align-items-center justify-content-center"
                  style={{ cursor: "pointer" }}
                  onClick={() => onSelectTopic(topic)}
                >
                  <div className="pos-checkout-table-header">
                    <div className="status">
                      <i className="bi bi-circle-fill text-theme" />
                    </div>

                    <div className="d-flex align-items-center justify-content-center">
                      <div
                        className="fw-bold"
                        style={{ fontSize: "14px" }}
                      >
                        {topic.title.substr(0, 50) +
                          (topic.title.length > 50
                            ? "..."
                            : "") + " (" + topic.createdAt.split(' ')[0] + ")" + " " + topic.class_id}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))
        ) : (
          <div className="col-12"> {"No records found"}</div>
        )}
        </div>
        </div>
      );
    }

    useEffect(() => {
      setLoading(true);
      MockApi.query_teacher_uploads({ mock_paper_type: mock_paper_type }).then((res) => {
        setTopicData(res.data);
      }).catch(() => notification.warning({
        message: 'Error',
        description: 'There was an error while getting teacher uploads. Please reload this page.'
      })).finally(() => setLoading(false));

      context.setAppSidebarNone(false);
      context.setAppContentFullHeight(true);
      context.setAppContentClass("p-1 ps-xl-4 pe-xl-4 pt-xl-3 pb-xl-3");
  
      return function cleanUp() {
        context.setAppContentFullHeight(false);
        context.setAppContentClass("");
      };
  

    }, []);

    return (
      <div className="h-100 share">
        <Card className={"pos pos-vertical"} id="pos">
          <CardBody className="pos-container">
            <div className="pos-content">
              <div className="pos">
                <div className="pos-container">
                  <div className="pos-content h-100">
                    {loading ?
                      (
                        <div className="d-flex align-items-center justify-content-center h-100">
                          <BarsScale />
                        </div>
                      ) : 
                      (
                         <>{selectedTopic ? <StudentSubmissionInput topic={selectedTopic} {...props} /> : renderTeacherTopics()}</>
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
          </CardBody >
        </Card >
      </div>
    )
  };

  export {TeacherUpload, StudentSubmissionMain};