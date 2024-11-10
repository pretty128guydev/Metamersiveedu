import React, { useCallback, useEffect, useState } from 'react';
import ReactQuill from '../../../components/common/ReactQuill/index.jsx';
import UploadApi from '../../../api-clients/UploadApi.js';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import '../upload.scss';

const conv = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const resizeArray = (arr, size) => {
  while (arr.length > size) arr.pop();
  while (arr.length < size) arr.push('');
  return arr;
}

const UpdateReading1 = (props) => {
  const id = props.id;
  const [questionCount, setQuestionCount] = useState(0);

  const [data, setData] = useState({
    test_info: '',
    pn: '',
    text: '',
    main_question: '',
    sub_questions: [],
    answer: 0,
    hint: '',
  });

  const changeData = useCallback((key, value) => {
    let _data = {
      ...data,
      [key]: value,
    }
    setData(_data);
  }, [data]);

  const getData = useCallback(() => {
    if (id !== -1) {
      UploadApi.getData(4, 1, id)
        .then(res => {
          setData({
            ...res.data,
          });
        })
        .catch(err => {
          toast.error(err, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          });
        });
    }
  }, [id]);

  const updateData = useCallback(() => {
    let isValid = true;
    Object.keys(data).forEach(key => {
      if (isValid) {
        let value = data[key];
        if (value === null || value.length === 0) {
          toast.error('Please input the ' + key + '.', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          });
          isValid = false;
        }
      }
    });
    if (isValid) {
      UploadApi.updateData(4, 1, id, {
        ...data,
      })
        .then(() => {
          toast.success('Update the data successfully.', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          });
        })
        .catch(err => {
          toast.error(err, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          });
        })
    }
  }, [data, id]);

  useEffect(() => {
    getData(id);
  }, [getData, id]);

  return (
    <>
      <label className="form-label mt-3">Test Information</label>
      <input
        className="form-control"
        type="text"
        placeholder="Test Information"
        onChange={e => changeData('test_info', e.target.value)}
        value={data.test_info}
      />
      <label className="form-label mt-3">Paragraph Numbers</label>
      <input
        className="form-control"
        type="number"
        onChange={e => changeData('pn', e.target.value)}
        value={data.pn}
      />
      <label className="form-label mt-3">Text</label>
      <ReactQuill
          theme="snow"
          value={data.text}
          onChange={(content, delta, source, editor) => { if (source === 'user') changeData('text', content)}}
          seed="text"
        />
      <label className="form-label mt-3">Main Question</label>
      <input
        className="form-control"
        type="text"
        placeholder="Main question"
        onChange={e => changeData('main_question', e.target.value)}
        value={data.main_question}
      />
      <div className='mt-3 d-flex justify-content-between align-items-center'>
        <label className="form-label mb-0">Sub questions</label>
        <select
          className='form-select'
          value={questionCount}
          style={{ width: 200 }}
          onChange={e => {
            setQuestionCount(Number(e.target.value));
            let tmp = [...data.sub_questions];
            tmp = resizeArray(tmp, Number(e.target.value));
            changeData('sub_questions', tmp);
          }}
        >
          <option value={0}>No sub question.</option>
          <option value={1}>1 sub question.</option>
          <option value={2}>2 sub questions.</option>
          <option value={3}>3 sub questions.</option>
          <option value={4}>4 sub questions.</option>
          <option value={5}>5 sub questions.</option>
          <option value={6}>6 sub questions.</option>
          <option value={7}>7 sub questions.</option>
          <option value={8}>8 sub questions.</option>
          <option value={9}>9 sub questions.</option>
          <option value={10}>10 sub questions.</option>
        </select>
      </div>
      {
        data.sub_questions && data.sub_questions.map((sub_question, idx) => (
          <div className='mt-3 d-flex align-items-center' key={idx}>
            <label className="form-label mx-2 mb-0">{conv[idx] + '.'}</label>
            <input
              name="keywords"
              value={sub_question}
              className="form-control"
              onChange={e => {
                let tmp = [...data.sub_questions];
                tmp[idx] = e.target.value;
                changeData('sub_questions', tmp);
              }}
            />
          </div>
        ))
      }
      <div className='mt-3 d-flex justify-content-between align-items-center'>
        <label className="form-label mb-0">Correct Answer</label>
        <select
          className='form-select'
          value={data.answer}
          style={{ width: 200 }}
          onChange={e => {
            changeData('answer', Number(e.target.value));
          }}
        >
          {
            data.sub_questions && data.sub_questions.map((sub_question, idx) => (
              <option value={idx}>{conv[idx] + '. ' + sub_question}</option>
            ))
          }
        </select>
      </div>
      <label className="form-label mt-3">Hint</label>
      <ReactQuill
        theme="snow"
        value={data.hint}
        onChange={(content, delta, source, editor) => { if (source === 'user') changeData('hint', content)}}
        seed="hint"
      />
      <div className='d-flex justify-content-center mt-3'>
        <button type="button" className="btn btn-outline-primary w-200px" onClick={updateData}>
          <i className='fas fa-upload' />&nbsp;&nbsp;<strong>Update</strong>
        </button>
      </div>
    </>
  )
}

export default UpdateReading1;