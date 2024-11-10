import React, { useCallback, useEffect, useState } from 'react';
import ReactQuill from '../../../components/common/ReactQuill/index.jsx';
import UploadApi from '../../../api-clients/UploadApi.js';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import '../upload.scss';

const cleanText = text => {
  for (let i = 20; i >= 2; i--) {
    let tmp = '';
    for (let j = 0; j < i; j++) tmp += '_';
    while (true) {
      let newText = text.replace(tmp, "%%%%%%%%%%");
      if (newText === text) break;
      text = newText;
    }
  }
  while (true) {
    let newText = text.replace("%%%%%%%%%%", "_____");
    if (newText === text) break;
    text = newText;
  }
  return text;
}

const UpdateReading3 = (props) => {
  const id = props.id;

  const [data, setData] = useState({
    test_info: '',
    pn: '',
    text: '',
    question: '',
    answer: '',
    hint1: '',
    hint2: '',
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
      UploadApi.getData(4, 3, id)
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
      UploadApi.updateData(4, 3, id, {
        ...data,
        question: cleanText(data.question),
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
        type="text"
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
      <label className="form-label mt-3">Question</label>
      <ReactQuill
        theme="snow"
        value={data.question}
        onChange={(content, delta, source, editor) => { if (source === 'user') changeData('question', content)}}
        seed="question"
      />
      <label className="form-label mt-3">Answer</label>
      <ReactQuill
        theme="snow"
        value={data.answer}
        onChange={(content, delta, source, editor) => { if (source === 'user') changeData('answer', content)}}
        seed="answer"
      />
      <label className="form-label mt-3">Hint1</label>
      <ReactQuill
        theme="snow"
        value={data.hint1}
        onChange={(content, delta, source, editor) => { if (source === 'user') changeData('hint1', content)}}
        seed="hint1"
      />
      <label className="form-label mt-3">Hint2</label>
      <ReactQuill
        theme="snow"
        value={data.hint2}
        onChange={(content, delta, source, editor) => { if (source === 'user') changeData('hint2', content)}}
        seed="hint2"
      />
      <div className='d-flex justify-content-center mt-3'>
        <button type="button" className="btn btn-outline-primary w-200px" onClick={updateData}>
          <i className='fas fa-upload' />&nbsp;&nbsp;<strong>Update</strong>
        </button>
      </div>
    </>
  )
}

export default UpdateReading3;