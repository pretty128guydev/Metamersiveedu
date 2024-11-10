import React from "react";
import { Card, CardBody } from "../../components/card/card";
import { RadioButton } from "../../components/radio/radio";
import { InlineTextInput, InlineShortTextInput } from "../../components/inlinetextinput/inlinetextinput";
import { ReadingPaper } from "./reading";

const Reading2017 = () => {
  const paper = (
    <>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#/">READING</a>
                  </li>
                  <li className="breadcrumb-item active">2017</li>
                </ul>
                <h1 className="page-header">
                  2017 Reading Mock Paper
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
                      Refer to the general instructions on page 1 of the Reading
                      Passages booklet for Part A.
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
                    Read text 1 and answer the questions in the Question Answer
                    Book for Part-A
                  </p>
                </div>
                <Card>
                  <CardBody className="pb-2">
                    <center>
                      <h6>Treasure in the Trash —The Truth about Thrifting </h6>
                    </center>

                    <ol>
                      <li className="mt-2">
                        I'm sure most of you have heard of thrifting - the act
                        of buying second-hand goods from thrift stores or
                        charity shops at a lower price. It has been booming in
                        popularity (人氣) in recent years on social media, but
                        how much do you actually know about thrifting?
                      </li>
                      <li className="mt-2">
                        Surprisingly enough, thrifting has been around
                        significantly (顯著地) longer than TikTok and Instagram.
                        Like many things in modern society, thrifting began to
                        rise in popularity during the Industrial Revolution
                        (工業革命). However, the concept of reselling and
                        reusing hand-me-downs existed during the 18th century.
                        Since goods were being mass-produced (大量生產), clothes
                        were often discarded long before they had worn out
                        (磨損的), leading to a lot of good-quality clothes
                        ending up as waste. The Salvation Army saw a business
                        opportunity and, needing funds for charity, turned trash
                        into treasure by selling the used clothes to lower-class
                        citizens at a lower price.
                      </li>
                      <li className="mt-2">
                        However, another thing that has been around for quite a
                        while is gentrification (士紳化), or "the process
                        whereby the character of a poor urban area is changed by
                        wealthier people moving in, improving housing, and
                        attracting new businesses, often displacing current
                        inhabitants in the process," according to the Oxford
                        Dictionary. While this has done wonders for the economy,
                        it has also driven up the costs of most things,
                        including thrifted items. This means that items are
                        often sold for much more than what they're actually
                        worth, making them unaffordable (買不起) even for their
                        target audience.
                      </li>
                      <li className="mt-2">
                        This phenomenon is exacerbated (加劇) by social media.
                        While there's nothing wrong with sharing photos and
                        experiences about finding things in thrift stores, such
                        as vintage (優質) clothes that hold historic value of
                        old furniture for a good price, many people have taken
                        advantage of (被利用) this low-price treasure trove
                        (寶庫) to make their own unreasonably high profits. For
                        example, people have been known to buy clothes for cheap
                        at thrift stores and then resell them at exorbitant
                        (高昂) prices. Another example is when people buy
                        children's clothing and then market them as XS or XXS
                        sizes for adults. This not only depletes (耗盡) the
                        resources for people who are actually in need of such
                        clothes, like struggling parents, but also forces the
                        shops to raise prices.
                      </li>
                      <li className="mt-2">
                        There is also the issue of sustainability when it comes
                        to thrifting. Many people will say that buying
                        second-hand is more sustainable than buying first-hand,
                        especially fast fashion items that seem to be ubiquitous
                        (無處不在的) these days. This is true to some extent, as
                        thrifting reduces both the resources needed to make new
                        items and the used articles being sent to the landfill
                        before their time. It seems like a win-win situation,
                        right? Well, like roses, it's not all perfume and no
                        thorns.
                      </li>
                      <li className="mt-2">
                        In actuality, only 1 in 5 pieces of donated garments are
                        sold in thrift stores and second-hand shops; the rest
                        still end up in the landfill or the incinerator
                        (焚化爐). Most of the donated articles are sent for
                        sorting to countries like Pakistan, then to another
                        company in Europe before they hit the shelves (上架). If
                        anything, second-hand clothes cause even more carbon
                        emissions just from their trip around the globe.
                        Speaking of which, it's practically impossible to tell
                        if those who sort the clothes even receive fair wages or
                        safe working conditions.
                      </li>
                      <li className="mt-2">
                        And finally, here's some food for thought. It is often
                        said that thrifting is a more sustainable option
                        compared to fast fashion (快時尚). However, is that
                        really the case? It might have been before when clothes
                        were made of better materials designed to last longer.
                        But now, a lot of the items are simply fast fashion
                        items that were worn a few times before they found
                        themselves as second-hand clothes. So, in reality, the
                        thrifting industry indirectly supports the fast fashion
                        industry. It also doesn't help that both industries
                        support overconsumption (過度消費) since they offer
                        cheap clothing options that entice people to buy more.
                      </li>
                      <li className="mt-2">
                        So what can we do about this situation? I think it's
                        best to go back to our roots. Thrifting was originally
                        meant as a means to distribute resources to those with
                        less financial stability and should remain exactly that.
                        If you find yourself needing an extra coat on a budget,
                        then go right ahead. But if you're thrifting for the
                        sake of reselling items for high profit or as a way to
                        alleviate (減輕) the guilt you may feel from buying a
                        lot of clothes that you won't even wear, then I suggest
                        that you think twice before reaching for your wallet.
                      </li>
                    </ol>
                    <center>
                      <h5>END OF READING PASSAGES</h5>
                    </center>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody className="pb-2">
                    <h6>
                      2017 MOCK
                      <br />
                      ENGLISH LANGUAGE
                      <br />
                      PAPER 1 PART A
                    </h6>

                    <p>Read Text 1 and answer questions 1-35. (41 marks)</p>

                    <ol>
                      {/* question 1*/}
                      <li className="mt-4">
                        What is the primary focus of thrifting?
                        <div className="mt-2">
                          <RadioButton name="q1" id="A" label="Buying brand-new items at high prices "></RadioButton>
                          <RadioButton name="q1" id="B" label="Purchasing second-hand goods at lower prices "></RadioButton>
                          <RadioButton name="q1" id="C" label="Exchanging items with friends"></RadioButton>
                          <RadioButton name="q1" id="D" label="Renting items temporarily "></RadioButton>
                        </div>
                      </li>

                      {/* question 2*/}
                      <li className="mt-4">
                        In recent years, what has contributed to the booming popularity of thrifting?
                        <div className="mt-2">
                          <RadioButton name="q2" id="A" label="Decreased interest in sustainable living"></RadioButton>
                          <RadioButton name="q2" id="B" label="Social media exposure"></RadioButton>
                          <RadioButton name="q2" id="C" label="Higher prices at thrift stores"></RadioButton>
                          <RadioButton name="q2" id="D" label="Limited availability of second-hand goods"></RadioButton>
                        </div>
                      </li>

                      {/* question 3*/}
                      <li className="mt-4">
                        What is the central topic of the first paragraph?
                        <div className="mt-2">
                          <RadioButton name="q3" id="A" label="The decline of thrift stores"></RadioButton>
                          <RadioButton name="q3" id="B" label="The history of thrifting"></RadioButton>
                          <RadioButton name="q3" id="C" label="The popularity of thrifting and its details"></RadioButton>
                          <RadioButton name="q3" id="D" label="How to start a thrift store"></RadioButton>
                        </div>
                      </li>

                      {/* question 4*/}
                      <li className="mt-4">
                        When did thrifting begin to rise in popularity?
                        <div className="mt-2">
                            <RadioButton name="q4" id="A" label="During TikTok's inception"></RadioButton>
                            <RadioButton name="q4" id="B" label="During the Industrial Revolution"></RadioButton>
                            <RadioButton name="q4" id="C" label="In the 20th century"></RadioButton>
                            <RadioButton name="q4" id="D" label="In the 18th century"></RadioButton>
                        </div>
                      </li>


                      {/* question 5*/}
                      <li className="mt-4">
                        What concept existed during the 18th century related to
                        thrifting?
                        <div className="mt-2">
                            <RadioButton name="q5" id="A" label="Reselling and reusing hand-me-downs"></RadioButton>
                            <RadioButton name="q5" id="B" label="Recycling of materials"></RadioButton>
                            <RadioButton name="q5" id="C" label="Mass production of goods"></RadioButton>
                            <RadioButton name="q5" id="D" label="Clothing boutiques"></RadioButton>
                        </div>
                      </li>

                      {/* question 6*/}
                      <li className="mt-4">
                        Why were clothes often discarded long before they wore
                        out during the Industrial Revolution?
                        <div className="mt-2">
                          <RadioButton name="q6" id="A" label="Lack of interest in fashion"></RadioButton>
                          <RadioButton name="q6" id="B" label="Mass production leading to excess"></RadioButton>
                          <RadioButton name="q6" id="C" label="Limited availability of clothes"></RadioButton>
                          <RadioButton name="q6" id="D" label="Strict fashion norms"></RadioButton>
                        </div>
                      </li>

                      {/* question */}
                      <li className="mt-4">
                        Who turned trash into treasure by selling used clothes
                        to lower-class citizens during the Industrial
                        Revolution?
                        <div className="mt-2">
                            <RadioButton name="q7" id="A" label="Instagram influencers"></RadioButton>
                            <RadioButton name="q7" id="B" label="Thrift store owners"></RadioButton>
                            <RadioButton name="q7" id="C" label="Fashion designers"></RadioButton>
                            <RadioButton name="q7" id="D" label="The Salvation Army"></RadioButton>
                        </div>
                      </li>

                      {/* question 8*/}
                      <li className="mt-4">
                        According to paragraph 2, in which time period did “the
                        concept of reselling and reusing hand-me-downs” start?
                        <div className="mt-2">
                          <RadioButton name="q8" id="A" label="1801-1900"></RadioButton>
                          <RadioButton name="q8" id="B" label="1701-1800"></RadioButton>
                          <RadioButton name="q8" id="C" label="1901-2000"></RadioButton>
                          <RadioButton name="q8" id="D" label="2001-2020"></RadioButton>
                        </div>
                      </li>

                      {/* question 9*/}
                      <li className="mt-4">
                        What does the phrase “all perfume and no thorns” say
                        about thrifting’s issue of sustainability?
                        <textarea type="text" name="q9" className="form-control mt-2" />
                      </li>

                      {/* question 10*/}
                      <li className="mt-4">
                        According to the Oxford Dictionary, what is the
                        definition of gentrification?
                        <div className="mt-2">
                            <RadioButton name="q10" id="A" label="The process of urbanization"></RadioButton>
                            <RadioButton name="q10" id="B" label="The transformation of rural areas"></RadioButton>
                            <RadioButton name="q10" id="C" label="The improvement of housing in wealthy neighborhoods"></RadioButton>
                            <RadioButton name="q10" id="D" label="The transformation of a poor urban area by wealthier people, often displacing current inhabitants."></RadioButton>
                        </div>
                      </li>

                      {/* question 11*/}
                      <li className="mt-4">
                        How has gentrification impacted the costs of thrifted
                        items, according to the passage?
                        <div className="mt-2">
                            <RadioButton name="q11" id="A" label="Decreased the costs"></RadioButton>
                            <RadioButton name="q11" id="B" label="Has no effect on costs"></RadioButton>
                            <RadioButton name="q11" id="C" label="Driven up the costs"></RadioButton>
                            <RadioButton name="q11" id="D" label="Stabilized the costs"></RadioButton>
                        </div>
                      </li>

                      {/* question 12*/}
                      <li className="mt-4">
                        What does the passage suggest about the affordability of
                        thrifted items due to gentrification?
                        <div className="mt-2">
                            <RadioButton name="q12" id="A" label="Gentrification has made thrifted items more affordable."></RadioButton>
                            <RadioButton name="q12" id="B" label="Thrifted items remain affordable despite gentrification."></RadioButton>
                            <RadioButton name="q12" id="C" label="Gentrification has made thrifted items unaffordable for their target audience."></RadioButton>
                            <RadioButton name="q12" id="D" label="The passage does not mention the affordability of thrifted items."></RadioButton>
                        </div>
                      </li>

                      {/* question 13*/}
                      <li className="mt-4">
                        According to paragraph 3, what positive impact does
                        gentrification have on the economy?
                        <input type="text" name="q13" className="form-control mt-2" />
                      </li>

                      {/* question 14*/}
                      <li className="mt-4">
                        What negative consequence of gentrification is mentioned
                        in paragraph 3?
                        <textarea type="text" name="q14" className="form-control mt-2" />
                      </li>

                      {/* question 15 */}
                      <li className="mt-4">
                        Which word in paragraph 4 means “unreasonably high”?
                        <input type="text" name="q15" className="form-control mt-2" />
                      </li>

                      {/* question 16*/}
                      <li className="mt-4">
                        According to the passage, what exacerbates the
                        phenomenon of high-priced thrifted items?
                        <div className="mt-2">
                            <RadioButton name="q16" id="A" label="Social media"></RadioButton>
                            <RadioButton name="q16" id="B" label="Gentrification"></RadioButton>
                            <RadioButton name="q16" id="C" label="Vintage clothing"></RadioButton>
                            <RadioButton name="q16" id="D" label="Low-price treasure trove"></RadioButton>
                        </div>
                      </li>

                      {/* question 17*/}
                      <li className="mt-4">
                        What is one example mentioned in the passage of people
                        taking advantage of thrift store items for high profits?
                        <div className="mt-2">
                            <RadioButton name="q17" id="A" label="Buying vintage clothes"></RadioButton>
                            <RadioButton name="q17" id="B" label="Reselling old furniture"></RadioButton>
                            <RadioButton name="q17" id="C" label="Selling children's clothing as adult sizes"></RadioButton>
                            <RadioButton name="q17" id="D" label="Donating clothes to struggling parents"></RadioButton>
                        </div>
                      </li>

                      {/* question 18*/}
                      <li className="mt-4">
                        How does the resale of thrifted items at exorbitant
                        prices affect thrift stores?
                        <div className="mt-2">
                            <RadioButton name="q18" id="A" label="Lowers their profits"></RadioButton>
                            <RadioButton name="q18" id="B" label="Forces them to raise prices"></RadioButton>
                            <RadioButton name="q18" id="C" label="Increases their customer base"></RadioButton>
                            <RadioButton name="q18" id="D" label="Encourages more donations"></RadioButton>
                        </div>
                      </li>

                      {/* question 19*/}
                      <li className="mt-4">
                        What term is used in the passage to describe the
                        low-price treasure trove of thrift stores?
                        <div className="mt-2">
                            <RadioButton name="q19" id="A" label="Bargain bin"></RadioButton>
                            <RadioButton name="q19" id="B" label="Exorbitant market"></RadioButton>
                            <RadioButton name="q19" id="C" label="Price haven"></RadioButton>
                            <RadioButton name="q19" id="D" label="Thrift haven"></RadioButton>
                        </div>
                      </li>

                      {/* question 20*/}
                      <li className="mt-4">
                        According to the passage, what historic value can be
                        found in thrift stores?
                        <div className="mt-2">
                            <RadioButton name="q20" id="A" label="Antique furniture"></RadioButton>
                            <RadioButton name="q20" id="B" label="Children's clothing"></RadioButton>
                            <RadioButton name="q20" id="C" label="XS or XXS sizes"></RadioButton>
                            <RadioButton name="q20" id="D" label="High-priced items"></RadioButton>
                        </div>
                      </li>

                      {/* question 21*/}
                      <li className="mt-4">
                        What term is used in the passage to describe the
                        historic value of some items found in thrift stores?
                        <input type="text" name="q21" className="form-control mt-2" />
                      </li>

                      {/* question 22*/}
                      <li className="mt-4">
                        Which definition of “articles” is closest to the meaning
                        used in paragraphs 5 and 6?
                        <div className="mt-2">
                            <RadioButton name="q22" id="A" label="a particular item or object"></RadioButton>
                            <RadioButton name="q22" id="B" label="a piece of writing included with others in a newspaper, magazine, or other print or online publication."></RadioButton>
                            <RadioButton name="q22" id="C" label="a separate clause or paragraph of a legal document or agreement, typically one outlining a single rule or regulation."></RadioButton>
                            <RadioButton name="q22" id="D" label="a period of training with a firm as a solicitor(律師), architect, surveyor, or accountant."></RadioButton>
                        </div>                              
                      </li>

                      {/* question 23*/}
                      <li className="mt-4">
                        Which paragraph(s) expresses the following idea ? Match
                        the paragraph number to the sentence . (4 marks)
                        <ol className="mt-2">
                          <li>
                            Solutions
                            <input type="text" name="q23i" className="form-control mt-2" />
                          </li>

                          <li className="mt-2">
                            The disadvantages of Gentrification(士紳化).
                            <input type="text" name="q23ii" className="form-control mt-2" />
                          </li>

                          <li className="mt-2">
                            The unsustainability of thrifting(節儉)
                            <input type="text" name="q23iii" className="form-control mt-2" />
                          </li>

                          <li className="mt-2">
                            Thrifting is sustainable(可持續的), or is it?
                            <input type="text" name="q23iv" className="form-control mt-2" />
                          </li>
                        </ol>
                      </li>

                      {/* question 24 */}
                      <li className="mt-4">
                        According to paragraph 6 and 7, why is thrifting not a
                        “seemingly win-win situation”?
                        <input type="text" name="q24" className="form-control mt-2" />
                      </li>

                      {/* question 25*/}
                      <li className="mt-4">
                        How much percent of the donated clothing is actually
                        sold second hand?
                        <input type="text" name="q25" className="form-control mt-2" />
                      </li>

                      {/* question 26 */}
                      <li className="mt-4">
                        According to the passage, what was the original purpose
                        of thrifting?
                        <div className="mt-2">
                            <RadioButton name="q26" id="A" label="To encourage high-profit resale"></RadioButton>
                            <RadioButton name="q26" id="B" label="To alleviate guilt from excessive shopping"></RadioButton>
                            <RadioButton name="q26" id="C" label="To distribute resources to those with less financial stability"></RadioButton>
                            <RadioButton name="q26" id="D" label="To promote vintage clothing"></RadioButton>
                        </div>
                      </li>

                      {/* question 27*/}
                      <li className="mt-4">
                        What does the passage suggest as an appropriate reason
                        for thrifting?
                        <div className="mt-2">
                            <RadioButton name="q27" id="A" label="Reselling items for high profit"></RadioButton>
                            <RadioButton name="q27" id="B" label="Alleviating guilt from excessive shopping"></RadioButton>
                            <RadioButton name="q27" id="C" label="Finding affordable items on a budget"></RadioButton>
                            <RadioButton name="q27" id="D" label="Promoting the purchase of vintage clothing"></RadioButton>
                        </div>
                      </li>

                      {/* question 28*/}
                      <li className="mt-4">
                        How does the passage advise those who thrift for the
                        purpose of reselling items?
                        <div className="mt-2">
                            <RadioButton name="q28" id="A" label="Encourages high-profit resale"></RadioButton>
                            <RadioButton name="q28" id="B" label="Suggests thinking twice before reaching for the wallet"></RadioButton>
                            <RadioButton name="q28" id="C" label="Urges frequent thrift store visits"></RadioButton>
                            <RadioButton name="q28" id="D" label="Recommends buying excessive clothes"></RadioButton>
                        </div>
                      </li>

                      {/* question 29*/}
                      <li className="mt-4">
                        What is the suggested action for those thrifting to
                        alleviate guilt from excessive clothes shopping?
                        <div className="mt-2">
                            <RadioButton name="q29" id="A" label="Think twice before reaching for the wallet"></RadioButton>
                            <RadioButton name="q29" id="B" label="Continue excessive shopping wallet"></RadioButton>
                            <RadioButton name="q29" id="C" label="Resell items for high profit"></RadioButton>
                            <RadioButton name="q29" id="D" label="Ignore the guilt"></RadioButton>
                        </div>
                      </li>

                      {/* question 30*/}
                      <li className="mt-4">
                        According to the passage, what is the situation that
                        warrants thrifting?
                        <div className="mt-2">
                            <RadioButton name="q30" id="A" label="Buying vintage clothes for a high price"></RadioButton>
                            <RadioButton name="q30" id="B" label="Needing an extra coat on a budget wallet"></RadioButton>
                            <RadioButton name="q30" id="C" label="Reselling thrifted items for profit"></RadioButton>
                            <RadioButton name="q30" id="D" label="Ignoring financial stability"></RadioButton>
                        </div>
                      </li>

                      {/* question 31*/}
                      <li className="mt-4">
                        Find a word from paragraph 8 which nearly means
                        “method”.
                        <input type="text" name="q31" className="form-control mt-2" />
                      </li>

                      {/* question 32*/}
                      <li className="mt-4">
                        Find a word from paragraph 8 which is similar to
                        “origins”.
                        <input type="text" name="q32" className="form-control mt-2" />
                      </li>

                      {/* question 33*/}
                      <li className="mt-4">
                        Choose the best alternative title for this article?
                        <div className="mt-2">
                            <RadioButton name="q33" id="A" label="Fun Facts About Thrifting"></RadioButton>
                            <RadioButton name="q33" id="B" label="The Definitions of Thrifting"></RadioButton>
                            <RadioButton name="q33" id="C" label="The Dirty History and Truth of Thrifting"></RadioButton>
                            <RadioButton name="q33" id="D" label="Thrifting and Gentrification"></RadioButton>
                        </div>
                      </li>

                      {/* question 34*/}
                      <li className="mt-4">
                        Which people should think twice before shopping at
                        thrift stores ? (2 marks)
                        <textarea type="text" name="q34" className="form-control mt-2" />
                      </li>

                      {/* question 35*/}
                      <li className="mt-4">
                        Are the following statements True(T) , False(F) or Not
                        Given(NG)? (3 marks)
                        <ol className="mt-2">
                          <li>
                            Gentrification has led to many people being
                            evicted(被驅逐的) from their homes. <InlineShortTextInput name="q35"/>
                          </li>

                          <li className="mt-2">
                            The current thrifting industry is still able to
                            cater to their original demographic.<InlineShortTextInput name="q35"/>
                          </li>

                          <li className="mt-2">
                            There is a different alternative to thrifting<InlineShortTextInput name="q35"/>
                          </li>
                        </ol>
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
                        Read texts 2-4 and answer the questions in the Question
                        Answer Book for Part B1
                      </p>

                    </div>

                  <Card>
                    <CardBody className="pb-2">
  
                    <div>
                      <h4>Human Evolution</h4>
                      <p>
                        A long time ago, when people first started, they lived
                        in small groups that were like big families. As time
                        went on, they built more solid homes because they wanted
                        to have a stable and safe life.
                      </p>
                      <h6>Slide-1</h6>

                      <p>
                        In ancient times, there were no cars or fancy things
                        like we have today. Instead, people shared and exchanged
                        things in their communities. It's like everyone sharing
                        and using things together, focusing on having what they
                        needed instead of owning a lot of stuff.{" "}
                      </p>
                      <h6>Slide-2</h6>

                      <p>
                        Back in ancient times, people didn't quickly decide to
                        get married or have kids. They took their time to find
                        someone special. Even though their ceremonies might have
                        happened sooner, the idea of finding a good connection
                        and companion stayed important.{" "}
                      </p>
                      <h6>Slide-3</h6>

                      <p>
                        Shopping in the old days was different. No big stores or
                        online shops existed. People back then would have liked
                        the idea of easily comparing prices before buying
                        something. Just having a popular brand wasn't enough;
                        they wanted to get the best deal.
                      </p>
                      <h6>Slide-4</h6>
                      <p>
                        In ancient times, they didn't talk much about being
                        healthy like we do now. But those early people probably
                        did a lot of moving around and ate good food. They knew
                        it was important to be active and eat well every day.{" "}
                      </p>
                      <h6>Slide-5</h6>

                      <p>
                        Throughout history, people always wanted to be better.
                        In the old days, without our cool technology, they found
                        ways to improve themselves. Just like today, people did
                        things to stay healthy and feel good. They knew that
                        being healthy is not a one-time thing but a continuous
                        effort to make good choices every day.
                      </p>
                      <h6>Slide-6</h6>
                    </div>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody>
                    <center>
                      <h6>Living Together: Animals and People</h6>
                    </center>
                    <ol>
                      <li>
                        In the big picture of life, animals and humans live side
                        by side, and there are lots of ways we are alike. Let's
                        explore some of these similarities and also see what
                        makes each of us special.
                      </li>
                      <li>
                        One thing we have in common is that we both like to be
                        with others. Animals, like us, enjoy being united.
                        Whether it's a bunch of lions, dolphins playing
                        together, or a flock of birds flying in the sky, these
                        groups help everyone stay safe and feel like they
                        belong. Humans also like to be in groups, whether it's
                        in a busy city or a small village.
                      </li>
                      <li>
                        Another thing animals and humans share is the need for a
                        safe place to live. Animals build homes like nests or
                        burrows, while humans make houses and big buildings. We
                        all want a comfortable and safe place to call home.
                      </li>
                      <li>
                        When it comes to finding food, both animals and humans
                        are good at it. Animals hunt, graze, or find food in
                        different ways. Humans farm, fish, and cook to make sure
                        we have enough to eat. It's something we all need to do
                        to stay alive.
                      </li>
                      <li>
                        Talking to each other is important too. Animals have
                        their own ways of communicating, like using sounds or
                        body movements. Humans have language, which lets us
                        share ideas and thoughts in more complex ways. But
                        whether it's with sounds or words, we all want to
                        connect with others.
                      </li>
                      <li>
                        Even though we have a lot in common, there are also
                        things that make each of us special. Animals are really
                        good at adapting to nature and using their instincts to
                        survive. Humans, on the other hand, are smart and
                        creative. We can make tools, use technology, and change
                        the world around us.
                      </li>
                      <li>
                        Animals show care and cooperation within their groups,
                        and humans have this too. We can feel for others and
                        help them, even beyond our own kind. It's a special way
                        of looking out for one another.
                      </li>
                      <li>
                        In the big story of life, animals and humans are like
                        different threads woven together. We're all part of the
                        same beautiful picture, and it's up to us to take care
                        of each other and the world we share. By understanding
                        what makes us alike and appreciating our unique
                        strengths, we can create a world where animals and
                        humans live together in harmony.
                      </li>
                    </ol>
                    <h6 className="mt-5">Text 4</h6>

                    <ol>
                      <li>
                        1.9 Million Years Ago:
                        <ul>
                          <li>
                            {" "}
                            Homo erectus, with a bigger brain and better tools,
                            shows up in Africa.
                          </li>
                        </ul>
                      </li>

                      <li>
                        300,000-200,000 Years Ago:
                        <ul>
                          <li>
                            {" "}
                            Homo sapiens, like us but not exactly, evolves in
                            Africa.
                          </li>
                          <li>
                            We start thinking in symbols and communicating more.
                          </li>
                        </ul>
                      </li>

                      <li>
                        12,000 Years Ago:
                        <ul>
                          <li>
                            We begin farming, making our homes in one place.
                          </li>
                          <li>
                            We start growing our own food and taking care of
                            animals.
                          </li>
                        </ul>
                      </li>

                      <li>
                        5,000 Years Ago:
                        <ul>
                          <li>
                            Big civilizations start in places like Mesopotamia,
                            Egypt, and China.
                          </li>

                          <li> People start writing things down.</li>
                        </ul>
                      </li>

                      <li>
                        2,500 Years Ago:
                        <ul>
                          <li>
                            {" "}
                            Ancient Greece and Rome are cool places with smart
                            ideas.
                          </li>

                          <li>
                            People trade and talk with each other from different
                            parts of the world.{" "}
                          </li>
                        </ul>
                      </li>

                      <li>
                        1,000 Years Ago:
                        <ul>
                          <li>Medieval times with kings and castles.</li>

                          <li>
                            In the Islamic world, people are really good at
                            science and math..
                          </li>
                        </ul>
                      </li>

                      <li>
                        500 Years Ago:
                        <ul>
                          <li>
                            The Renaissance is a time of big changes in Europe.
                          </li>

                          <li>
                            People start exploring the world and meeting new
                            cultures.
                          </li>
                        </ul>
                      </li>

                      <li>
                        200 Years Ago:
                        <ul>
                          <li>
                            The Industrial Revolution changes how we live and
                            work.
                          </li>

                          <li>
                            We get better at using machines, making things
                            faster.
                          </li>
                        </ul>
                      </li>

                      <li>
                        100 Years Ago:
                        <ul>
                          <li>
                            World War I and II changed how countries work
                            together.
                          </li>

                          <li>
                            We get better at science, technology, and treating
                            everyone fairly.
                          </li>
                        </ul>
                      </li>

                      <li>
                        Today:
                        <ul>
                          <li>
                            Computers, the internet, and new medical discoveries
                            are changing our lives.{" "}
                          </li>
                        </ul>
                      </li>
                    </ol>
                    <h5 className="mt-5">END OF READING PASSAGES</h5>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody>
                    <p>Read Texts 2-4 and answer questions 36-50. (43 marks)</p>

                    <ol start="36">
                      {/* question */}
                      <li className="mt-4">
                        Find a phrase in slide 1 that shows that the people in
                        ancient times lived together with unity. (2 marks)
                        <input type="text" name="q36" className="form-control mt-2" />
                      </li>

                      {/* question 37 */}
                      <li className="mt-4">
                        What was the reason to build stronger homes?
                        <div className="mt-2">
                            <RadioButton name="q37" id="A" label="To develop better"></RadioButton>
                            <RadioButton name="q37" id="B" label="To learn more"></RadioButton>
                            <RadioButton name="q37" id="C" label="To stay safe"></RadioButton>
                            <RadioButton name="q37" id="D" label="To become modern"></RadioButton>
                        </div>
                      </li>

                      {/* question 38 */}
                      <li className="mt-4">
                        According to slide 2, what do we have today that was not
                        there in the ancient times? (2 marks)
                        <input type="text" name="q38" className="form-control mt-2" />
                      </li>

                      {/* question 39*/}
                      <li className="mt-4">
                        What did ancient people do more than buying a lot of
                        unnecessary things? (2 marks)
                        <input type="text" name="q39" className="form-control mt-2" />
                      </li>

                      {/* question 40*/}
                      <li className="mt-4">
                        Complete the following summary based on Text 7. (3
                        Marks)
                        <div className="m-1 mt-4">
                          <p>
                            People in the past were not in a hurry. Before
                            getting <InlineTextInput name="q40"/>
                            or having <InlineTextInput name="q40"/>, they took a lot of
                            <InlineTextInput name="q40"/>. All that mattered was, finding a
                            <InlineTextInput name="q40"/> and <InlineTextInput name="q40"/>.
                          </p>
                        </div>
                      </li>

                      {/* question 41 */}
                      <li>
                        According to slides 4-5, are the following statements
                        True (T), False (F), or Not Given (NG) (4 marks)
                        <ul className="mt-2">
                          <li>
                            Buying things was more important than comparing
                            prices in the ancient times. <InlineShortTextInput name="q41"/>
                          </li>

                          <li className="mt-2">
                            In the old days, there was no importance of a
                            popular brand. <InlineShortTextInput name="q41"/>
                          </li>

                          <li className="mt-2">
                            Being healthy is very different in the present than
                            it was in the past. <InlineShortTextInput name="q41"/>
                          </li>
                          <li className="mt-2">
                            Staying active and eating healthy was very
                            important. <InlineShortTextInput name="q41"/>
                          </li>
                        </ul>
                      </li>

                      {/* question 42 */}
                      <li className="mt-4">
                        Why should being healthy be a continuous effort? (2
                        marks)
                        <input type="text" name="q42" className="form-control mt-2" />
                      </li>

                      {/* question 43 */}
                      <li className="mt-4">
                        Find the phrases mentioned in paragraph 1 & 2 and match it with the sentences. 
                        One example has been done for you.    (2 marks)
                        <ol type="a" className="mt-2">
                          <li>
                            To look at everything.  <InlineTextInput value="Big picture of life" disabled="disabled"/>
                          </li>
                          <li className="mt-2">
                            Let's find out. <InlineTextInput name="q43"/>
                          </li>
                          <li className="mt-2">
                            Animals usually stay in groups. <InlineTextInput name="q43"/>
                          </li>
                        </ol>
                      </li>

                      {/* question 44 */}
                      <li className="mt-4">
                        Complete the blank with appropriate words or phrases
                        from paragraph 3. (8 marks)
                          <p>
                            Animals and <InlineTextInput name="q44"/> have a similarity in the 
                            places they live. While animals live in <InlineTextInput name="q44"/>
                            or <InlineTextInput name="q44"/>, humans tend to live in
                            <InlineTextInput name="q44"/> and <InlineTextInput name="q44"/>. All 
                            that both need is a <InlineTextInput name="q44"/> and <InlineTextInput name="q44"/>
                            to call home.
                          </p>
                      </li>

                      {/* question 45*/}
                      <li className="mt-4">
                        How do animals find food in two different ways? (2
                        marks)
                        <input type="text" name="q45" className="form-control mt-2" />
                      </li>

                      {/* question 46 */}
                      <li className="mt-4">
                        What is something we need to stay alive?
                        <div className="mt-2">
                            <RadioButton name="q46" id="A" label="Sleep"></RadioButton>
                            <RadioButton name="q46" id="B" label="Eat"></RadioButton>
                            <RadioButton name="q46" id="C" label="Breathe"></RadioButton>
                            <RadioButton name="q46" id="D" label="Work"></RadioButton>
                        </div>
                      </li>

                      {/* question 47*/}
                      <li className="mt-4">
                        Describe how humans and animals communicate with
                        themselves? (3 marks)
                        <textarea type="text" name="q47" className="form-control mt-2" />
                      </li>

                      {/* question 48*/}
                      <li className="mt-4">
                        What does the phrase on the other hand mean in paragraph 6?
                        <div className="mt-2">
                            <RadioButton name="q48" id="A" label="It is a contradicting phrase"></RadioButton>
                            <RadioButton name="q48" id="B" label="It is a linking phrase"></RadioButton>
                            <RadioButton name="q48" id="C" label="It begins a new idea"></RadioButton>
                            <RadioButton name="q48" id="D" label="It ends a previous idea"></RadioButton>
                        </div>
                      </li>

                      {/* question 49*/}
                      <li className="mt-4">
                        What is a special way to look out for each other?
                        <div className="mt-2">
                            <RadioButton name="q49" id="A" label="Helping each other"></RadioButton>
                            <RadioButton name="q49" id="B" label="Listening to each other"></RadioButton>
                            <RadioButton name="q49" id="C" label="Talking to each other"></RadioButton>
                            <RadioButton name="q49" id="D" label="Feeling for each other"></RadioButton>
                        </div>
                      </li>

                      {/* question 50*/}
                      <li className="mt-4">
                        Which phrase from paragraph 8 resembles the phrase
                        different people living together in the same places? (2
                        marks)
                        <textarea type="text" name="q50" className="form-control mt-2" />
                      </li>

                      {/* question 51*/}
                      <li className="mt-4">
                        Who had a bigger brain and better tools?
                        <input type="text" name="q51" className="form-control mt-2" />
                      </li>

                      {/* question 52 */}
                      <li className="mt-4">
                        Who evolved in Africa?{" "}
                        <input type="text" name="q52" className="form-control mt-2" />
                      </li>

                      {/* question 53 */}
                      <li className="mt-4">
                        Where were people really good at math and science?{" "}
                        <input type="text" name="q53" className="form-control mt-2" />
                      </li>

                      {/* question 54*/}
                      <li className="mt-4">
                        Which Revolution changed the way we live and work?{" "}
                        <input type="text" name="q54" className="form-control mt-2" />
                      </li>

                      {/* question 55 */}
                      <li className="mt-4">
                        Which two wars are mentioned in the text?{" "}
                        <input type="text" name="q55" className="form-control mt-2" />
                      </li>
                    </ol>

                    <center>
                      <h6>END OF PART B1</h6>
                    </center>

                  </CardBody>
                </Card>

                <center className="mt-4">
                  <h4>ENGLISH LANGUAGE PAPER 1</h4>
                  <h6>PART B2</h6>
                  <h6>Reading Passages</h6>
                </center>

                <div id="formControls" className="mt-5">
                  <h6>INSTRUCTIONS FOR PART B2 </h6>

                  <ol>
                    <li>
                      Candidates who choose Part B2 should attempt all questions
                      in this part. Each question carries ONE mark unless
                      otherwise stated.
                    </li>
                  </ol>

                  <h6>PART B2 </h6>
                  <p>
                    Read text 5 and answer the questions in the Question Answer
                    Book for Part B2
                  </p>
                </div>
                <Card>
                  <CardBody>
                    <center>
                      <h6> Just Try Your Best</h6>
                    </center>

                    <ol>
                      <li>
                        As the saying goes, the more you know, the more you
                        realize you don't know. Yes, I know this quote is more
                        about the human thirst for knowledge, but I'm sure there
                        are plenty of moments when we all ask ourselves, "Am I
                        doing this right?"
                      </li>
                      <li>
                        It's that feeling of anxiety that lurks(潛伏著) in the
                        back of our minds like a shadow, rearing (抬起) its ugly
                        head whenever we see others do things differently or
                        seemingly more successfully than ourselves. It's there
                        when we're children in school, trying and struggling to
                        catch up in our classes. It's there when we're competing
                        against our peers. It's there when we're stepping into
                        the unknown of a new and terrifyingly exciting
                        relationship and every step that comes after it. The
                        most notable example would be parenthood when every
                        second of a child's development garners (加納) so much
                        attention and so many suggestions about what parents
                        should and should not do that they often feel
                        overwhelmed before the kid even has a chance to take
                        their first breath on the human plane.{" "}
                      </li>
                      <li>
                        I know the feeling; after all, I'm only human. We all
                        are.
                      </li>
                      <li>
                        That's just a fact, isn't it? The fact that no one's
                        perfect. We could look at a person and think they're
                        perfect, that they're superior (優越) in what they do,
                        and that we could never reach that level no matter how
                        hard we try. But in reality, they probably look at you
                        the same way. We all put people on pedestals (基座) and
                        look at them with awe (敬畏) and wonder (驚奇), but in
                        doing so, we become blind to the flaws they actually
                        have and to the perfection that they see in us. We
                        aren't machines programmed to be flawless at everything,
                        and even machines have their moments of breaking down.
                        Again, no one's perfect, so we might as well settle for
                        the next best thing—trying our best.
                      </li>
                      <li>
                        I'm sure it sounds a bit like a cop-out to most people.
                        We all have that relative, teacher, or parent who tells
                        us to "just do our best" ad nauseam in our studies, but
                        it's been repeated time and time again only because the
                        saying holds true. Make an attempt, put your best foot
                        forward, take any opportunity that comes your way, try
                        and fail but don't fail to try, etc., are all different
                        ways of saying basically the same message: you just have
                        to try.
                      </li>
                      <li>
                        The thing with life is that there aren't any guarantees.
                        You could follow every instruction down to the letter,
                        plan for every second and every possible scenario, and
                        still, something could go wrong. Maybe it could turn out
                        to be like that story where the man lost his horse, but
                        it's far more likely that you will just have to try your
                        best and hope for the best outcome when things go
                        sideways. And if there isn't? Life isn't a straight
                        road; it's a rabbit hole, winding and dark and
                        claustrophobic (誘發幽閉恐懼症), and when you're stuck,
                        you can only keep going until you reach the other side.
                        It's terrifying and uncertain, and you'll probably end
                        up scratched (劃傷), bruised (擦傷), covered in dirt,
                        and more exhausted (筋疲力盡) than you ever thought
                        imaginable. But a solution is possible. First, you just
                        have to try.
                      </li>
                    </ol>
                    <center>
                      <h6>END OF READING PASSAGES </h6>
                    </center>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody>
                    <h6>2017 MOCK</h6>
                    <h6>ENGLISH LANGUAGE</h6>
                    <h6>PAPER 1 PART B2</h6>

                    <p>Read Text 5 and answer questions 56-82. (43 marks)</p>

                    <ol start="56">
                      {/* question 56 */}
                      <li className="mt-3">
                        Are the following statements True(T) , False(F) or Not
                        Given (NG)? (3 marks)
                        <ul className="mt-3">
                          <li className="mb-3">
                            Life is unpredictable(不可預料的)<InlineShortTextInput name="q56"/>
                          </li>

                          <li className="mb-3">
                            Parents can easily make their own decisions<InlineShortTextInput name="q56"/>
                          </li>

                          <li className="mb-3">
                            People should have a contingency plan(應急方案) for
                            every possible scenario<InlineShortTextInput name="q56"/>
                          </li>
                        </ul>
                      </li>

                      {/* question 57 */}
                      <li className="mt-3">
                        List the 4 sayings that encourage people to try . (4
                        marks)
                        <div className="mt-2">
                          <ul>
                            <li className="mb-3">
                              <input type="text" name="q57" className="form-control" />
                            </li>
                            <li className="mb-3">
                              <input type="text" name="q57" className="form-control" />
                            </li>
                            <li className="mb-3">
                              <input type="text" name="q57" className="form-control" />
                            </li>
                            <li className="mb-3">
                              <input type="text" name="q57" className="form-control" />
                            </li>
                          </ul>
                        </div>
                      </li>

                      {/* question 58*/}
                      <li className="mb-3">
                        What or who does the “they” refer to in paragraph 2 ?
                        <input type="text" name="q58" className="form-control mt-2" />
                      </li>

                      {/* question 59*/}
                      <li className="mb-3">
                        Which phrase means “believing that somebody is perfect”?{" "}
                        <input type="text" name="q59" className="form-control mt-2" />
                      </li>

                      {/* question 60*/}
                      <li className="mb-3">
                        When is it that people start to have anxiety about their
                        capabilities?
                        <input type="text" name="q60" className="form-control mt-2" />
                      </li>

                      {/* question 61*/}
                      <li className="mb-3">
                        Why is parenting so confusing ? (2 marks){" "}
                        <textarea type="text" name="q61" className="form-control mt-2" />
                      </li>

                      {/* question 62*/}
                      <li className="mb-3">
                        What simile(明喻) is used to describe anxiety?
                        <input type="text" name="q62" className="form-control mt-2" />
                      </li>

                      {/* question 63*/}
                      <li className="mt-4">
                        Which word can replace “lurks(潛伏著)”?
                        <div className="mt-2">
                            <RadioButton name="q63" id="A" label="Grows"></RadioButton>
                            <RadioButton name="q63" id="B" label="Stays"></RadioButton>
                            <RadioButton name="q63" id="C" label="Travels"></RadioButton>
                            <RadioButton name="q63" id="D" label="Comes"></RadioButton>
                        </div>
                      </li>

                      {/* question 64*/}
                      <li className="mt-4">
                        What common attribute does the speaker acknowledge about
                        themselves and everyone else in paragraph 3?{" "}
                        <textarea type="text" name="q64" className="form-control mt-2" />
                      </li>

                      {/* question 65*/}
                      <li className="mt-4">
                        What does the speaker emphasize as a fact in the
                        passage?
                        <div className="mt-2">
                          <RadioButton name="q65" id="A" label="Perfection is attainable"></RadioButton>
                          <RadioButton name="q65" id="B" label="Everyone is flawed"></RadioButton>
                          <RadioButton name="q65" id="C" label="People are machines"></RadioButton>
                          <RadioButton name="q65" id="D" label="Awe and wonder are impossible feelings"></RadioButton>
                        </div>
                      </li>

                      {/* question 66*/}
                      <li className="mt-4">
                        What does the passage suggest about putting people on
                        pedestals?
                        <div className="mt-2">
                            <RadioButton name="q66" id="A" label="It is a flawless practice"></RadioButton>
                            <RadioButton name="q66" id="B" label="People on pedestals have no flaws"></RadioButton>
                            <RadioButton name="q66" id="C" label="It blinds us to their flaws"></RadioButton>
                            <RadioButton name="q66" id="D" label="It enhances our ability to see flaws"></RadioButton>
                        </div>
                      </li>

                      {/* question 67*/}
                      <li className="mt-4">
                        How does the passage describe the speaker's perspective
                        on human perfection?
                        <div className="mt-2">
                            <RadioButton name="q67" id="A" label="Humans are programmed to be flawless"></RadioButton>
                            <RadioButton name="q67" id="B" label="Flawlessness is achievable with effort"></RadioButton>
                            <RadioButton name="q67" id="C" label="No one is perfect, and flaws are inevitable"></RadioButton>
                            <RadioButton name="q67" id="D" label="Machines are the only flawless entities"></RadioButton>
                        </div>
                      </li>

                      {/* question68 */}
                      <li className="mt-4">
                        What does the speaker suggest about machines in the
                        passage?
                        <div className="mt-2">
                            <RadioButton name="q68" id="A" label="They are programmed to be flawless"></RadioButton>
                            <RadioButton name="q68" id="B" label="Machines never break down"></RadioButton>
                            <RadioButton name="q68" id="C" label="Machines are perfect at everything"></RadioButton>
                            <RadioButton name="q68" id="D" label="Even machines have moments of breaking down"></RadioButton>
                        </div>
                      </li>

                      {/* question 69*/}
                      <li className="mt-4">
                        What does the passage recommend as the next best thing
                        since no one is perfect?
                        <div className="mt-2">
                            <RadioButton name="q69" id="A" label="Accepting mediocrity"></RadioButton>
                            <RadioButton name="q69" id="B" label="Settling for imperfection"></RadioButton>
                            <RadioButton name="q69" id="C" label="Pursuing perfection relentlessly"></RadioButton>
                            <RadioButton name="q69" id="D" label="Ignoring flaws"></RadioButton>
                        </div>
                      </li>

                      {/* question 70*/}
                      <li className="mt-4">
                        Find a word from paragraph 4 which means “perfect”.
                        <input type="text" name="q70" className="form-control mt-2" />
                      </li>

                      {/* question 71*/}
                      <li className="mt-4">
                        Find a synonym for “accept” from paragraph 4 and also
                        write the sentence this word was found from.{" "}
                        <textarea type="text" name="q71" className="form-control mt-2" />
                      </li>

                      {/* question 72*/}
                      <li className="mt-4">
                        What is the purpose of the quote “just do your best” in
                        paragraph 5? (2 marks){" "}
                        <textarea type="text" name="q72" className="form-control mt-2" />
                      </li>

                      {/* question 73*/}
                      <li className="mt-4">
                        Fill in the following paragraph with ONE word from
                        paragraph 6-9 in each blank. Make sure that the answers
                        are grammatically accurate . (5 marks)
                        <div className="m-1">
                          <p>
                            A lot of us have that <InlineTextInput name="q73"/>,
                            <InlineTextInput name="q73"/>, or <InlineTextInput name="q73"/>
                            who always encourages us. This encouragement has <InlineTextInput name="q73"/>
                            continuously because their words have stayed <InlineTextInput name="q73"/>. 
                            What we should always do is to proceed with an <InlineTextInput name="q73"/>
                            and take all sorts of <InlineTextInput name="q73"/>
                            that we can get. All we have to do is <InlineTextInput name="q73"/>.
                          </p>
                        </div>
                      </li>

                      {/* question 74*/}
                      <li className="mt-4">
                        Which word best describes the general attitude of the
                        author as expressed in the passage?
                        <div className="mt-2">
                            <RadioButton name="q74" id="A" label="Condescending(居高臨下)"></RadioButton>
                            <RadioButton name="q74" id="B" label="Encouraging"></RadioButton>
                            <RadioButton name="q74" id="C" label="Amused"></RadioButton>
                            <RadioButton name="q74" id="D" label="Callous (冷酷)"></RadioButton>
                        </div>
                      </li>

                      {/* question 75*/}
                      <li className="mt-4">
                        Which is the metaphor(隱喻) used to describe life in the
                        final paragraph ?
                        <input type="text" name="q75" className="form-control mt-2" />
                      </li>

                      {/* question 76*/}
                      <li className="mt-4">
                        What does the passage suggest about life's unpredictability?
                        <div className="mt-2">
                          <RadioButton name="q76" id="A" label="Life is a straight road with guarantees"></RadioButton>
                          <RadioButton name="q76" id="B" label="Every scenario can be planned for"></RadioButton>
                          <RadioButton name="q76" id="C" label="Even with meticulous planning, something could go wrong"></RadioButton>
                          <RadioButton name="q76" id="D" label="Guarantees make life more straightforward"></RadioButton>
                        </div>
                      </li>

                      {/* question 77*/}
                      <li className="mt-4">
                        How does the passage describe life as a rabbit hole?
                        <div className="mt-2">
                          <RadioButton name="q77" id="A" label="Bright and clear"></RadioButton>
                          <RadioButton name="q77" id="B" label="Winding, dark, and claustrophobic"></RadioButton>
                          <RadioButton name="q77" id="C" label="Straight and well-defined"></RadioButton>
                          <RadioButton name="q77" id="D" label="Predictable and certain"></RadioButton>
                        </div>
                      </li>

                      {/* question 78*/}
                      <li className="mt-4">
                        What is the message conveyed about guarantees in life
                        according to paragraph 6?
                        <textarea type="text" name="q78" className="form-control mt-2" />
                      </li>

                      {/* question 79 */}
                      <li className="mt-4">
                        How does the passage describe life's journey using the
                        metaphor of a rabbit hole?
                        <textarea type="text" name="q79" className="form-control mt-2" />
                      </li>

                      {/* question 80*/}
                      <li className="mt-4">
                        What physical conditions does the passage mention a
                        person might end up in during life's journey?
                        <textarea type="text" name="q80" className="form-control mt-2" />
                      </li>

                      {/* question 81*/}
                      <li className="mt-4">
                        What solution does the passage propose when facing
                        life's uncertainties?
                        <input type="text" name="q81" className="form-control mt-2" />
                      </li>

                      {/* question 82 */}
                      <li className="mt-4">
                        How do the 3 adjectives “winding(彎曲), dark and
                        claustrophobic” describe life ? (3 marks)
                        <ul>
                          <li>
                            <input type="text" name="q82" className="form-control mt-2" />
                          </li>
                          <li>
                            <input type="text" name="q82" className="form-control mt-2" />
                          </li>
                          <li>
                            <input type="text" name="q82" className="form-control mt-2" />
                          </li>
                        </ul>
                      </li>

                    </ol>

                    <center>
                      <h6>END OF PART B2</h6>
                    </center>
                  </CardBody>
                </Card>
    </>
  );
  return (<ReadingPaper year="2017" paper={paper} totalQuestions="82" specialQuestions="23i,23ii,23iii,23iv"/>) 
};

export default Reading2017;
