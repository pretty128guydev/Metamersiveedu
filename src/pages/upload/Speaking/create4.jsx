import React, { useCallback, useState } from 'react';
import ReactQuill from '../../../components/common/ReactQuill/index.jsx';
import { toast } from 'react-toastify';
import UploadApi from '../../../api-clients/UploadApi';

import 'react-toastify/dist/ReactToastify.css';
import '../upload.scss';

const initialData = {
  topic: '',
  prompt: '',
  hint: '',
}

const CreateSpeaking = () => {
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
      UploadApi.uploadData(5, 4, {
        ...data,
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
      <label className="form-label mt-3">Topic</label>
      <input
        className="form-control"
        type="text"
        placeholder="Topic"
        onChange={e => changeData('topic', e.target.value)}
        value={data.topic}
      />
      <label className="form-label mt-3">Prompt</label>
      <ReactQuill
        theme="snow"
        value={data.prompt}
        onChange={(content, delta, source, editor) => { if (source === 'user') changeData('prompt', content)}}
        seed="prompt"
      />
      <label className="form-label mt-3">Helpful Vocabulary Words/considerations</label>
      <ReactQuill
        theme="snow"
        value={data.hint}
        onChange={(content, delta, source, editor) => { if (source === 'user') changeData('hint', content)}}
        seed="hint"
      />
      <div className='d-flex justify-content-center mt-3'>
        <button type="button" className="btn btn-outline-primary w-200px" onClick={() => uploadData()}>
          <i className='fas fa-upload' />&nbsp;&nbsp;<strong>Upload</strong>
        </button>
      </div>
    </>
  )
}

export default CreateSpeaking;