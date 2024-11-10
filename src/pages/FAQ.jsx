import React, { useState } from 'react';
import { Tabs, Collapse } from 'antd';

import FAQImages from '../assets/img/FAQ';

import './FAQ.scss';

const { Panel } = Collapse;

const tabItems = [{
    key: 'skill-drill',
    label: 'Skill Drill',
    children: (
        <Collapse defaultActiveKey={['1']}>
            <Panel header="Question: Where you can find the Skill Drill?" key="1">
                <div className='d-flex'>
                    <h5 className='me-2'>Answer:</h5>
                    <img src={FAQImages.WhereFindSkillDrill} alt="Where to find the skill drill" />
                </div>
            </Panel>
            <Panel header="Question: What is the Skill Drill For?" key="2">
                <div className='d-flex'>
                    <h5 className='me-2'>Answer:</h5>
                    <p className='text-primary'>
                        You can treat the skill drill with stand alone quiz. but one different thing is that it has levels:
                        <br />
                        Trainee, Rookie, Pro
                        <br />
                        Every students are rookie at first, also every question has its own levels.
                        <br />
                        Students are asked several questions by their level on Skill Drill class.
                        <br />
                        Promotion and Demotion conditions are here: <img src={FAQImages.PromotionAndDemotion} alt="Promotion and Demotion" width="300px" />
                        <br />You can edit them.
                        Stuents can be promoted or demoted by their result of answering the question.
                    </p>
                </div>
            </Panel>

            <Panel header="Question: Can I create Question in Skill Drill?" key="3">
                <div className='d-flex'>
                    <h5 className='me-2'>Answer:</h5>
                    <p className='text-primary'>
                        You can set batch count on every Skill Drill Classes and also questions per every batch
                        <br />
                        You can not create questions here, you can just import questions from Question Bank.<img src={FAQImages.SetSkillDrill} alt='set skill drill' width="300px" />
                        Questions are randomly selected per every batch according to their level.
                    </p>
                </div>
            </Panel>
        </Collapse>
    )
}, {
    key: 'question-bank',
    label: 'Question Bank',
    children: (
        <Collapse defaultActiveKey={['1']}>
            <Panel header="Question: What is the Question Bank For?" key="1">
                <div className='d-flex'>
                    <h5 className='me-2'>Answer:</h5>
                    <p className='text-primary'>Qustions Bank is something like store to save questions. You can use them in various ways like export and import.</p>
                </div>
            </Panel>
            <Panel header="Question: Which functions does Question Bank has?" key="2">
                <div className='d-flex'>
                    <h5 className='me-2'>Answer:</h5>
                    <p className='text-primary'>
                        This is the image for question bank header.<img src={FAQImages.QuestionBankFunctions} alt="Question Bank Header" /><br />
                        The first item is to share question bank subject to other teacher. You can simply input other teacher's email address to share your question bank subject with them.
                        <br />
                        The second item is to export your question bank data to CSV file.
                        <br />
                        The third item is to import pdf files to your question bank.
                        <br />
                        The fourth item is to import CSV to your question bank. here CSV file can only be the file which other teacher or you created using the first item.
                    </p>
                </div>
            </Panel>
        </Collapse>
    ),
}, {
    key: 'create-class',
    label: 'Creating Class',
    children: (
        <Collapse defaultActiveKey={['1']}>
            <Panel header="Question: Where can I create class?" key="1">
                <div className='d-flex'>
                    <h5 className='me-2'>Answer:</h5>
                    <p className='text-primary'>
                        Every apps has its own class.
                        You can create class by pressing this <img src={FAQImages.CreateClass} alt="Create" />
                    </p>
                </div>
            </Panel>
        </Collapse>
    ),
}];

const FAQ = () => {
    const [activeKey, setActiveKey] = useState('skill-drill');

    const handleTabChange = (key) => {
        setActiveKey(key);
    };
    return (
        <div className="h-100 share">
            FAQs here.
            <Tabs
                activeKey={activeKey}
                items={tabItems}
                onChange={handleTabChange}
            />
        </div>
    );
};

export default FAQ;