import React  from "react";
import { Card, CardBody } from "../../components/card/card";
import { RadioButton } from "../../components/radio/radio";
import { InlineTextInput, InlineShortTextInput } from "../../components/inlinetextinput/inlinetextinput";
import { ReadingPaper } from "./reading";
import { useSelector } from "react-redux";


const Reading2022 = () => {
  // const userInfo = useSelector((store) => store.auth.userInfo);

  const paper = (
    <>
          {/* <div className="col-xl-9"> */}
          <ul className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#/">READING</a>
          </li>
          <li className="breadcrumb-item active">2022</li>
        </ul>
        <h1 className="page-header">
          2022 Reading Mock Paper
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
            Read text 1 and answer the questions in the Question Answer
            Book for Part-A
          </p>
        </div>
        <Card>
          <CardBody className="pb-2">
            <center>
              <h6>The Slow Erosion of Comic Books in the Digital Age: An Analysis of the Industry's Decline</h6>
            </center>

            <p>
              Comic books have long been a beloved form of entertainment for readers of all ages. However, in the digital age, the popularity of comic books has slowly eroded, leaving many publishers struggling to stay afloat. According to a report by the market research firm NPD Group, sales of comic books and graphic novels in the United States fell by 6.5% in 2020, marking the second consecutive year of decline. In this article, we will explore the impact of the internet on the comic book industry and the challenges faced by publishers in the digital age.
            </p>
            <p>
              <h6>The Rise of the Internet</h6>
              One of the main reasons for the decline in comic book popularity is the rise of the internet. With the advent of digital devices, readers can now access a wide range of books, magazines, and comics online, often for free. According to a survey conducted by the research firm Statista, 66% of comic book readers in the United States read digital comics in 2020, up from 58% in 2019. This shift in reading habits has made it much easier for readers to find and read comics without having to purchase physical copies.
            </p>
            <p>
              <h6>The Challenges Faced by Publishers</h6>
              The digital age has created many challenges for comic book publishers, including declining sales, piracy, and changing reading habits. Many publishers struggle to compete with online retailers and digital platforms that offer comics at a much lower cost than physical copies. According to a report by the consulting firm McKinsey & Company, the comic book industry is facing a "maturity crisis," with the average age of comic book readers increasing and younger readers turning to other forms of entertainment.
            </p>
            <p>
              <h6>Famous Names Affected</h6>
              Even well-known comic book publishers like Marvel and DC Comics have been affected by the decline in the industry. According to a report by Forbes, Marvel's comic book sales fell by 23% in 2020, while DC Comics experienced a 12% decline. These declines have forced both companies to restructure their operations and explore new ways of reaching readers, including digital platforms and streaming services.
            </p>
            <p>
              <h6>Consumer Behavior Changes</h6>
              In addition to the internet's rise, shifts in consumer behavior have played a crucial role in the comic book industry's decline. The modern reader's preference for quick, easily digestible content has made it challenging for traditional comic book formats, which often require more extended engagement compared to other online entertainment options.
            </p>
            <p>
              Social media platforms, video streaming services, and mobile games have become dominant players in the digital entertainment space, intensifying the competition for users' time and attention. Publishers now face the task of integrating their content into these digital ecosystems, whether through interactive apps, partnerships with online platforms, or engaging multimedia experiences.
            </p>
            <p>
              <h6>Piracy and Intellectual Property Concerns</h6>
              Another significant hurdle in the digital age is the rampant issue of piracy. With the ease of sharing digital content, comic books are susceptible to unauthorized distribution, impacting both publishers and creators financially. This not only leads to revenue losses but also poses a threat to intellectual property rights.
            </p>
            <p>
              To counteract piracy, publishers have invested in robust digital rights management (DRM) systems and anti-piracy measures. However, these efforts have not always been foolproof, and some readers still turn to unauthorized channels to access their favorite comics. Striking a balance between protecting intellectual property and providing convenient access to legitimate readers remains a delicate challenge for the industry.
            </p>
            <p>
              <h6>Evolution of Storytelling Formats</h6>
              The digital age has prompted a transformation in storytelling formats within the comic book industry. While traditional single issues maintain a place, the rise of digital platforms has given birth to serialized webcomics and graphic novels released in digital-first formats. This evolution allows for more experimentation in storytelling, with creators exploring diverse genres, styles, and themes.
            </p>
            <p>
              Webcomics, in particular, have gained popularity due to their accessibility and the direct interaction between creators and their audience. Platforms like Webtoon and Tapas serve as hubs for both established and emerging talents, creating a democratized space for storytelling outside the traditional publishing model. As publishers navigate these changes, embracing the digital landscape for storytelling diversity becomes crucial for long-term sustainability.
            </p>
            
            <h6>Strategies for Adaptation</h6>
            <p>
              Despite the challenges they face, many comic book publishers are finding ways to adapt to the digital age. One strategy is to offer digital copies of comics alongside physical copies, allowing readers to choose their preferred format. Another strategy is to invest in digital platforms and online retailers, allowing publishers to reach a wider audience and promote their comics more effectively. Some publishers are also exploring new formats, such as graphic novels and webcomics, to attract readers who may not be interested in traditional comic books.
            </p>
            <p>
              The decline of the comic book industry in the digital age is a complex issue that requires careful consideration and adaptation. While the rise of the internet has undoubtedly had a negative impact on sales, there are still opportunities for publishers to reach new readers and continue to create engaging and exciting content. By embracing new technologies and adapting to changing reading habits, the comic book industry can continue to thrive in the digital age.
            </p>


            <center>
              <h5>END OF READING PASSAGES</h5>
            </center>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="pb-2">
            <h6>
              2022 MOCK
              <br />
              ENGLISH LANGUAGE
              <br />
              PAPER 1 PART A
            </h6>

            <p>Read Text 1 and answer questions 1-25. (41 marks)</p>

            <ol>
              {/* question */}
              <li className="mt-4">
                According to the NPD Group, by how much did sales of comic books and graphic novels in the United States fall in 2020?                        
                <div className="mt-2">
                  <RadioButton name="q1" id="A" label="More than 6%"/> 
                  <RadioButton name="q1" id="B" label="Over 12%"/> 
                  <RadioButton name="q1" id="C" label="Greater than 23%"/> 
                  <RadioButton name="q1" id="D" label="Between 66% and 50%"/> 
                  <RadioButton name="q1" id="E" label="Not Given"/> 
                </div>
              </li>

              {/* question 2 */}
              <li className="mt-4">
              What is the biggest reason for the decrease of comic book sales?
              <textarea type="text" name="q2" className="form-control mt-2" />
              </li>

              {/* question 3*/}
              <li className="mt-4">
              What percentage of comic book readers in the United States read digital comics in 2020, according to a survey by Statista?                        <div className="mt-2">
                  <RadioButton name="q3" id="A" label="23%"/> 
                  <RadioButton name="q3" id="B" label="58%"/> 
                  <RadioButton name="q3" id="C" label="66%"/> 
                  <RadioButton name="q3" id="D" label="89%"/>
                </div>
              </li>

              {/* question 4*/}
              <li className="mt-4">
                <p>Complete the blank with the appropriate words from the paragraph “The Challenges Faced by Publishers”. (3 marks)</p>
                <p>Publishers face challenges to fight with (i) <InlineTextInput name="q4"/>. 
                  These people provide comics at a lower price than the (ii)<InlineTextInput name="q4"/>. 
                  One of problems faced by the comic book industry is (iii) <InlineTextInput name="q4"/> as 
                  there are other entertainment available</p>
              </li>

              {/* question 5*/}
              <li className="mt-4">
              How have well-known comic book publishers like Marvel and DC Comics been affected by the decline in the industry?
              <div className="mt-2">
                  <RadioButton name="q5" id="A" label="Sales have increased"/> 
                  <RadioButton name="q5" id="B" label="Sales have remained stable"/> 
                  <RadioButton name="q5" id="C" label="Sales have declined"/> 
                  <RadioButton name="q5" id="D" label="Sales have doubled"/>
                </div>
              </li>

              {/* question 6 */}
              <li className="mt-4">
              Find a word or phrase in the paragraph “Famous Names Affected” which has a similar meaning to <i>form newly or form in another way</i>
              <textarea type="text" name="q6" className="form-control mt-2" />
              </li>

              {/* question 7*/}
              <li className="mt-4">

              <p>Complete the blank with the appropriate words from the
                  paragraph “Consumer Behavior Changes”. Make sure the 
                  answers are grammatically correct  (7 marks)</p>
              <p>The user’s time has been intensified by i)<InlineTextInput name="q7"/>, ii)<InlineTextInput name="q7"/> and 
              video streaming services, which can be found in the digital iii)<InlineTextInput name="q7"/> space. 
              One solution publishers though of was to include their iv)<InlineTextInput name="q7"/> into these 
              digital v)<InlineTextInput name="q7"/>. They are confused whether to do this via vi)<InlineTextInput name="q7"/> 
              apps, by having vii)<InlineTextInput name="q7"/> as partners, or by multimedia experience engagement.
              </p>
              </li>

              {/* question 8*/}
              <li className="mt-4">
                What significant issue does the comic book industry face in the digital age regarding the unauthorized distribution of content according to the “Piracy and Intellectual Property Concerns” paragraph? 
                <textarea type="text" name="q8" className="form-control mt-2" />
              </li>

              {/* question 9*/}
              <li className="mt-4">
                What potential threats does piracy pose to comic book publishers and creators? 
                <textarea type="text" name="q9" className="form-control mt-2" />
              </li>

              {/* question 10*/}
              <li className="mt-4">
                How have publishers responded to the issue of piracy, according to the passage? (2 marks)
                <textarea type="text" name="q10" className="form-control mt-2" />
              </li>

              {/* question 11*/}
              <li className="mt-4">
                  What challenge does the industry face in striking a balance between protecting intellectual property and providing convenient access to readers?
                  <textarea type="text" name="q11" className="form-control mt-2" />
              </li>

              {/* question 12*/}
              <li className="mt-4">
              What issue does the comic book industry face due to the unauthorized distribution of digital content?
              <div className="mt-2">
                  <RadioButton name="q12" id="A" label="Declining quality"/> 
                  <RadioButton name="q12" id="B" label="Revenue losses"/> 
                  <RadioButton name="q12" id="C" label="Increased popularity"/> 
                  <RadioButton name="q12" id="D" label="Intellectual property gains"/>
                </div>
              </li>

              {/* question 13*/}
              <li className="mt-4">
              How have publishers responded to the issue of piracy in the digital age?
              <div className="mt-2">
                  <RadioButton name="q13" id="A" label="Ignored the problem"/> 
                  <RadioButton name="q13" id="B" label="Invested in digital rights management (DRM) systems"/> 
                  <RadioButton name="q13" id="C" label="Encouraged unauthorized distribution"/> 
                  <RadioButton name="q13" id="D" label="Reduced digital content production"/>
                </div>
              </li>


              {/* question 14*/}
              <li className="mt-4">
              <p>According to the paragraphs “Piracy and Intellectual Property Concerns” and “Evolution of Storytelling Formats”, decide whether the following statements are True(T), False(F), or NotGiven(NG).   (5 marks)</p>
              <p>i) Piracy has no impact on the financial well-being of comic book publishers and creators.   <InlineShortTextInput name="q14"/></p>
              <p>ii) Investments in digital rights management (DRM) systems and anti-piracy measures are consistently effective in preventing unauthorized access to comic.<InlineShortTextInput name="q14"/></p>
              <p>iii) The digital age has brought about changes in storytelling formats, including the introduction of serialized webcomics and graphic novels. <InlineShortTextInput name="q14"/></p>
              <p>iv) Webcomics have gained popularity primarily due to their exclusive availability in physical comic book stores. <InlineShortTextInput name="q14"/></p>
              <p>v) The passage suggests that ignoring the digital landscape is crucial for the long-term sustainability of the comic book industry. <InlineShortTextInput name="q14"/></p>
              </li>


              {/* question 15 */}
              <li className="mt-4">
              Identify the verb tense in the sentence "This evolution allows for more experimentation in storytelling." (Evolution of Storytelling Formats)
              <textarea type="text" name="q15" className="form-control mt-2" />
              </li>

              {/* question 16*/}
              <li className="mt-4">
                In the sentence "Platforms like Webtoon and Tapas serve as hubs," which word is a preposition? (Evolution of Storytelling Formats)
                  <textarea type="text" name="q16" className="form-control mt-2" />
              </li>


              {/* question 17*/}
              <li className="mt-4">
                Which word from “Evolution of Storytelling Formats” paragraph nearly means “innovation” ?
                  <textarea type="text" name="q17" className="form-control mt-2" />
              </li>

              {/* question 18*/}
              <li className="mt-4">
              Which word from “Evolution of Storytelling Formats” paragraph nearly means “recognized” ?
                  <textarea type="text" name="q18" className="form-control mt-2" />
              </li>

              {/* question 19*/}
              <li className="mt-4">
                  What is one strategy mentioned for comic book publishers to adapt to the digital age from the paragraph “Strategies for Adaptation”?
                  <div className="mt-2">
                  <RadioButton name="q19" id="A" label="Ignoring digital platforms"/>
                  <RadioButton name="q19" id="B" label="Reducing storytelling diversity"/>
                  <RadioButton name="q19" id="C" label="Offering only physical copies"/>
                  <RadioButton name="q19" id="D" label="Investing in digital platforms and online retailers"/>
                </div>
              </li>

              {/* question 20*/}
              <li className="mt-4">
              According to the passage, what is the impact of offering both digital and physical copies of comics?
                <div className="mt-2">
                  <RadioButton name="q20" id="A" label="Narrowing the audience"/>
                  <RadioButton name="q20" id="B" label="Readers are forced to choose only one format"/>
                  <RadioButton name="q20" id="C" label="Allowing readers to choose their preferred format"/>
                  <RadioButton name="q20" id="D" label="Confusing readers with too many options"/>
                </div>
              </li>

              {/* question 21*/}
              <li className="mt-4">
              What does the passage suggest as a potential benefit of investing in digital platforms and online retailers?
                <div className="mt-2">
                  <RadioButton name="q21" id="A" label="Limiting the reach of comics"/>
                  <RadioButton name="q21" id="B" label="Reaching a narrower audience"/>
                  <RadioButton name="q21" id="C" label="Promoting comics more effectively"/>
                  <RadioButton name="q21" id="D" label="Reducing engagement with readers"/>
                </div>
              </li>

            {/* question 22*/}
            <li className="mt-4">
              In the context of the decline of the comic book industry in the digital age, what does the passage imply about the impact of the rise of the internet? 
              <div className="mt-2">
                  <RadioButton name="q22" id="A" label="It has no impact on sales"/>
                  <RadioButton name="q22" id="B" label="It has a positive impact on sales"/>
                  <RadioButton name="q22" id="C" label="It has a negative impact on sales"/>
                  <RadioButton name="q22" id="D" label="It only affects traditional comic books"/>
                </div>
              </li>

              {/* question 23*/}
              <li className="mt-4">
                In the sentence "Despite the challenges they face," what is the subject of the clause?
                <textarea type="text" name="q23" className="form-control mt-2" />
              </li>

              {/* question 24*/}
              <li className="mt-4">
              What is the purpose of the phrase ‘Despite the challenges’ in the last paragraph?
              <div className="mt-2">
                  <RadioButton name="q24" id="A" label="Conclude a paragraph"/>
                  <RadioButton name="q24" id="B" label="Introduce a new idea"/>
                  <RadioButton name="q24" id="C" label="To support the previous paragraph"/>
                  <RadioButton name="q24" id="D" label="To show contrast with another idea"/>
                </div>
              </li>

              {/* question 25*/}
              <li className="mt-4">
                <p>According to the paragraph “Strategies for Adaptation” decide whether the following statements are True(T), False(F), or NotGiven(NG).   (5 marks)</p>
                <p>i) One of the strategies discussed for adapting to the digital age is offering both digital and physical copies of comics.<InlineShortTextInput name="q25"/></p>
                <p>ii) Investing in digital platforms and online retailers is not considered a strategy for reaching a wider audience and promoting comics effectively.    <InlineShortTextInput name="q25"/></p>
                <p>iii) The decline of the comic book industry in the digital age is solely attributed to changing consumer reading habits. (Conclusion: Navigating the Future of Comics in the Digital Age)<InlineShortTextInput name="q25"/></p>
                <p>iv) According to the passage, embracing new technologies and adapting to changing reading habits are not essential for the comic book industry to thrive in the digital age.<InlineShortTextInput name="q25"/></p>
                <p>v) Despite the negative impact of the internet on sales, there are opportunities mentioned for publishers to reach new readers and continue creating engaging content. <InlineShortTextInput name="q25"/></p>
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
                Read texts 2-3 and answer the questions in the Question
                Answer Book for Part B1
              </p>

            </div>

          <Card>
            <CardBody className="pb-2">
              <h3>Text 2</h3>

              <h6>Ad A</h6>
              <h6>Social Media Marketing Consultant</h6>
              <h6>Twinkle Resort and Casinos</h6>
              <h6>Job Summary:</h6>
              <ul>
              <li>Works closely with local and regional sales and marketing teams for social media needs (Instagram, Facebook, Wechat, etc.)</li>
              </ul>
              <h6>Job Requirements:</h6>
              <ul>
              <li>Diploma in Marketing/Communications/Hospitality</li>
              <li>Experience in advertising/design</li>
              <li>Ability to work well in small teams</li>
              <li>Knowledge of other countries/cultures</li>
              </ul>

              <h6>Ad B</h6>
              <h6>IT Consultant (3-month contract)</h6>
              <h6>ROYAL’S Group</h6>
              <h6>Job Summary:</h6>
              <ul>
              <li>Provides IT support for office and warehouse management software</li>
              <li>Trains users on property management software</li>
              </ul>
              <h6>Job Requirements:</h6>
              <ul>
              <li>Diploma or above in Computer Science or related disciplines</li>
              <li>Experience in IT support, preferably gained from property management industry</li>
              </ul>

              <h6>Ad C</h6>
              <h6>Deputy Chef</h6>
              <h6>NGANG CHAIN OF RESTAURANTS</h6>
              <p>Good opportunity to advance because the chef will teach assistants</p>
              <h6>Job Summary:</h6>
              <ul>
                <li>Assists chef in daily operations</li>
                <li>Needs to work long shifts</li>
              </ul>
              <h6>Job Requirements:</h6>
              <ul>
                <li>Experience with a wide variety of cooking techniques</li>
                <li>Quick earner who enjoys challenges</li>
              </ul>


              <h6>Ad D</h6>
              <h6>Web Designer</h6>
              <h6>SHANG DESIGN FABRIC GROUP</h6>
              <h6>Job Summary:</h6>
              <ul>
                <li>Provides creative designs for the image of the retail brand</li>
                <li>Creates graphics for social media accounts</li>
              </ul>
              <h6>Job Requirements:</h6>
              <ul>
                <li>Higher diploma or above in Graphic Design or related disciplines</li>
                <li>Understanding of brand image and design</li>
              </ul>

            </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h3>Text 3</h3>
              <p>In today's fast-paced world, the need for versatile university graduates is becoming more and more apparent. Employers are looking for candidates who possess a diverse skill set, and are talented in many different areas. This trend has led to an increased emphasis on the importance of a well-rounded education that prepares graduates for a variety of different careers.</p>

              <p>The concept of being versatile and multi-talented is not new. In fact, it can be traced back to the ancient Greeks, who believed in a well-rounded education that included physical, intellectual, and artistic pursuits. This idea was later popularized during the Renaissance, when artists and scholars were expected to be proficient in many different areas.</p>

              <p>Today, the need for versatility is even more pronounced, as technology continues to change the way we work and live. With automation and artificial intelligence replacing many traditional jobs, it is crucial for graduates to have a range of skills that are difficult to automate.</p>

              <p>One of the key advantages of being versatile is that it allows graduates to adapt to different job markets and industries. In a rapidly changing world, being able to switch careers or industries is becoming increasingly important. For example, a graduate who studied computer science may find themselves working in finance, or a graduate with a degree in business may end up working in healthcare. </p>

              <p>Another advantage of being versatile is that it allows graduates to pursue multiple interests and passions. In the past, it was common for people to specialize in one particular area and pursue that career for their entire life. However, in today's world, it is becoming more common for people to have multiple careers or to switch careers multiple times. Being versatile and multi-talented allows graduates to pursue different interests and passions throughout their lives, and to adapt to changing circumstances.</p>

              <p>Of course, being versatile and multi-talented is not easy. It requires a lot of hard work and dedication to develop a range of skills and knowledge in different areas. However, the rewards can be significant. Graduates who are versatile and multi-talented are often in high demand, and can command higher salaries and better job opportunities.</p>

              <p>So, how can graduates become more versatile and multi-talented? The first step is to develop a broad range of skills and knowledge while in university. This means taking courses in different fields, such as the arts, humanities, and sciences. It also means developing skills in areas such as communication, critical thinking, and problem-solving.</p>

              <p>Another way to become more versatile is to pursue extracurricular activities and hobbies outside of university. This can include volunteering, participating in sports or clubs, or learning new skills such as a second language or musical instrument. These activities can help graduates develop new skills and interests, and can also provide valuable networking opportunities.</p>

              <p>Finally, graduates can become more versatile by being open-minded and adaptable. This means being willing to learn new things, take on new challenges, and adapt to changing circumstances. It also means being willing to take risks and try new things, even if they are outside of one's comfort zone.</p>

              <p>In conclusion, being versatile and multi-talented is becoming increasingly important in today's fast-paced world. Graduates who possess a diverse skill set and are talented in many different areas are in high demand, and can command higher salaries and better job opportunities. To become more versatile, graduates should develop a broad range of skills and knowledge, pursue extracurricular activities and hobbies, and be open-minded and adaptable. By doing so, they can prepare themselves for a variety of different careers, and pursue multiple interests and passions throughout their lives.</p>

              <h6>COMMENTS</h6>
              <p>"I think being versatile is really important because it allows you to adapt to different situations and job markets. For example, I studied engineering, but I'm also interested in business and entrepreneurship. Being able to apply my engineering knowledge to business has been really valuable, and has opened up a lot of career opportunities for me." - John, 23, engineering student</p>

              <p>"I believe that being versatile is crucial in today's world because technology is changing so rapidly. If you don't have a diverse skill set, you risk being replaced by automation or AI. That's why I'm studying computer science, but I'm also taking courses in the arts and humanities. I want to be able to apply my technical skills to creative projects, and to think critically about the impact of technology on society." - Sarah, 20, computer science student</p>

              <p>"I think being versatile is important because it allows you to pursue multiple passions and interests. For example, I'm studying psychology, but I'm also involved in theater and music. I'm not sure yet what I want to do after graduation, but I know that my diverse background will be an asset." - Alex, 22, psychology student</p>

              <p>"I think being versatile is important because it allows you to be more adaptable and resilient. For example, I'm studying business, but I'm also involved in a lot of volunteer work and community service. These experiences have taught me the importance of empathy and social responsibility, which are valuable skills in any career. I'm not just thinking about making money - I want to make a positive impact on the world." - Emily, 21, business student</p>

              <p>"I think being versatile is important because it allows you to explore different pathways and find your true passion. For example, I started out studying biology, but I realized that I was more interested in policy and advocacy. I've now switched my major to political science, and I'm also involved in a lot of campus activism. Being able to adapt to changing circumstances has been really valuable for me, and has helped me find my true calling." - Tom, 19, political science student</p>

              <center>
                <h6>END OF READING PASSAGES</h6>
              </center>

          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <p>Read Texts 2-3 and answer questions 26-50.<i>(42 marks)</i></p>

            <ol start="26">
              <h4>Text 2</h4>
              {/* question 26*/}
            <li className="mt-4">
                Which work requires knowledge of other cultures?
                <textarea type="text" name="q26" className="form-control mt-2" />
              </li>

              {/* question 27*/}
              <li className="mt-4">
                All ads require a diploma except 1, which one is that?
                <textarea type="text" name="q27" className="form-control mt-2" />
              </li>

              {/* question 28*/}
              <li className="mt-4">
                One of the ads is different from the others, it does not include any technological knowledge, which Ad is that?
                <textarea type="text" name="q28" className="form-control mt-2" />
              </li>

              {/* question 29*/}
              <li className="mt-4">
                What is the name of Ad D’s company?
                <textarea type="text" name="q29" className="form-control mt-2" />
              </li>

              {/* question 30*/}
              <li className="mt-4">
                Which job includes teaching?
                <textarea type="text" name="q30" className="form-control mt-2" />
              </li>

              {/* question 31*/}
              <li className="mt-4">
                Which phrase from Ad C, means that the worker has to work for more time per day?
                <textarea type="text" name="q31" className="form-control mt-2" />
              </li>
              &nbsp;
              <div><h4>Text 3</h4></div>

              {/* question 32*/}
              <li className="mt-4">
              What is the main advantage of being versatile?
              <div className="mt-2">
                  <RadioButton name="q32" id="A" label="It allows graduates to pursue multiple interests and passions."/>
                  <RadioButton name="q32" id="B" label="It helps graduates adapt to different job markets and industries."/>
                  <RadioButton name="q32" id="C" label="It provides valuable networking opportunities."/>
                  <RadioButton name="q32" id="D" label="It increases salaries and job opportunities."/>
                </div>
              </li>

              {/* question 33*/}
              <li className="mt-4">
              What is the historical origin of the concept of being versatile?

              <div className="mt-2">
              <RadioButton name="q33" id="A" label="The Industrial Revolution"/>
              <RadioButton name="q33" id="B" label="The Renaissance"/>
              <RadioButton name="q33" id="C" label="The Enlightenment"/>
              <RadioButton name="q33" id="D" label="The Ancient Greeks"/>
              </div></li>

              {/* question 34*/}
            <li className="mt-4"> 
            Why is being versatile more important today?

            <div className="mt-2">
            <RadioButton name="q34" id="A" label="Because technology is changing the way we work and live."/>
            <RadioButton name="q34" id="B" label="Because there are fewer job opportunities available."/>
            <RadioButton name="q34" id="C" label="Because most jobs only require one specific skill set."/>
            <RadioButton name="q34" id="D" label="Because employers are becoming more lenient in their hiring practices."/>
            </div></li>

              {/* question 35*/}
              <li className="mt-4"> 
              What is the key to becoming more versatile?

              <div className="mt-2">
              <RadioButton name="q35" id="A" label="Developing a broad range of skills and knowledge."/>
              <RadioButton name="q35" id="B" label="Pursuing extracurricular activities and hobbies."/>
              <RadioButton name="q35" id="C" label="Being open-minded and adaptable."/>
              <RadioButton name="q35" id="D" label="All of the above."/>
              </div></li>

              {/* question 36*/}
              <li className="mt-4"> 
              Why is being open-minded and adaptable important for graduates?
              <div className="mt-2">
              <RadioButton name="q36" id="A" label="It allows them to learn new things and take on new challenges."/>
              <RadioButton name="q36" id="B" label="It helps them develop new skills and interests."/>
              <RadioButton name="q36" id="C" label="It enables them to adapt to changing circumstances."/>
              <RadioButton name="q36" id="D" label="All of the above."/>
              </div></li>

              {/* question 37*/}
              <li className="mt-4"> 
            What are some examples of extracurricular activities and hobbies that can help graduates become more versatile?
            <div className="mt-2">

            <RadioButton name="q37" id="A" label="Volunteering, participating in sports or clubs, or learning a new musical instrument."/>
            <RadioButton name="q37" id="B" label="Watching TV, playing video games, or hanging out with friends."/>
            <RadioButton name="q37" id="C" label="Reading books, going to the movies, or shopping."/>
            <RadioButton name="q37" id="D" label="None of the above."/>
            </div></li>

              {/* question 38*/}
              <li className="mt-4"> 
              What is the main disadvantage of being versatile?
              <div className="mt-2">

              <RadioButton name="q38" id="A" label="It requires a lot of hard work and dedication."/>
              <RadioButton name="q38" id="B" label="It can be difficult to develop a broad range of skills and knowledge."/>
              <RadioButton name="q38" id="C" label="It can lead to indecision and lack of focus."/>
              <RadioButton name="q38" id="D" label="There is no disadvantage to being versatile."/>
              </div></li>

              {/* question 39*/}
              <li className="mt-4"> 
              What is the importance of a well-rounded education in today's world?
              <div className="mt-2">

              <RadioButton name="q39" id="A" label="It prepares graduates for a variety of different careers."/>
              <RadioButton name="q39" id="B" label="It provides graduates with a diverse skill set."/>
              <RadioButton name="q39" id="C" label="It helps graduates adapt to changing circumstances."/>
              <RadioButton name="q39" id="D" label="All of the above."/>
              </div></li>

              {/* question 40*/}
              <li className="mt-4"> 
              What was the ancient Greek belief about education?
              <div className="mt-2">
              <RadioButton name="q40" id="A" label="It should focus solely on intellectual pursuits."/>
              <RadioButton name="q40" id="B" label="It should focus on physical, intellectual, and artistic pursuits."/>
              <RadioButton name="q40" id="C" label="It should focus on religious and spiritual pursuits."/>
              <RadioButton name="q40" id="D" label="It should focus on military training."/>
              </div></li>

              {/* question 41*/}
              <li className="mt-4"> 
              What is the key to adapting to changing circumstances?
              <div className="mt-2">
              <RadioButton name="q41" id="A" label="Being open-minded and adaptable."/>"
              <RadioButton name="q41" id="B" label="Having a narrow focus and sticking to one career path."/>
              <RadioButton name="q41" id="C" label="Avoiding risks and challenges."/>
              <RadioButton name="q41" id="D" label="None of the above."/>
              </div></li>

              {/* question 42*/}
              <li className="mt-4"> 
              Write 3 different extracurricular activities graduates can do to become more versatile. (3 marks)  
              <textarea
                  type="text"
                  rows="5"
                  className="form-control my-2"
                  name="q42"
                />
                </li>

              {/* question 43*/}
              <li className="mt-4"> 
              Find a word or phrase in the 8th paragraph which has a similar meaning to all rounder
              <textarea type="text" name="q43" className="form-control mt-2" />
              </li>

              {/* question 44*/}
              <li className="mt-4"> 
              Write 3 courses students can take while being in a university and also 3 skills they can develop. (6 marks) 
              <textarea
                  type="text"
                  rows="5"
                  className="form-control my-2"
                  name="q44"
                />
                </li>

              {/* question 45*/}
              <li className="mt-4"> 
              Write 3 ways graduates can become more versatile.		(3 marks)
              <textarea
                  type="text"
                  rows="5"
                  className="form-control my-2"
                  name="q45"
                />
                </li>

              {/* question 46*/}
              <li className="mt-4"> 
                What is John studying?
                <textarea name="q46" type="text" className="form-control mt-2" />
              </li>


              {/* question 47*/}
              <li className="mt-4"> 
              What three things are Sarah studying?  (3 marks)
              <textarea type="text" name="q47" className="form-control mt-2" />
              <textarea type="text" name="q47" className="form-control mt-2" />
              <textarea type="text" name="q47" className="form-control mt-2" />
              </li>

              {/* question 48*/}
              <li className="mt-4"> 
              Why does Alex think being versatile is important?   (2 marks)
              <textarea type="text" name="q48" className="form-control mt-2" />
              </li>

              {/* question 49*/}
              <li className="mt-4"> 
              What two important things did Emily learn, from her experiences?    (2 marks)
              <textarea type="text" name="q49" className="form-control mt-2" />
              </li>

              {/* question 50*/}
              <li className="mt-4"> 
                <p>Complete the blanks with appropriate words/phrases to give a summary of Tom’s education. Make sure the answers are grammatically correct    (5 marks)</p>

                <p>Tom initially studied i)<InlineTextInput name="q50"/>, but fell really interested in ii)<InlineTextInput name="q50"/> and iii)<InlineTextInput name="q50"/>. 
                This is why, now he is studying iv)<InlineTextInput name="q50"/> and has a big involvement in campus v)<InlineTextInput name="q50"/>.</p>
              </li>

            </ol>

            <center>
              <h6>END OF PART B1</h6>
            </center>
          </CardBody>
        </Card>
      {/* </div> */}

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
          <h3>Text 4</h3>
            <center>
              <h6>Navigating Tech Changes in Graduate School: Finding a Balance</h6>
            </center>

            <p>In recent years, technology has brought big changes to how things work in graduate school. Online research tools and collaboration platforms are now really important for graduate students, helping them work better, spend less money, and speed up their research.</p>
            <h6>The Good and the Tricky Sides of Tech: </h6>
            <p>But, using these technologies also brings up some important questions about what's right and wrong, especially as they become a big part of how grad school works. Schools and companies are using fancy computer programs to make choices about things like who gets into grad school, who gets scholarships, and how well students are doing in their studies. The problem is, there aren't clear rules about how these programs should be fair, and that's a worry.</p>
            <h6>Changing How Grad Students Learn: </h6>
            <p>Emily Thompson, who knows a lot about how schools work, talks about how technology is changing the way grad students experience their studies. She says computer programs, also known as artificial intelligence (AI), now help with things like going through applications, looking at research proposals, and even checking how well students talk in virtual interviews. This has led to new roles in the academics called 'integrated' positions. Instead of replacing students, AI helps them with certain technical tasks, giving students more time to focus on other parts of their research. This makes them more productive and important in their academic communities.</p>
            <h6>Tech Helping Smaller Schools Too: </h6>
            <p>Even though big schools are already using these technologies a lot, smaller schools can benefit too. Sarah Miller, who looks after academic affairs at a smaller university, says using AI can help these schools make smart choices about things like how many students to admit, where to spend money, and how to manage resources. This means smaller schools can make good decisions without needing extra experts in money, administration, or human resources.</p>
            <h6>Thinking About What's Right: </h6>
            <p>Professor Rachel Evans, who knows a lot about what's fair in technology, talks about the important questions that come up when we use AI in schools. She says we need to think about things like keeping students' information private, making sure everyone is treated fairly, and figuring out if computers can really replace human judgment. There are ongoing discussions about these issues to make sure we do things the right way. Biases, both intentional and unintentional, from the people who create these computer programs and the data they use to train them, make these discussions even more important. The big question is: Can computers be better than people in making important decisions about grad school, or do we always need people to make those calls?</p>
            <h6>Dealing with Worries About Fairness:</h6> 
            <p>Laura Foster, an expert in school technology, thinks that worries about computers being unfair are blown out of proportion. She says that schools have always been a bit biased because of human decisions, like choosing who gets in or gets money. Foster believes that if we use these computer programs carefully and thoughtfully, they can actually help more students have a chance. She argues that well-designed software for looking at applications can consider a broader group of students, making it less likely for someone to play favorites. But Professor Evans disagrees, saying that AI doesn't just copy human biases; it gives them a kind of scientific credibility, making them seem more objective.</p>
            <h6>Being Careful with Money Decisions: </h6>
            <p>Mark Turner, who knows a lot about money in education, warns about potential problems with computer programs deciding how students get money for school. He says that as computers learn from past data, there's a risk they might repeat mistakes from the past that were unfair to certain groups of students. Turner says we need to be careful to avoid bringing back unfair practices, like what happened with redlining in the past. Schools need to be watchful and make sure they're not treating students unfairly, especially when it comes to who gets access to resources for their education.</p>
            <h6>In Conclusion: </h6>
            <p>As technology keeps changing grad school, it's super important to think about what's right and fair. Finding a balance between using technology to make things easier and making sure it doesn't treat students unfairly is really, really important. We need to pay close attention, make smart rules, and make sure technology helps all students have a positive experience in their academic journey.</p>

            <center>
              <h5>END OF READING PASSAGES</h5>
            </center>

          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <p>Read Text 4 and answer questions 51-69.<i>(42 marks)</i></p>
            <h6>Text 4</h6>
            <ol start="51">

              {/* question 51*/}
              <li className="mt-4">
                <p>Based on the information of Paragraph 1, write a word or phrase in the blanks. The answer must be grammatically correct. (4 marks)</p>
                <p>(i)<InlineTextInput name="q51"/> students are using more and more (ii)<InlineTextInput name="q51"/> along with (iii)<InlineTextInput name="q51"/>during their school time. 
                This is essential as they need to spend less time in their research, by also keeping in mind to (iv) <InlineTextInput name="q51"/> , as they have a small amount of money that they can spend.</p>
              </li>

              {/* question 52*/}
              <li className="mt-4">
              Find out a word or a phrase which has a similar meaning to upgraded in Paragraph 2.
              <textarea type="text" name="q52" className="form-control mt-2" />
              </li>

              {/* question 53*/}
              <li className="mt-4">
                According to Paragraph 3, Artificial Intelligence (AI) is helping graduate students by three different things, which are: (3 marks)
                <textarea type="text" name="q53" className="form-control mt-2" />
                <textarea type="text" name="q53" className="form-control mt-2" />
                <textarea type="text" name="q53" className="form-control mt-2" />
              </li>

              {/* question 54*/}
              <li className="mt-4">
                What does integrated positions mean? (5 marks)

                <textarea
                    type="text"
                    rows="10"
                    name="q54"
                    className="form-control my-2"
                  />
              </li>

              {/* question 55*/}
              <li className="mt-4">
              How does Sarah think AI can help smaller schools?
              <div className="mt-2">
                <RadioButton name="q55" id="A" label="More technologies available to students"/>
                <RadioButton name="q55" id="B" label="Children get smarter"/>
                <RadioButton name="q55" id="C" label="Schools can work efficiently with less cost and human resources"/>
                <RadioButton name="q55" id="D" label="Teachers will be more educated and therefore teach students better."/>
              </div>
            </li>

              {/* question 56*/}
              <li className="mt-4">
                Technology has its pros and cons. It depends on how technology is used. Who knows about the best ethics of technology? (2 marks)
                <textarea type="text" name="q56" className="form-control mt-2" />
                </li>

              {/* question 57*/}
              <li className="mt-4">
                <p>Fill in the gaps with the appropriate word/s or phrases. Make sure it is grammatically correct. <i>(4 marks)</i></p>
                <p>
                  Before using AI in schools, we need to know if the (i)<InlineTextInput name="q57"/> are not open to everyone, ensuring that everyone is treated 
                  (ii) <InlineTextInput name="q57"/>, and to find out if <InlineTextInput name="q57"/>.
                </p>
              </li>

              {/* question 58*/}
              <li className="mt-4">
                From the paragraph ‘Dealing with Worries About Fairness’ write a phrase which is similar to “overreacting”
                <textarea type="text" name="q58" className="form-control mt-2" />
              </li>

              {/* question 59*/}
              <li className="mt-4">
                  There is a disagreement between a professor and an expert, what is that disagreement? (4 marks)
                  <textarea type="text" name="q59" className="form-control mt-2" />
              </li>

              {/* question 60*/}
              <li className="mt-4">
                According to Mark Turner what is considered to be a huge mistake?
                <div className="mt-2">
                  <RadioButton name="q60" id="A" label="Unfair practices"/>
                  <RadioButton name="q60" id="B" label="Corruption"/>
                  <RadioButton name="q60" id="C" label="Not giving money to students"/>
                  <RadioButton name="q60" id="D" label="Earning illegally"/>
                </div>
              </li>

              {/* question 61*/}
              <li className="mt-4">
                  What does the phrase “potential problems” in the first line of the paragraph “Being Careful with Money Decisions” indicate?	(2 marks)
                  <textarea type="text" name="q61" className="form-control mt-2" />
              </li>

              {/* question 62*/}
              <li className="mt-4">
                What does Mark Turner warn about in relation to computer programs and students' funding for school?                        
                <div className="mt-2">
                  <RadioButton name="q62" id="A" label="The advantages of computer programs"/>
                  <RadioButton name="q62" id="B" label="The potential problems with unfair practices"/>
                  <RadioButton name="q62" id="C" label="The need for more data"/>
                  <RadioButton name="q62" id="D" label="The benefits of redlining"/>
                </div>
              </li>

              {/* question 63*/}
              <li className="mt-4">
                According to Mark Turner, what is the risk associated with computers learning from past data?
                What does Mark Turner warn about in relation to computer programs and students' funding for school?                        
                <div className="mt-2">
                  <RadioButton name="q63" id="A" label="Increased fairness in educational funding"/>
                  <RadioButton name="q63" id="B" label="A repeat of mistakes that were unfair to certain student groups"/>
                  <RadioButton name="q63" id="C" label="The avoidance of redlining practices"/>
                  <RadioButton name="q63" id="D" label="The need for more data analysis"/>
                </div>
              </li>

              {/* question 64*/}
              <li className="mt-4">
                What historical practice does Mark Turner mention as a cautionary example of unfair practices that should be avoided in education?
                <div className="mt-2">
                  <RadioButton name="q64" id="A" label="Redlining"/>
                  <RadioButton name="q64" id="B" label="Standardized testing"/>
                  <RadioButton name="q64" id="C" label="Scholarships"/>
                  <RadioButton name="q64" id="D" label="Student loans"/>
                </div>
              </li>

              {/* question 65*/}
              <li className="mt-4">
                What does Mark Turner emphasize schools need to be careful about in the context of students and resources for education?
                <div className="mt-2">
                  <RadioButton name="q65" id="A" label="Treating students unfairly"/>
                  <RadioButton name="q65" id="B" label="Limiting access to resources"/>
                  <RadioButton name="q65" id="C" label="Focusing on computer programs"/>
                  <RadioButton name="q65" id="D" label="Ignoring past mistakes"/>
                </div>
              </li>

              {/* question 66*/}
              <li className="mt-4">
                What is the main concern highlighted by Mark Turner regarding the use of computer programs in deciding students' funding for school?
                <div className="mt-2">
                  <RadioButton name="q66" id="A" label="The need for more data analysis"/>
                  <RadioButton name="q66" id="B" label="The potential for computers to make unbiased decisions"/>
                  <RadioButton name="q66" id="C" label="The risk of repeating past unfair practices"/>
                  <RadioButton name="q66" id="D" label="The advantages of technological advancements"/>
                </div>
              </li>

              {/* question 67*/}
              <li className="mt-4">
                What verb tense is used in the sentence "Schools need to be watchful and make sure they're not treating students unfairly"?
                <textarea type="text" name="q67" className="form-control mt-2" />
              </li>

              {/* question 68*/}
              <li className="mt-4">
                Which word from “Being Careful with Money Decisions” nearly means “possible”?
                <textarea type="text" name="q68" className="form-control mt-2" />
              </li>

              {/* question 69*/}
              <li className="mt-4">
                <p>Fill in the gaps with the appropriate word/s or phrases. Make sure it is grammatically correct. (7 marks)</p>
                <p>
                  There should be a balance in between the uses of technology, which is to make (i)<InlineTextInput name="q69"/> and to ensure that students are not treated (ii)<InlineTextInput name="q69"/>. 
                  We also have to pay (iii)<InlineTextInput name="q69"/>, create (iv)<InlineTextInput name="q69"/>, and ensure that (v)<InlineTextInput name="q69"/> in their academic path.
                </p>
              </li>
            </ol>
            <center>
              <h6>END OF PART B2</h6>
            </center>
          </CardBody>
        </Card>
        <p/>
      </>
  )
  return (<ReadingPaper year="2022" paper={paper} totalQuestions="69" specialQuestions=""/>) 
}

export default Reading2022;
