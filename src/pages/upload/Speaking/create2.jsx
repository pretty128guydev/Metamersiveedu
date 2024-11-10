import React, { useCallback, useState } from 'react';
import ReactQuill from '../../../components/common/ReactQuill/index.jsx';
import { toast } from 'react-toastify';
import UploadApi from '../../../api-clients/UploadApi';

import 'react-toastify/dist/ReactToastify.css';
import '../upload.scss';

const initialData = {
  activity: '',
  topic: '',
  pros: '',
  cons: '',
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
      UploadApi.uploadData(5, 2, {
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
      <label className="form-label mt-3">Activity</label>
      <input
        className="form-control"
        type="text"
        placeholder="Activity"
        onChange={e => changeData('activity', e.target.value)}
        value={data.activity}
      />
      <label className="form-label mt-3">Topic</label>
      <ReactQuill
        theme="snow"
        value={data.topic}
        onChange={(content, delta, source, editor) => { if (source === 'user') changeData('topic', content)}}
        seed="topic"
      />
      <label className="form-label mt-3">Pros / Subject</label>
      <ReactQuill
        theme="snow"
        value={data.pros}
        onChange={(content, delta, source, editor) => { if (source === 'user') changeData('pros', content)}}
        seed="pros"
      />
      <label className="form-label mt-3">Cons / Subject</label>
      <ReactQuill
        theme="snow"
        value={data.cons}
        onChange={(content, delta, source, editor) => { if (source === 'user') changeData('cons', content)}}
        seed="cons"
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