import React from "react";
import { Card, CardBody } from "../../components/card/card";
import { WritingPaper } from "./writing";
import { RadioButton } from "../../components/radio/radio";


const Writing01 = () => {
  const parta = (
    <>
      <div className="col-xl-9">
        <ul className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#/">WRITING</a>
          </li>
          <li className="breadcrumb-item active">2015</li>
        </ul>
        <h1 className="page-header">
          2015 Writing Mock Paper
        </h1>

        <hr className="mb-4" />

        <div id="formControls" className="mb-5">
          <h4>ENGLISH LANGUAGE PAPER 2</h4>

          <div className="mt-4">
            <h5>Part A</h5>
            <p>
              For question 1, write about 200 words in the space
              provided below.
            </p>
          </div>

          <div id="question" className="mt-4">
            A recent article in the Pop Culture Journal suggested
            that many pop culture trends are affecting young
            people badly. Write to the editor expressing your
            views on the following
            <ul>
              <li>What kind of trends are affecting the youth</li>
              <li>What kind of trends are affecting the youth</li>
            </ul>
          </div>
            <Card>
              <CardBody className="pb-2">

                  <div className="mt-4">
                    <span style={{ fontWeight: "bold" }}>
                      Dear Editor,
                    </span>
                    <textarea
                      name="answer"
                      type="text"
                      rows="20"
                      className="form-control my-2"
                    />
                    <span style={{ fontWeight: "bold" }}>
                      Yours Faithfully
                      <br /> Robert Carlos
                    </span>
                  </div>

              <center>
                <h6 className="mt-4">END OF PART A</h6>
              </center>
              </CardBody>
          </Card>
        </div>
      </div>
    </>
  );

  const partb = (
    <>
      <div className="col-xl-9">
        <div id="formControls" className="mb-5">
            <div className="mt-4">
              <h5>Part B</h5>
              <p>
                For questions 2-9, choose ONE question and write
                about 400 words in the space provided below.
              </p>
            </div>

            <Card>
              <CardBody className="pb-2">
              <RadioButton name="question" id="2" label="Learning English through Sports Communication"/>
                <div id="question2">
                    <p>
                      Due to the soaring costs of academic resources,
                      numerous parents hesitate to invest in them for
                      their children. Draft a letter to the Editor of
                      The Daily Beacon newspaper, outlining your
                      viewpoint and substantiating it with three
                      reasons.
                    </p>
                </div>
                <hr/>

                <RadioButton name="question" id="3" label="Learning English through Workplace Communication"/>
                <div id="question3">
                  <p>
                    Your boss has offered you to work extra shifts to
                    get paid overtime. Write an email to your boss
                    expressing your views and decisions.
                  </p>
                </div>
                <hr/>

                <RadioButton name="question" id="4" label="Learning English through Debating"/>
                <div id="question4">
                  <p>
                    It has been proven that nicotine used in
                    cigarettes is very addictive so young smokers are
                    switching to e-cigarettes which are claimed to be
                    equally harmful. Write a letter to the Health
                    Ministry stating whether you agree with these
                    actions or not. Justify your position with three
                    reasons.
                  </p>
                </div>
                <hr/>

                <RadioButton name="question" id="5" label="Learning English through Social Issues"/>
                <div id="question5">
                  <p>
                    Your classmates have decided to write an essay for
                    the Queens Commonwealth essay competition on the
                    topic “An incident that changed your life”. Write
                    your essay.
                  </p>
                </div>
                <hr/>

                <RadioButton name="question" id="6" label="Learning English through Short Stories"/>
                <div id="question6">
                  <p>
                    One of the activities of your writing class is
                    writing a short story on the theme “Mountains or
                    Beaches”. Write your story.
                  </p>
                </div>
                <hr/>

                <RadioButton name="question" id="7" label="Learning English through Poems and Songs"/>
                <div id="question7">
                  <p>
                    A famous lyricist once wrote “I’ve tried so hard
                    and come so far. But in the end it doesn’t even
                    matter”. Do you agree with this lyric? Write an
                    essay explaining your opinion.
                  </p>
                </div>
                <hr/>

                <RadioButton name="question" id="8" label="Learning English through Popular Culture"/>
                <div id="question8">
                  <p>
                    A famous art and culture magazine is organising an
                    art fest. Write a proposal for the festival
                    suggesting some popular trends in youth. Explain
                    how you can execute these trends.
                  </p>
                </div>
                <hr/>

                <RadioButton name="question" id="9" label="Learning English through Drama"/>
                <div id="question9">
                  <p>
                    Write an essay about the importance of Broadway
                    musical in recent years.
                  </p>
                </div>
                <hr/>

                <textarea
                  name="answer"
                  type="text"
                  rows="40"
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

  return (<WritingPaper year="2015" parta={parta} partb={partb}/>) 
};

export default Writing01;
