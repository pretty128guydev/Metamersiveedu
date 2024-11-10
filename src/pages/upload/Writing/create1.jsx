import React, { useCallback, useState } from 'react';
import ReactQuill from '../../../components/common/ReactQuill/index.jsx';
import { toast } from 'react-toastify';
import UploadApi from '../../../api-clients/UploadApi';

import 'react-toastify/dist/ReactToastify.css';
import '../upload.scss';

const initialData = {
  location: '',
  situation: '',
  prompt: '',
  picture_link: '',
  picture_name: '',
  keywords: '',
}

const CreateWriting1 = () => {
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
      UploadApi.uploadData(3, 1, {
        ...data,
        keywords: data.keywords.split(','),
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
      <label className="form-label mt-3">Location</label>
      <input
        className="form-control"
        type="text"
        placeholder="Location"
        onChange={e => changeData('location', e.target.value)}
        value={data.location}
      />
      <label className="form-label mt-3">Situation</label>
      <input
        className="form-control"
        type="text"
        placeholder="Situation"
        onChange={e => changeData('situation', e.target.value)}
        value={data.situation}
      />
      <label className="form-label mt-3">Prompt</label>
      <ReactQuill
        theme="snow"
        value={data.prompt}
        onChange={(content, delta, source, editor) => { if (source === 'user') changeData('prompt', content)}}
        seed="prompt"
      />
      <label className="form-label mt-3">Picture Link Name</label>
      <input
        className="form-control"
        type="text"
        placeholder="Picture Link Name"
        onChange={e => changeData('picture_name', e.target.value)}
        value={data.picture_name}
      />
      <label className="form-label mt-3">Link to Picture</label>
      <input
        className="form-control"
        type="text"
        placeholder="Link to Picture"
        onChange={e => changeData('picture_link', e.target.value)}
        value={data.picture_link}
      />
      <label className="form-label mt-3">Keywords</label>
      <input
        name="keywords"
        placeholder="Enter hint/keywords"
        value={data.keywords}
        className="form-control"
        onChange={e => changeData('keywords', e.target.value)}
      />
      <div className='d-flex justify-content-center mt-3'>
        <button type="button" className="btn btn-outline-primary w-200px" onClick={() => uploadData()}>
          <i className='fas fa-upload' />&nbsp;&nbsp;<strong>Upload</strong>
        </button>
      </div>
    </>
  )
}

export default CreateWriting1;