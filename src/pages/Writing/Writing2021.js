import React from "react";
import { Card, CardBody } from "../../components/card/card";
import { WritingPaper } from "./writing";
import { RadioButton } from "../../components/radio/radio";
import q1 from "./assets/21-Q1.png";
import q7 from "./assets/21-Q7.png";


const Writing2021 = () => {
  const parta = (
    <>
      <div className="col-xl-9">
        <ul className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#/">WRITING</a>
          </li>
          <li className="breadcrumb-item active">2021</li>
        </ul>
        <h1 className="page-header">
          2021 Writing Mock Paper
        </h1>

        <hr className="mb-4" />

        <div id="formControls" className="mb-5">
          <h4>ENGLISH LANGUAGE PAPER 2</h4>

          <p>Do not use your real name in answering any of the questions. If names are provided in the question, you must use those names. If no name is provided and you still wish to use a name to identify yourself, then use ‘Chris Wong’. If you need to use names for other characters in the composition not specified by the question, you may use names such as Mary, Peter, Mr Smith, Ms Young, etc. You may lose marks if you do not follow these instructions.</p>
          <h5>Part A</h5>
          <p>
            For question 1, write about 200 words in the space
            provided.
          </p>
          <div id="question" className="mt-4">
            <p>
              You are helping your school organise the annual school fair. You have been asked to make an announcement about the event during the morning assembly.
            </p>
            <p>
              Use the poster below to help you write your announcement. In your announcement:
            </p>
            <ul>
              <li>Introduce the event.</li>
              <li>Describe some of the activities that will take place.</li>
              <li>Let students know how they can help out.</li>
            </ul>
          </div>

          <Card>
            <CardBody className="pb-2">
            <img src={q1} />
            <div className="mt-4">
              <p>Good morning,principal, teachers and fellow students:</p>
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
              For questions 2-9, choose ONE question and write
              about 400 words in the space provided below.
            </p>
          </div>
      
          <Card>
            <CardBody className="pb-2">
              <RadioButton name="question" id="2" label="Learning English through Social Issues"/>
                <div id="question2">
                  <p>
                  Although studies show electric cars are more environmentally friendly than
                  petrol cars, less than 3% of all vehicles sold in 2020 worldwide were electric.
                  </p>
                  <p>
                      Write a letter to the editor of Hong Kong Daily.
                      <ul>
                        <li>Discuss why sales of electric vehicles are so low.</li>
                        <li>Suggest what can be done to attract more people to drive these vehicles.</li>
                        <li>Suggest why petrol cars have high demand.</li>
                      </ul>
                  </p>
                </div>

                <hr/>
              <RadioButton name="question" id="3" label="Learning English through Workplace Communication"/>
              <div id="question3">
                <p>
                You work in the sales department at Zara, an online company that sells clothes. 
                Recently, you have received a number of complaints from customers about the company's 
                no-exchange/no-refund policy.
                </p>
                <p>
                  Write an email to the human resource.  Explain why you think this policy should be changed.
                  <ul>
                    <li>Suggest what changes could be made</li>
                    <li>Discuss ways to prevent customers from taking advantage of the new policy</li>
                  </ul>
                </p>
                </div>

                <hr/>
                <RadioButton name="question" id="4" label="Learning English through Sports Communication"/>
                  <div id="question4">
                    <p>
                    You are a professional athlete looking for a career change. You have seen the job
                    vacancy shown below and would like to apply for the position of Head of Coach.
                    </p>
                    <Card>
                      <CardBody>
                        <h5>Hong Kong Football Foundation Head of coach</h5>
                        <p>Main duties:</p>
                        <ul>
                          <li>to design training programmes for elite athletes to organise international sporting competitions to identify and support local talent</li>
                          <li>to conduct trainings regularly for beginners.</li>
                        </ul>
                      </CardBody>
                    </Card>
                    <p>Write a job application letter to the Human Resource Manager</p>
                    <ol>
                      <li>Introduce yourself and your athletic history.</li>
                      <li>Explain your interest and suitability for the job.</li>
                      <li>Your salary expectation</li>
                    </ol>
                  </div>
                  <hr/>

                <RadioButton name="question" id="5" label="Learning English through Debating"/>
                  <div id="question5">
                    <p>A social media influencer is a person who is paid by a company to promote goods and services through their social media networks.</p>
                    <p>Surveys show that a majority of millennials trust the products which are used by the  social media influencers over traditional media advertisements.</p>
                    <p>Write an argumentative essay.</p>
                    <ul>
                      <li>Discuss whether social media influencers are more trustworthy than traditional media advertisements.</li>
                      <li>Give reasons to support your point of view.</li>
                    </ul>
                  </div>

                  <hr/>
                  <RadioButton name="question" id="6" label="Learning English through Popular Culture"/>
                    <div id="question6">
                      <p>You took part in a social media challenge called ‘The 21-day Gratitude Challenge’. For three weeks, you jogged every morning for on a daily basis.</p>
                      <p>After completing the challenge, participants are invited to share their experience on the 21-day Gratitude Challenge website.</p>
                      <p>Write a blog post.</p>
                      <ul>
                        <li>Explain why you accepted this challenge and what you hoped to achieve.</li>
                        <li>Reflect on the 2 I days and whether taking on this challenge has changed you in any way.</li>
                      </ul>
                    </div>
                    <hr/>

                  <RadioButton name="question" id="7" label="Learning English through Short Stories"/>
                    <div id="question7">
                      <p>You are joining a short story contest organised by a book shop.</p>
                      <p>Write a funny story about a security guard on duty one night,</p>
                      <p>Use the pictures to help you write your story. You can use the pictures in any order</p>
                      <img src={q7} />
                      <p></p>;
                    </div>

                  <hr/>
                  <RadioButton name="question" id="8" label="Learning English through Poems and Songs"/>
                    <div id="question8">
                      <p>You read this poem in class and your teacher has asked you to write an essay on the theme of friendship.</p>
                      <p>
                        In life's tapestry, new threads unfold,<br/>
                        Silver friendships, gleaming and bold.<br/>
                        Yet hold the old, like stories untold,<br/>
                        <strong>Weathered through time, their worth pure gold. </strong><br/>
                        Cherish the moments, both new and old,<br/>
                        A dance of tales, a treasure to hold.<br/>
                        One is silver, the other is gold,<br/>
                        <b>In friendships, a timeless stories are told. </b><br/>
                      </p>
                      <p>Use these questions to help you write your essay:</p>
                      <ul>
                        <li>What is the difference between old and new friendships?</li>
                        <li>Do you agree that older friendships are better than new ones?</li>
                        <li>Are older friendships more worth it?</li>
                      </ul>
                    </div>

                    <hr/>
                  <RadioButton name="question" id="9" label="Learning English through Drama"/>
                    <div id="question9">
                      <p>You want to be a screenwriter and have an idea for a TV drama series about three generations of a family.</p>
                      <p>Write a letter to the production manager at TV-Space X.</p>
                      <ul>
                        <li>Introduce the characters, plot and setting of your TV drama.</li>
                        <li>Explain why you think this idea would be popular with viewers.</li>
                        <li>What plot twist would you keep?</li>
                      </ul>
                    </div>

              <textarea
                  name="answer"
                  type="text"
                  rows="0"
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

  return (<WritingPaper year="2021" parta={parta} partb={partb}/>) 
};

export default Writing2021;
