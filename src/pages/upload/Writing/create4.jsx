import React, { useCallback, useState } from 'react';
import ReactQuill from '../../../components/common/ReactQuill/index.jsx';
import { toast } from 'react-toastify';
import UploadApi from '../../../api-clients/UploadApi';

import 'react-toastify/dist/ReactToastify.css';
import '../upload.scss';

const initialData = {
  prompt: '',
  answer: '',
  mistakes: 0,
  hint: '',
  coaching: '',
}

const CreateSpeaking4 = () => {
  const [data, setData] = useState(initialData);

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
      if (isValid && key !== 'mistakes') {
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
      UploadApi.uploadData(3, 4, {
        ...data,
        hint: data.hint.split(','),
      })
        .then(() => {
          setData({
            ...initialData,
          });
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
      <label className="form-label mt-3">Prompt (Incorrect Version) </label>
      <ReactQuill
        theme="snow"
        value={data.prompt}
        onChange={(content, delta, source, editor) => { if (source === 'user') changeData('prompt', content)}}
        seed="prompt"
      />
      <label className="form-label mt-3">Answer</label>
      <ReactQuill
        theme="snow"
        value={data.answer}
        onChange={(content, delta, source, editor) => { if (source === 'user') changeData('answer', content)}}
        seed="answer"
      />
      <label className="form-label mt-3">Mistakes</label>
      <input
        className="form-control"
        type="number"
        onChange={e => changeData('mistakes', e.target.value)}
        value={data.mistakes}
      />
      <label className="form-label">Hint</label>
      <input
        name="keywords"
        placeholder="Enter keywords"
        value={data.hint}
        className="form-control"
        onChange={e => changeData('hint', e.target.value)}
      />
      <label className="form-label mt-3">Coaching</label>
      <ReactQuill
        theme="snow"
        value={data.coaching}
        onChange={(content, delta, source, editor) => { if (source === 'user') changeData('coaching', content)}}
        seed="coaching"
      />
      <div className='d-flex justify-content-center mt-3'>
        <button type="button" className="btn btn-outline-primary w-200px" onClick={() => uploadData()}>
          <i className='fas fa-upload' />&nbsp;&nbsp;<strong>Upload</strong>
        </button>
      </div>
    </>
  )
}

export default CreateSpeaking4;