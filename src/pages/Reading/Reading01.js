import React from "react";
import { Card, CardBody } from "../../components/card/card";
import { RadioButton } from "../../components/radio/radio";
import { InlineTextInput, InlineShortTextInput } from "../../components/inlinetextinput/inlinetextinput";
import { ReadingPaper } from "./reading";

import Highlight from "react-highlight";
import img13 from "./assets/2015/13.png";
import img38A from "./assets/2015/38-A.png";
import img38B from "./assets/2015/38-B.png";
import img38C from "./assets/2015/38-C.png";
import img38D from "./assets/2015/38-D.png";
const Reading01 = () => {
  const paper =  (
    <>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#/">READING</a>
                  </li>
                  <li className="breadcrumb-item active">2015</li>
                </ul>
                <h1 className="page-header">
                  2015 Reading Mock Paper
                </h1>

                <center className="mt-4">
                  <h4>ENGLISH LANGUAGE PAPER 1</h4>
                  <h6> PART A</h6>
                  <h6>Reading Passages</h6>
                </center>

                <hr className="mb-4" />

                <div id="formControls" className="mb-5">
                  <h4>INSTRUCTIONS FOR PART A</h4>

                  <ol>
                    <li>
                      The Question-Answer Book for Part A is inserted in this
                      Reading Passages booklet. Attempt ALL questions in Part A.
                      Each question carries ONE mark unless otherwise stated.
                    </li>
                  </ol>

                  <Card>
                    <CardBody className="pb-2">
                      <p>
                        What's the first thing that comes to mind when people
                        think about the Netherlands? Most people might say
                        tulips (鬱金香), windmills, Hagelslag (Dutch chocolate
                        sprinkles on buttered toast), Amsterdam, etc. Fans of
                        John Green might also add "The Fault In Our Stars."
                      </p>
                      <p>
                        Naturally, the Netherlands cannot be summarized so
                        simply, and as someone who has traveled a dozen times to
                        the country for business and pleasure alike, I would
                        like to point out a few rather noteworthy (值得注意)
                        facts about the land that was once generally known as
                        Holland.
                      </p>
                      <p>
                        This brings me to my first point: the names Holland and
                        the Netherlands are not actually interchangeable. For a
                        long time, Holland was used to refer to the Netherlands
                        as a whole for simplicity, but in reality, Holland is
                        only two out of the twelve provinces in the Netherlands.
                        In an effort to redirect tourism to other places besides
                        cities like Amsterdam and rebrand the country, the
                        nickname "Holland" was scrapped, and it is now referred
                        to by its official title, the Netherlands.
                      </p>
                      <p>
                        The second point is that the Dutch are the most
                        physically active in Europe, with more than half of the
                        population exercising on a daily basis, which is 10%
                        more than the average in European countries! However,
                        it's not just because they love exercising. Since it's
                        expensive and inconvenient to own a car (and considering
                        that the Netherlands is such a bike-friendly country),
                        most people travel on their bikes daily, pedaling an
                        average of 2.9 km. It's been said that there are even
                        more bicycles than people!
                      </p>
                      <p>
                        It should come as no surprise, then, that the Dutch are
                        the healthiest in the world. And not just in regards to
                        exercise either. The Dutch have been ranked the
                        healthiest in the world when it comes to diet. With the
                        country being the second-largest importer of greens
                        globally, its residents are quite diligent about eating
                        a balanced diet.
                      </p>
                      <p>But what about other aspects of the Netherlands?</p>
                      <p>
                        Well, in regards to food, there's quite a bit of
                        interesting trivia (瑣事). For example, did you know
                        that the average Dutch person eats 2 kilos of "Drops"
                        (what the locals call licorice) every year? Or that the
                        iconic orange color we associate with carrots was
                        actually due to the Dutch? It's true! In the 17th
                        century, Dutch farmers specifically cultivated orange
                        carrots as a tribute (作為致敬) to William of Orange for
                        his leadership in the struggle for Dutch independence.
                        The Dutch were also the inventors of gin and are major
                        exporters of cheese.
                      </p>
                      <p>
                        How about some fresh air in the glorious Dutch
                        countryside? We could take a walk and look at the iconic
                        windmills and tulips. There are fun facts about that
                        too.
                      </p>
                      <p>
                        Shockingly enough, tulips aren't native to the
                        Netherlands. "What? You mean to tell me that the iconic
                        cup-shaped flowers aren't native to the country they're
                        iconic in?" I know, right! But it's true! They were
                        originally imported from Turkey in the 16th century and
                        were so expensive that farmers switched to cultivating
                        (培育) them for profit until the industry collapsed in
                        1637. The bulbs of the flowers also provided food for
                        many during the last winter of WWII. Now, the third
                        Saturday of January is annually titled National Tulip
                        Day.
                      </p>
                      <p>
                        The windmills also have their own story. There are over
                        1000 of them in the country. Nineteen of them are at the
                        Kinderdijk UNESCO World Heritage Site and are still
                        being used to drain water. Only a handful or so are
                        still operated commercially but are certainly worth a
                        visit. Would you like to come and visit the Netherlands
                        sometime? Oh, but are you intimidated by the prospect of
                        having to learn a new language? Well, then I've got good
                        and bad news for you, my friend. The good news is that
                        the Netherlands has the highest English proficiency
                        (熟練程度) in a non-English speaking country. Even if
                        the locals start the conversation in Dutch, all you have
                        to do is express that you don't understand, and they'll
                        readily switch back to English. The bad news? Well, even
                        though people will communicate with you in English, the
                        local signs, papers, and documents won't. It's all
                        Dutch! So it would be best to learn the basics of the
                        language before you go.
                      </p>
                      <i>Source: expatica.com</i>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody className="pb-2">
                      <p>Text 1 (31 marks total)</p>
                      <ol>
                        {/* question 1 */}
                        <li>
                          List the things associated with the Netherlands in
                          paragraph 1. (5 marks)
                          <div>
                            <ol type="i">
                              <li className="mb-3">
                                <input name="q1" type="text" className="form-control" />
                              </li>
                              <li className="mb-3">
                                <input name="q1" type="text" className="form-control" />
                              </li>
                              <li className="mb-3">
                                <input name="q1" type="text" className="form-control" />
                              </li>
                              <li className="mb-3">
                                <input name="q1" type="text" className="form-control" />
                              </li>
                              <li className="mb-3">
                                <input name="q1" type="text" className="form-control" />
                              </li>
                            </ol>
                          </div>
                        </li>

                        {/* question 2 */}
                        <li className="mt-4">
                          How many times has the author traveled to the
                          Netherlands?
                          <input name="q2" type="text" className="form-control mt-2" />
                        </li>

                        {/* question 3 */}
                        <li className="mt-4">
                          Approximately how many people exercise in the
                          Netherlands and what is the approximate European
                          average? (2 marks)
                          <input type="text" name="q3" className="form-control mt-2" />
                          <p className="mt-2">
                            *take note of the line length.{" "}
                          </p>
                        </li>

                        {/* question 4 */}
                        <li className="mt-4">
                          From which country are tulips originally from? Write
                          the name that the country was then known as.
                          <input type="text" name="q4" className="form-control mt-2" />
                        </li>

                        {/* question 5 */}
                        <li className="mt-4">
                          Are the following statements True (T), False (F), or
                          Not Given (NG)? (6 marks)
                          <ul className="mt-2">
                            <li>
                              Many of the windmills are still being operated
                              commercially. <InlineShortTextInput name="q5"/>
                            </li>

                            <li className="mt-2">
                              You can communicate with the people in the
                              Netherlands without learning the language as the
                              locals speak English. <InlineShortTextInput name="q5"/>
                            </li>

                            <li className="mt-2">
                              The most famous food in the Netherlands is the
                              Stroopwafel. <InlineShortTextInput name="q5"/>
                            </li>

                            <li className="mt-2">
                              Dutch are the most physically active in the world. 
                              <InlineShortTextInput name="q5"/>
                            </li>

                            <li className="mt-2">
                              The Dutch invented Gin and cheese. <InlineShortTextInput name="q5"/>
                            </li>

                            <li className="mt-2">
                              The Dutch celebrate National Tulip Day. <InlineShortTextInput name="q5"/>
                            </li>
                          </ul>
                        </li>

                        {/* question 6 */}
                        <li className="mt-4">
                          Who or what are the “they” mentioned in paragraph 11?
                          <input name="q6" type="text" className="form-control mt-2" />
                        </li>

                        {/* question 7 */}
                        <li className="mt-4">
                          Why was the nickname Holland scrapped ? (2 marks)
                          <input name="q7" type="text" className="form-control mt-2" />
                        </li>

                        {/* question 8 */}
                        <li className="mt-4">
                          The title of the passage uses a Dutch saying that
                          would be very odd to anyone who doesn’t know the
                          meaning. What is the purpose of this saying? (2 marks)
                          <input name="q8" type="text" className="form-control mt-2" />
                        </li>

                        {/* question 9 */}
                        <li className="mt-4">
                          Fill in the chart with the categories and examples
                          mentioned in the passage, use no more than 3 words in
                          each. (4 marks)
                          <table className="table table-bordered mt-3">
                            <thead>
                              <tr>
                                <th scope="col">Category</th>
                                <th scope="col">Examples</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>1. City/ Province(省份)/ Place Names </td>
                                <td>
                                <InlineTextInput name="q9i"/>
                                </td>
                              </tr>

                              <tr>
                                <td>2. Food</td>
                                <td>
                                <InlineTextInput name="q9ii"/>
                                </td>
                              </tr>

                              <tr>
                                <td>3. Famous Attractions</td>
                                <td>
                                <InlineTextInput name="q9iii"/>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </li>

                        {/* question 10 */}
                        <li className="mt-4">
                          What is a synonym for “interesting ” in paragraph 2 ?
                          <input name="q10" type="text" className="form-control mt-2" />
                        </li>

                        {/* question */}
                        <li className="mt-4">
                          Which phrase has a similar meaning to “in remembrance”
                          ?
                          <input name="q11" type="text" className="form-control mt-2" />
                        </li>

                        {/* question 12 */}
                        <li className="mt-4">
                          The word “naturally” in paragraph 2 can be replaced by
                          which of the following?
                          <div className="mt-2">
                              <RadioButton name="q12" id="A" label="Needless to say"></RadioButton>
                              <RadioButton name="q12" id="B" label="Of course"></RadioButton>
                              <RadioButton name="q12" id="C" label="Clearly"></RadioButton>
                              <RadioButton name="q12" id="D" label="Without a doubt"></RadioButton>
                          </div>
                        </li>

                        {/* question 13 */}
                        <li className="mt-4">
                          Complete this summary using only ONE word from the
                          Text. (4 marks)
                          <div className="m-4">
                            <p>
                              The Dutch rank as the healthiest globally,
                              excelling not only in exercise but also in diet,
                              with a focus on balanced eating. Additionally,
                              Dutch food trivia includes their significant
                              <InlineTextInput name="q13"/>
                              consumption and their historical role in the
                              <InlineTextInput name="q13"/>
                              of carrots. The country is known for inventing
                              <InlineTextInput name="q13"/>
                              , being major cheese exporters, and having a rich
                              agricultural history with
                              <InlineTextInput name="q13"/>
                              , which were originally imported from Turkey.
                            </p>
                          </div>
                          <div className="mt-4">
                            <center>
                              <h6>A List of Funny Dutch Sayings</h6>
                            </center>

                            <ol className="mt-3">
                              <li>
                                <span>
                                  As if an angel is peeing on your tongue:
                                </span>
                                <p>
                                  Thinking of urination is probably not what
                                  most people would like to hear when they are
                                  at the dining table, but apparently, the Dutch
                                  have no qualms about it. This odd little
                                  saying means that someone is immensely
                                  enjoying their meal.
                                </p>
                              </li>

                              <li>
                                <span>
                                  Now the monkey comes out of the sleeve:
                                </span>
                                <p>
                                  This one is a little more straightforward and
                                  quite easy to understand if you know the
                                  phrase "the cat's out of the bag." It
                                  basically means that hidden motives or secrets
                                  have been revealed.
                                </p>
                              </li>

                              <li>
                                <span>
                                  He who has butter on his head should stay out
                                  of the sun:
                                </span>
                                <p>
                                  Who puts butter on their head, or food for
                                  that matter? People back in the days of Jacob
                                  Cats did. They did it to transport groceries
                                  they had bought back home. This saying was
                                  found in a text by Cats and has been around
                                  since the 17th century. It means that one
                                  shouldn't criticize others unless they are
                                  without fault.
                                </p>
                              </li>

                              <li>
                                <span>To fall with your nose in butter:</span>
                                <p>
                                  Another unusual one about butter. The Dutch
                                  sure love their butter, don't they? Enough to
                                  make a law that decreed (頒布法令) only butter
                                  could be called "butter" even! But enough of
                                  that, this saying means to be in the right
                                  place at the right time, though I doubt
                                  getting a nose full of butter is going to be
                                  pleasant for anybody.
                                </p>
                              </li>
                              <li>
                                <span>To buy a cat in the bag:</span>
                                <p>
                                  Contrary to popular belief, this saying has
                                  nothing to do with its English counterpart
                                  (對方). It means to have been tricked into
                                  buying something without inspecting (檢查) it
                                  properly.
                                </p>
                              </li>
                              <li>
                                <span>Did you fall down the stairs?</span>
                                <p>
                                  People might ask you this question if you've
                                  had a rather drastic(激烈) haircut. I wish the
                                  only thing people get from falling down the
                                  stairs was a haircut!
                                </p>
                              </li>
                              <li>
                                <span>Hand shoes :</span>
                                <p>
                                  This isn't strange at all if you speak German,
                                  but with a little imagination, it's easy to
                                  understand. What shoes go on your hands?
                                  Gloves, of course!
                                </p>
                              </li>

                              <li>
                                <span>
                                  Talking about little cows and little calves :
                                </span>
                                <p>
                                  People might ask you this question if you've
                                  had a rather drastic(激烈) haircut. I wish the
                                  only thing people get from falling down the
                                  stairs was a haircut!
                                </p>
                              </li>

                              <li>
                                <span>
                                  What have I got hanging on my bike now ?:{" "}
                                </span>
                                <p>
                                  Since most people don't own a car in the
                                  Netherlands, and cycling is the most common
                                  means of transportation, this phrase is a way
                                  of saying, "What do I have to deal with now?"
                                </p>
                              </li>

                              <li>
                                <span>
                                  <li>
                                    <span>It’s raining pipe-stems :</span>
                                    <p>
                                      Would you rather have cats and dogs
                                      falling from the sky or metal pipes? Fear
                                      not, it's neither. "It's raining
                                      pipe-stems" means it's raining a lot.
                                    </p>
                                  </li>
                                </span>
                                <i>
                                  Source: The Intrepid Guide, 33 Eye-Wateringly
                                  Funny Dutch Phrases and Idioms [Infographic]
                                </i>
                              </li>
                            </ol>
                          </div>
                        </li>

                        {/* question 14 */}
                        <li className="mt-4">
                          Which word means the same as “reservations” ?
                          <input name="q14" type="text" className="form-control mt-2" />
                        </li>

                        {/* question 15 */}
                        <li className="mt-4">
                          What is the “English counterpart(對方)” to phrase 5 ?
                          <input name="q15"  type="text" className="form-control mt-2" />
                        </li>

                        {/* question 16 */}
                        <li className="mt-4">
                          Which phrase has similar meanings in different
                          languages ?
                          <input name="q16" type="text" className="form-control mt-2" />
                        </li>

                        {/* question 17 */}
                        <li className="mt-4">
                          Are the following statements True (T), False (F), or
                          Not Given (NG)? (3 marks)
                          <ul className="mt-2">
                            <li>
                              Peanut butter is called peanut cheese in the
                              Netherlands.
                              <InlineShortTextInput name="q17"/>
                            </li>

                            <li className="mt-2">
                              When you change your hairstyle from long locks to
                              a pixie cut, people will ask if you’ve fallen down
                              the stairs{" "}
                              <InlineShortTextInput name="q17"/>
                            </li>

                            <li className="mt-2">
                              People put their groceries on their heads only
                              after the 17th century{" "}
                              <InlineShortTextInput name="q17"/>
                            </li>
                          </ul>
                          <p className="mt-3">
                            Note: the saying has been around since the 17th
                            century . The action that inspired it must have been
                            around before then , not after.
                          </p>
                        </li>
                      </ol>
                    </CardBody>
                  </Card>

                  <div id="formControls" className="mt-5">
                      <center>
                        <h4>English Language Paper 1</h4>
                        <h6>Part B1</h6>
                        <h6>Reading Passages</h6>
                      </center>
                      <div className="mt-5">
                        <h6>General Instructions</h6>
                        <ol>
                          <li>
                            Refer to the general instructions on page 1 of the
                            Reading Passages booklet for Part A
                          </li>
                        </ol>

                        <h6>Instructions for Part B1</h6>
                        <ol>
                          <li>
                            The Question-Answer Book for Part B1 is inserted in
                            this Reading Passages Booklet.
                          </li>
                          <li>
                            Candidates who choose Part B1 should attempt all
                            questions in this part. Each question carries ONE
                            mark unless stated otherwise
                          </li>

                          <li>
                            Hand in only ONE Question-Answer Book for Part B,
                            either B1 or B2 and fasten it with the
                            Question-Answer Book for Part A using the green tag
                            provided.
                          </li>
                        </ol>
                      </div>
                  </div>
  
                  <Card>
                    <CardBody className="pb-2">
                      <div>
                        <center>
                          <h4>Witness Statement</h4>
                        </center>

                        <p>
                          [1] I, Sarah King, of 3rd Avenue Street, Koi pu
                          Junction, housewife, state that:
                        </p>
                        <p>
                          On 27th December 2014, as I was getting out of my
                          parked car at the Maddison Parking Lot, I witnessed
                          the following accident.
                        </p>
                        <p>
                          At approximately 4.15 p.m., I observed a black Honda
                          driving at a speed that appeared [5] to exceed the
                          posted speed limit within the car park i,e, 20 km/hr.
                        </p>
                        <p>
                          The driver of the speeding vehicle seemed to lose
                          control while navigating a turn and collided with a
                          stationary red Toyota.
                        </p>
                        <p>
                          The impact caused visible damage to both vehicles,
                          including but not limited to dents, scratches, and
                          broken lights. However, it seemed that the red Toyota
                          was more severely [10] damaged with a broken side-view
                          mirror and considerable dents to the left of the car.
                        </p>
                        <p>
                          The impact caused visible damage to both vehicles,
                          including but not limited to dents, scratches, and
                          broken lights. However, it seemed that the red Toyota
                          was more severely [10] damaged with a broken side-view
                          mirror and considerable dents to the left of the car.
                        </p>
                        <p>
                          [15] I immediately contacted the authorities to report
                          the incident, and I remained at the scene until the
                          arrival of law enforcement. I am more than willing to
                          cooperate further, if necessary, and provide any
                          additional information that may assist in the
                          investigation.
                        </p>
                        <p>
                          I believe that the contents of this statement are true
                          and correct.
                        </p>
                        <p>Signed: Sarah Brightly</p>
                        <p>Dated: 31st December 2014</p>

                        <h6 className="mt-4">
                          Navigating the Roads of Tomorrow: A Comprehensive Look
                          at Self-Driving Cars
                        </h6>

                        <p>
                          [1] In recent years, self-driving cars have emerged as
                          a revolutionary technology with the potential to
                          transform the way we commute and reshape the future of
                          our trips. As the automotive industry continues to
                          make strides in autonomous vehicle development, it is
                          crucial to examine the latest advancements, current
                          challenges, and the implications of this
                          groundbreaking technology.
                        </p>
                        <p>
                          [2] Self-driving cars have been making headlines
                          globally, with major players in the automotive and
                          technology sectors investing heavily in research and
                          development. Companies like Tesla, Waymo, and Uber are
                          at the forefront of this technological shift, pushing
                          the boundaries of innovation. For instance, Waymo, a
                          subsidiary of Alphabet Inc., has expanded its
                          autonomous ride-hailing service, offering users a
                          glimpse into a future where steering wheels are
                          optional.
                        </p>

                        <h6 className="mt-4">
                          Advantages of Self-Driving Cars
                        </h6>
                        <p>
                          [3] One of the primary benefits of self-driving cars
                          is the potential to reduce accidents caused by human
                          error. Autonomous vehicles rely on advanced sensors,
                          cameras, and artificial intelligence to navigate,
                          making split-second decisions that can prevent
                          collisions.
                        </p>
                        <p>
                          [4] Self-driving cars have the potential to make
                          transportation more accessible to individuals with
                          disabilities, the elderly, and those who are unable to
                          drive. This inclusivity could revolutionize mobility
                          and provide greater independence for a broader segment
                          of the population.
                        </p>
                        <p>
                          [5] Autonomous vehicles can communicate with each
                          other and the surrounding infrastructure, leading to
                          optimized traffic flow. This communication enables
                          vehicles to coordinate their movements, reducing
                          congestion and improving overall road efficiency.
                        </p>
                        <p>
                          [6] With self-driving cars handling the driving tasks,
                          occupants can use their travel time more productively.
                          Whether working, reading, or relaxing, passengers can
                          reclaim the time typically spent on driving,
                          contributing to increased productivity and quality of
                          life.
                        </p>
                        <h6 className="mt-4">
                          Advantages of Self-Driving Cars
                        </h6>
                        <p>
                          [7] Despite significant advancements, self-driving
                          technology is not infallible. Adverse weather
                          conditions, complex urban environments, and unforeseen
                          situations pose challenges for autonomous systems,
                          potentially leading to accidents.
                        </p>
                        <p>
                          [7] Despite significant advancements, self-driving
                          technology is not infallible. Adverse weather
                          conditions, complex urban environments, and unforeseen
                          situations pose challenges for autonomous systems,
                          potentially leading to accidents.
                        </p>
                        <p>
                          [9] The development and integration of self-driving
                          technology come with substantial costs. The price of
                          outfitting vehicles with advanced sensors and systems,
                          coupled with the necessary infrastructure upgrades,
                          may limit the widespread adoption of autonomous
                          vehicles. Research suggests that the first wave of
                          autonomous cars could cost around 100,000$. Even that
                          might be an understatement.
                        </p>
                        <p>
                          [10] The rise of self-driving cars could lead to job
                          displacement for millions of professional drivers,
                          including taxi drivers, truck drivers, and delivery
                          personnel. The economic and social consequences of
                          this shift must be carefully considered and addressed.
                        </p>
                        <p>
                          [11] As self-driving cars continue to evolve, the
                          advantages and disadvantages associated with this
                          transformative technology become more apparent. While
                          the potential for increased safety, accessibility, and
                          efficiency is promising, challenges such as
                          technological limitations, ethical concerns, and
                          economic impacts must be navigated. The ongoing
                          research and development in the autonomous vehicle
                          sector will undoubtedly shape the future of
                          transportation and redefine our relationship with the
                          open road.
                        </p>
                        <center>
                          <h6 className="mt-4">End of Reading Passages </h6>
                        </center>
                      </div>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody className="pb-2">
                      <h6>English </h6>
                      <h6>Paper 1 Part B1</h6>
                      <h6>Question-Answer Book</h6>

                      <center>
                        <h1>B1</h1>
                        <h6>Easy Section</h6>
                      </center>

                      <p>Read Text 3 and answer questions 32-41. (15 Marks)</p>

                      <h6>Text 3</h6>
                      <ol start="22" className="mt-4">
                        {/* question 22*/}
                        <li>
                          Who is the witness?
                          <input name="q22" type="text" className="form-control mt-2" />
                        </li>

                        {/* question 23*/}
                        <li className="mt-3">
                          List the things associated with the Netherlands in
                          paragraph 1. (5 marks)
                          <div>
                            <ol type="i" className="mt-3">
                              <li className="mb-3">
                                3rd Avenue Street, Koi pu Junction
                                <InlineTextInput name="q23"/>
                              </li>
                              <li className="mb-3">
                                Maddison Parking Lot
                                <InlineTextInput name="q23"/>
                              </li>
                            </ol>
                          </div>
                        </li>

                        {/* question 24*/}
                        <li className="mt-3">
                          Find a word in lines 5-7 that means “accident”.{" "}
                          <input name="q24" type="text" className="form-control mt-2" />
                        </li>

                        {/* question 25 */}
                        <li className="mt-3">
                          Look at the following diagram. Write the letter (A-F)
                          that indicates the position of: (3 marks)
                          <ol type="i" className="mt-3">
                            <li className="mb-3">
                              The black Honda{" "}
                              <InlineTextInput name="q25"/>
                            </li>
                            <li className="mb-3">
                              The red Toyota{" "}
                              <InlineTextInput name="q25"/>
                            </li>
                            <li className="mb-3">
                              Sarah’s car{" "}
                              <InlineTextInput name="q25"/>
                            </li>
                          </ol>
                          <img src={img13} alt="" style={{ width: "12rem" }} />
                        </li>

                        {/* question 26 */}
                        <li className="mt-3">
                          Who was injured in the accident?{" "}
                          <input name="q26" type="text" className="form-control mt-2" />
                        </li>

                        {/* question 27 */}
                        <li className="mt-3">
                          Why did one of the drivers ask Sarah for her contact
                          details?{" "}
                          <input name="q27" type="text" className="form-control mt-2" />
                        </li>

                        {/* question */}
                        <li className="mt-3">
                          Where was the red Toyota damaged?
                          <div className="mt-2">
                              <RadioButton name="q28" id="A" label="">
                              </RadioButton>
                              <img
                                  src={img38A}
                                  alt=""
                                  style={{ width: "12rem" }}
                                />

                              <RadioButton name="q28" id="B" label=""></RadioButton>
                                <img
                                  src={img38B}
                                  alt=""
                                  style={{ width: "12rem" }}
                                />
                              <RadioButton name="q28" id="C" label=""></RadioButton>
                                <img
                                  src={img38C}
                                  alt=""
                                  style={{ width: "12rem" }}
                                />
                              <RadioButton name="q28" id="D" label=""></RadioButton>
                                <img
                                  src={img38D}
                                  alt=""
                                  style={{ width: "12rem" }}
                                />
                          </div>

                        </li>

                        {/* question 29*/}
                        <li className="mt-3">
                          Why did one of the drivers ask Sarah for her contact
                          details?{" "}
                          <textarea name="q29" type="text" className="form-control mt-2" />
                        </li>

                        {/* question 30 */}
                        <li className="mt-3">
                          Why did one of the drivers ask Sarah for her contact
                          details?{" "}
                          <ol type="i" className="mt-2">
                            <li>
                              27th December{" "}
                              <InlineTextInput name="q30"/>
                            </li>
                            <li>
                              31st December{" "}
                              <InlineTextInput name="q30"/>
                            </li>
                          </ol>
                        </li>

                        {/* question  31 */}
                        <li className="mt-3">
                          The sentence in line 18 can be found in…{" "}
                          <div className="mt-2">
                              <RadioButton name="q31" id="A" label="Business letters"></RadioButton>
                              <RadioButton name="q31" id="B" label="Legal documents"></RadioButton>
                              <RadioButton name="q31" id="C" label="Epilogue of books"></RadioButton>
                              <RadioButton name="q31" id="D" label="Letters to the editor"></RadioButton>
                          </div>
                        </li>
                      </ol>

                      <h6>Text 4</h6>
                      <p>Read Text 4 and answer questions 32-45. (25 Marks)</p>
                      <ol start="32">
                        {/* question 32 */}
                        <li className="mt-3">
                          According to paragraphs 3 and 4, what problems will be
                          solved if cars drive themselves? (2 marks)
                          <ol type="i">
                            <li>
                              <input name="q32"
                                type="text"
                                className="form-control mt-2"
                              />
                            </li>
                            <li>
                              <input name="q32"
                                type="text"
                                className="form-control mt-2"
                              />
                            </li>
                          </ol>
                        </li>

                        {/* question 33 */}
                        <li className="mt-3">
                          Which companies are excelling at making and developing
                          self-driving cars?
                          <input name="q33" type="text" className="form-control mt-2" />
                        </li>

                        {/* question 34 */}
                        <li className="mt-3">
                          What does the word “reshape” in line 2 refer to?
                          <input name="q34" type="text" className="form-control mt-2" />
                        </li>

                        {/* question 35 */}
                        <li className="mt-3">
                          What is the specialty of Waymo?
                          <input name="q35" type="text" className="form-control mt-2" />
                        </li>

                        {/* question 36 */}
                        <li className="mt-3">
                          What technologies help self-driving cars navigate and
                          avoid accidents? (3 marks)
                          <ol type="i">
                            <li>
                              <input name="q36"
                                type="text"
                                className="form-control mt-2"
                              />
                            </li>
                            <li>
                              <input name="q36"
                                type="text"
                                className="form-control mt-2"
                              />
                            </li>
                            <li>
                              <input name="q36"
                                type="text"
                                className="form-control mt-2"
                              />
                            </li>
                          </ol>
                        </li>

                        {/* question 37 */}
                        <li className="mt-3">
                          Are the following statements true (T), False (F), or
                          Not Given (NG)? (4 marks)
                          <ol type="i" className="mt-2">
                            <li className="mt-2">
                              There are more than 30,000 accidents in the United
                              States annually.{" "}
                              <InlineShortTextInput name="q37"/>
                            </li>
                            <li className="mt-2">
                              Self-driving technology is fallible.{" "}
                              <InlineShortTextInput name="q37"/>
                            </li>
                            <li className="mt-2">
                              Companies are yet to develop cars that can
                              communicate with each other.{" "}
                              <InlineShortTextInput name="q37"/>
                            </li>
                            <li className="mt-2">
                              The rise of self-driving cars could lead to job
                              displacement for thousands of professional drivers{" "}
                              <InlineShortTextInput name="q37"/>
                            </li>
                          </ol>
                        </li>

                        {/* question 38 */}
                        <li className="mt-3">
                          The word “subsidiary” can be replaced by which of the
                          following?
                          <div className="mt-2">
                              <RadioButton name="q38" id="A" label="Primary"></RadioButton>
                              <RadioButton name="q38" id="B" label="Secondary"></RadioButton>
                              <RadioButton name="q38" id="C" label="Complimentary"></RadioButton>
                              <RadioButton name="q38" id="D" label="Exclusive"></RadioButton>
                          </div>
                        </li>

                        {/* question 39 */}
                        <li className="mt-3">
                          Which of the following is NOT a positive impact of
                          self-driving cars?{" "}
                          <div className="mt-2">
                              <RadioButton name="q39" id="A" label="Accessibility for disabled people"></RadioButton>
                              <RadioButton name="q39" id="B" label="Lesser accidents"></RadioButton>
                              <RadioButton name="q39" id="C" label="Job displacement"></RadioButton>
                              <RadioButton name="q39" id="D" label="More productive journey"></RadioButton>
                          </div>
                        </li>

                        {/* question 40 */}
                        <li className="mt-3">
                          According to paragraphs 7 and 8, what two problems do
                          self-driving cars cause?
                          <ol type="i">
                            <li>
                              <input name="q40i"
                                type="text"
                                className="form-control mt-2"
                              />
                            </li>
                            <li>
                              <input name="q40ii"
                                type="text"
                                className="form-control mt-2"
                              />
                            </li>
                          </ol>
                        </li>

                        {/* question 41 */}
                        <li className="mt-3">
                          What does the word “shift” in paragraph 10 mean?
                          <div className="mt-2">
                              <RadioButton name="q41" id="A" label="Change"></RadioButton>
                              <RadioButton name="q41" id="B" label="Displacement"></RadioButton>
                              <RadioButton name="q41" id="C" label="Friction"></RadioButton>
                              <RadioButton name="q41" id="D" label="Flip"></RadioButton>
                          </div>
                        </li>

                        {/* question 42*/}
                        <li className="mt-3">
                          “Even that might be an understatement” in paragraph 9
                          suggests that the prices of autonomous cars…{" "}
                          <div className="mt-2">
                              <RadioButton name="q42" id="A" label="Could be less than 100,000$"></RadioButton>
                              <RadioButton name="q42" id="B" label="Could be even more than 100,000$"></RadioButton>
                              <RadioButton name="q42" id="C" label="Could be 200,000$"></RadioButton>
                              <RadioButton name="q42" id="D" label="Does not say anything about the price."></RadioButton>
                          </div>
                        </li>

                        {/* question 43 */}
                        <li className="mt-3">
                          Identify four main concerns that are holding back the
                          introduction of self-driving cars. (4 marks)
                          <ol type="i">
                            <li>
                              <input name="q43"
                                type="text"
                                className="form-control mt-2"
                              />
                            </li>
                            <li>
                              <input name="q43"
                                type="text"
                                className="form-control mt-2"
                              />
                            </li>
                            <li>
                              <input name="q43"
                                type="text"
                                className="form-control mt-2"
                              />
                            </li>
                            <li>
                              <input name="q43"
                                type="text"
                                className="form-control mt-2"
                              />
                            </li>
                          </ol>
                        </li>

                        {/* question */}
                        <li className="mt-3">
                          When is it better for a car to be operated manually
                          rather than by a machine? Give a reason from the text.
                          (2 marks)
                          <ol type="i">
                            <li>
                              <input name="q44"
                                type="text"
                                className="form-control mt-2"
                              />
                            </li>
                            <li>
                              <input name="q44"
                                type="text"
                                className="form-control mt-2"
                              />
                            </li>
                          </ol>
                        </li>

                        {/* question 45 */}
                        <li className="mt-3">
                          What does “navigating” in the title of the text mean?
                          <div className="mt-2">
                              <RadioButton name="q45" id="A" label="Steering"></RadioButton>
                              <RadioButton name="q45" id="B" label="Planning"></RadioButton>
                              <RadioButton name="q45" id="C" label="Hoping"></RadioButton>
                              <RadioButton name="q45" id="D" label="Rowing"></RadioButton>
                          </div>
                        </li>
                      </ol>
                    </CardBody>
                  </Card>

                  <div id="formControls" className="mt-5">
                      <center>
                        <h6>ENGLISH LANGUAGE PAPER 1 </h6>
                        <h6>PART B2</h6>
                        <h6>Reading Passages</h6>
                      </center>

                      <h6>GENERAL INSTRUCTIONS </h6>

                      <ol>
                        <li>
                          Refer to the General Instructions on Page 1 of the
                          Reading Passages booklet for Part A.
                        </li>
                      </ol>

                      <h6>INSTRUCTIONS FOR PART B2</h6>

                      <ol>
                        <li>
                          The Question-Answer Book for Part B2 is inserted in
                          this Reading Passages booklet.
                        </li>
                        <li>
                          Candidates who choose Part B2 should attempt all
                          questions in this part. Each question carries ONE mark
                          unless otherwise stated.
                        </li>
                        <li>
                          Hand in only ONE Question-Answer Book for Part B,
                          either B1 or B2, and fasten it with the
                          Question-Answer Book for Part A using the green tag
                          provided.
                        </li>
                      </ol>
                  </div>

                  <Card>
                    <CardBody>

                      <h6>PART B2</h6>

                      <p>
                        Refer to the General Instructions on Page 1 of the
                        Reading Passages booklet for Part A.
                      </p>

                      <h6>Text 5</h6>
                      <center>
                        <h6 className="text-underline">
                          Trapped in Your Own Mind - People and Mental Health
                          Issues
                        </h6>
                      </center>

                      <ol type="1">
                        <li className="mt-3">
                          It’s a battle that, for many, goes unseen and unheard.
                          It is a battle that can’t be won simply by taking down
                          the bad guy because how can you win if you’re fighting
                          against yourself? It’s an especially scary thought and
                          one that still haunts many people to this day. Though
                          now, it is no longer a battle that one has to fight
                          alone.
                        </li>
                        <li className="mt-3">
                          Mere decades ago, mental health issues were a taboo
                          subject in polite society, and in some cultures, it
                          still is today, particularly among the older or more
                          conservative crowd. It certainly wasn’t a topic that
                          one would handle with care. WWII soldiers who suffered
                          from PTSD (創傷後應激障礙) (Post-Traumatic Stress
                          Disorder) were treated with electroshock therapy
                          (電擊療法) (the equipment for which looked like it
                          came straight out of a horror movie, and it did,
                          Requiem For A Dream is haunting), or told to simply
                          “rest” with little to no professional help besides
                          that for their physical afflictions (煩惱). They were
                          expected to return to society and act like “normal”
                          human beings after bearing witness to unfathomable
                          (深不可測) horrors and trauma during the war, and
                          that's only if they weren’t subjected to them
                          themselves in the first place, which many were. And
                          that’s only talking about soldiers, people who served
                          their country in combat. Most people who were deemed
                          (視為) insane were confined to asylums (庇護所) for
                          the rest of their days by their own family members and
                          used in grotesque (怪誕) human experiments, treated as
                          less than human.
                        </li>
                        <li className="mt-3">
                          By the 80s, the attitude had shifted. For example, in
                          Britain, the establishment of the Mental Health Act
                          started the decades-long movement to address the issue
                          of the stigma surrounding mental illness. The Act
                          wasn’t perfect and has since been amended to be more
                          inclusive and humane (人道), but it was a starting
                          point to give people with mental illnesses the rights
                          that should have been theirs from the beginning when
                          they would have been left to fend for themselves
                          (自謀生路) in the shadows of society.
                        </li>
                        <li className="mt-3">
                          Nowadays, there’s still a stigma (柱頭) around it, but
                          people are more open and willing to talk about it. For
                          instance, most schools have guidance counselors, and
                          students are given wellness talks and made aware of
                          what they can do when struggling. Hospitals have
                          trauma (創傷) and grief (悲傷) counselors. Medication
                          and therapy are made inclusive and widely available.
                          There are days that specifically raise awareness for
                          mental health issues. "Shall We Talk" in Hong Kong has
                          similar objectives: promote mental well-being, enhance
                          public awareness, encourage help-seeking and early
                          intervention, and reduce the stigma around mental
                          health needs while providing help on their website.
                          It’s not perfect, but it’s getting better.
                        </li>
                        <li className="mt-3">
                          The unseen is now being shed light upon, but just
                          because something is more seen doesn’t mean that it
                          gets easier. Even now, the effects of mental health
                          take a toll on the person. No matter how quickly
                          people notice and swoop in to help, it’s not something
                          that can be dealt with quickly or easily. And all too
                          often, it isn’t noticed quickly or soon enough. Even
                          now, many people aren’t known to have poor mental
                          health until their death becomes a headline (大标题)
                          in the news, and by then it’s too late for regrets.
                          Mental health issues are a dark plume that surrounds
                          you from all sides and blocks out any and all rays of
                          sunshine. It is a time bomb that grows and ticks away
                          until it either explodes or implodes (內爆). And that
                          description barely scratches the surface of the
                          iceberg that is mental health issues. And for the
                          friends and family standing beside them through thick
                          and thin, helplessness is almost certain, knowing that
                          even if you reach out to help, sometimes, all too
                          often, they’re not reaching back.
                        </li>
                        <li className="mt-3">
                          So what can be done when someone you’re close to is
                          dealing with poor mental health? I’m sure you’ve heard
                          of lending an ear, but there are a few things to note
                          when doing so, and many more ways you can support
                          them.
                        </li>
                        <li className="mt-3">
                          Firstly, it’s important to bear in mind that there is
                          no definite way of knowing when someone is dealing
                          with mental health problems. You may notice changes in
                          mood or behavior if you know the person well, but even
                          then, it’s hard to tell. If you do suspect that
                          someone is going through mental health issues and want
                          to talk to them, then it’s of paramount importance
                          (最重要) that you respect them and explicitly show
                          that you respect them. They are possibly going through
                          some very tough times, and for them to talk to you
                          about them is an immense show of trust and
                          vulnerability (脆弱性). Honor that. Ask them
                          open-ended questions like “how are you feeling?” and
                          keep the language neutral. Don’t push them to share
                          how they’re doing; just let them lead the discussion
                          and put your focus into listening carefully to what
                          they’re saying. Give them your full attention. Chances
                          are, you aren’t a medical expert, so don't try to
                          offer a diagnosis (診斷). Instead, offer them help and
                          support in seeking professional help if needed. It can
                          be very scary hearing the darker thoughts that occupy
                          someone’s mind, but you should keep calm. The keywords
                          here are attention, respect, and calm.
                        </li>
                        <li className="mt-3">
                          For those who are experiencing mental health issues, I
                          don't think that I could even begin to adequately
                          (充分地) express all the ways that would help in a
                          book, much less in a single passage. But I do know
                          this. When you’re feeling trapped in the darkest
                          corners of the fog, reach out and keep reaching. There
                          are people reaching in to find you (even if they
                          aren’t your immediate friends and family, even if they
                          are people you might not yet know), and chances are
                          the numbers are far greater than you would believe,
                          and they might be just enough to pull you out of the
                          fog and into the sun again. It’s a terrifying battle,
                          but it isn’t one you have to fight alone, no matter
                          how much you feel like it is.
                        </li>
                      </ol>

                      <div>
                        <i>
                          Below are some other mental health resources in Hong
                          Kong:{" "}
                        </i>

                        <h6 className="mt-4">
                          Counseling or private mental health services:
                        </h6>
                        <p>
                          Psychology Matters Asia <br />
                          Therapy Route
                          <br />
                          The Hong Kong College of Psychiatrists
                        </p>

                        <h6>Community or Government Based Services: </h6>
                        <p>
                          Mind HK
                          <br />
                          Joyful Mental Health Foundation <br />
                          Baptist Oi Kwan Social Services
                        </p>

                        <h6>Support and self-help groups:</h6>
                        <p>
                          Smart Recovery
                          <br />
                          OCD and Anxiety Support Group
                        </p>

                        <h6>Emergency and Suicide Prevention Services:</h6>
                        <p>
                          The Samaritans
                          <br />
                          IAMALive
                          <br />
                          Suicide Prevention Services
                        </p>

                        <h6>Online Counseling: </h6>
                        <p>7 Cups Of Tea </p>
                      </div>

                      <center>
                        <h5>END OF READING PASSAGES</h5>
                      </center>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody>
                      <p>B2 Text 5 (total 40 marks) </p>

                      <ol type="1" start="46" className="mt-4">
                        {/* question 46*/}
                        <li>
                          Why is the thought of mental health an “especially
                          scary” one?
                          <textarea name="q46" type="text" className="form-control mt-2" />
                        </li>

                        {/* question 47 */}
                        <li className="mt-3">
                          According to paragraphs 7 and 8, what two problems do
                          self-driving cars cause?
                          <ol type="i">
                            <li>
                              <input
                                type="text" name="q47"
                                className="form-control mt-2"
                              />
                            </li>
                            <li>
                              <input
                                type="text" name="q47"
                                className="form-control mt-2"
                              />
                            </li>
                            <li>
                              <input
                                type="text" name="q47"
                                className="form-control mt-2"
                              />
                            </li>
                            <li>
                              <input
                                type="text" name="q47"
                                className="form-control mt-2"
                              />
                            </li>
                          </ol>
                        </li>

                        {/* question 48 */}
                        <li className="mt-3">
                          Which word can be replaced with the word “monstrous ”
                          in paragraph 2 ?{" "}
                          <input type="text" name="q48" className="form-control mt-2" />
                        </li>

                        {/* question 49 */}
                        <li className="mt-3">
                          “Though now , it is no longer a battle that one has to
                          fight alone.” (Paragraph 1) What does the “it” refer
                          to?
                          <input type="text" name="q49" className="form-control mt-2" />
                        </li>

                        {/* question 50 */}
                        <li className="mt-4">
                          Below is a summary of paragraphs 2-3. Fill in each
                          blank with one word . Please note that all answers
                          should be grammatically correct. (4 marks)
                          <div className="mt-4">
                            <p>
                              After WWII , soldiers were treated for their
                              physical injuries , but their psychological
                              <InlineTextInput name="q50"/>
                              remained unaddressed . Other people who suffered
                              from mental health issues were considered{" "}
                              <InlineTextInput name="q50"/>
                              and confined to{" "}
                              <InlineTextInput name="q50"/>
                              (庇護所) , where they were treated as less than
                              human and subjected to
                              <InlineTextInput name="q50"/>
                              (怪誕的) experiments and inhumane treatment .
                              Since the 80s , people have been fighting to
                              combat the stigma that surrounds mental health
                              issues .{" "}
                            </p>
                          </div>
                        </li>

                        {/* question 51*/}
                        <li className="mt-4">
                          Are the following statements True (T), False (F), or
                          Not Given (NG)? (6 marks)
                          <ul className="mt-2">
                            <li>
                              Britain was the first country to combat the stigma
                              surrounding mental health issues
                              <InlineShortTextInput name="q51"/>
                            </li>

                            <li className="mt-2">
                              Students are made aware of mental wellness early
                              in school
                              <InlineShortTextInput name="q51"/>
                            </li>

                            <li className="mt-2">
                              People with mental health issues were treated like
                              people in the early half of the 20th century
                              <InlineShortTextInput name="q51"/>
                            </li>
                          </ul>
                        </li>

                        {/* question 52 */}
                        <li className="mt-3">
                          What is the main idea of paragraphs 2-4
                          <textarea name="q52" type="text" className="form-control mt-2" />
                        </li>

                        {/* question 53 */}
                        <li className="mt-4">
                          Below is a summary of paragraph 7. However , there is
                          one mistake on 3 of the lines which has been
                          underlined. Replace the word with one that expresses
                          the correct idea . Write the word in the space on the
                          right . (3 marks)
                          <table className="table table-bordered mt-3">
                            <thead>
                              <tr>
                                <th scope="col">No.</th>
                                <th scope="col">Sentence
                                </th>
                                <th scope="col">Correction</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td scope="col">eg</td>
                                <td scope="col">
                                  There is <u>a</u> definite way of knowing when
                                  someone has mental{" "}
                                </td>
                                <td scope="col">no</td>
                              </tr>
                              <tr>
                                <td>1. </td>
                                <td>
                                  ..health problems. You should <u>implicitly</u> show that you respect{" "}
                                </td>
                                <td>
                                <InlineTextInput name="q53"/>
                                </td>
                              </tr>
                              <tr>
                                <td>2. </td>
                                <td>
                                  …them . Keep the language neutral and the
                                  questions <u>closed</u>.
                                </td>
                                <td>
                                <InlineTextInput name="q53"/>
                                </td>
                              </tr>{" "}
                              <tr>
                                <td>3. </td>
                                <td>
                                  You should focus on listening to what they
                                  have to say and let…..{" "}
                                </td>
                                <td>N/A
                                </td>
                              </tr>{" "}
                              <tr>
                                <td>4.</td>
                                <td><u>yourself</u> lead the conversation. </td>
                                <td>
                                <InlineTextInput name="q53"/>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </li>

                        {/* question 54*/}
                        <li className="mt-3">
                          Explain how mental health issues are fog or a time
                          bomb . Explain in your own words . (2 marks){" "}
                          <textarea name="q54" type="text" className="form-control mt-2" />
                        </li>

                        {/* question 55*/}
                        <li className="mt-3">
                          Why are mental health issues no longer a battle that
                          one has to fight alone ? Explain with evidence from
                          the whole passage . (3 marks){" "}
                          <textarea name="q55" type="text" className="form-control mt-2" />
                        </li>

                        {/* question 56*/}
                        <li className="mt-3">
                          In paragraph 7, what is urgently instructed to be kept under consideration?
                          <textarea name="q56" type="text" className="form-control mt-2" />
                        </li>

                        {/* question 57*/}
                        <li className="mt-3">
                        What has been asked to honor in paragraph 7?
                          <textarea name="q57" type="text" className="form-control mt-2" />
                        </li>

                        {/* question 58*/}
                        <li className="mt-3">
                          The word “battle” in the first paragraph is synonymous to which of the following?
                          <div className="mt-2">
                              <RadioButton name="q58" id="A" label="Conflict"></RadioButton>
                              <RadioButton name="q58" id="B" label="Dispute"></RadioButton>
                              <RadioButton name="q58" id="C" label="Fight"></RadioButton>
                              <RadioButton name="q58" id="D" label="Wrestle"></RadioButton>
                          </div>
                        </li>

                        {/* question 59 */}
                        <li className="mt-3">
                          According to paragraph 5, what is being shed light upon now?
                          <textarea name="q59" type="text" className="form-control mt-2" />
                        </li>

                        {/* question 60 */}
                        <li className="mt-3">
                          Complete this partial summary of the text using only ONE word from the 
                          passage. (5 marks)
                          <div className="m-1 mt-4">
                          The text discusses the often unnoticed and internal i)<InlineTextInput name="q60"/> of mental 
                          health, highlighting historical stigmas and the evolving shift towards 
                          openness in addressing the issue. While acknowledging the existing 
                          stigma, it points to current efforts such as school ii)<InlineTextInput name="q60"/> and 
                          awareness iii)<InlineTextInput name="q60"/>. The text emphasizes the challenges of 
                          recognizing mental iv)<InlineTextInput name="q60"/> problems, the toll it takes, and the 
                          difficulty in seeking help. It describes mental health as a pervasive 
                          darkness with potential consequences revealed only when it becomes 
                          v)<InlineTextInput name="q60"/> news. 
                          </div>
                        </li>

                        {/* question 61 */}
                        <li className="mt-3">
                          What is considered a “dark plume” in the text?
                          <textarea name="q61" type="text" className="form-control mt-2" />
                        </li>

                        {/* question 62 */}
                        <li className="mt-3">
                          Match the following headings (A-D) with the paragraphs 1 to 4. (4 marks)
                          <table className="table table-bordered mt-3">
                            <thead>
                              <tr>
                                <th scope="col">Headings</th>
                                <th scope="col">Paragraph</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>A. An Act of Change</td>
                                <td><InlineShortTextInput name="q62"/></td>
                              </tr>
                              <tr>
                                <td>B. The Battle Within</td>
                                <td><InlineShortTextInput name="q62"/></td>
                              </tr>
                              <tr>
                                <td>C. Battle against the Stigma</td>
                                <td><InlineShortTextInput name="q62"/></td>
                              </tr>
                              <tr>
                                <td>D. All the Wrong Treatments</td>
                                <td><InlineShortTextInput name="q62"/></td>
                              </tr>
                            </tbody>
                          </table>
                        </li>

                      </ol>
                    </CardBody>
                  </Card>
                </div>
    </>
  );
  return (<ReadingPaper year="2015" paper={paper} totalQuestions="62" specialQuestions="9i,9ii,9iii,40i,40ii,43i,43ii,43iii,43iv,44i,44ii"/>) 
};

export default Reading01;
