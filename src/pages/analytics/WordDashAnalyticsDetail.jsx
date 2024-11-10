import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Button } from 'antd';

import WordApi from '../../api-clients/WordApi';

const { Column } = Table

const WordDashAnalyticsDetail = () => {
    const [matchData, setMatchData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { classId } = useParams();

    // const [openDetail, setOpenDetail] = useState(false);
    // const [currentData, setCurrentData] = useState({ topWord: '', student: '' });

    useEffect(() => {
        setLoading(true);

        WordApi.getMatchDataByClassId({ class_id: classId }).then(data => {
            console.log('d:', data);
            setMatchData(data.data.map((item, index) => ({ ...item, key: index })));
        }).catch(err => console.log('fetch match data error:', err)).finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderAction = (text, record, index) => {
        return (
            <Button onClick={() => {
                console.log('rec:', record);
                // setCurrentData(record);
                // setOpenDetail(true);
            }}
            >
                Details
            </Button>
        );
    };

    return (
        <div>
            <h2>Word Dash Matches</h2>
            <Table
              dataSource={matchData}
                loading={loading}
            >
                <Column title="Id" key="id" dataIndex="id" />
                <Column title="Action" key="action" render={renderAction} />
            </Table>
            {/* <Modal open={openDetail} onCancel={setOpenDetail(false)}>
                <p>{`Top Spelled word: ${currentData.topWord}`}</p>
                <p>{`Student List: ${currentData.student}`}</p>
            </Modal> */}
        </div>
    );
};

export default WordDashAnalyticsDetail;