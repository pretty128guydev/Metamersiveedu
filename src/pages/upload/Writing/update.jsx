import React, { useEffect, useState } from 'react';
import { Card } from '../../../components/card/card.jsx';
import Update1 from './update1.jsx';
import Update2 from './update2.jsx';
import Update3 from './update3.jsx';
import Update4 from './update4.jsx';

import 'react-toastify/dist/ReactToastify.css';
import '../upload.scss';

const UpdateWriting = () => {
  const [id, setId] = useState(-1);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setId(urlParams.get('id'));
    setLevel(Number(urlParams.get('level')));
  }, []);

  return (
    <div className='upload'>
      <h1 className="page-header mb-0">Update Writing</h1>
      <Card className='mt-2 p-2'>
        <div className='row justify-content-center'>
          <div className='col-md-8 col-sm-12 pb-3'>
            <select className="form-select mt-3" value={level} onChange={e => setLevel(Number(e.target.value))} disabled>
              <option value={1}>Level 1</option>
              <option value={2}>Level 2</option>
              <option value={3}>Level 3</option>
              <option value={4}>Level 4</option>
            </select>
            {
              level === 1 ? <Update1 id={id} /> :
              level === 2 ? <Update2 id={id} /> :
              level === 3 ? <Update3 id={id} /> :
              level === 4 ? <Update4 id={id} /> :
                <></>
            }
          </div>
        </div>
      </Card>
    </div>
  )
}

export default UpdateWriting;