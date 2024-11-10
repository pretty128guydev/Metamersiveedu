import React, { useState } from 'react';
import { Card } from '../../../components/card/card.jsx';
import Level1 from './create1.jsx';
import Level2 from './create2.jsx';
import Level3 from './create3.jsx';
import Level4 from './create4.jsx';

const CreateWriting = () => {
  const [level, setLevel] = useState(1);

  return (
    <div className='upload'>
      <h1 className="page-header mb-0">Upload Writing</h1>
      <Card className='mt-2 p-2'>
        <div className='row justify-content-center'>
          <div className='col-md-8 col-sm-12 pb-3'>
            <select className="form-select mt-3" value={level} onChange={e => setLevel(Number(e.target.value))}>
              <option value={1}>Level 1</option>
              <option value={2}>Level 2</option>
              <option value={3}>Level 3</option>
              <option value={4}>Level 4</option>
            </select>
            {
              level === 1 ? <Level1 /> :
              level === 2 ? <Level2 /> :
              level === 3 ? <Level3 /> :
              level === 4 ? <Level4 /> :
              <></>
            }
          </div>
        </div>

      </Card>
    </div>
  )
}

export default CreateWriting;