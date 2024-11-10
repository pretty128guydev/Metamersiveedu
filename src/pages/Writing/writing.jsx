import React, { useState } from "react";
import { Card, CardBody } from "../../components/card/card";
import BarsScale from "../../components/loading/BarsScale.jsx";
import MockApi from "../../api-clients/MockApi";

const WritingPaper = (props) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);

  const getTarget = (event, target) => {
    if (typeof event.target[target] === 'undefined') {
      return document.getElementById('question').innerText
    }
    else if (event.target[target] instanceof RadioNodeList) {
      // handling the case when the student must choose one quesiton out of a radiolist
      if (event.target[target][0].type === 'radio') {
        var checked = event.target.querySelector('input[name='+target+']:checked')
        var question = target + (checked ? checked.id : '');
        return document.getElementById(question).innerText; 
      }
    }
    else if (event.target[target].type === 'text' | event.target[target].type === 'textarea') {
      return event.target[target].value;
    }
    return document.getElementById('question').innerText;
  }

  const handle_submit_PartA = async (event) => {
    await handleSave(event, "200")
  } 

  const handle_submit_PartB = async (event) => {
    await handleSave(event, "400")
  } 

  const delay = ms => new Promise(res => setTimeout(res, ms));

  const handleSave = async (event, essaywords) => {
    event.preventDefault();
    setLoading(true);
    const body = {}

    body['question'] = getTarget(event, 'question');
    body['answer'] = getTarget(event, 'answer');

    // console.log('Question: ' + body['question']);
    // console.log('Answer: ' + body['answer']);

    const r = await MockApi.mark_writing_paper({year: props.year, essaywords: essaywords}, body)

    if (r.status == 200) {
      setResult(r.data);
    }
    // await delay(5000);

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
    
    setLoading(false);
    // setResult(sample_answer);
  }

  const showRawResult = (result) => {
    return (
    <div>
      <h6>Result</h6>
      <div><pre>{JSON.stringify(result, null, 2)}</pre></div>
      {/* <p>{result['Recommendation']}</p>
      <p>{result['Language evaluation']}</p> */}
    </div>
    )  
  }

  const showResult = (result) => {
    return (
      <div className="row gx-3">
        <div className="col-xl-3 col-lg-4 col-md-6 pb-3">
          <Card
            className="pos-checkout-table card_hover"
            style={{ height: "120px" }}
          >
            <button
              className="btn pos-checkout-table-container"
              data-bs-toggle="modal"
              data-bs-target="#modalContent"
            >
              <div className="fw-bold display-2">{result['Content Score']}</div>
              <div className="text-primary text-opacity-50">Content Score</div>
            </button>
          </Card>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6 pb-3">
          <Card
            className="pos-checkout-table card_hover"
            style={{ height: "120px" }}
          >
            <button
              className="btn pos-checkout-table-container"
              data-bs-toggle="modal"
              data-bs-target="#modalOrganization"
            >
              <div className="fw-bold display-2">{result['Organization Score']}</div>
              <div className="text-primary text-opacity-50">Organization Score</div>
            </button>
          </Card>
        </div>

        <div className="col-xl-3 col-lg-4 col-md-6 pb-3">
          <Card
            className="pos-checkout-table card_hover"
            style={{ height: "120px" }}
          >
            <button
              className="btn pos-checkout-table-container"
              data-bs-toggle="modal"
              data-bs-target="#modalLanguage"
            >
              <div className="fw-bold display-2">{result['Language Score']}</div>
              <div className="text-primary text-opacity-50">Language Score</div>
            </button>
          </Card>
        </div>

        <div className="col-xl-3 col-lg-4 col-md-6 pb-3">
          <Card
            className="pos-checkout-table card_hover"
            style={{ height: "120px" }}
          >
            <button
              className="btn pos-checkout-table-container"
              data-bs-toggle="modal"
              data-bs-target="#modalFinal"
            >
              <div className="fw-bold display-2">{result['Final Total Score']}</div>
              <div className="text-primary text-opacity-50">Final Total Score</div>
            </button>
          </Card>
        </div>

      </div>
    );
  };


  const testPaper = (parta, partb) => (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="row">
              <form onSubmit={handle_submit_PartA}>
                {parta}
                { loading ?
                <button
                  className="btn btn-outline-theme active rounded-sm"
                  disabled="disabled"
                > 
                  <BarsScale/>
                </button>
                :
                <button
                  className="btn btn-outline-theme rounded-sm"
                  type="submit"
                > 
                <i className="fas fa-md"></i> Submit
                </button>
                }
              </form>
            </div>

            <div className="row">
              <form onSubmit={handle_submit_PartB}>
                {partb}
                { loading ?
                <button
                  className="btn btn-outline-theme active rounded-sm"
                  disabled="disabled"
                > 
                  <BarsScale/>
                </button>
                :
                <button
                  className="btn btn-outline-theme rounded-sm"
                  type="submit"
                > 
                <i className="fas fa-md"></i> Submit
                </button>
                }
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )

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

    { (result.length == 0) ? 
        // loading ? (
        //   <div className="h-100 share">
        //   <Card className={"pos pos-vertical"} id="pos">
        //     <CardBody className="pos-container">
        //       <div className="pos-content">
        //     <div className="pos">
        //       <div className="pos-container">
        //         <div className="pos-content h-100">
        //           <div className="d-flex align-items-center justify-content-center h-100">
        //             <BarsScale />
        //           </div>
        //           </div>
        //       </div>
        //     </div>
        //   </div>
        //       </CardBody>
        //     </Card>
        //     </div>

        // ) :
        testPaper(props.parta, props.partb) 
      : 
      showResult(result) }
    </div>
  );

};

export {WritingPaper}; 