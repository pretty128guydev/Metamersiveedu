import React from "react";
import { Card, CardBody } from "../../components/card/card";
import { WritingPaper } from "./writing";
import { RadioButton } from "../../components/radio/radio";
import q3 from "./assets/17-Q3.png";
import q5 from "./assets/17-Q5.png";

const Writing2017 = () => {
    const parta = (
      <>
      <div className="col-xl-9">
        <ul className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#/">WRITING</a>
          </li>
          <li className="breadcrumb-item active">2017</li>
        </ul>
        <h1 className="page-header">
          2017 Writing Mock Paper
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
            You are the director of the Social Service Club in
            your society. The school would like to develop closer
            links with the community. Write a letter to your
            co-ordinator, Ms Naza, proposing a new community
            project that the school can carry out with a home for
            the disabled in your district. In your letter persuade
            your co-ordinator to accept your project by
            <ol className="my-2">
              <li>describing one activity that could be carried out, and</li>
              <li>identifying the benefits for the elderly home.</li>
            </ol>
            <p> Sign your letter Mr. Jack Ma.</p>
          </div>

          <Card>
            <CardBody className="pb-2">
              <div className="mt-4">
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
    );

    const partb = (
      <>
      <div className="col-xl-9">
        <div id="formControls" className="mb-5">
          <div className="mt-4">
            <h5>Part B</h5>
            <p>
              For questions 2 — 9, choose ONE question and write
              about 400 words in the space provided below
            </p>
          </div>

          <Card>
            <CardBody className="pb-2">
              <RadioButton name="question" id="2" label="Learning English through Poems and Songs"/>
                <div id="question2">
                    Palms sweaty, knees weak, arms heavy, One shot, one
                    opportunity, are you ready? Seize everything you ever
                    wanted, don't let it slip, In this moment, destiny's
                    at your fingertips. Life's a stage, and the
                    spotlight's bright, This chance won't wait, take
                    flight.
                    <br />
                    Capture your dreams, in the blink of an eye,
                    <br />
                    (Chorus)
                    <br />
                    One shot, one opportunity, Grasp the chance, create
                    your symphony.
                    <br />
                    No regrets, no looking back
                    <br />
                    <br />
                    You have been inspired to share your feelings about
                    opportunities on your online story. In your story
                    write about one opportunity that you missed and one
                    opportunity that you took.
                </div>
                <hr/>

                <RadioButton name="question" id="3" label="Learning English through Short Stories"/>
                <div id="question2">
                    <p>
                      You are entering a short story competition on the
                      topic of ‘Skylife’. Your story should describe the
                      events leading up to the image below.
                    </p>
                    <img src={q3} />
                    <p>Write Your Story</p>
                </div>
                <hr/>

                <RadioButton name="question" id="4" label="Learning English through Drama"/>
                <div id="question4">
                  <p>
                    But, soft! What light through yonder window breaks?
                    It is the east, and Juliet is the sun. <br />
                    Romeo and Juliet - Shakespeare
                    <br />
                    <br />
                    In your drama lessons you have been looking at plays
                    about romantic love. Your essay assignment from your
                    drama teacher is to answer the question: Is Romantic
                    Love Necessary for a Happy Marriage?
                    <br />
                    <br />
                    Write your essay.
                  </p>
                </div>
                <hr/>

                <RadioButton name="question" id="5" label="Learning English through Popular Culture"/>
                <div id="question5">
                  <p>
                    Recently the Hong Kong Government published a list
                    of intangible cultural heritage items that the city
                    should protect. The following were on the list:
                  </p>
                  <img src={q5} style={{ maxWidth: "100%" }} />
                  <p>
                    Traditional Egg Tarts <br />
                    <br /> Mahjong Write a letter to the editor of the
                    Hong Kong Living Style Magazine supporting the
                    Government's choice of these two features of Hong
                    Kong culture, suggesting why they are worth
                    protecting and how they can be protected.
                  </p>
                </div>
                <hr/>

                <RadioButton name="question" id="6" label="Learning English through Debating"/>
                <div id="question6">
                    <p>
                      As captain of the football team you have been asked
                      to write a football speech. The task is to argue
                      that ‘Watching tutorials makes Us Smarter’.
                      <br />
                      <br />
                      In your speech you should include :<br />
                      1. Three reasons to support the statement.
                      <br />
                      <br />
                      Write your speech.
                    </p>
                </div>
                <hr/>

                <RadioButton name="question" id="7" label="Learning English through Social Issues"/>
                <div id="question7">
                    <p>
                      You are working on a project entitled ‘Hong Kong's
                      NEETs’. NEETs are young people who are not in
                      education, employment or training. Many of these
                      young people spend their time at home playing video
                      games or surfing the Internet.
                      <br />
                      <br />
                      Write a report to explain why the number of NEETs in
                      Hong Kong is rising and suggest what can be done to
                      help these youths. Give reasons to support your
                      suggestions.
                    </p>
                </div>
                <hr/>

                <RadioButton name="question" id="8" label="Learning English through Sports Communication"/>
                <div id="question8">
                    <p>
                      Unlike footballers or basketball players, swimmers
                      are not traditionally thought of as athletes. As a
                      member of your school's swimming team you have been
                      asked to write an article for your school magazine.
                      Use the title and headings below to support the idea
                      of swimmers as athletes.
                    </p>
                    <p>Swimmers are athletes</p>
                    <span>
                      1. Physical strength & skills
                      <br /> 2. Self discipline & training
                    </span>
                </div>
                <hr/>

                <RadioButton name="question" id="9" label="Learning English through Workplace Communication"/>
                <div id="question9">
                    <p>
                      It has recently been claimed that in the workplace
                      many Hong Kong fresh university graduates are less
                      keen to work hard and less willing to face
                      challenges and competitions compared to those in the
                      past.
                      <br />
                      <br />
                      You strongly disagree with this opinion. Write a
                      letter to the editor of the Hong Kong Today
                      disagreeing with this opinion. Support your view
                      with three reasons and/or examples.
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

  return (<WritingPaper year="2017" parta={parta} partb={partb}/>) 

};

export default Writing2017;
