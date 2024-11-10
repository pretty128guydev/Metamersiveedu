import React, { useCallback, useEffect, useState } from 'react';
import ReactQuill from '../../../components/common/ReactQuill/index.jsx';
import UploadApi from '../../../api-clients/UploadApi.js';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import '../upload.scss';

const UpdateWriting3 = (props) => {
  const id = props.id;
  const [data, setData] = useState({
    answer: '',
    jumbled_text: '',
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
      UploadApi.getData(3, 3, id)
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
      UploadApi.updateData(3, 3, id, {
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
        <label className="form-label">Jumbled Text</label>
        <ReactQuill
          theme="snow"
          value={data.jumbled_text}
          onChange={(content, delta, source, editor) => { if (source === 'user') changeData('jumbled_text', content)}}
          seed="jumbled_text"
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

export default UpdateWriting3;