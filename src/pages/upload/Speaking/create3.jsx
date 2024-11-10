import React, { useCallback, useState } from 'react';
import ReactQuill from '../../../components/common/ReactQuill/index.jsx';
import { toast } from 'react-toastify';
import UploadApi from '../../../api-clients/UploadApi';

import 'react-toastify/dist/ReactToastify.css';
import '../upload.scss';

const initialData = {
  prompt: '',
  introduction: '',
  idea1: '',
  idea2: '',
  idea3: '',
  conclusion: '',
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
      UploadApi.uploadData(5, 3, {
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
      <label className="form-label mt-3">Prompt</label>
      <input
        className="form-control"
        type="text"
        placeholder="Prompt"
        onChange={e => changeData('prompt', e.target.value)}
        value={data.prompt}
      />
      <label className="form-label mt-3">Introduction</label>
      <ReactQuill
        theme="snow"
        value={data.introduction}
        onChange={(content, delta, source, editor) => { if (source === 'user') changeData('introduction', content)}}
        seed="introduction"
      />
      <label className="form-label mt-3">Idea 1</label>
      <ReactQuill
        theme="snow"
        value={data.idea1}
        onChange={(content, delta, source, editor) => { if (source === 'user') changeData('idea1', content)}}
        seed="idea1"
      />
      <label className="form-label mt-3">Idea 2</label>
      <ReactQuill
        theme="snow"
        value={data.idea2}
        onChange={(content, delta, source, editor) => { if (source === 'user') changeData('idea2', content)}}
        seed="idea2"
      />
      <label className="form-label mt-3">Idea 3</label>
      <ReactQuill
        theme="snow"
        value={data.idea3}
        onChange={(content, delta, source, editor) => { if (source === 'user') changeData('idea3', content)}}
        seed="idea3"
      />
      <label className="form-label mt-3">Conclusion</label>
      <ReactQuill
        theme="snow"
        value={data.conclusion}
        onChange={(content, delta, source, editor) => { if (source === 'user') changeData('conclusion', content)}}
        seed="conclusion"
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