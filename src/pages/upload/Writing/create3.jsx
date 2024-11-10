import React, { useCallback, useState } from 'react';
import ReactQuill from '../../../components/common/ReactQuill/index.jsx';
import { toast } from 'react-toastify';
import UploadApi from '../../../api-clients/UploadApi';

import 'react-toastify/dist/ReactToastify.css';
import '../upload.scss';

const initialData = {
  answer: '',
  jumbled_text: '',
}

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

const CreateWriting3 = () => {
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
      UploadApi.uploadData(3, 3, {
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
        <button type="button" className="btn btn-outline-primary w-200px" onClick={() => uploadData()}>
          <i className='fas fa-upload' />&nbsp;&nbsp;<strong>Upload</strong>
        </button>
      </div>
    </>
  )
}

export default CreateWriting3;