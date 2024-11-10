import React from "react";
import { WritingPaper } from "./writing";
import { Card, CardBody } from "../../components/card/card";
import { RadioButton } from "../../components/radio/radio";
import q1 from "./assets/22-Q1.png";
import q2 from "./assets/22-Q2.png";
import q3 from "./assets/22-Q3.png";


const Writing2022 = () => {
  const parta = (
    <>
    <div className="col-xl-9">
      <ul className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="#/">WRITING</a>
        </li>
        <li className="breadcrumb-item active">2022</li>
      </ul>
      <h1 className="page-header">
        2022 Writing Mock Paper
      </h1>

      <hr className="mb-4" />

      <div id="formControls" className="mb-5">
        <h4>ENGLISH LANGUAGE PAPER 2</h4>

        <p>Do not use your real name in answering any of the questions. If names are provided in the question, you must use those names. If no name is provided and you still wish to use a name to identify yourself, then use ‘Chris Wong’. If you need to use names for other characters in the composition not specified by the question, you may use names such as Mary, Peter, Mr Smith, Ms Young, etc. You may lose marks if you do not follow these instructions.</p>
        <div className="mt-4">
          <h5>Part A</h5>
          <p>
            For question 1, write about 200 words in the space
            provided below.
          </p>
        </div>
        <div id="question" className="mt-4">
          <p>You work at the Travel Centre at Hong Kong Rail Station. Use the map and headings below to help you complete a guide for first-time visitors.</p>
        </div>
        <img src={q1} />
      <Card>
        <CardBody className="pb-2">
          <div className="mt-4">
            <p>About Hong Kong Train Station	(Write about 250 words.)</p>
              <textarea
                name="answer"
                type="text"
                rows="40"
                className="form-control my-2"
              />
            </div>

            <center>
              <h6 className="mt-4">END OF PART A</h6>
            </center>
          </CardBody>
        </Card>
        </div>
      </div>
    </>
  )

  const partb = (
    <>
      <div className="col-xl-9">
        <div id="formControls" className="mb-5">
          <div className="mt-4">
            <h5>Part B</h5>
            <p>
              For questions 2 — 8, choose ONE question and write
              about 400 words in the space provided below.  Indicate which question you are going to attempt in the response.

            </p>
          </div>
      
          <Card>
            <CardBody className="pb-2">

            <RadioButton name="question" id="2" label=">Learning English through Popular Culture"/>
                <div id="question2">
                  <p>
                  You are the host of ‘Mr Teen’, a YouTube channel that explores a wide range of topics from a teenage perspective. Write an article for Teen Magazine about why you started this channel and what you have learned in the process and your future plans.
                  </p>
                  <img src={q2} />
                </div>

                  <hr/>
                <RadioButton name="question" id="3" label="Learning English through Sports Communication"/>
                <div id="question3">              
              <p>
                You are the captain of the school's table tennis team. Your team made it to the inter-school championship final but came second.
                Write a speech to be delivered to the team at the end-of-season 	dinner celebration.
              </p>
              <img src={q3} />
              </div>

              <hr/>
              <RadioButton name="question" id="4" label="Learning English through Social Issues"/>
                <div id="question4">
              <p>
                The following comment appeared in the editorial of Hong Kong Daily:
                Young people today lack interest in traditional art forms such as lion dance, calligraphy or the art of tea drinking.
              </p>
              <p>You are the chairperson of your school's Cultural Heritage Club. Express your views by writing a letter to the editor of Hong Kong Daily.</p>
              </div>
                  <hr/>

                <RadioButton name="question" id="5" label="Learning English through Poems and Songs"/>
                  <div id="question5">
              <p>
                The musical group The Beatles has asked you to help promote them by writing a bio for their website.
                The bio should include background information about the group, style of music, how they got started and plans for the future.
              </p>
              </div>

              <hr/>
              <RadioButton name="question" id="6" label="Learning English through Drama"/>
                <div id="question6">
              <p>   
                As part of your drama class, you played the role of the romeo and the hero in different plays.
                Write an entry in your drama journal. Reflect on which role you preferred playing and why.
              </p>
              </div>
              <hr/>

            <RadioButton name="question" id="7" label="Learning English through Short Stories"/>
              <div id="question7">
              <p>
                You entered the ‘Stories of Survival’ short story competition. The theme of this year's competition is ‘Wildlife: friend or enemy?’
                Write a story about a hiker who gets caught in a forest while on an adventure in the mountains.
              </p>
              </div>

              <hr/>
              <RadioButton name="question" id="8" label="Learning English through Debating"/>
                <div id="question8">
              <p>
                The School Management is considering a five-day school week. Students would only need to attend school five days a week instead of four, but the length of each day would be increased by one hour.
                You are a member of the Parent-Teacher Association (PTA). Write a letter to the President of the PTA stating your opinion either for or against a five-day school week. Give reasons to support your view.
              </p>
              </div>
              <textarea
                  name="answer"
                  type="text"
                  rows="50"
                  className="form-control my-2"
                />

              <center className="mt-4">
                <h6>END OF PART B</h6>
              </center>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );

  return (<WritingPaper year="2022" parta={parta} partb={partb}/>) 
};

export default Writing2022;
