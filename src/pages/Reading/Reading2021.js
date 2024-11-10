import React from "react";
import { Card, CardBody } from "../../components/card/card";
import { RadioButton } from "../../components/radio/radio";
import { InlineTextInput, InlineShortTextInput } from "../../components/inlinetextinput/inlinetextinput";
import { ReadingPaper } from "./reading";

const Reading2021 = () => {
  const paper = (
    <>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="#/">READING</a>
                </li>
                <li className="breadcrumb-item active">2021</li>
              </ul>
              <h1 className="page-header">
                2021 Reading Mock Paper
              </h1>

              <center className="mt-4">
                <h4>ENGLISH LANGUAGE PAPER 1</h4>
                <h6> PART A</h6>
                <h6>Reading Passages</h6>
              </center>

              <hr className="mb-4" />

              <div id="formControls" className="mb-5">
                <h6>GENERAL INSTRUCTIONS</h6>

                <ol>
                  <li>
                  There are two parts (A and B) in this paper. All candidates should 
                  attempt Part A. In Part B, you should attempt either Part B1 (easier section) 
                  OR Part B2 (more difficult section). Candidates attempting Parts A and B2 
                  will be able to attain the full range of levels, while Level 4 will be 
                  the highest level attainable for candidates attempting Parts A and B1.
                  </li>
                </ol>

                <h6>INSTRUCTIONS FOR PART A</h6>

                <ol>
                  <li>
                    Attempt ALL questions in Part A. Each question carries ONE
                    mark unless otherwise stated.
                  </li>
                </ol>

                <h6>PART A</h6>
                <p>
                  Read text 1-3 and answer the questions in the Question Answer
                  Book for Part-A
                </p>
              </div>
              <Card>
                <CardBody className="pb-2">
                  <h3>Text 1</h3>
                  <center>
                  <h6>Be One With Your Buddies With Board Games and Beverages</h6>
                  </center>

                  <ol>
                    <li>
                    Ever notice young people whenever they're out and about? They're constantly on their phones and hardly pay attention to what's right in front of their noses. Really, there could be a fire going on, and they'd still have no idea. It's equal parts baffling (莫名其妙) and awe-inspiring (令人敬畏). You'd think that taking them anywhere would be a waste of time and energy, but really? You just need to know how to engage them.                        
                    </li>
                    <li>Case in point, I brought some friends and their teenage children, who had been studying abroad (國外) for the past year, to ABC Cafe. I let them order fancy teas and milkshakes, and engaged them with games like Monopoly, Pictionary, and Scrabble. My intention was to get them off their phones for a while and give us the opportunity to truly interact with each other while we had the chance. It kept them busy for 4 hours.</li>
                    <li>Funnily enough, stumbling upon the ABC Cafe was almost accidental. I was struggling to think of a place to take them, and the cafe happened to be the first result that popped up when I searched for entertainment (娛樂). I came across the concept of board game cafes in a magazine during my school days, and it sparked my interest. I remember reading an article about them, which led me to consider it as an option for our outing.</li>
                    <li>The beverages offered at the cafe were your typical cafe drinks: milkshakes, coffees, and teas. They were familiar choices that never disappoint. However, it was the games that truly stood out as genuine (真的) classics (經典). In addition to the aforementioned (前述) games, there were unique (獨特的) variations of games like Jenga that incorporated elements from Truth or Dare. These twists brought great amusement to my friends, as they included fun and unexpected dares like "Make a funny face" and "Draw on someone's face."</li>
                    <li>The ABC Cafe embraces the concept of traditional entertainment, which we unanimously (一致地) agreed made for a truly memorable afternoon. If you're seeking classic, nostalgic fun, then board game cafes are definitely a great choice.</li>
                  </ol>
                  
                  <h3>Text 2</h3>
                  <center>
                  <h6>The Return Of Board Games</h6>
                  </center>
                  <ol>
                    <li>Board games have made a big comeback in recent years. Companies from different countries have seen a rise in their market shares as pandemic restrictions eased. This comeback happened because people have strong feelings of happiness and memories when they think about board games. They bring back good times and make people want to play together again.</li>
                    <li>One interesting thing about board games is that they bring people together. Unlike video games, where you play alone, board games encourage people to talk, laugh, and compete in a friendly way. Playing board games means spending quality time face-to-face with others, which is important in a world where personal connections can be hard to find.</li>
                    <li>The market for board games is getting bigger too. Experts say that the market will grow by about 10% from 2022 to 2027, and it will be worth around US$4.84 billion. This means more and more people are interested in board games and think they are a good investment. Board games are becoming really popular.</li>
                    <li>Some people might think this is an exaggeration, but it's not. Board games are not going away anytime soon. They offer something special, like happy memories, time with friends and family, and a break from technology. They are not going out of style like some people thought they would.</li>
                    <li>In conclusion, board games are making a big comeback because they bring back happy memories, they are enjoyed by people all over the world, and the market for them is growing. Board games are not just a passing trend; they are here to stay. They give us a chance to have fun and connect with others, and they are not becoming old-fashioned like some people believed.</li>
                  </ol>

                  <h3>Text 3</h3>
                  <center>
                  <h6>Newsletter - The Sustainability (可持續性) Plan of the Royal Fern Hotel</h6>
                  </center>
                  <ol>
                    <li>We are excited to announce our latest sustainability initiatives at the Royal Fern Hotel. Our pledge is to combat plastic pollution and make our hotel more environmentally friendly by 2030. To achieve this, we have developed a three-step plan.</li>
                    <li>In the first step, we will implement effective strategies aimed at reducing our use of plastic. This involves identifying and replacing single-use plastic items such as straws, cutlery, and toiletry amenities with sustainable alternatives. By minimizing our reliance on plastic packaging, we aim to significantly decrease our contribution to the global plastic waste problem.</li>
                    <li>The second step of our plan focuses on engaging both our valued guests and dedicated staff members in our sustainability efforts. We believe that collective action is crucial for long-lasting change. To raise awareness about the detrimental impact of plastic pollution, we will launch educational campaigns that inform and inspire responsible environmental practices. Encouraging guests to participate in initiatives like towel and bottle reuse, and providing eco-friendly alternatives within our premises, will further promote environmental consciousness.</li>
                    <li>Lastly, we will focus on collaboration and innovation. By partnering with suppliers and industry leaders like known brands, we will explore innovative solutions for plastic-free alternatives. Through these collaborations, we strive to find better and more sustainable choices that align with our commitment to the environment. We also want to shine a light on brands that our customers can buy and use if they want to make their personal life more sustainable.</li>
                    <li>Together, we can make a significant impact in preserving our planet for future generations. Every small change matters, and we invite you to join us on this exciting sustainability journey. Stay tuned for updates as we work towards creating a greener and more sustainable world. Thank you for your continued support and trust in our efforts.</li>
                  </ol>

                  <center>
                    <h5>END OF READING PASSAGES</h5>
                  </center>
                </CardBody>
              </Card>

              &nbsp;
              
              <center>
                <h6>
                  2022 MOCK
                  <br />
                  ENGLISH LANGUAGE
                  <br />
                  PAPER 1 PART A
                </h6>
              </center>
              &nbsp;

              <Card>
                <CardBody className="pb-2">

                  <p>Read Text 1-3 and answer questions 1-25. (42 marks)</p>

                  <ol>
                    {/* question */}
                    <li className="mt-4">
                    What does the phrase “what’s right in front of their noses” (line 2) refer to?
                      <div className="mt-2">
                        <RadioButton name="q1" id="A" label="Their food "></RadioButton>
                        <RadioButton name="q1" id="B" label="Their environment "></RadioButton>
                        <RadioButton name="q1" id="C" label="Their phones"></RadioButton>
                        <RadioButton name="q1" id="D" label="Their parents "></RadioButton>
                      </div>
                    </li>

                    {/* question 2*/}
                    <li className="mt-4">
                    In paragraph 1, what does the writer suggest about taking teenagers anywhere? 
                      <div className="mt-2">
                      <RadioButton name="q2" id="A" label="They are ignorant (愚昧) of their surrounding "></RadioButton>
                      <RadioButton name="q2" id="B" label="It is a waste of time and energy "></RadioButton>
                      <RadioButton name="q2" id="C" label="It leads to things being set on fire "></RadioButton>
                      <RadioButton name="q2" id="D" label="It is important to keep them engaged . "></RadioButton>
                      </div>
                    </li>

                    {/* question 3*/}
                    <li className="mt-4">
                    The writer takes the teens to ABC Cafe because she thinks that… 
                      <div className="mt-2">
                        <RadioButton name="q3" id="A" label="They would enjoy the drinks available at the cafe ."></RadioButton>
                        <RadioButton name="q3" id="B" label="They would enjoy the local food ."></RadioButton>
                        <RadioButton name="q3" id="C" label="They’d miss being abroad. "></RadioButton>
                        <RadioButton name="q3" id="D" label="It would give them the chance to interact ."></RadioButton>
                      </div>
                    </li>

                    {/* question 4*/}
                    <li className="mt-4">
                      <p>Decide whether the following states are True (T), False (F) or Not Given (NG) in paragraph 3. (3 marks) </p>
                      <p>(i) The writer went to ABC Cafe many times before she brought the teens there. <InlineShortTextInput name="q4"/></p>
                      <p>(ii ) The author knew about board game cafes from her time in school . <InlineShortTextInput name="q4"/></p>
                      <p>(iii) The ABC Cafe serves snacks as well as drinks. <InlineShortTextInput name="q4"/></p>
                    </li>

                    {/* question 5*/}
                    <li className="mt-4">
                    According to the writer, “familiar choices” (line 16) refers to ……
                      <div className="mt-2">
                        <RadioButton name="q5" id="A" label="The cafe."></RadioButton>
                        <RadioButton name="q5" id="B" label="The beverages."></RadioButton>
                        <RadioButton name="q5" id="C" label="The board games."></RadioButton>
                        <RadioButton name="q5" id="D" label="The unique twists."></RadioButton>
                      </div>
                    </li>

                    {/* question 6*/}
                    <li className="mt-4">
                    According to paragraph 4 , what were the “unique variations” in the Jenga game? 
                    <textarea type="text" name="q6" className="form-control mt-2" />
                    </li>

                    {/* question 7*/}
                    <li className="mt-4">
                    Find 2 words that have a similar meaning to the word “strange”. (2 marks) 
                      <textarea type="text" name="q7" className="form-control mt-2" />
                      <textarea type="text" name="q7" className="form-control mt-2" />

                    </li>

                    {/* question 8*/}
                    <li className="mt-4">
                    What does the phrase “traditional entertainment” mean ? 

                      <textarea type="text" name="q8" className="form-control mt-2" />

                    </li>

                    {/* question 9*/}
                    <li className="mt-4">
                    List 3 of the “aforementioned(前述) games'' (line 16) . (3 marks)

                      <textarea type="text" name="q9" className="form-control mt-2" />
                      <textarea type="text" name="q9" className="form-control mt-2" />
                      <textarea type="text" name="q9" className="form-control mt-2" />
                    </li>

                    {/* question 10*/}
                    <li className="mt-4">
                      What does “Be One With Your Buddies” in the title mean? 
                      <textarea type="text" name="q10" className="form-control mt-2" />
                    </li>

                    {/* question 11*/}
                    <li className="mt-4">
                    <p>Based on the information from the text , write a word or phrase to fill in each blank to complete the summary .  Please note that the words should be grammatically correct . (5 marks) </p>
                    <p>In search of a way to entertain my friends and their teenage kids , I had (i) <InlineTextInput name="q11"/> stumbled across the ABC Cafe. 
                    The cafe itself sold the (ii) <InlineTextInput name="q11"/> drinks that one would hope to mind in a cafe, 
                    but what made the experience (iii) <InlineTextInput name="q11"/> was the selection of games that were (iv) <InlineTextInput name="q11"/> enough to get us off our phones and (v) <InlineTextInput name="q11"/> with each other.
                    </p>
                    </li>

                    <h6>Text 2</h6>
                    {/* question 12*/}
                    <li className="mt-4">
                    How have people used board games after the pandemic?
                    <textarea type="text" name="q12" className="form-control mt-2" />
                    </li>

                    {/* question 13*/}
                    <li className="mt-4">
                    What does “saying the following out loud” reveal(揭示) ? 
                    <textarea type="text" name="q13" className="form-control mt-2" />
                    </li>


                    {/* question 14*/}
                    <li className="mt-4">
                    What are the “following” (paragraph 3)  examples of ?
                    <textarea type="text" name="q14" className="form-control mt-2" />
                    </li>


                    {/* question 15 */}
                    <li className="mt-4">
                    Find a word in paragraph 3 that has a similar meaning to “famous”.
                    <textarea type="text" name="q15" className="form-control mt-2" />
                    </li>

                    {/* question 16*/}
                    <li className="mt-4">
                    The writer uses the phrase “ Some people might think this is an exaggeration” (paragraph 4) to ……
                      <div className="mt-2">
                        <RadioButton name="q16" id="A" label="To show that she doesn’t agree with the previous statement."></RadioButton>
                        <RadioButton name="q16" id="B" label="To show that she is not making an exaggeration ."></RadioButton>
                        <RadioButton name="q16" id="C" label="Because she thinks that board games would not be popular anymore . "></RadioButton>
                        <RadioButton name="q16" id="D" label="To emphasize(強調) her support of board game companies. "></RadioButton>
                      </div>
                    </li>


                    {/* question 17*/}
                    <li className="mt-4">
                      What does the “Board games are not just a passing trend; they are here to stay” mean? (paragraph 5)
                      <textarea type="text" name="q17" className="form-control mt-2" />
                    </li>

                    {/* question 18*/}
                    <li className="mt-4">
                      Why does the writer suggest that the board games are “making a big comeback”?
                      <textarea type="text" name="q18" className="form-control mt-2" />
                    </li>

                    {/* question 19*/}
                    <li className="mt-4">
                      Referring to the passage, which parties are helping with the return of board games ?
                      <textarea type="text" name="q19" className="form-control mt-2" />
                      <textarea type="text" name="q19" className="form-control mt-2" />
                      <textarea type="text" name="q19" className="form-control mt-2" />
                    </li>

                    {/* question 20*/}
                    <li className="mt-4">
                      Which word has the same meaning as “to sum up”?
                      <textarea type="text" name="q20" className="form-control mt-2" />
                    </li>

                    {/* question 21*/}
                    <li className="mt-4">
                    Below is a summary of the passage .  However , there is one mistake on 3 of the lines , which has already been underlined for you . Replace the underlined words with <i>one</i> that expresses the correct idea . Write the word in the space on the right . One has been done for you . (3 marks) 
                    <table className="table table-bordered mt-3">
                        <thead>
                          <tr>
                            <th scope="col"></th>
                            <th scope="col">Paragraph</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              e.g. <u>Local</u> board game companies have gained 4 billion in
                            </td>
                            <td>
                              Multinational
                            </td>
                          </tr>

                          <tr>
                            <td>1. Some people might think this is an <u>understatement</u></td>
                            <td>
                              <input
                                type="text"
                                name="q21"
                                className="form-control mt-2 border-0"
                              />
                            </td>
                          </tr>

                          <tr>
                            <td>2. In conclusion, board games are making a big comeback  because they bring back <u>sad memories</u> </td>
                            <td>
                              <input
                                type="text"
                                name="q21"
                                className="form-control mt-2 border-0"
                              />
                            </td>
                          </tr>

                          <tr>
                            <td>3. Board games are not just a passing trend; they are here to <u>leave</u>  </td>
                            <td>
                              <input
                                type="text"
                                name="q21"
                                className="form-control mt-2 border-0"
                              />
                            </td>
                          </tr>

                        </tbody>
                      </table>
                    </li>

                    <h6>Text 3</h6>

                    {/* question 22*/}
                    <li className="mt-4">
                      Find a word in paragraph 1 that is similar to “improved”.
                      <textarea type="text" name="q22" className="form-control mt-2" />
                    </li>

                    {/* question 23*/}
                    <li className="mt-4">
                    <p>Are the following statements True (T) , False (F) or Not Given (NG). (3 marks)</p>
                      <p>i) The hotel will ban single use plastics altogether.<InlineShortTextInput name="q23"/></p>
                      <p>ii) The hotel plans to increase engagement in environmental protection. <InlineShortTextInput name="q23"/></p>
                      <p>iii) The hotel will use enzymes(酶) to break down plastic waste. <InlineShortTextInput name="q23"/></p>
                    </li>

                    {/* question 24*/}
                    <li className="mt-4">
                    What is the use of the buyer’s consortium(財團)? (2 marks) 
                    <textarea type="text" name="q24" className="form-control mt-2" />
                    </li>

                    {/* question 25*/}
                    <li className="mt-4">
                    <p>Complete the summary using a word in each blank . (4 marks )</p>
                    <p>The (i)<InlineTextInput name="q25"/> of staff members and guests is one of the many steps to success in 
                    our goals . Hence , (ii)<InlineTextInput name="q25"/> will be (iii)<InlineTextInput name="q25"/>  for all new members 
                    of staff, and guests will be informed of these new measures with booklets in their rooms. (iv)<InlineTextInput name="q25"/> 
                    for both staff and guests will be available upon accomplishment of goals listed in the booklets and during training. </p>
                    </li>

                  </ol>
                  <center>
                    <h6>END OF PART A</h6>
                  </center>
                </CardBody>
              </Card>


                  <center className="mt-4">
                    <h4>ENGLISH LANGUAGE PAPER 1 </h4>
                    <h6>PART B1 </h6>
                    <h6>Reading Passages</h6>
                  </center>

                  <div id="formControls" className="my-5">
                    <h6>INSTRUCTIONS FOR PART B1</h6>

                    <ol>
                      <li>
                        Candidates who choose Part B1 should attempt all
                        questions in this part. Each question carries ONE mark
                        unless otherwise stated.
                      </li>
                    </ol>

                    <h6>PART B1</h6>
                    <p>
                      Read texts 4-5 and answer the questions in the Question
                      Answer Book for Part B1
                    </p>

                  </div>

                <Card>
                  <CardBody className="pb-2">
                    <h3>Text 4</h3>

                    <p>Below is an extract from an online forum where members of the student association are discussing the possibility of adopting school pets. </p>
                    <h6>SUBJECT : Adopting school pets</h6>
                    <table className="table table-bordered mt-3">
                      <tbody>
                        <tr>
                          <td>
                            <p>CrepesTeaAndSunset</p>
                            <p>October 16, 2022</p>
                            <p>06:36 PM  :</p>
                          </td>
                          <td>
                            <p>I saw an article about this a while back, but how about we introduce the idea of having a school pet? Schools can have the tendency(趨勢) to get more than a little tedious (乏味) at times, and school pets could be kept as therapy animals to help students reduce stress. We could have animals such as hamsters. I mean, cuddling with a cute animal is bound to brighten anyone's day and make them feel refreshed after a long day of studying. Hence, It could also vastly boost morale(士氣).</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>GinaIsADoof</p>
                            <p>October 16, 2022</p>
                            <p>08:22 PM :</p>
                          </td>
                          <td>
                            <p>I think that's a great idea! I also believe that school pets could serve as valuable learning opportunities. Students wouldn't just learn about compassion (同情) and responsibility, but they could also observe the animals to gain knowledge in biology. Axolotls (蠑螈), for example, would be particularly interesting because they have the ability to regenerate (再生) lost limbs. How fascinating would that be?</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>RenyaWells</p>
                            <p>October 16, 2022</p>
                            <p>11:03PM :</p>
                          </td>
                          <td>
                            <p>How about we keep a variety of animals? Axolotls and hamsters are vastly different, but each has its own benefits. I believe people would appreciate having a diverse selection of school pets.</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>Willis_Shakesphere</p>
                            <p>October 17, 2022</p>
                            <p>08:34 AM :</p>
                          </td>
                          <td>
                            <p>Aren’t you being a little impulsive (冲动)? You've said it yourself, school gets tedious. Who wants the additional workload of tidying up after pets? If you want something to cuddle or to be used in biology lessons, then have a stuffed animal or a model. We have plenty of those!</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>ChipmunkSlamDunk</p>
                            <p>October 17, 2022</p>
                            <p>12:43 PM :</p>
                          </td>
                          <td>
                            <p>Willis_Shakespeare, while you do have a point, some pets can be incredibly low maintenance while still adding a bit of life to the school. I don't mind either way, really, but I can understand where the others are coming from.</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>CrepesTeaAndSunset</p>
                            <p>October 18, 2022</p>
                            <p>02:45 PM :</p>
                          </td>
                          <td>
                            <p>Thanks for your support! Let's start planning, shall we? We need to assign someone to present this idea to the school. That person should also decide what type of pet would be ideal. I can take the lead if necessary, but I'll need someone to assist me. If that's alright, I'll begin searching for suitable pets and explore local pet stores. Price will be a consideration, so I'll inquire about possible discounts if available.</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>RenyaWells</p>
                            <p>October 18, 2022</p>
                            <p>04:38 PM :</p>
                          </td>
                          <td>
                            <p>We also need to consider the maintenance of the pets. We can't have a pet that requires care 24/7 or might not survive over the weekend. With that in mind, we should select something with a moderate lifespan, preferably not too short or too long-lived.</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>GinaIsADoof</p>
                            <p>October 18, 2022</p>
                            <p>07:17 PM :</p>
                          </td>
                          <td>
                            <p>RenyaWells, I think you can take charge of the research, and CrepesTeaAndSunset can handle pitching the idea. It seems like you both have a plan in mind. I'm willing to help wherever needed. However, we need to consider where we will keep the animals. Hong Kong can get extremely hot and humid, and even if the animals are not directly affected by the weather, it could easily make them sick.</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>CrepesTeaAndSunset</p>
                            <p>October 18, 2022</p>
                            <p>10:26 PM :</p>
                          </td>
                          <td>
                            <p>That's definitely an important consideration. We'll need to brainstorm and come up with a suitable solution to ensure the well-being of the animals in Hong Kong's hot and humid climate. It might involve finding a well-ventilated and temperature-controlled area or implementing measures to keep the animals cool and comfortable. Let's put our heads together and find the best approach.</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                  </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <h3>Text 5</h3>
                  <h6>Possible Pets for the school</h6>
                  <table className="table table-bordered mt-3">
                    <thead>
                      <tr>
                        <th>Name of Pet</th>
                        <th>Type of Animal</th>
                        <th>Care Requirements</th>
                        <th>Special Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>Gold Fish </td>
                      <td>Fish </td>
                      <td>
                        <ul>
                          <li>very low maintenance and easy to care for</li>
                          <li>optimum water temperature is 68C, with a pH of 7.0-8.4.</li>
                          <li>Should be fed once a day with flake food or pellets</li>
                          <li>Maintain oxygen levels with an air pump</li>
                          <li>A filter is needed in the tank</li>
                          <li>average lifespan 10-15 years</li>
                        </ul>
                      </td>
                      <td>
                        <ul>
                          <li>Rapid changes in temperature or water chemistry can be harmful, if not fatal to goldfish.</li>
                          <li>Overfeeding can kill the fish</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td>Hamster</td>
                      <td>Mammal </td>
                      <td>
                        <ul>
                          <li>Relatively easy to care for</li>
                          <li>Habitat needs to have, shelter, bedding, enrichment and water bottle</li>
                          <li>Allows bonding and cuddles</li>
                          <li>In addition to normal hamster food, they can eat small amounts of vegetables and fruits</li>
                          <li>Clean hamster in cleaning powder</li>
                          <li>Clean hamster and habitat regularly</li>
                          <li>average lifespan is 2-3  years</li>
                        </ul>
                      </td>
                      <td>
                        <ul>
                          <li>Don’t let the environment get too loud or chaotic</li>
                          <li>Cover the habitat with a light cloth to acclimatize(適應環境) the hamster for the first few days</li>
                          <li>Do not clean hamster in water</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td>Frogs</td>
                      <td>Amphibian </td>
                      <td>
                        <ul>
                          <li>high maintenance pet</li>
                          <li>Feed with crickets and silkworms</li>
                          <li>Can live for 15-20+ years</li>
                          <li>Can be from 5-12 cm</li>
                          <li>Keep habitat heated with heat lamps at 24-30C</li>
                        </ul>
                      </td>
                      <td>They require a glass terrarium, furnished with rocks, log hides and fake plants  </td>
                    </tr>
                    <tr>
                      <td>Chinchilla</td>
                      <td>Mammal </td>
                      <td>
                        <ul>
                          <li>Low maintenance</li>
                          <li>Toys and branches for enrichment</li>
                          <li>Clean chinchillas regularly in a dust bath</li>
                          <li>Feed a high-fiber diet of hay and small amounts of dried fruit</li>
                          <li>average lifespan is about a decade</li>
                        </ul>
                      </td>
                      <td>
                        <ul>
                          <li>Bedding should be warm but still safe if ingested</li>
                          <li>habitat needs to be large and secure, as they are very active</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td>Axolotl</td>
                      <td>Amphibian </td>
                      <td>
                        <ul>
                          <li>very very low maintenance</li>
                          <li> Clean tank regularly</li>
                          <li>Ideally keep in a 20 gallon tank</li>
                          <li>Feed with bloodworm cubes, cooked frozen shrimp, chicken and beef</li>
                          <li>can live up to 15 years</li>
                        </ul>
                      </td>
                      <td>
                        <ul>
                          <li>treat tank water with condition to remove chlorine and fill tank as full as possible</li>
                          <li>Avoid feeding with feeder fish</li>
                          <li>Do not touch them a lot (they don’t like that)</li>
                        </ul>
                      </td>
                    </tr>
                    </tbody>
                  </table>

                  <center>
                    <h6>END OF READING PASSAGES</h6>
                  </center>

                </CardBody>
              </Card>
              &nbsp;
              <p>Read Texts 4-5 and answer questions 26-41.<i>(42 marks)</i></p>

              <Card>
                <CardBody>

                  <ol start="26">
                    <h4>Text 4</h4>
                    {/* question 26*/}
                  <li className="mt-4">
                      What is the topic of this forum ? 
                      <div className="mt-2">
                        <RadioButton name="q26" id="A" label="How tedious(乏味) school can be."/>
                        <RadioButton name="q26" id="B" label="The fascination with axolotls(蠑螈)."/>
                        <RadioButton name="q26" id="C" label="The possibility of adopting school pets."/>
                        <RadioButton name="q26" id="D" label="How to make the school more lively."/>
                      </div>
                    </li>

                    {/* question 27*/}
                    <li className="mt-4">
                    Who or what does the word “them” ( line 5) refer to?
                      <textarea name="q27" type="text" className="form-control mt-2" />
                    </li>

                    {/* question 28*/}
                    <li className="mt-4">
                    Which word in the passage has a similar meaning to “regrow”?
                      <textarea name="q28" type="text" className="form-control mt-2" />
                    </li>

                    {/* question 29*/}
                    <li className="mt-4">
                      Refer to the word “point” in “ Willis_Shakesphere, whilst you do have a point , some pets can be …… “ Which of the following definitions corresponds with the meaning of “point” in this sentence ?                        <textarea type="text" className="form-control mt-2" />
                      <div className="mt-2">
                          <RadioButton name="q29" id="A" label="The tapered(錐), sharp end of a tool, weapon, or other object."/>
                          <RadioButton name="q29" id="B" label="A stage or level at which a change of state occurs."/>
                          <RadioButton name="q29" id="C" label="A dot or other punctuation mark, in particular a full stop."/>
                          <RadioButton name="q29" id="D" label="An argument or idea."/>
                      </div>
                    </li>

                    {/* question 30*/}
                    <li className="mt-4">
                    Who or what does the word “them”(line 33) refer to?
                      <textarea type="text" name="q30" className="form-control mt-2" />
                    </li>

                    {/* question 31*/}
                    <li className="mt-4">
                      <p>Why does Willis_Shakesphere say “you’re delusional (妄想的), you know that?” </p>
                      <p>Because Willis_Shakesphere wants to show <InlineTextInput name="q31"/>.</p>
                    </li>

                    {/* question 32*/}
                    <li className="mt-4">
                    Who is <i>not</i> one of the people CrepesTeaAndSunset is thanking for their support on 18th October, 2022 ? 
                    <div className="mt-2">
                        <RadioButton name="q32" id="A" label="GinaIsADoof"/>
                        <RadioButton name="q32" id="B" label="Willis_Shakesphere"/>
                        <RadioButton name="q32" id="C" label="RenyaWellis"/>
                        <RadioButton name="q32" id="D" label="It increases salaries and job opportunities."/>
                      </div>
                    </li>

                    {/* question 33*/}
                    <li className="mt-4">
                      Which word in lines 21-23 has a similar meaning to “suggest”? 
                      <textarea type="text" name="q33" className="form-control mt-2" />
                    </li>

                    {/* question 34*/}
                    <li className="mt-4"> 
                    What does “that” in “ That’s certainly a good point” refer to?

                    <div className="mt-2">
                      <RadioButton name="q34" id="A" label="Having RenyaWells be in charge of research and CrepesTeaAndSunset being in charge of pitching the idea ."></RadioButton>
                      <RadioButton name="q34" id="B" label="The point is that the weather in Hong Kong could easily make the animals sick ."></RadioButton>
                      <RadioButton name="q34" id="C" label="The fact of Hong Kong weather being hot and humid ."></RadioButton>
                      <RadioButton name="q34" id="D" label="The importance of choosing something with a moderate lifespan ."></RadioButton>
                    </div>
                  </li>

                    {/* question 35*/}
                    <li className="mt-4"> 
                    “That person should also choose which pets would be ideal.” Who will likely be “that” person ? 

                    <div className="mt-2">
                      <RadioButton name="q35" id="A" label="CrepesTeaAndSunset"></RadioButton>
                      <RadioButton name="q35" id="B" label="GinaIsADoof"></RadioButton>
                      <RadioButton name="q35" id="C" label="RenyaWells"></RadioButton>
                      <RadioButton name="q35" id="D" label="ChipmunkSlamDunk"></RadioButton>
                    </div>
                  </li>

                    {/* question 36*/}
                    <li className="mt-4"> 
                    <p>According to the forum , are the following statements True (T) , False (F) or Not Given (Not Given) ?  (3 marks)</p>
                    <p>(i). Willis_Shakesphere is eventually on board with the idea. <InlineTextInput name="q36"/></p>
                    <p>(ii). The animal that would serve as the school pet as well as the location of the enclosure have been decided. <InlineTextInput name="q36"/></p>
                    <p>(iii). CrepesTeaAndSunset would suggest the idea to the school. <InlineTextInput name="q36"/></p>
                    </li>

                    {/* question 37*/}
                    <li className="mt-4"> 
                    <p>Decide whether the following authors have a positive, negative, or neutral attitude towards the idea of having a school pet . (5 marks)</p>
                    <table className="table table-bordered mt-3">
                      <thead>
                        <tr>
                          <th>Authors</th>
                          <th>Positive/Negative/Neutral</th>
                        </tr>
                      </thead>
                      <tbody>
                          <tr>
                            <td>1. CrepesTeaAndSunset</td>
                            <td><InlineTextInput name="q37"/></td>
                          </tr>
                          <tr>
                            <td>2. GinalsADoof</td>
                            <td><InlineTextInput name="q37"/></td>
                          </tr>
                          <tr>
                            <td>3. RenyaWells</td>
                            <td><InlineTextInput name="q37"/></td>
                          </tr>
                          <tr>
                            <td>4. Willis_Shakespeare</td>
                            <td><InlineTextInput name="q37"/></td>
                          </tr>
                          <tr>
                            <td>5. ChipmunkSlamDunk</td>
                            <td><InlineTextInput name="q37"/></td>
                          </tr>
                      </tbody>
                    </table>

                    </li>

                  &nbsp;
                    <div><h4>Text 5</h4></div>

                    {/* question 38*/}
                    <li className="mt-4">
                    <p>Below are summaries of 2 possible pets for the school. Fill in the blanks with ONE word that best fits the paragraph. Your answers must be grammatically correct. (10 marks)</p>
                  <center><u>
                      <h6>Chinchillas(龍貓)</h6>
                    </u></center>

                  <p>Chinchillas are an easy , low maintenance addition to any household or classroom . Besides (i) <InlineTextInput name="q38"/> 
                  feeding them and cleaning them and their enclosure, all you have to do is provide them 
                  with (ii) <InlineTextInput name="q38"/> and they can occupy themselves. However, it should be 
                  noted that chinchillas can live up to (iii)<InlineTextInput name="q38"/> years and that they need a 
                  (iv) <InlineTextInput name="q38"/> diet. They are also incredibly agile(敏捷) and active animals, 
                  so their (v)<InlineTextInput name="q38"/> should be both large and secure . </p>

                  <center><u>
                      <h6>Frogs </h6>
                    </u></center>
                  <p>A more challenging option would be frogs . These little (vi)<InlineTextInput name="q38"/>  can live up to 2 (vii) <InlineTextInput name="q38"/>
                  and grow up to 12 cm large, depending on the species. The temperature of their enclosure needs 
                  to be specific, and kept with (viii)<InlineTextInput name="q38"/>. They (ix)<InlineTextInput name="q38"/> crickets and 
                  silkworms(蠶) and require places in their terrariums(玻璃容器) to (x)<InlineTextInput name="q38"/>.</p>

                    </li>

                    {/* question 39*/}
                    <li className="mt-4"> 
                    <p>
                      Below is a table summarizing the information about the animals.
                      Complete all the boxes in the table by writing “Y” for “yes” and “N” for “no” . Some have been completed for you as examples. (8 sub-questions and 8 marks)
                    </p>
                    <table className="table table-bordered mt-3">
                      <thead>
                        <tr>
                          <th>Name of animal</th>
                          <th>Low maintenance</th>
                          <th>Needs specific temperatures</th>
                          <th>Should be cleaned in a dust bath</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Chinchillas</td>
                          <td><InlineShortTextInput name="q39"/></td>
                          <td><InlineShortTextInput name="q39"/></td>
                          <td>Y</td>
                        </tr>
                        <tr>
                          <td>Frogs</td>
                          <td>N</td>
                          <td><InlineShortTextInput name="q39"/></td>
                          <td><InlineShortTextInput name="q39"/></td>
                        </tr>
                        <tr>
                          <td>Hamsters</td>
                          <td><InlineShortTextInput name="q39"/></td>
                          <td><InlineShortTextInput name="q39"/></td>
                          <td>Y</td>
                        </tr>
                        <tr>
                          <td>Axoloti</td>
                          <td><InlineShortTextInput name="q39"/></td>
                          <td>N</td>
                          <td><InlineShortTextInput name="q39"/></td>
                        </tr>
                      </tbody>
                    </table>


                    </li>

                    {/* question 40*/}
                    <li className="mt-4"> 
                    <p>Referring to the descriptions in the poster , decide which pet you would recommend for each of these residents living in the estate . (3 marks)</p>
                    <p>(i) Gwendolyn lives alone in a small apartment that is prone to(容易發生) sudden temperature changes and wants something that is low maintenance, easy to care for but doesn’t live too long </p>
                    <div className="mt-2">
                    <RadioButton name="q40i" id="A" label="Goldfish"></RadioButton>
                    <RadioButton name="q40i" id="B" label="Chinchilla"></RadioButton>
                    <RadioButton name="q40i" id="C" label="Hamster"></RadioButton>
                    <RadioButton name="q40i" id="D" label="Axolotl"></RadioButton>
                    </div>
                    &nbsp;
                    <p>(ii) Mrs Wong is retired and lives with her husband . She enjoys a challenge and being hands on with her pets and has had experience with lizards and has heating equipment but wants to try a different animal without having to buy new sets of equipment. </p>
                    <div className="mt-2">
                      <RadioButton name="q40ii" id="A" label="Frog"></RadioButton>
                      <RadioButton name="q40ii" id="B" label="Chinchilla"></RadioButton>
                      <RadioButton name="q40ii" id="C" label="Axolotl"></RadioButton>
                      <RadioButton name="q40ii" id="D" label="Fish"></RadioButton>                    
                    </div>
                    &nbsp;
                    <p>(iii) Mr Siu is a business man who would like a more exotic(異國情調) pet to showcase in his home but doesn’t have much spare time to care for it  . He would like a pet that is easy to care for and doesn’t mind having to purchase special equipment. </p>
                    <div className="mt-2">
                      <RadioButton name="q40iii" id="A" label="Gold fish"></RadioButton>
                      <RadioButton name="q40iii" id="B" label="Frog"></RadioButton>
                      <RadioButton name="q40iii" id="C" label="Hamster"></RadioButton>
                      <RadioButton name="q40iii" id="D" label="Axolotl"></RadioButton>
                    </div>

                    </li>

                    {/* question 41*/}
                    <li className="mt-4"> 
                      <p>Are the following statements True(T) , False(F) or Not Given(NG)?</p>
                      <p>(i). Goldfish and hamsters are high maintenance animals . <InlineShortTextInput name="q41"/></p>
                      <p>(ii). The school has settled on a pet. <InlineShortTextInput name="q41"/></p>
                      <p>(iii). Chinchillas should be kept in a large cage. <InlineShortTextInput name="q41"/></p>
                    </li>
                  </ol>

                  <center>
                    <h6>END OF PART B1</h6>
                  </center>
                </CardBody>
              </Card>

              <center className="mt-4">
                      <h4>ENGLISH LANGUAGE PAPER 1 </h4>
                      <h6>PART B2 </h6>
                      <h6>Reading Passages</h6>
                    </center>

                    <div id="formControls" className="my-5">
                      <h6>INSTRUCTIONS FOR PART B2</h6>

                      <ol>
                        <li>
                          Candidates who choose Part B2 should attempt all
                          questions in this part. Each question carries ONE mark
                          unless otherwise stated.
                        </li>
                      </ol>

                      <h6>PART B2</h6>
                        <p>
                        Read the following text and answer the questions in the Question Answer Book for Part B2
                        </p>

                      </div>

                      <Card>
                  <CardBody className="pb-2">
                  <h3>Text 6</h3>
                    <center>
                      <h6>Title: __________________________________ </h6>
                      <h6>Navigating Tech Changes in Graduate School: Finding a Balance</h6>
                    </center>

                    <p>[1] In March 1985, something special happened. When Marissa Waters and her friends came up from their underwater 
                      vehicle, she said words that people will always remember. It marked the time when humans
                       changed from living on land to being brave explorers of the ocean. These words showed that humans 
                       have wanted to explore the deep sea since our ancestors first looked at it with wonder and curiosity. 
                       It also started a journey where people have worked hard to learn about the mysteries of the ocean
                      and our place in it. Marissa, Jake Underwood, and Lily Collins went on an amazing 10,000-kilometer trip deep into 
                      the ocean in a strong submarine—showing how smart people are and how they worked for a long time to 
                      make it happen. </p>

                    <h3>Text 7</h3>
                    <center>
                      <h6>Title: __________________________________ </h6>
                    </center>
                    <p>[1] Scientists who explore the oceans (Ocean Explorers) have found clues about a mysterious past under the sea. It seems there might have been different kinds of life there. They also found frozen water deep down. Some people dream of understanding and changing the underwater world to make it a better place for living things. They call this big idea "oceanfixing."</p>
                    <p>[2] Fixing the oceans is a really big job. Just starting it could take a long time, and doing the whole thing might need thousands of years. Even though that sounds like forever, it's not as long as the billions of years it took for the Earth to become a good home for plants and animals. Making the ocean a nice place to live would need lots of smart ideas and a lot of money.</p>
                    <p>[3] Ocean Fixing has three important steps: making the underwater air better, keeping the right temperature for life, and taking care of the underwater world. The air under the ocean is not like the air we breathe, and sometimes it gets too hot or too cold. There are also problems like dirty water and changes in how much water there is. Scientists and experts are thinking of different ways to oceanfix, but each way has its own challenges.</p>
                    <p>[4] One idea to make the underwater air better is to use machines powered by the energy from the ocean. These machines would release special gasses into the water to make it better for living things. We could either bring these machines from the surface or make them using things we find in the ocean. When the underwater air gets better, we'd need another kind of machine to make oxygen like plants do on land. Tiny living things like algae could also help. It might take a really, really long time, but the hope is that the underwater world could slowly have more oxygen, so people in the future might only need simple tools to breathe instead of complicated diving gear.</p>

                    <h3>Text 8</h3>
                    <center>
                      <h6>Title: __________________________________ </h6>
                    </center>
                    <p>[1] Some scientists are talking about exploring deep under the sea, and it's making people wonder if it's a good idea. Two ocean researchers, Lily Johnson and Alex Rodriguez, are having a chat about it.</p>
                    <p>[2] Dr. Johnson: Going deep underwater could hurt sea life with pollution and changes we bring from the surface. If there's already life down there, adding creatures from land might be really bad for the sea world and for what we can learn. We can't just explore underwater without thinking about what might happen.</p>
                    <p>[3] Dr. Rodriguez: I see your point, but we've made safe areas on land, like parks, where we take care of nature. We could do something similar underwater, creating special places where submarines can't land to protect the sea life.</p>
                    <p>[4] Dr. Johnson: Tiny things like germs can move underwater, so even with parks, pollution could still spread. Making nice-looking places isn't the main issue. We need to decide if it's okay to mess with the sea. Look at how people from Europe changed things a lot when they explored and settled in the Americas.</p>
                    <p>[5] Dr. Rodriguez: I know human actions can sometimes hurt the environment, but I don't think sea creatures are as important as humans. Our job is to make Earth a better place, and we should keep doing things to make our world good, including taking care of the oceans.</p>
                    <p>[6] Dr. Johnson: As we think about what we should do for people and the sea, we also need to think about what's right for the ocean. We should decide if exploring deep-sea areas is okay because it might hurt the special underwater world. Even if there are only tiny creatures there, we should take care and not mess with those underwater places.</p>

                    <center>
                      <h5>END OF READING PASSAGES</h5>
                    </center>

                  </CardBody>
                </Card>

                <Card>
                  <CardBody>
                    <p>Read Text 6-8 and answer questions 42-59.<i>(42 marks)</i></p>
                    <ol start="42">
                      <h6>Text 6</h6>

                      {/* question 42*/}
                      <li className="mt-4">
                        What was of wonder and immense curiosity for our ancestors?
                        <textarea type="text" name="q42" className="form-control mt-2" />
                      </li>

                      {/* question 43*/}
                      <li className="mt-4">
                        What is the name of an underwater vehicle?
                        <textarea type="text" name="q43" className="form-control mt-2" />
                      </li>

                      {/* question 44*/}
                      <li className="mt-4">
                        What special thing happened in March 1985?
                        <div className="mt-2">
                          <RadioButton name="q44" id="A" label="Humans landed on the Moon"></RadioButton>
                          <RadioButton name="q44" id="B" label="The ocean split into two parts"></RadioButton>
                          <RadioButton name="q44" id="C" label="A 10000 kilometer trip was made into the deep ocean"></RadioButton>
                          <RadioButton name="q44" id="D" label="A 10000 kilometer trip was made above the space"></RadioButton>
                        </div>
                      </li>

                      {/* question 45*/}
                      <li className="mt-4">
                        <p>What do the following phrases mean?	<i>(4 marks)</i></p>
                        <p>(i). “Below the land is a world”</p>
                        <textarea type="text" name="q45i" className="form-control mt-2" />
                        <p>(ii). “and the world is yet to be discovered”</p>
                        <textarea type="text" name="q45ii" className="form-control mt-2" />
                      </li>

                      &nbsp;
                      <h6>Text 7</h6>

                      {/* question 46*/}
                      <li className="mt-4">
                        Who are Ocean Explorers?
                        <textarea type="text" name="q46" className="form-control mt-2" />
                      </li>

                      {/* question 47*/}
                      <li className="mt-4">
                        Find a synonym of the word “puzzling” from paragraph 1
                        <textarea type="text" name="q47" className="form-control mt-2" />
                      </li>

                      {/* question 48*/}
                      <li className="mt-4">
                        What is ocean fixing? <i>(3 marks)</i>
                        <textarea type="text" name="q48" className="form-control mt-2" />
                      </li>

                      {/* question 49*/}
                      <li className="mt-4">
                      How long would it take to fix the ocean?
                      <div className="mt-2">
                        <RadioButton name="q49" id="A" label="Tens of years"></RadioButton>
                        <RadioButton name="q49" id="B" label="Hundreds of years"></RadioButton>
                        <RadioButton name="q49" id="C" label="Thousands of years"></RadioButton>
                        <RadioButton name="q49" id="D" label="A few years"></RadioButton>
                      </div>
                    </li>

                      {/* question 50*/}
                      <li className="mt-4">
                      By which phrase from paragraph 2 do we know that Earth was not a good home a long time back?	<i>(2 marks)</i>
                      <textarea type="text" name="q50" className="form-control mt-2" />
                      </li>

                      {/* question 51*/}
                      <li className="mt-4">
                      <p>Fill the blanks with appropriate words or phrases from paragraph 3. Make sure the answers are grammatically correct.	 (10 marks)</p>
                      <p>Making the (i)<InlineTextInput name="q51"/> air perfect, gaining the perfect (ii)<InlineTextInput name="q51"/> for life, so that it is not too hot or too cold, and making sure 
                      that the (iii)<InlineTextInput name="q51"/> is well taken care for, are the important steps for (iv)<InlineTextInput name="q51"/>. The (v)<InlineTextInput name="q51"/> under water is not similar to 
                      the ones we have here to breathe. (vi)<InlineTextInput name="q51"/> water and the amount of water are also a huge concern while taking care of the ocean. Each method has its own challenges that (vii)<InlineTextInput name="q51"/> and (viii)<InlineTextInput name="q51"/>  are trying to overcome.</p>
                      </li>

                      {/* question 52*/}
                      <li className="mt-4">
                        What should machines be powered by?
                        <textarea type="text" name="q52" className="form-control mt-2" />
                      </li>

                      {/* question 53*/}
                      <li className="mt-4">
                        Briefly describe the two ways, how the machines can help the underwater world?   <i>(3 marks)</i>
                        <textarea type="text" name="q53" className="form-control mt-2" />
                      </li>

                      &nbsp;
                      <h6>Text 8</h6>

                      {/* question 54*/}
                      <li className="mt-4">
                        <p>Who is for the motion of going underwater, and who is against it? (2 marks)</p>
                        <p>FOR - <InlineTextInput name="q54"/></p>
                        <p>AGAINST - <InlineTextInput name="q54"/></p>
                      </li>

                      {/* question 55*/}
                      <li className="mt-4">
                        Before going underwater, what does one of the doctors suggest to do, similar to the thing that has been done on land?(4 marks)
                        <textarea type="text" name="q55" className="form-control mt-2" />
                      </li>

                      {/* question 56*/}
                      <li className="mt-4">
                        How can pollution spread according to Dr. Johnson?
                        <textarea type="text" name="q56" className="form-control mt-2" />
                      </li>

                      {/* question 57*/}
                      <li className="mt-4">
                      How does Dr. Rodriauez want to make the Earth a better place?
                        <div className="mt-2">
                        <RadioButton name="q57" id="A" label="By hurting the sea life"></RadioButton>
                        <RadioButton name="q57" id="B" label="By protecting the land"></RadioButton>
                        <RadioButton name="q57" id="C" label="By taking care of the ocean"></RadioButton>
                        <RadioButton name="q57" id="D" label="By ignoring the pollution"></RadioButton>
                        </div>
                      </li>

                      {/* question 58*/}
                      <li className="mt-4">
                        <p>In the sentence "Tiny things like germs can move underwater," from Paragraph 4 ,identify the verb and its tense. (2 marks)</p>
                        <p>VERB: <InlineTextInput name="q58"/></p>
                        <p>Tense: <InlineTextInput name="q58"/></p>
                      </li>

                      {/* question 59*/}
                      <li className="mt-4">
                        <p>Choose the titles below for the titles of each of the texts from 6-8. (3 marks)</p>
                        <p>
                          TITLES:<br/>
                          i) Debating the Depths Under the Land<br/>
                          ii) A Brief History of The Waters<br/>
                          iii) The Big Ocean Adventure in 1985<br/>
                          iv) Who Chooses the Exploration of the World?<br/>
                          v) OceanFix: Transforming the Underwater World<br/>
                        </p>
                        <p>Text 6 - <InlineTextInput name="q59"/></p>
                        <p>Text 7 - <InlineTextInput name="q59"/></p>
                        <p>Text 8 - <InlineTextInput name="q59"/></p>
                      </li>
                    </ol>
                    <center>
                      <h6>END OF PART B2</h6>
                    </center>
                  </CardBody>
                </Card>
        <p/>
    </>
  );
  return (<ReadingPaper year="2021" paper={paper} totalQuestions="59" specialQuestions="40i,40ii,40iii,45i,45ii"/>) 
};

export default Reading2021;
