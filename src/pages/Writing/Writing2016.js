import React from "react";
import { Card, CardBody } from "../../components/card/card";
import { WritingPaper } from "./writing";
import { RadioButton } from "../../components/radio/radio";

const Writing2016 = () => {
  const parta = (
    <>
    <div className="col-xl-9">
      <ul className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="#/">WRITING</a>
        </li>
        <li className="breadcrumb-item active">2016</li>
      </ul>
      <h1 className="page-header">
        2016 Writing Mock Paper
      </h1>

      <hr className="mb-4" />

      <div id="formControls" className="mb-5">
        <h4>ENGLISH LANGUAGE PAPER 2</h4>

        <h5>Part A</h5>
        <p>
          For question 1, write about 200 words in the space
          provided below.
        </p>

        <div id="question" className="mt-4">
          You are the Joint-Secretary of the Extracurricular Activities Club of your school. You are preparing a speech to welcome new members to your club at the beginning of the new school year. In order to help them settle in and get along with the fellow members, you want to talk about the following in your speech:
          <ul>
            <li>Importance of Extracurricular Activities </li>
            <li>Importance of getting along with fellow members </li>
          </ul>
        </div>

        <Card>
          <CardBody className="pb-2">
            <div className="mt-4">
              <p>
              Good morning Principal, teachers and fellow students,<br/>
On behalf of the  Extracurricular Activities Club, I'd like to welcome all of you all. I’m sure you all have various interests in extracurricular activities. If so, then you are at the right place.
              </p>
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
            For questions 2 — 9, choose ONE question and write about 400 words in 
            the space provided below.
            </p>
          </div>

          <Card>
            <CardBody className="pb-2">
            <RadioButton name="question" id="2" label="Learning English through Sports Communication"/>
                <div id="question2">
                  <p>
                    Because of the high rising prices of sports accessories, many parents are reluctant about buying their kids those. Write a letter to the Editor of The Daily Bugle newspaper stating your opinion. Support your opinion with three reasons.
                  </p>
                </div>
                <hr/>

                <RadioButton name="question" id="3" label="Learning English through Workplace Communication"/>
                <div id="question3">
                  <p>
                  Many workplace activists complain about the lack of interest of the youth in corporate world. In their opinion, the youth (ages ranging from 12-20) should be keenly aware of the political situations in the world. Do you support this suggestion? Write an article for your school magazine expressing your views. Give three reasons to support your views. Provide an appropriate title for your article.
                  </p>
                </div>
                <hr/>

                <RadioButton name="question" id="4" label="Learning English through Debating"/>
                <div id="question4">
                  <p>
                    It has been recently published that 80% of the people diagnosed with ADHD are children over the age of 12. Many parents blame their usage of social media for this. Write a letter to the Youth Health Ministry stating whether you agree with these actions or not. Justify your position with three reasons.
                  </p>
                </div>
                <hr/>

                <RadioButton name="question" id="5" label="Learning English through Social Issues"/>
                <div id="question5">
                  <p>
                    Your school is holding an essay competition about “Disappearing wildlife”. This aims to provide awareness and insight about wildlife conservation in young people. Entries must focus on one aspect of wildlife conservation and things harmful to wildlife. Write your essay.
                  </p>
                </div>
                <hr/>

                <RadioButton name="question" id="6" label="Learning English through Short Stories"/>
                <div id="question6">
                  Learning English through Short Stories
                  <p>
                    One of the activities of your writing class is writing a short story on the theme “Blooming Childhood”. Write your story.
                  </p>
                </div>
                <hr/>

                <RadioButton name="question" id="7" label="Learning English through Poems and Songs"/>
                <div id="question7">
                  <p>A famous singer once said “In the end, it’s just me and me who I got”. How important is this lyric for our lives? Write an essay explaining your opinion.</p>
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
                    <p>Your siblings have introduced you to drama art form and that seemed to intrigue your interests. You want to pursue Drama Theatre as your career. Write an email to your parents trying to convince them.</p>
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
  return (<WritingPaper year="2016" parta={parta} partb={partb}/>) 
};

export default Writing2016;
