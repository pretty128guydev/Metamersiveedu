import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import UploadApi from '../../../api-clients/UploadApi';

import 'react-toastify/dist/ReactToastify.css';
import '../upload.scss';

const initialData = {
  word: '',
  main_question: '',
  sub_questions: [],
  answer: 0,
  hint: [],
}

const conv = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const resizeArray = (arr, size) => {
  while (arr.length > size) arr.pop();
  while (arr.length < size) arr.push('');
  return arr;
}

const CreateWriting2 = () => {
  const [data, setData] = useState(initialData);
  const [questionCount, setQuestionCount] = useState(0);

  const changeData = (key, value) => {
    let _data = {
      ...data,
      [key]: value,
    }
    setData(_data);
  };

  const uploadData = useCallback(() => {
    let isValid = true;
    Object.keys(data).forEach(key => {
      if (isValid && key !== 'answer') {
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
      UploadApi.uploadData(3, 2, {
        ...data,
      })
        .then(() => {
          setData({
            ...initialData,
          });
          setQuestionCount(0);
          toast.success('Upload the data successfully.', {
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
  }, [data]);

  return (
    <>
      <label className="form-label mt-3">Word</label>
      <input
        className="form-control"
        type="text"
        placeholder="Word"
        onChange={e => changeData('word', e.target.value)}
        value={data.word}
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
      <div className='mt-3 d-flex justify-content-between align-items-center'>
        <label className="form-label mb-0">Hint</label>
        <select
          multiple
          className='form-select'
          value={data.hint}
          style={{ width: 200 }}
          onChange={e => {
            const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
            changeData('hint', selectedValues);
          }}
        >
          {
            data.sub_questions && data.sub_questions.map((sub_question, idx) => (
              <option value={idx}>{conv[idx] + '. ' + sub_question}</option>
            ))
          }
        </select>
      </div>
      <div className='d-flex justify-content-center mt-3'>
        <button type="button" className="btn btn-outline-primary w-200px" onClick={() => uploadData()}>
          <i className='fas fa-upload' />&nbsp;&nbsp;<strong>Upload</strong>
        </button>
      </div>
    </>
  )
}

export default CreateWriting2;