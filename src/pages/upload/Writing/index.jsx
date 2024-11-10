import React, { useState } from 'react';
import { Card } from '../../../components/card/card.jsx';
import { Link } from 'react-router-dom';
import List1 from './list1.jsx';
import List2 from './list2.jsx';
import List3 from './list3.jsx';
import List4 from './list4.jsx';

import '../upload.scss';

export default function Writing() {
  const [level, setLevel] = useState(1);

  return (
    <div className='upload'>
      <div className='d-flex justify-content-between'>
        <h1 className="page-header mb-0">Writing</h1>
        <Link type='button' className='btn btn-outline-primary align-self-end' to={'/upload-data/writing/create'}>
          <i className='fas fa-plus'></i>&nbsp;Upload
        </Link>
      </div>
      <Card className='mt-2'>
				<ul className="nav nav-tabs nav-tabs-v2 px-4">
					<li className="nav-item me-3 ">
            <div className={"nav-link px-2 " + (level === 1 ? 'active' : '')} onClick={() => setLevel(1)}>
              Level 1
            </div>
          </li>
					<li className="nav-item me-3">
            <div className={"nav-link px-2 " + (level === 2 ? 'active' : '')} onClick={() => setLevel(2)}>
              Level 2
            </div>
          </li>
					<li className="nav-item me-3">
            <div className={"nav-link px-2 " + (level === 3 ? 'active' : '')} onClick={() => setLevel(3)}>
              Level 3
            </div>
          </li>
					<li className="nav-item me-3">
            <div className={"nav-link px-2 " + (level === 4 ? 'active' : '')} onClick={() => setLevel(4)}>
              Level 4
            </div>
          </li>
				</ul>
				<div className="tab-content p-4">
          {
            level === 1 ? <List1 /> :
            level === 2 ? <List2 /> :
            level === 3 ? <List3 /> :
            level === 4 ? <List4 /> :
            <></>
          }
				</div>
			</Card>
    </div>
  )
}