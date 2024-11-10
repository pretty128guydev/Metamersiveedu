import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Input, Spin } from 'antd';

import { AIAPI } from '../api-clients/AIApi';

const OPENAI = () => {
    const [question, setQuestion] = useState({});
    const [answer, setAnswer] = useState('');
    const [aiReply, setAiReply] = useState({
        spelling: '',
        content: '',
        grammar: '',
        recommend: '',
        coherence: '',
    });
    const [loading, setLoading] = useState(false);
    const [prompt, setPrompt] = useState('');

    useEffect(() => {
        getQuestion();
    }, []);

    useEffect(() => {
        setPrompt(`
        You are checking student's writing. That is about "${question?.prompt}"
        The student is in situation of "${question?.situation}"
        Student's current location is "${question?.location}"
        Also consider this document for your answer: "${question?.pdf}"

        Your answer will be:
        The first part starts with 'Spelling:', You have to check spelling of basic writing skills like capitalize, typo, etc.
        Next part starts with 'Grammar:', You have to check grammar error and let user student what is wrong.
        Next part starts with 'Content:', You have to chek content to check if all the necessary fields are included by the rule of ${question?.situation} and let user student what is wrong.
        Next part starts with 'Coherence:', You have to check coherence that if all the sentences are well organized and customized and etc and let user student what is wrong.
        Final part starts with 'Recommendation:', You have to recommend new content which are missing from these key words: ${question?.keyword}

        Organize your every answer using '-' so that looks fine.

        Student's Answer is "${answer}"
        `);
    }, [question, answer]);

    const getQuestion = () => {
        setLoading(true);
        AIAPI.getRandomQuestion({}).then(data => {
            console.log('dat:', data.data);
            setQuestion(data.data);
            
        }).catch(err => {
            console.log('err:', err);
        }).finally(() => setLoading(false));;
    };

    const handleSubmit = () => {
        setLoading(true);
        AIAPI.getResponse({
            questionId: question.id,
            answer,
            prompt,
        }).then(data => {
            console.log('d:', data.data);
            setAiReply(data.data);
        }).catch(err => { 
            console.log('error:', err);
        }).finally(() => setLoading(false));
    };

    return (
        <div className='open-ai'>
            <Row>
                <Col span={4} className='p-2'>
                    <div>
                        {/* <p>Spelling:</p> */}
                        <p>{aiReply.spelling}</p>
                        {/* <p>Content:</p> */}
                        <p>{aiReply.content}</p>
                        {/* <p>Grammar:</p> */}
                        <p>{aiReply.grammar}</p>
                    </div>
                </Col>
                <Col span={16} className='p-3'>
                    <div className='d-flex justify-content-between'>
                        <h4>Situation:</h4>
                        <Button onClick={() => { getQuestion(); }}>Next</Button>
                    </div>
                    <p>{question.situation}</p>
                    <h4>Location:</h4>
                    <p>{question.location}</p>
                    <h4>Your Condition:</h4>
                    <p>{question.prompt}</p>
                    <h4>More Info:</h4>
                    <img src={question.picture} style={{ height: '400px'}} alt="refer"/>
                    <h5>Bot Prompt:</h5>
                    <Input.TextArea
                        value={prompt}
                        onChange={e => setPrompt(e.target.value)}
                        rows={7}
                    />
                    <h5>Your Answer Here:</h5>
                    {loading && <Spin />}
                    <Input.TextArea
                        value={answer}
                        onChange={e => setAnswer(e.target.value)}
                        rows={7}
                    />
                    <Button className='mt-2' onClick={handleSubmit}>Submit</Button>
                </Col>
                <Col span={4} className='p-2'>
                    <div>
                        {/* <p>Coherence</p> */}
                        <p>{aiReply.coherence}</p>
                        {/* <p>Recommend</p> */}
                        <p>{aiReply.recommend}</p>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default OPENAI;