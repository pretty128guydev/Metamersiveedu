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

const UpdateListeningA4 = (props) => {
  const id = props.id;
  const [data, setData] = useState({
    recording_name: '',
    recording_url: '',
    answer: '',
    hint: '',
    question: '',
    created_at: null,
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
      UploadApi.getData(1, 4, id)
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
      UploadApi.updateData(1, 4, id, {
        ...data,
        hint: cleanText(data.hint),
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
      <label className="form-label mt-3">Recording Name</label>
      <input
        className="form-control"
        type="text"
        placeholder="Recording Name"
        onChange={e => changeData('recording_name', e.target.value)}
        value={data.recording_name}
      />
      <label className="form-label mt-3">Recording URL</label>
      <input
        className="form-control"
        type="text"
        placeholder="Recording Url"
        onChange={e => changeData('recording_url', e.target.value)}
        value={data.recording_url}
      />
      <div className="mt-3">
        <label className="form-label">Question</label>
        <ReactQuill
          theme="snow"
          value={data.question}
          onChange={(content, delta, source, editor) => { if (source === 'user') changeData('question', content)}}
          seed="question"
        />
      </div>
      <div className="mt-3">
        <label className="form-label">Answer</label>
        <ReactQuill
          theme="snow"
          value={data.answer}
          onChange={(content, delta, source, editor) => { if (source === 'user') changeData('answer', content)}}
          seed="answer"
        />
      </div>
      <div className="mt-3">
        <label className="form-label">Hint</label>
        <ReactQuill
          theme="snow"
          value={data.hint}
          onChange={(content, delta, source, editor) => { if (source === 'user') changeData('hint', content)}}
          seed="hint"
        />
      </div>
      <div className='d-flex justify-content-center mt-3'>
        <button type="button" className="btn btn-outline-primary w-200px" onClick={updateData}>
          <i className='fas fa-upload' />&nbsp;&nbsp;<strong>Update</strong>
        </button>
      </div>
    </>
  )
}

export default UpdateListeningA4;