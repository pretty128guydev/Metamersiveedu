import React, { useEffect, useState } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Tabs, notification, Table, Tag, InputNumber, Select } from 'antd';
import { useLocation } from 'react-router-dom';
import SkillDrillApi from '../../api-clients/SkillDrillApi';

import "./style.scss";
import useLanguageToggle from "../../hooks/useLanguageToggle";

const { Column } = Table;

const SkillDrillDetail = () => {
  const [activeTab, setActiveTab] = useState("0");
  const [loading, setLoading] = useState(false);
  const [infos, setInfos] = useState([]);
  const [curLevel, setCurLevel] = useState('rookie');
  const [currentData, setCurrentData] = useState();
  const [curQuestion, setCurQuestion] = useState(1);
  const location = useLocation();
  const { classInfo } = location.state;
  const { translate } = useLanguageToggle();

  useEffect(() => {
    setLoading(true);
    SkillDrillApi.getBatchResult({ class_id: classInfo.id, batch_id: activeTab }).then(data => {
      console.log('dat:', data.data);
      setInfos(data.data.map((item, index) => ({ ...item, key: index })));
    }).catch(err => notification.warning({
      message: 'Error!',
      description: err.response.data.message,
    })).finally(() => setLoading(false));
  }, [activeTab]);

  useEffect(() => {
    setCurQuestion(1);
    setCurrentData(infos.map((item, index) => {
      return {
        key: index,
        name: item.studentData.name,
        answer: item.answerData[`${item.questionData[0].id}`] ?
          item.answerData[`${item.questionData[0].id}`].answer : 'No Answer'
      };
    }));
  }, [infos]);

  const renderTag = (value) => {
    if (value === 'None') {
      return <Tag color="default">No Answer</Tag>;
    }
    const v = Number(value);

    let color = 'black';
    let text = 'wrong';
    if (v <= 0) {
      color = 'error';
      text = 'wrong';
    } else if (v > 0 && v < 100) {
      color = 'warning';
      text = 'Not-Perfect';
    } else {
      color = 'success';
      text = 'Correct';
    }

    return <Tag color={color}>{text}</Tag>;
  };

  const renderAnswer = (text, record, index, id) => {
    return (
      <span>
        {record.answerData[infos[index].questionData[id].id] ?
          renderTag(record.answerData[infos[index].questionData[id].id].correctPercent) :
          renderTag('None')}
      </span>
    );
  };

  const renderName = (text, record, index) => {
    return (
      <span>
        <Tag className={`${record.levelData.currentLevel}`}>{record.studentData.name}</Tag>
      </span>
    );
  };

  const renderTotalCorrect = (text, record, index) => {
    let cnt = 0;

    record.questionData.forEach(question => {
      if (record.answerData[`${question.id}`] && Number(record.answerData[`${question.id}`].correctPercent) === 100) cnt++;
    })
    return (
      <span>
        {cnt}
      </span>
    );
  };

  const getOrdinalNumber = (number) => {
    const suffixes = {
      1: "st",
      2: "nd",
      3: "rd"
    };

    const lastDigit = number % 10;
    const lastTwoDigits = number % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
      return number + "th";
    }

    return number + (suffixes[lastDigit] || "th");
  }

  const renderRanking = (text, record, index) => {
    const filtered = infos.filter(item => item.levelData.currentLevel === record.levelData.currentLevel);

    let selectedMark = 0;
    const nameScore = [];
    for (const item of filtered) {
      let mark = 0;
      for (const question of item.questionData) {
        if (item.answerData[`${question.id}`]) {
          mark += item.answerData[`${question.id}`].correctPercent * Number(question.point) / 100;
        }
      }
      nameScore.push({
        name: record.studentData.name,
        score: mark,
      });

      if (item.studentData.name === record.studentData.name) selectedMark = mark;
    }

    const ranking = {};
    nameScore.sort((a, b) => b.score - a.score).forEach((item, index) => {
      ranking[`${item.score}`] = index + 1;
    });
    return (
      <span>
        {getOrdinalNumber(ranking[`${selectedMark}`])}
      </span>
    );
  }

  const handleChange = (e) => {
    if (Number(e) < 1 || !e) {
      return;
    }
    setCurQuestion(e);
    setCurrentData(infos.map((item, index) => {
      return {
        key: index,
        name: item.studentData.name,
        answer: item.answerData[`${item.questionData[curQuestion - 1].id}`] ?
          item.answerData[`${item.questionData[curQuestion - 1].id}`].answer : 'No Answer'
      };
    }));
  };

  const renderContent = (index) => {
    return (
      <div className="batch-content" key={index}>
        <h4>About Batch {`${index + 1}:`}</h4>
        <div className="filter">
          <Select
            className='filter-level'
            value={curLevel}
            placeholder="Select Level"
            onChange={(e) => setCurLevel(e)}
            options={[
              // { value: 'all', label: 'All Students' },
              { value: 'trainee', label: 'Trainee Students' },
              { value: 'rookie', label: 'Rookie Students' },
              { value: 'pro', label: 'Pro Students' },
            ]}
          />
          <div className="level-tag">
            <Tag className="trainee" onClick={() => setCurLevel("trainee")}>
              {translate("trainee")}
            </Tag>
            <Tag className="rookie" onClick={() => setCurLevel("rookie")}>
              {translate("rookie")}
            </Tag>
            <Tag className="pro" onClick={() => setCurLevel("pro")}>
              {translate("pro")}
            </Tag>
          </div>
        </div>
        {
          <div>
            <Table
              loading={loading}
              dataSource={
                // curLevel === 'all' ? infos :
                infos.filter(item => item.levelData.currentLevel === curLevel)
              }
              style={{ width: '100%', overflowX: 'auto' }}
              pagination={false}
            >
              <Column title="Name" key="name" render={renderName} />
              <Column title="Total corrects" key="total_correct" render={renderTotalCorrect} />
              <Column title="Ranking" key="ranking" render={renderRanking} />
              {infos[0] &&
                Array(Number(infos[0].questionCount)).fill().map((_, id) => (
                  <Column
                    title={`${id + 1}`}
                    key={id}
                    render={(text, record, index) => renderAnswer(text, record, index, id)}
                  />
                ))
              }
            </Table>
            <div className="mt-3">
              {
                infos[0] &&
                <div>
                  <LeftOutlined className='arrow' onClick={() => {
                    if (curQuestion - 1 <= 0) {
                      return;
                    }
                    setCurQuestion(curQuestion - 1);
                  }} />
                  <InputNumber
                    className='mb-2'
                    min={1}
                    max={infos[0].questionCount}
                    onChange={handleChange}
                    value={curQuestion}
                  />
                  <RightOutlined className='arrow' onClick={() => {
                    if (curQuestion + 1 > infos[0].questionCount) {
                      return;
                    }
                    setCurQuestion(curQuestion + 1);
                  }} />
                  <p className="inf-question">{infos[0].questionData[curQuestion - 1].question}</p>
                  <Table
                    dataSource={currentData}
                    pagination={false}
                    size='small'
                  >
                    <Column title="Name" key="name" dataIndex="name" />
                    <Column title="Answer" key="answer" dataIndex="answer" />
                  </Table>
                </div>
              }
            </div>
          </div>
        }
      </div>
    );
  };

  const items = Array(Number(classInfo.batchCount)).fill().map((_, index) => {
    return {
      key: `${index}`,
      label: `Batch ${index + 1}`,
      children: renderContent(index),
    };
  });

  const onChange = (key) => {
    setActiveTab(key);
  };

  return (
    <div className="skill-drill-detail">
      {translate("skill-drill-detail-page")}
      <Tabs
        defaultActiveKey="0"
        items={items}
        activeKey={activeTab}
        onChange={onChange}
      />
    </div>
  );
};

export default SkillDrillDetail;