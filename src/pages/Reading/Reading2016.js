import React from "react";
import { Card, CardBody } from "../../components/card/card";
import { RadioButton } from "../../components/radio/radio";
import { InlineTextInput, InlineShortTextInput } from "../../components/inlinetextinput/inlinetextinput";
import { ReadingPaper } from "./reading";

const Reading2016 = () => {
  const paper = (
    <>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#/">READING</a>
                  </li>
                  <li className="breadcrumb-item active">2016</li>
                </ul>
                <h1 className="page-header">
                  2016 Reading Mock Paper
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
                      There are two parts (A and B) in this paper. All
                      candidates should attempt Part A. In Part B, you should
                      attempt either Part B1 (easier section) OR Part B2 (more
                      difficult section). Candidates attempting Parts A and B2
                      will be able to attain the full range of levels, while
                      Level 4 will be the highest level attainable for
                      candidates attempting Parts A and B1.
                    </li>
                  </ol>

                  <h6>INSTRUCTIONS FOR PART A</h6>

                  <ol>
                    <li>
                      The Question-Answer Book for Part A is inserted in this
                      Reading Passages booklet.
                    </li>
                    <li>
                      Attempt ALL questions in Part A. Each question carries ONE
                      mark unless otherwise stated.
                    </li>
                  </ol>
                </div>
                <Card>
                  <CardBody className="pb-2">
                    <center>
                      <h6>15 Taboos From Around The World</h6>
                    </center>

                    <ol>
                      <li className="mt-2">
                        Failing to Tip at a Restaurant in the US: Not every
                        country has the culture of tipping after meals, but not
                        doing it in the US is considered very rude.
                      </li>
                      <li className="mt-2">
                        Eye Contact with Authorities: This might sound odd to
                        most of us, but Australian Aboriginal (土著) cultures
                        see this as a sign of defiance (蔑視) rather than
                        respect.
                      </li>
                      <li className="mt-2">
                        Asking a Woman Her Age: Perhaps one of the more common
                        taboos in global modern society, it simply makes women
                        uncomfortable and feels offensive.
                      </li>
                      <li className="mt-2">
                        Refusing a Gift: While it is okay to not like what you
                        were given, it is generally in poor taste to express
                        such thoughts in the company of the gift giver. Exchange
                        or return if you must, but preferably not when they are
                        around.
                      </li>
                      <li className="mt-2">
                        Wearing Shorts: Want to cool down with shorts instead of
                        long pants? If you're a man in countries like Morocco,
                        then that is considered to be "too relaxed" when you're
                        in public.
                      </li>
                      <li className="mt-2">
                        Elbows Off the Table: You should know to keep your feet
                        off the table, but what about your elbows? Better keep
                        them off as well in Western nations. Even though it was
                        originally designed to prevent fights, now it is just
                        something people avoid doing.
                      </li>
                      <li className="mt-2">
                        Talking about Business, Politics, or Religion at Dinner:
                        Since these topics tend to cause disagreements amongst
                        people, it is best to avoid them to form a more
                        inclusive (包容性) environment.
                      </li>
                      <li className="mt-2">
                        Showing Your Shoulders: Women are expected to dress
                        conservatively (保守地) and modestly in many Arab
                        countries. Travelers often wear shawls (披肩) over their
                        shoulders in respect.
                      </li>
                      <li className="mt-2">
                        Chewing With Your Mouth Open: Probably one of the most
                        common taboos in society, it just doesn't look good at
                        all, which is why we're taught from an early age to eat
                        with our mouths closed.
                      </li>
                      <li className="mt-2">
                        Showing the Bottom of Your Feet: Many Asian and Middle
                        Eastern nations find the bottom of your feet offensive,
                        so it's best not to show it. And it is certainly not
                        okay to point with your foot.
                      </li>
                      <li className="mt-2">
                        Swearing: While an understandable and common way to vent
                        (發洩) and show frustration (挫折), it would certainly
                        be unbecoming to swear in a business or formal setting
                        or even with a more conservative crowd.
                      </li>
                      <li className="mt-2">
                        Standing Too Close Together: Even before the pandemic,
                        many Western nations considered walking or standing too
                        close together to be either too intimate (親密的) or an
                        invasion of personal space.
                      </li>
                      <li className="mt-2">
                        Discussing Your Financials: It is particularly frowned
                        upon in Britain, but it's also best not to discuss your
                        financial situation in general.
                      </li>
                      <li className="mt-2">
                        Excessive Eye Contact with the Opposite Sex: In Arab
                        cultures, this can be seen as flirtatious (妖艷).
                      </li>
                      <li className="mt-2">
                        Photographing Strangers: Doing so without their
                        permission is considered an invasion of privacy
                        worldwide and is even illegal in some cases. If they are
                        in the background of pictures, their faces should be
                        blurred (模糊) before sharing.
                      </li>
                    </ol>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody className="pb-2">
                    <center>
                      <h6>
                        {" "}
                        Bloody Business: — Thinking Outside The Taboos Regarding
                        Menstruation{" "}
                      </h6>
                    </center>

                    <ol>
                      <li className="mt-2">
                        {" "}
                        According to the Oxford Dictionary, a taboo is "a social
                        or religious custom prohibiting or restricting a
                        particular practice or forbidding association with a
                        particular person, place, or thing."
                      </li>
                      <li className="mt-2">
                        {" "}
                        Some taboos are explicitly (明確地) forbidden, for
                        example, by the law for acts like drugs or murder.
                        Others are brought upon by social norms or conventions.
                        While taboos are often intended to protect an individual
                        or community, such as those with medical implications,
                        they are also often based on religious or spiritual
                        beliefs.
                      </li>
                      <li className="mt-2">
                        {" "}
                        One of the more prominent (著名) taboos surrounds
                        menstrual blood. To quote Maia Schwartz, "Menstruation
                        is the only blood that is not born from violence, yet
                        it's the one that disgusts you the most." On the website
                        titled "Your Period Called," many people have sought
                        answers about this question. Swedish journalist Anna
                        Dahlqvist conducted research for her book "It's Only
                        Blood," interviewing menstruators from around the world
                        and found period shame to be a global phenomenon. But
                        how did a normal human bodily function garner so much
                        shame and disgust in the first place?
                      </li>
                      <li className="mt-2">
                        {" "}
                        As it turns out, menstrual taboos date back to the
                        beginning of human civilizations. In ancient society,
                        menstruating women were believed to have dangerous
                        supernatural (超自然) powers and could control moon
                        cycles, seasonal changes, and more. Consequently, primal
                        (原始的) men created taboos around periods to warn their
                        fellow comrades (同志們).
                      </li>
                      <li className="mt-2">
                        {" "}
                        Here is a list of beliefs about menstrual blood:
                      </li>
                      <li className="mt-2">
                        {" "}
                        Primitive societies (e.g. Papua New Guinea
                        (巴布亞新幾內亞): Men would get sick, become stupid,
                        have darker skin, or even die if they came in contact
                        with menstrual blood. Tinne indigenous (土著) people in
                        Canada: Any contact with a menstruating woman would
                        cause a man to lose his manliness. During the Medieval
                        (中世紀) times: Male genitalia that touched period blood
                        would burst into flames, and any child conceived (受孕)
                        during menstruation would be possessed by the devil,
                        deformed (變形), or born with red hair. And perhaps the
                        most outrageously (令人憤慨地) hilarious (搞笑) belief
                        out there: Menstruating women caused bacon to rot!
                      </li>
                      <li className="mt-2">
                        {" "}
                        Surprisingly enough, even technological and educational
                        advancements during modern times didn't entirely
                        eradicate these taboos. Did misconceptions lessen to
                        some extent? Yes. But even now, in the 21st century,
                        periods have been depicted (描繪) as a "hygienic crisis"
                        and something to be kept hidden. In the early 20th
                        century, pads and tampons were sold in boxes disguised
                        as tissue boxes to "save embarrassment"!
                      </li>
                      <li className="mt-2">
                        {" "}
                        Need I remind you that menstruation is a completely
                        normal bodily function for half of the human population?
                      </li>
                      <li className="mt-2">
                        {" "}
                        My point is that while taboos may originate from good
                        intentions, many times they can be rather outdated
                        (過時) in modern society. It's understandable when
                        people had limited resources and could do nothing but
                        speculate (推測), or when taboos don't harm anyone or
                        are a display of decency (正派). However, it becomes
                        contradictory (矛盾) when existing evidence contradicts
                        the taboos or even harmful when the taboos have negative
                        consequences on something that shouldn't be harmful in
                        the first place. Did you know that people are still
                        shunned (迴避) from society during their periods and
                        forced to live in isolation (隔離) until they are
                        considered "clean" again? Did you know that women have
                        literally died because of such practices, even though
                        officials banned them in the '80s?
                      </li>
                      <li className="mt-2">
                        {" "}
                        So what can be done about it? It's simple, really. Have
                        an open mind and critically think about what we've been
                        taught. Better yet, educate yourself about them. After
                        all, we have the Internet at our fingertips. Like I said
                        at the beginning, not all taboos are based solely on
                        superstition (過時); some have factual origins. People
                        shouldn't dismiss things simply because they're taboo;
                        instead, they should try to understand why they became
                        taboos in the first place. Sometimes, they should even
                        question whether they should remain taboos, such as
                        discussing periods or sexuality education, both of which
                        are not taught as much as they should be, despite being
                        normal human experiences. Should we continue to shy away
                        from things because of social norms created centuries or
                        even millennia ago, or should we open our minds and see
                        things as they are, not just as we've been taught? You
                        decide.
                      </li>
                    </ol>

                    <i>
                      Source: "Why and When Did Menstruation Become Taboo" by
                      Kayla Davidge.
                    </i>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody className="pb-2">
                    <p>Read Texts 1-2 and answer questions 1-23. (41 marks)</p>
                    <h6>Text 1</h6>
                    <ol>
                      {/* question 1 */}
                      <li>
                        Match the taboo with its country of origin. One has been
                        done as an example . (2 marks)
                        <ol type="A">
                          <li>US</li>
                          <li>Australia</li>
                          <li>Britan</li>
                          <li>China</li>
                        </ol>
                        <ul className="mt-2">
                          <li>
                            Eye contact with authorities
                            <input type="text" value="B" disabled="disabled" className="form-control mt-2" />
                          </li>

                          <li className="mt-2">
                            Not tipping at restaurants.
                            <input type="text" name="q1" className="form-control mt-2" />
                          </li>

                          <li className="mt-2">
                            Discussing the financial situation
                            <input type="text" name="q1" className="form-control mt-2" />
                          </li>
                        </ul>
                      </li>

                      {/* question 2*/}
                      <li className="mt-3">
                        Which of the taboos match the following descriptions ?
                        List 2 examples for the first one and 1 example of the
                        second question. (3 mark)
                        <div className="mt-3">
                          <p>The taboos are specific to only one gender :</p>
                          <ul>
                            <li className="mb-3">
                              <input type="text" name="q2" className="form-control" />
                            </li>
                            <li className="mb-3">
                              <input type="text" name="q2" className="form-control" />
                            </li>
                          </ul>
                        </div>
                        <div className="mt-3">
                          <p>Which taboos are applied worldwide : </p>
                          <ul>
                            <li className="mb-3">
                              <input type="text" name="q2" className="form-control" />
                            </li>
                          </ul>
                        </div>
                      </li>

                      {/* question 3*/}
                      <li className="mt-4">
                        Which of the following should be avoided at dinner?
                        <br />
                        (i) Funny anecdotes
                        <br />
                        (ii) Politics
                        <br />
                        (iii)Religion
                        <div className="mt-2">
                            <RadioButton name="q3" id="A" label="(i)"></RadioButton>
                            <RadioButton name="q3" id="B" label="(ii) and (iii)"></RadioButton>
                            <RadioButton name="q3" id="C" label="(i) and (iii)"></RadioButton>
                            <RadioButton name="q3" id="D" label="All of the above"></RadioButton>
                        </div>
                      </li>

                      {/* question 4*/}
                      <li className="mt-3">
                        You are at a restaurant in the US? What are 3 things you
                        should take note of ? (3 marks)
                        <div className="mt-2">
                          <ul>
                            <li className="mb-3">
                              <input name="q4" type="text" className="form-control" />
                            </li>

                            <li className="mb-3">
                              <input name="q4" type="text" className="form-control" />
                            </li>
                            <li className="mb-3">
                              <input name="q4" type="text" className="form-control" />
                            </li>
                          </ul>
                        </div>
                      </li>

                      {/* question 5 */}
                      <li className="mt-3">
                        What should you do if you have received a present you do
                        not like?
                        <div className="mt-2">
                          <ul>
                            <li className="mb-3">
                              <input name="q5" type="text" className="form-control" />
                            </li>
                            <li className="mb-3">
                              <input name="q5" type="text" className="form-control" />
                            </li>
                          </ul>
                        </div>
                      </li>

                      {/* question 6 */}
                      <li className="mt-4">
                        Which of the following are clothes that cannot be worn
                        respectably in Arab countries?
                        <div className="mt-2">
                            <RadioButton name="q6" id="A" label="Ankle length dresses and pants"></RadioButton>
                            <RadioButton name="q6" id="B" label="Shawls"></RadioButton>
                            <RadioButton name="q6" id="C" label="Long sleeved shirts"></RadioButton>
                            <RadioButton name="q6" id="D" label="Spaghetti straps (細肩帶)"></RadioButton>
                        </div>
                      </li>

                      {/* question 7*/}
                      <li className="mt-4">
                        According to the passage , which of the following
                        statements are True (T) , False(F) or Not Given(NG)? (3
                        marks)
                        <ul className="mt-2">
                          <li>
                            Women should wear long skirts in Morocco(摩洛哥). <InlineShortTextInput name="q7"/>
                          </li>

                          <li className="mt-2">
                            It is okay to gesture with your foot in Asian and
                            Middle Eastern nations. <InlineShortTextInput name="q7"/>
                          </li>

                          <li className="mt-2">
                            It is good to respect peoples’ personal space. <InlineShortTextInput name="q7"/>
                         </li>
                        </ul>
                      </li>
                    </ol>

                    <h6>Text 2</h6>
                    <ol start="8">
                      {/* question 8*/}
                      <li className="mt-4">
                        Find one example of a superstition(迷信) in paragraph
                        2..
                        <input name="q8" type="text" className="form-control mt-2" />
                      </li>

                      {/* question 9*/}
                      <li className="mt-3">
                        Are the following statements True (T) , False (F) or Not
                        Given (NG)?(3 marks) Hint: paragraph 6
                        <div>
                          <ol type="i">
                            <li className="my-2">
                              Menstruation taboos no longer exist nowadays. <InlineShortTextInput name="q9"/>
                            </li>
                            <li className="my-2">
                              Menstruation was a taboo in ancient China. <InlineShortTextInput name="q9"/>
                            </li>
                            <li className="my-2">
                              Half the human population menstruated. <InlineShortTextInput name="q9"/>
                            </li>
                          </ol>
                        </div>
                      </li>

                      {/* question 10 */}
                      <li className="mt-4">
                        When did the taboo surrounding menstruation begin?
                        <input name="q10" type="text" className="form-control mt-2" />
                      </li>

                      {/* question 11*/}
                      <li className="mt-4">
                        What was the tone of the sentence “Oh wow, we women had
                        supernatural powers during our period . Who knew?” Hint:
                        it’s clear the author thought this statement was
                        ridiculous, hence this sentence was sarcastic.
                        <div className="mt-2">
                            <RadioButton name="q11" id="A" label="Sarcastic (諷刺)"></RadioButton>
                            <RadioButton name="q11" id="B" label="Surprised"></RadioButton>
                            <RadioButton name="q11" id="C" label="Amused"></RadioButton>
                            <RadioButton name="q11" id="D" label="Astonished"></RadioButton>
                        </div>
                      </li>

                      {/* question 12 */}
                      <li className="mt-4">
                        What was the purpose of the list of taboos?{" "}
                        <textarea name="q12" type="text" className="form-control mt-2" />
                      </li>

                      {/* question 13*/}
                      <li className="mt-3">
                        According to the passage , in what cases are taboos bad
                        ? (2 marks) When
                        <div>
                          <ol type="i">
                            <li className="my-2">
                              <input name="q13" type="text" className="form-control" />
                            </li>
                          </ol>
                        </div>
                      </li>

                      {/* question 14*/}
                      <li className="mt-3">
                        What or who does the “they” in paragraph 2 refer to?
                        <input name="q14" type="text" className="form-control mt-2" />
                      </li>

                      {/* question 15*/}
                      <li className="mt-4">
                        Fill in the following paragraph with ONE word from
                        paragraph 6-9 in each blank. Make sure that the answers
                        are grammatically accurate . (5 marks)
                        <div className="m-1">
                          <p>
                            Whilst the <InlineTextInput name="q15"/> could have been attributed 
                            to <InlineTextInput name="q15"/> before the age 
                            of <InlineTextInput name="q15"/> and technology, many taboos have 
                            now been disproven and yet still <InlineTextInput name="q15"/>. Hence, 
                            it is important that we keep ourselves educated and <InlineTextInput name="q15"/>.
                          </p>
                        </div>
                      </li>

                      {/* question 16*/}
                      <li className="mt-4">
                        What is NOT a way to deal with taboos ?
                        <div className="mt-2">
                            <RadioButton name="q16" id="A" label="Educate oneself."></RadioButton>
                            <RadioButton name="q16" id="B" label="Be disrespectful about them"></RadioButton>
                            <RadioButton name="q16" id="C" label="Be open-minded"></RadioButton>
                            <RadioButton name="q16" id="D" label="Have critical thinking"></RadioButton>
                        </div>
                      </li>

                      {/* question 17*/}
                      <li className="mt-4">
                        Match the subheadings with the paragraph number . (5
                        marks)
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
                                1.The Disgust With Human Anatomy (解剖學){" "}
                              </td>
                              <td>
                                <InlineTextInput name="q17"/>
                              </td>
                            </tr>

                            <tr>
                              <td>2.The Harm of Misconceptions. </td>
                              <td>
                                <InlineTextInput name="q17"/>
                              </td>
                            </tr>

                            <tr>
                              <td>3. Open Your Mind </td>
                              <td>
                                <InlineTextInput name="q17"/> 
                              </td>
                            </tr>

                            <tr>
                              <td>4.Bloody Beliefs Through The Ages. </td>
                              <td>
                                <InlineTextInput name="q17"/>
                              </td>
                            </tr>

                            <tr>
                              <td>5.When It All Began.</td>
                              <td>
                                <InlineTextInput name="q17"/>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </li>

                      {/* question 18*/}
                      <li className="mt-4">
                        Which phrase had a similar meaning to “look down upon”?{" "}
                        <input type="text" name="q18" className="form-control mt-2" />
                      </li>

                      {/* question 19*/}
                      <li className="mt-4">
                        What is the suggested solution for dealing with taboos,
                        according to paragraph 10?
                        <div className="mt-2">
                          <RadioButton name="q19" id="A" label="Dismiss them without questioning"></RadioButton>
                          <RadioButton name="q19" id="B" label="Have an open mind and critically think about them"></RadioButton>
                          <RadioButton name="q19" id="C" label="Avoid any discussion about them"></RadioButton>
                          <RadioButton name="q19" id="D" label="Adhere strictly to social norms"></RadioButton>
                        </div>
                      </li>

                      {/* question 20*/}
                      <li className="mt-4">
                        According to the passage, why should people educate
                        themselves about taboos?
                        <div className="mt-2">
                            <RadioButton name="q20" id="A" label="To conform to social norms"></RadioButton>
                            <RadioButton name="q20" id="B" label="To dismiss them entirely"></RadioButton>
                            <RadioButton name="q20" id="C" label="To understand their factual origins"></RadioButton>
                            <RadioButton name="q20" id="D" label="To blindly follow tradition"></RadioButton>
                        </div>
                      </li>

                      {/* question 21*/}
                      <li className="mt-4">
                        What does the passage emphasize about taboos and
                        superstition?
                        <div className="mt-2">
                            <RadioButton name="q21" id="A" label="All taboos are based solely on superstition"></RadioButton>
                            <RadioButton name="q21" id="B" label="Taboos and superstition have no connection"></RadioButton>
                            <RadioButton name="q21" id="C" label="Some taboos have factual origins"></RadioButton>
                            <RadioButton name="q21" id="D" label="Taboos are irrelevant in modern society"></RadioButton>
                        </div>
                      </li>

                      {/* question 22*/}
                      <li className="mt-4">
                        How does the passage describe the availability of
                        information on taboos?
                        <div className="mt-2">
                            <RadioButton name="q22" id="A" label="Abundant, thanks to the Internet</RadioButton"></RadioButton>
                            <RadioButton name="q22" id="B" label="Limited, as information is not accessible"></RadioButton>
                            <RadioButton name="q22" id="C" label="Unreliable, as taboos are often misrepresented"></RadioButton>
                            <RadioButton name="q22" id="D" label="Controlled, with restricted access"></RadioButton>
                        </div>
                     </li>
                      {/* question 23*/}
                      <li className="mt-4">
                        What is the message conveyed about discussing periods
                        and sexuality education?
                        <div className="mt-2">
                            <RadioButton name="q23" id="A" label="They are irrelevant topics"></RadioButton>
                            <RadioButton name="q23" id="B" label="They are not normal human experiences"></RadioButton>
                            <RadioButton name="q23" id="C" label="They should remain taboos"></RadioButton>
                            <RadioButton name="q23" id="D" label="They are normal human experiences that should be discussed more"></RadioButton>
                        </div>
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
                  <h6 className="mt-4">GENERAL INSTRUCTIONS</h6>

                  <ol>
                    <li>
                      Refer to the general instructions on page 1 of the Reading
                      Passages booklet for Part A
                    </li>
                  </ol>

                  <h6>INSTRUCTIONS FOR PART B1</h6>

                  <ol>
                    <li>
                      Candidates who choose Part B1 should attempt all questions
                      in this part. Each question carries ONE mark unless stated
                      otherwise.
                    </li>
                  </ol>
                </div>

                <Card>
                  <CardBody>
                    <center>
                      <h4>Food Truck Review: Tasty Tacos on Wheels</h4>
                    </center>

                    <ol>
                      <li>
                        {" "}
                        The menu offered a nice balance of meat and vegetarian
                        options, catering to various preferences. Prices were
                        reasonable, making it an affordable choice for a quick
                        and satisfying meal on the go. I opted for the classic
                        beef tacos and was pleasantly surprised by the generous
                        portions and fresh ingredients. The seasoned beef was
                        flavorful and well-cooked, complemented by a medley of
                        crisp vegetables. Limited seating, but the overall
                        experience was quick, delicious, and deserving of a
                        solid 4.5 out of 5. Recommended for a tasty and
                        convenient taco fix.
                      </li>
                    </ol>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody>
                    <h4>Hong Kong Times</h4>
                    <h6>25th January 2015</h6>

                    <ol>
                      <li>
                        In a potential gastronomic shake-up, sources indicate
                        that Hong Kong authorities are exploring the
                        introduction of food trucks to select areas in the
                        coming March of this year. This move could herald a new
                        era for street food enthusiasts, bringing diverse and
                        innovative culinary options to the bustling streets of
                        the city.
                      </li>
                      <li>
                        “Social media has been buzzing with anticipation, with
                        many expressing eagerness to experience the convenience
                        and variety that food trucks bring,” says Financial
                        Secretary Sang Fischer. The move aligns with global
                        trends, as cities worldwide embrace the mobile eatery
                        culture, offering a unique and accessible way to savor
                        gourmet treats.
                      </li>
                    </ol>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <h4>Letter to the Editor II 30th January 2015</h4>

                    <ol start="4">
                      <li>
                        I am writing to share my apprehensions about the
                        proposed introduction of food trucks to the bustling
                        streets of Hong Kong. While the idea of embracing a
                        global culinary trend is enticing, it is crucial to
                        carefully consider the potential downsides that could
                        impact the city's unique urban fabric.
                      </li>
                      <li>
                        One major concern revolves around the limited space
                        available on Hong Kong's streets. The city is renowned
                        for its densely populated areas, and the addition of
                        food trucks might exacerbate existing congestion issues.
                        This could lead to disruptions in traffic flow, posing
                        safety hazards for both pedestrians and motorists.
                      </li>
                      <li>
                        Another aspect that merits attention is the potential
                        impact on Hong Kong's vibrant street food culture. Local
                        vendors and traditional stalls have long been an
                        integral part of the city's culinary identity.
                        Introducing food trucks may inadvertently lead to
                        increased competition, potentially jeopardizing the
                        livelihoods of these established businesses.
                      </li>
                      <li>
                        {" "}
                        Hygiene and waste disposal are critical considerations
                        as well. Ensuring that food trucks adhere to the same
                        stringent hygiene standards as traditional eateries is
                        imperative to safeguard public health. Additionally,
                        addressing the potential increase in litter and waste
                        generated by these mobile kitchens requires thorough
                        planning and monitoring.
                      </li>
                      <li>
                        In light of these considerations, I strongly urge the
                        relevant authorities to conduct a comprehensive
                        feasibility study before greenlighting the introduction
                        of food trucks. Engaging in open dialogue with the
                        community is equally vital to ensure that the concerns
                        and perspectives of residents and businesses are taken
                        into account.
                      </li>
                    </ol>
                    <p>
                      Sincerely,
                      <br />
                      Sarah Brightly
                    </p>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody>
                    <h4>Letter to the Editor II 1st March 2015</h4>

                    <ol start="9">
                      <li>
                        {" "}
                        I refer to the letter by Sarah Brightly dated 22nd
                        December 2015. I understand her concerns but some of the
                        issues she raised are solutions to existing problems.
                      </li>
                      <li>
                        Preserving the unique street food culture of Hong Kong
                        is of utmost importance. I share your concern for the
                        livelihoods of these established businesses. I believe
                        that a careful and strategic implementation plan,
                        coupled with measures to support existing vendors, could
                        help maintain the city's rich culinary diversity.
                      </li>
                      <li>
                        {" "}
                        We are moving Food Hawkers’ street-level outdoor stalls
                        to food courts inside buildings. Furthermore, I have
                        seen some local vans selling lunch boxes in industrial
                        areas like Tai Ko. They offer a useful service because
                        there are no available fast food shops in these areas.
                        Allowing food trucks will greatly help with food
                        accessibility all over Hong Kong.
                      </li>
                    </ol>
                    <p>Samuel Tsang</p>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody>
                    <h4>Letter to the Editor II 5th March 2015</h4>

                    <ol start="12">
                      <li>
                        Food trucks are popular all over the world because they
                        are cheap and convenient for people who barely get time
                        to prepare meals or can’t afford to eat in restaurants
                        everyday. One of the primary advantages of welcoming
                        food trucks is the infusion of culinary diversity and
                        accessibility. These mobile eateries often showcase a
                        wide range of international flavors, offering residents
                        and visitors alike the opportunity to explore and savor
                        an eclectic array of cuisines. This could significantly
                        contribute to our city's reputation as a vibrant and
                        cosmopolitan hub.
                      </li>
                      <li>
                        {" "}
                        Contrary to some concerns raised, I believe that the
                        limited space on our streets can be effectively managed
                        with careful planning and designated zones for food
                        truck operations. In other cities, successful
                        integration has demonstrated that this can coexist
                        harmoniously with existing businesses and
                        infrastructure. Besides, ice-cream trucks have been in
                        business in Hong Kong for years and we never received
                        complaints of these trucks taking up space or replacing
                        local stalls.
                      </li>
                      <li>
                        {" "}
                        People also raised concerns about hygiene and it’s a
                        topic that comes up wherever street food is discussed.
                        However, you see stalls selling fish balls, chicken
                        wings, and other snacks. It’s pretty much the same
                        thing.
                      </li>
                      <li>
                        {" "}
                        I don’t know why some people are making such big issues
                        out of this. Some critics are exaggerating the downsides
                        to introducing food trucks in the streets and ignoring
                        the vibrance it might add. I think food trucks are a
                        rather delightful addition to our cities.
                      </li>
                    </ol>
                    <h6>End of Reading Passages</h6>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody>
                    <center>
                      <h2>B1</h2>
                      <h4>Easy Section</h4>
                    </center>

                    <p>Read Texts 3-7 and answer questions 24-50. (43 Marks)</p>

                    <ol start="24">
                      {/* question 24 */}
                      <li className="mt-3">
                        Are the following statements True (T) , False (F) or Not
                        Given (NG)?(3 marks) Hint: paragraph 6
                        <div>
                          <h6 className="mt-3">Statements</h6>
                          <ol type="i">
                            <li className="my-2">
                              The vegetarian options in the food truck were
                              better than other items on the menu.
                              <input name="q24" type="text" className="form-control" />
                            </li>
                            <li className="my-2">
                              The prices of the food were very affordable.{" "}
                              <input name="q24" type="text" className="form-control" />
                            </li>
                            <li className="my-2">
                              The writer ordered beef bulgogi from{" "}
                              <input name="q24" type="text" className="form-control" />
                            </li>
                          </ol>
                        </div>
                      </li>

                      {/* question 25*/}
                      <li className="mt-4">
                        Complete the sentence: The writer tried Beef tacos which
                        were enhanced by a mixture of (2 marks)
                        <input name="q25" type="text" className="form-control mt-2" />
                      </li>

                      {/* question q26 */}

                      <li className="mt-4">
                        Which of the following are mentioned as reasons for
                        introducing Food Trucks in Hong Kong?
                        <br />
                        Enter T or F.  This is true for only two boxes. (2 Marks)
                        <ol type="i">
                          <li className="my-2">
                            Convenience and accessibility of food<InlineShortTextInput name="q26"/>
                          </li>
                          <li className="my-2">
                              To gain social media acceptance<InlineShortTextInput name="q26"/>
                          </li>
                          <li className="my-2">
                              To follow up on trends<InlineShortTextInput name="q26"/>
                          </li>
                          <li className="my-2">
                              Diverse street food culture<InlineShortTextInput name="q26"/>
                          </li>
                        </ol>
                      </li>

                      {/* question 27*/}
                      <li className="mt-4">
                        Which word or phrase in paragraph 3 means “portable food
                        stalls”?
                        <input name="q27" type="text" className="form-control mt-2" />
                      </li>

                      {/* question 28 */}
                      <li className="mt-4">
                        When are food trucks being planned to be introduced in
                        Hong Kong?
                        <input name="q28" type="text" className="form-control mt-2" />
                      </li>

                      {/* questio 29 */}
                      <li className="mt-4">
                        Which of the following statements is conveyed by Sang
                        Fischer in Text 4?
                        <div className="mt-2">
                            <RadioButton name="q29" id="A" label="The introduction of food trucks will bring ease and accessibility."></RadioButton>
                            <RadioButton name="q29" id="B" label="Social media validation is very important."></RadioButton>
                            <RadioButton name="q29" id="C" label="Food trucks are going to cause issues but people are positive about it."></RadioButton>
                            <RadioButton name="q29" id="D" label="Food trucks are being introduced because they are a widely popular Western concept."></RadioButton>
                        </div>
                      </li>

                      {/* question 30 */}
                      <li className="mt-4">
                        What does the phrase “Unique Urban Fabric " in paragraph
                        4 mean?
                        <textarea name="q30" type="text" className="form-control mt-2" />
                      </li>

                      {/* question 31 */}
                      <li className="mt-4">
                        Which of the following is NOT mentioned as a downside to
                        food trucks?{" "}
                        <div className="mt-2">
                            <RadioButton name="q31" id="A" label="Crowd"></RadioButton>
                            <RadioButton name="q31" id="B" label="Noise pollution"></RadioButton>
                            <RadioButton name="q31" id="C" label="Hygiene"></RadioButton>
                            <RadioButton name="q31" id="D" label="Threat to local food stalls"></RadioButton>
                        </div>
                      </li>

                      {/* question 32 */}
                      <li className="mt-4">
                        List FOUR concerns that the writer presents in the
                        letter about food trucks in the streets of Hong Kong. (4
                        Marks){" "}
                        <textarea name="q32" type="text" className="form-control mt-2" />
                      </li>

                      {/* question 33 */}
                      <li className="mt-4">
                        Which of the following cannot replace “integral” in
                        paragraph 6?
                        <div className="mt-2">
                            <RadioButton name="q33" id="A" label="Inseparable"></RadioButton>
                            <RadioButton name="q33" id="B" label="Irreplaceable"></RadioButton>
                            <RadioButton name="q33" id="C" label="Intimate"></RadioButton>
                            <RadioButton name="q33" id="D" label="Crucial"></RadioButton>
                        </div>
                      </li>

                      {/* question 34 */}
                      <li className="mt-4">
                        Which has been an integral part of the city’s culinary
                        culture?
                        <textarea name="q34" type="text" className="form-control mt-2" />
                      </li>

                      {/* question 35 */}
                      <li className="mt-4">
                        What does the writer suggest the authorities should do
                        before introducing food trucks?
                        <textarea name="q35" type="text" className="form-control mt-2" />
                      </li>

                      {/* question 36 */}
                      <li className="mt-4">
                        Complete the following paragraph with a word or phrase
                        found in text 6. (4 Marks)
                        <div className="m-1 mt-4">
                          <p>
                            The impact of food trucks on the city's vibrant
                            street food culture is a concern, as increased
                            competition could threaten the livelihoods of local
                            <InlineTextInput name="q36"/> and traditional stalls.{" "}
                            <InlineTextInput name="q36"/> and waste disposal are also noted as critical
                            considerations, emphasizing the need for stringent
                            standards to <InlineTextInput name="q36"/> public health. The author urges authorities to
                            conduct a comprehensive feasibility study and engage
                            in <InlineTextInput name="q36"/> dialogue with the community to address these
                            concerns before approving the introduction of food
                            trucks.
                          </p>
                        </div>
                      </li>

                      {/* question 37 */}
                      <li className="mt-4">
                        The writer of Text 6 writes, “I refer to the letter by
                        Sarah Brightly” because he wants to…
                        <div className="mt-2">
                            <RadioButton name="q37" id="A" label="Agree with Sarah Brightly’s argument."></RadioButton>
                            <RadioButton name="q37" id="B" label="Inform Sarah Brightly about food trucks."></RadioButton>
                            <RadioButton name="q37" id="C" label="Ask readers to read Sarah’s letter."></RadioButton>
                            <RadioButton name="q37" id="D" label="Indicate which letter he is responding to."></RadioButton>
                        </div>
                      </li>

                      {/* question 38 */}
                      <li className="mt-4">
                        Why does the writer think some problems raised by Sarah
                        Brightly are not problems now?
                        <textarea type="text" name="q38" className="form-control mt-2" />
                      </li>

                      {/* question 39 */}
                      <li className="mt-4">
                        The word “coupled” in paragraph 10 can be replaced by
                        <div className="mt-2">
                            <RadioButton name="q39" id="A" label="Along"></RadioButton>
                            <RadioButton name="q39" id="B" label="Alone"></RadioButton>
                            <RadioButton name="q39" id="C" label="Married"></RadioButton>
                            <RadioButton name="q39" id="D" label="Involved"></RadioButton>
                        </div>
                      </li>

                      {/* question 40 */}
                      <li className="mt-4">
                        What example does the writer provide of the industrial
                        areas he mentions?
                        <textarea name="q40" type="text" className="form-control mt-2" />
                      </li>

                      {/* question 41 */}
                      <li className="mt-4">
                        The writer of Text 6 believes that there are markets for
                        food trucks where
                        <div className="mt-2">
                            <RadioButton name="q41" id="A" label="There are not enough places to eat"></RadioButton>
                            <RadioButton name="q41" id="B" label="There are no factories"></RadioButton>
                            <RadioButton name="q41" id="C" label="There is not enough time to eat"></RadioButton>
                            <RadioButton name="q41" id="D" label="People are very busy"></RadioButton>
                        </div>
                      </li>

                      {/* question 42 */}
                      <li className="mt-4">
                        The writer thinks the critics are
                        <div className="mt-2">
                            <RadioButton name="q42" id="A" label="Overestimating the downsides"></RadioButton>
                            <RadioButton name="q42" id="B" label="Underestimating the downsides"></RadioButton>
                            <RadioButton name="q42" id="C" label="Not reacting well"></RadioButton>
                            <RadioButton name="q42" id="D" label="Creating unnecessary issues"></RadioButton>
                        </div>
                      </li>

                      {/* question 43 */}
                      <li className="mt-4">
                        What does the writer think about food truck hygiene?
                        Why?
                        <textarea name="q43" type="text" className="form-control mt-2" />
                      </li>

                      {/* question 44 */}
                      <li className="mt-4">
                        Who might “some people” in paragraph 15 refer to?
                        <textarea name="q44" type="text" className="form-control mt-2" />
                      </li>

                      {/* question 45 */}
                      <li className="mt-4">
                        Complete the following summary based on Text 7. (3
                        Marks)
                        <div className="m-1 mt-4">
                          <p>
                            Food trucks can contribute to the city's reputation
                            as a vibrant and cosmopolitan hub by offering a wide
                            range of <InlineTextInput name="q45"/> flavors. Concerns about 
                            limited streets <InlineTextInput name="q45"/> can be solved by careful planning and designated
                            zones for food truck operations. Additionally, <InlineTextInput name="q45"/>
                            concerns can be diminished by comparing food truck
                            offerings to existing street food options.
                          </p>
                        </div>
                      </li>

                      {/* question 46 */}
                      <li className="mt-4">
                        Why are food trucks popular all over the world? (2
                        marks)
                        <textarea name="q46" type="text" className="form-control mt-2" />
                      </li>

                      {/* question 47 */}
                      <li className="mt-4">
                        Why does the author mention the example of Ice-cream
                        Trucks?
                        <textarea name="q47" type="text" className="form-control mt-2" />
                      </li>

                      {/* question 48 */}
                      <li className="mt-4">
                        What stalls does the author bring up when addressing the
                        hygiene issues of food trucks?
                        <textarea name="q48" type="text" className="form-control mt-2" />
                      </li>

                      {/* question 49 */}
                      <li className="mt-4">
                        The word “coexist” in paragraph 14 means
                        <div className="mt-2">
                            <RadioButton name="q49" id="A" label="Function independently"></RadioButton>
                            <RadioButton name="q49" id="B" label="Function simultaneously"></RadioButton>
                            <RadioButton name="q49" id="C" label="Function separately"></RadioButton>
                            <RadioButton name="q49" id="D" label="Function dependently"></RadioButton>
                        </div>
                      </li>

                      {/* question 50 */}
                      <li className="mt-4">
                        Match the headings below with Text 4-7. Write the
                        numbers 4, 5, 6 and 7 beside the suitable heading. There
                        are four so put “x” in the heading that is not
                        applicable. (4 Marks)
                        <table className="table table-bordered mt-3">
                          <thead>
                            <tr>
                              <th scope="col">Headings</th>
                              <th scope="col">Text</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Food trucks might be useful in some areas</td>
                              <td>
                              <InlineTextInput name="q50"/>
                              </td>
                            </tr>

                            <tr>
                              <td>
                                Despite controversies, food trucks are a
                                delightful addition.
                              </td>
                              <td>
                              <InlineTextInput name="q50"/>
                              </td>
                            </tr>

                            <tr>
                              <td>
                                Food trucks might bring more problems than
                                benefits.
                              </td>
                              <td>
                              <InlineTextInput name="q50"/>
                              </td>
                            </tr>

                            <tr>
                              <td>Food trucks should be banned</td>
                              <td>
                              <InlineTextInput name="q50"/>
                              </td>
                            </tr>

                            <tr>
                              <td>Tacos on the Go</td>
                              <td>
                              <InlineTextInput name="q50"/>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </li>
                    </ol>
                  </CardBody>
                </Card>

                <div id="formControls" className="mt-5">
                  <center>
                    <h4>English Language Paper 1</h4>
                    <h6>Part B2</h6>
                    <h6>Reading Passages</h6>
                  </center>
                  <h6 className="mt-4">GENERAL INSTRUCTIONS</h6>

                  <ol>
                    <li>
                      Refer to the general instructions on page 1 of the Reading
                      Passages booklet for Part A
                    </li>
                  </ol>

                  <h6>INSTRUCTIONS FOR PART B2</h6>

                  <ol>
                    <li>
                      Candidates who choose Part B2 should attempt all questions
                      in this part. Each question carries ONE mark unless
                      otherwise stated.
                    </li>
                  </ol>
                </div>
                <Card>
                  <CardBody>
                    <center>
                      <h6>CLASSIC CHIC</h6>
                      <h6>Dai Pai Dongs — A Dying Local Treasure?</h6>
                    </center>

                    <p className="mt-3">
                      Having risen after the Second World War, although it is
                      also said that they originated as early as the late 19th
                      century, the Dai Pai Dongs that dotted the streets of Hong
                      Kong were a means to help the families of injured and
                      deceased civil servants get back on their feet and earn a
                      living. Compared to mobile food vendors, these food stalls
                      had relatively large licenses displayed, earning them the
                      name of "big license stalls," or as we now call them, "Dai
                      Pai Dongs."
                    </p>
                    <p>
                      If you're a fan of cheap, hearty (爽朗) meals or strong
                      flavors, then Dai Pai Dongs might be right up your alley,
                      perhaps even literally. While a few have set up shop in
                      markets or "mushroom kiosks," most of them can be found on
                      the street under awnings (棚) that cover iconic red
                      plastic stools, wooden tables, and a metal kitchen. Visit
                      in the mornings, and you can enjoy various local classics
                      like fried eggs over rice or instant noodles with spicy
                      meat cubes. Visit in the evenings, and you can enjoy
                      famous Hong Kong delicacies while nursing a beer and
                      possibly recovering from a hangover (宿醉), all
                      accompanied by local conversations and a show of swirling
                      flames from the stove.
                    </p>
                    <p>
                      Unfortunately, while these restaurants were the site of
                      many fond memories and provided delicious food at
                      unbelievably low prices, concerns about pollution, safety,
                      hygiene, and traffic (as many of them encroached onto the
                      roads and disrupted traffic) still linger in the minds of
                      many. The government took these concerns into account from
                      the 1950s and began imposing restrictions on the Dai Pai
                      Dongs. By the time the 70s rolled around, the government
                      had completely stopped issuing new licenses and limited
                      their transfer only to the owners' spouses, resulting in a
                      drastic decline as the licenses could no longer be passed
                      down. Over the decades, with further restrictions imposed
                      by the government, the number of Dai Pai Dongs was reduced
                      from 200 citywide to only 25, and they continue to be
                      targeted for closure.
                    </p>
                    <p>
                      However, there is a glimmer of hope. With the growing
                      concern for cultural preservation (文化保护), especially
                      after the closure of the famous Man Yuen Noodles in 2005
                      when its owner passed away, there have been discussions
                      about loosening restrictions and allowing the licenses to
                      be passed down to the next generation. But whether this
                      new law, or any hypothetical (假設) new laws for that
                      matter, can take hold remains to be seen. For now, people
                      can only flock there with their families and friends as a
                      tribute to the dying, nostalgic, local, and iconic
                      memories.
                    </p>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <center>
                      <h6>
                        Not Up Everyone’s Alley —The Iconic Dai Pai Dongs of
                        Hong Kong{" "}
                      </h6>
                    </center>

                    <p className="mt-3">
                      Like many things in life, Dai Pai Dongs are a two-sided
                      coin. On one hand, you get to enjoy delectable (美味)
                      local cuisine (美食). On the other hand, there are
                      concerns about hygiene and safety. Ladies and gentlemen,
                      today we'll be examining the reasons why Dai Pai Dongs may
                      or may not be your cup of tea.
                    </p>
                    <p>
                      Firstly, let's discuss the advantages. Dai Pai Dongs are
                      renowned for their great food and affordable prices. They
                      are one of the few places where you can experience the
                      mouth-watering flavor of "wok hei," achieved by cooking
                      stir-fried dishes in a searingly (灼熱) hot wok. The high
                      temperature ensures quick cooking to keep up with the
                      incoming orders, and it's this intense heat that adds that
                      extra "oomph" to the dishes. Most restaurants lack this
                      "wok hei" because they can afford to cook food at lower
                      temperatures for longer durations, which may be healthier
                      as the food is less likely to be charred (燒焦) or burnt,
                      but it lacks the same impact. Pair local delicacies like
                      clay pot rice and black pepper beef and potatoes with a
                      beer (or soda, please drink responsibly), and you have a
                      finger-licking meal that's sure to please. Best of all,
                      it's cheaper than most other dining options!
                    </p>
                    <p>
                      Sounds too good to be true? Well, naturally, there are
                      downsides as well. Dining outdoors may initially sound
                      appealing (吸引人), but consider the exposure (曝露) to
                      the elements and the fact that most Dai Pai Dongs are
                      located on streets and in alleyways, often with drain
                      covers between the tables. This creates an environment
                      that might make most people a bit hesitant about eating
                      there. And many people were indeed concerned. Numerous
                      complaints were made about water pollution, as vendors
                      tended to pour wastewater onto the streets and directly
                      into drains. Others expressed worries about potential
                      pests like mice and cockroaches. Traffic was also known to
                      have been disrupted due to the restaurants being set up on
                      roads, and nearby residents often complained about the
                      strong smell of grease and smoke permeating (滲透) the
                      area.
                    </p>
                    <p>
                      These are just some of the reasons why the number of Dai
                      Pai Dongs has significantly decreased compared to the
                      1950s, with less than two dozen remaining from a group
                      that used to consist of 200. This is why many people are
                      advocating to keep these eateries in operation, although
                      the future of Dai Pai Dongs is as uncertain as a candle
                      under a glass. So, would you be willing to try dining at a
                      Dai Pai Dong while you still have the chance? Or is it
                      simply not to your liking?
                    </p>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody>
                    <center>
                      <h6>The Soft Serve is a Joke !—Or Is It ? </h6>
                    </center>

                    <div>
                      <p className="mt-3">
                        It has become something of a joke in recent years: every
                        time you go to a McDonald's for a soft-serve ice cream,
                        it doesn't work. Or at least, it doesn't work in the US,
                        UK, or Germany. It has become such a joke that Wendy's
                        and even McDonald's have posted about it on their social
                        media. "We have a joke about our soft-serve machine, but
                        we're worried it won't work," the latter posted on
                        August 11, 2020. There has since been plenty of
                        speculation (猜測) about the constant lack of soft-serve
                        ice cream. The most common explanation that people have
                        heard is that the machines are being cleaned, but surely
                        that's a lie! Who cleans ice cream machines in the
                        middle of the day?
                      </p>
                      <p>The answer is: nobody.</p>
                      <p>
                        The machines clean themselves. Or at least, they're
                        supposed to. The machines that the fast-food chain uses
                        are a brand called Taylor, which makes a model of
                        machine specifically for McDonald's and for McDonald's
                        alone—the C602. It is one of two brands that McDonald's
                        uses; the other brand is Italian.
                      </p>
                      <p>
                        This particular model has an extensive cleaning process,
                        which lasts for about 4 hours, during which the machine
                        is down. The employees on their night shifts will
                        activate (啟用) the machine for use the following
                        morning, but, unlike soft-serve ice cream, things don't
                        always go smoothly. More often than not, day shift
                        employees come to work to find that the machine has an
                        error message on its dashboard (儀表板) and would
                        require cleaning again. The catch? It doesn't specify
                        which part of the machine the error has occurred in, so
                        the only thing employees can do is restart the cleaning
                        process without knowing what the problem is.
                      </p>
                      <p>
                        The whole process takes 4 hours, and chances are, the
                        same error is going to start the vicious cycle all over
                        again until a technician (技術員) can find and solve the
                        problem.
                      </p>
                      <p>
                        So, the next time the machine is down for cleaning,
                        chances are that's probably the case.
                      </p>
                      <p>
                        So what about your ice cream fix? Luckily enough, there
                        are plenty of options for a nice soft-serve, including
                        making it yourself! Go fancy if you wish, but whipped
                        cream and condensed milk already make a lovely base for
                        whatever mix-ins you desire. If you're living in the US
                        or Canada, Costco usually has a lovely vanilla cone you
                        could try.
                      </p>
                      <i>Source: allrecipes.com</i>
                    </div>

                    <ol start="51" className="mt-4">
                      {/* question 51 */}
                      <li>
                        Which word in paragraph 1 suggests that Dai Pai Dongs
                        were very plentiful?
                        <input name="q51" type="text" className="form-control mt-2" />
                      </li>

                      {/* question 52 */}
                      <li className="mt-3">
                        Complete the fact file with the information from the
                        text . You may write the answers in point form . (6
                        marks)
                        <p>Fact File on Dai Pai Dongs</p>
                        <p>1) Reasons for concern:</p>
                        <ul>
                          <li>
                            <input name="q52i" type="text" className="form-control mt-2" />
                          </li>
                          <li>
                            <input name="q52i" type="text" className="form-control mt-2" />
                          </li>
                          <li>
                            <input name="q52i" type="text" className="form-control mt-2" />
                          </li>
                          <li>
                            <input name="q52i" type="text" className="form-control mt-2" />
                          </li>
                        </ul>
                        <p className="mt-4">2) Reasons for current successs:</p>
                        <ul>
                          <li>
                            <input name="q52ii" type="text" className="form-control mt-2" />
                          </li>

                          <li>
                            <input name="q52ii" type="text" className="form-control mt-2" />
                          </li>
                        </ul>
                      </li>

                      <li className="mt-3">
                        Are the following statements True (T) , False (F) or Not
                        Given (NG) . (2 marks) International cuisine is also
                        available at Dai Pai Dongs. NG
                        <ul className="mt-3">
                          <li>
                            The future of Dai Pai Dongs is looking bright <InlineShortTextInput name="q53"/>
                          </li>
                          <li>
                            Dai Pai Dongs we’re famous for their local
                            delicacies. <InlineShortTextInput name="q53"/>
                          </li>
                        </ul>
                      </li>

                      <li>
                        Which word in paragraph 1 suggests that Dai Pai Dongs
                        were very plentiful?
                        <textarea name="q54" type="text" className="form-control mt-2" />
                      </li>

                      <li className="mt-3">
                        What are the physical characteristics of a Dai Pai Dong
                        ? List any 3. (3 marks)
                        <ul className="mt-3">
                          <li>
                            <input name="q55" type="text" className="form-control mt-2" />
                          </li>

                          <li>
                            <input name="q55" type="text" className="form-control mt-2" />
                          </li>
                          <li>
                            <input name="q55" type="text" className="form-control mt-2" />
                          </li>
                        </ul>
                      </li>

                      <li className="mt-3">
                        What are the two sides of the Dai Pai Dong listed in
                        paragraph 1? (2 marks)
                        <textarea name="q56" type="text" className="form-control mt-2" />
                      </li>

                      <li className="mt-3">
                        Which phrase is used to show a change in the topic?
                        <input name="q57" type="text" className="form-control mt-2" />
                      </li>

                      <li className="mt-3">
                        Which word has a similar meaning to “burnt”?
                        <input name="q58" type="text" className="form-control mt-2" />
                      </li>

                      <li className="mt-3">
                        What word can be used to replace the word “oomph” in
                        paragraph 2?
                        <input name="q59" type="text" className="form-control mt-2" />
                      </li>

                      <li className="mt-3">
                        According to the passage , was food at Dai Pai Dongs
                        healthy? Cite one reason from the source .
                        <input name="q60" type="text" className="form-control mt-2" />
                      </li>

                      {/* question */}
                      <li className="mt-3">
                        Are the following statements True(T), False(F) or Not
                        Given(NG)? (3 marks)
                        <div>
                          <ul>
                            <li className="my-2">
                              Patrons at Dai Pai Dongs may not be
                              adequately(充分) sheltered from the weather.
                              <input name="q61" type="text" className="form-control" />
                            </li>
                            <li className="my-2">
                              Dai Pai Dongs have multiple cooks catering to the
                              customers at the same time.{" "}
                              <input name="q61" type="text" className="form-control" />
                            </li>
                            <li className="my-2">
                              Running a Dai Pai Dong is an environmentally
                              friendly business.
                              <input name="q61" type="text" className="form-control" />
                            </li>
                          </ul>
                        </div>
                      </li>

                      {/* question 62*/}
                      <li className="mt-4">
                        Below is a comment made by a resident who lives next to
                        a Dai Pai Dong. Fill in the blanks with no more than 2
                        words from the passage . Make sure that the words are
                        grammatically accurate . (7 marks) <br />
                        <br />
                        Hint: <br />
                        1: Paragraph 2<br />
                        2-7 : Paragraph 3<br />
                        <div className="m-1 mt-4">
                          <p>
                            Don’t get me wrong , the food is delicious . I
                            myself am partial to a <InlineTextInput name="q62"/>
                            like clay pot rice with a beer after a long day of
                            work, though I really don’t like having to step
                            around <InlineTextInput name="q62"/> puddles after my meal. 
                            Unfortunately , my apartment, like many others, is
                            <InlineTextInput name="q62"/>
                            directly above the restaurant and more often than
                            not , my laundry ends up smelling like the
                            <InlineTextInput name="q62"/> and <InlineTextInput name="q62"/>
                            that <InlineTextInput name="q62"/> the place. It’s also 
                            lucky that I don't have a car , as traffic in the area is
                            <InlineTextInput name="q62"/> by the fact that the restaurant 
                            extends out onto the road. Long story short, I have quite 
                            conflicted feelings about the Dai Pai Dong .
                          </p>
                        </div>
                      </li>

                      {/* question 63 */}
                      <li className="mt-4">
                        Below is a summary of the passage . However , there is
                        one mistake on 3 of the lines which is underlined.
                        Replace the word with one that expresses the correct
                        idea . Write the word in the space on the right. (3
                        marks)
                        <table className="table table-bordered mt-3">
                          <thead>
                            <tr>
                              <th scope="col"></th>
                              <th scope="col">Summary</th>
                              <th scope="col">Corrections</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>
                                Dai Pai Dongs are <u>infamous</u> for their great foods
                                and low{" "}
                              </td>
                              <td>
                              <InlineTextInput name="q63"/>
                              </td>
                            </tr>

                            <tr>
                              <td>eg</td>
                              <td>
                                ….prices. The food is served quickly to keep up
                                with <u>outgoing</u>
                              </td>
                              <td>
                              <InlineTextInput disabled="disabled" value="incoming"/>                              </td>
                            </tr>

                            <tr>
                              <td>2</td>

                              <td>
                                orders , all with that delectable taste of Wok
                                Hei . However ,{" "}
                              </td>
                              <td>N/A
                              </td>
                            </tr>

                            <tr>
                              <td>3</td>

                              <td>
                                many patrons were concerned with the light
                                pollution in the
                              </td>
                              <td>
                              <InlineTextInput name="q63"/>
                              </td>
                            </tr>

                            <tr>
                              <td>4</td>

                              <td>
                                area, as well as hygiene . Today , there’s is a
                                drastic increase in the number of Dai Pai Dongs
                                in recent decades.
                              </td>
                              <td>
                              <InlineTextInput name="q63"/>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </li>

                      {/* question 64 */}
                      <li className="mt-4">
                        What’s the writer’s tone in paragraph 1 ? 
                        <div className="mt-2">
                            <RadioButton name="q64" id="A" label="Infatuated(癡情)"></RadioButton>
                            <RadioButton name="q64" id="B" label="Humourous (幽默)"></RadioButton>
                            <RadioButton name="q64" id="C" label="Annoyed"></RadioButton>
                            <RadioButton name="q64" id="D" label="Infuriated(激怒)"></RadioButton>
                        </div>
                      </li>
                      
                       {/* question 65*/}
                       <li className="mt-3">
                      Who made the post mentioned in paragraph 1?
                        <input name="q65" type="text" className="form-control mt-2" />
                      </li>

                       {/* question 66*/}
                       <li className="mt-4">
                        According to the passage , which of the following
                        statements are True (T) , False(F) or Not Given(NG)? (3
                        marks)<br/>

                        Hint:<br/>
                        Paragraph 3<br/>
                        Paragraphs 4-6<br/>

                        <ul className="mt-2">
                          <li>
                          There are a wide variety of ice cream machines available for McDonald’s
                          <input name="q66" type="text" className="form-control mt-2" />
                          </li>

                          <li className="mt-2">
                          The software for the machines is flawed(後者)
                            <input name="q66" type="text" className="form-control mt-2" />
                          </li>

                          <li className="mt-2">
                          	Hiring a technician takes a long time and is expensive
                            <input name="q66" type="text" className="form-control mt-2" />
                          </li>
                          
                        </ul>
                      </li>

                      <li className="mt-3">
                      What is the use of the “Or Is It ?” In the title?
                      <input name="q67" type="text" className="form-control mt-2" />
                      </li>

                      <li className="mt-3">
                      Why is the error described as a “vicious cycle” in paragraph 6? (2 marks)
                        <textarea name="q68" type="text" className="form-control mt-2" />
                      </li>

                      <li className="mt-3">
                      What does the “it” refer to in paragraph 8?
                      <input name="q69" type="text" className="form-control mt-2" />
                      </li>
                    </ol>
                  </CardBody>
                </Card>
    </>
  );

  return (<ReadingPaper year="2016" paper={paper} totalQuestions="69" specialQuestions="52i,52ii"/>) 
};

export default Reading2016;
