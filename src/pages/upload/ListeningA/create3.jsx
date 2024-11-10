import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import UploadApi from '../../../api-clients/UploadApi';

import 'react-toastify/dist/ReactToastify.css';
import '../upload.scss';

const initialData = {
  recording_name: '',
  recording_url: '',
  answer: '',
  hint: '',
  question: '',
}

const CreateListeningA3 = () => {
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
      UploadApi.uploadData(1, 3, {
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
        <textarea
          value={data.question}
          onChange={e=> changeData('question', e.target.value)}
          className='form-control'
          rows={4}
        />
      </div>
      <div className="mt-3">
        <label className="form-label">Answer</label>
        <textarea
          value={data.answer}
          onChange={e => changeData('answer', e.target.value)}
          className='form-control'
          rows={4}
        />
      </div>
      <div className="mt-3">
        <label className="form-label">Hint</label>
        <textarea
          value={data.hint}
          onChange={e => changeData('hint', e.target.value)}
          className='form-control'
          rows={4}
        />
      </div>
      <div className='d-flex justify-content-center mt-3'>
        <button type="button" className="btn btn-outline-primary w-200px" onClick={() => uploadData()}>
          <i className='fas fa-upload' />&nbsp;&nbsp;<strong>Upload</strong>
        </button>
      </div>
    </>
  )
}

export default CreateListeningA3;