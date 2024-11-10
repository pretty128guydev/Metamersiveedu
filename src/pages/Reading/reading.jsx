import React, { useState } from "react";
import MockApi from "../../api-clients/MockApi";

const ReadingPaper = (props) => {
  const [result, setResult] = useState([]);

  const getAnswer = (event, question) => {
    if (typeof event.target[question] === 'undefined') {
      return ''
    }
    else if (event.target[question] instanceof RadioNodeList) {
      if (event.target[question][0].type === 'radio') {
        var checked = event.target.querySelector('input[name='+question+']:checked')
        return checked ? checked.id : '';
      } else if (event.target[question][0].type === 'text' | event.target[question][0].type === 'textarea') {
        const textValues = [];
        for (let i = 0; i < event.target[question].length; i++) {
          textValues.push(event.target[question][i].value);
        }
        return textValues
      }
    } 
    else if (event.target[question].type === 'text' | event.target[question].type === 'textarea') {
      return event.target[question].value;
    }
    return "unhandled";
  }

  const handleSave = async (event) => {
    event.preventDefault();

    const body = {}
    console.log('total number of questions ' + props.totalQuestions);
    for (let i = 1; i <= Number(props.totalQuestions); i++) {
      var question = 'q' + i;
      body[question] = getAnswer(event, question);
    }

    console.log('special questions ' + props.specialQuestions);
    const special_questions_array = props.specialQuestions.split(',');
    for (let i = 0; i <= special_questions_array.length; i++) {
      var question = 'q' + special_questions_array[i];
      body[question] = getAnswer(event, question);
    }

    const r = await MockApi.mark_reading_paper({ year: props.year, testtype: "reading"}, body)
    if (r.status == 200) {
      setResult(r.data);
    }
  }

  const showResult = (result) => {
    var total_student_mark = 0;
    var total_mark = 0;
    result.forEach((line) => {
      total_student_mark += Number(line.student_mark);
      total_mark += Number(line.mark);
    }) 

    return (
    <div>
      <h6>Marking</h6>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th scope="col">Question #</th>
            <th scope="col">Submission</th>
            <th scope="col">Student Mark</th>
            <th scope="col">Mark</th>
            <th scope="col">Remark</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Total</td>
            <td></td>
            <td>{total_student_mark}</td>
            <td>{total_mark}</td>
            <td></td>
          </tr>
          { result.map((line) => {
            return <tr><td>{line.question}</td><td>{line.submission}</td><td>{line.student_mark}</td><td>{line.mark}</td><td>{line.remark}</td></tr>
          })} 
        </tbody>
      </table>
    </div>
    )  
  }

  const testPaper = (paper) => { return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="row">
              <form onSubmit={handleSave}>
                {paper}
                <button
                  className="btn btn-outline-theme rounded-sm"
                  type="submit"
                > 
                  <i className="fa-md">Submit Paper</i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>)
  };

  return (
    <div>
    { (result.length == 0) ? testPaper(props.paper) : showResult(result) }
    </div>
  );
};

export {ReadingPaper};