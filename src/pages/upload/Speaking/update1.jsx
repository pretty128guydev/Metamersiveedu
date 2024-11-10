import React, { useCallback, useState, useEffect } from 'react';
import ReactQuill from '../../../components/common/ReactQuill/index.jsx';
import { toast } from 'react-toastify';
import UploadApi from '../../../api-clients/UploadApi';

import 'react-toastify/dist/ReactToastify.css';
import '../upload.scss';

const initialData = {
  activity: '',
  topic: '',
  text: '',
}

const UpdateSpeaking = props => {
  const id = props.id;
  const [data, setData] = useState(initialData);

  const changeData = (key, value) => {
    let _data = {
      ...data,
      [key]: value,
    }
    setData(_data);
  };

  const getData = useCallback(() => {
    if (id !== -1) {
      UploadApi.getData(5, 1, id)
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
      UploadApi.updateData(5, 1, id, {
        ...data,
      })
        .then(() => {
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
  }, [data, id]);

  useEffect(() => {
    getData(id);
  }, [getData, id]);

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
      <label className="form-label mt-3">Text</label>
      <ReactQuill
        theme="snow"
        value={data.text}
        onChange={(content, delta, source, editor) => { if (source === 'user') changeData('text', content)}}
        seed="text"
      />
      <div className='d-flex justify-content-center mt-3'>
        <button type="button" className="btn btn-outline-primary w-200px" onClick={() => updateData()}>
          <i className='fas fa-upload' />&nbsp;&nbsp;<strong>Update</strong>
        </button>
      </div>
    </>
  )
}

export default UpdateSpeaking;