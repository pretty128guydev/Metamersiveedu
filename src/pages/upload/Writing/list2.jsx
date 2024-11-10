import React, {useEffect, useState, useCallback} from 'react';
import { Link } from 'react-router-dom';
import UploadApi from '../../../api-clients/UploadApi';
import { Pagination, Spin, Empty, Popconfirm } from 'antd';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const conv = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const List2 = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 1000,
  });
  const [total, setTotal] = useState(0);

  const getAllData = useCallback(() => {
    setIsLoading(true);
    UploadApi.getAllData(3, 2, {
      skip: (paginationParam.currentPage - 1) * paginationParam.perPage,
      limit: paginationParam.perPage,
    })
      .then(res => {
        setIsLoading(false);
        setData(res.data.data);
        setTotal(res.data.total);
      })
      .catch(err => {
        toast.error(err, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      })
  }, [paginationParam]);

  const deleteHandle = useCallback((id) => {
    UploadApi.deleteData(3, 2, id)
      .then(() => {
        getAllData();
        toast.success('Successfully deleted.', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      })
      .catch(err => {
        toast.error(err, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      });
  }, [getAllData]);

  const onChangePagination = (page, pageSize) => {
    let paginationParam_ = {
      ...paginationParam,
    };
    paginationParam_.currentPage = page;
    paginationParam_.perPage = pageSize;
    setPaginationParam(paginationParam_);
  };

  useEffect(() => {
    getAllData();
  }, [getAllData]);

  return (
    isLoading ?
      <div className='my-5' style={{ textAlign: 'center' }}>
        <Spin size='large' className='my-5'/>
        <h1>Loading...</h1>
      </div>
    :
      total === 0 ?
        <Empty description="No data available" className='my-5' />
      :
      <>
        <table className="table table-striped mt-3">
          <thead className="table-dark">
            <tr>
              <th scope='col'>No</th>
              <th scope='col'>UUID</th>
              <th scope='col'>Word</th>
              <th scope='col'>Question</th>
              <th scope='col'>Answer</th>
              <th scope='col'>Hint</th>
              <th scope='col'></th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {
              data && data.map((val, idx) => (
                <tr key={val.id}>
                  <td>{idx + 1 + (paginationParam.currentPage - 1) * paginationParam.perPage}</td>
                  <td>{val.id}</td>
                  <td>{val.word}</td>
                  <td>
                    {val.main_question}<br/>
                    {val.sub_questions && val.sub_questions.map((sub_question, idx) => (
                      <div>{conv[idx] + '. ' + sub_question}</div>
                    ))}
                  </td>
                  <td>{conv[val.answer]}</td>
                  <td>
                    {val.hint && val.hint.map((x, idx) => (
                      (idx === 0 ? '' : ', ') + conv[x]
                    ))}
                  </td>
                  <td>
                    <Link to={'/upload-data/writing/update?level=2&id='+val.id}>
                      <button type='button' className='btn btn-outline-success fs-12px py-1 px-2'>
                          <i className='far fa-edit'></i>
                      </button>
                    </Link>
                  </td>
                  <td>
                    <Popconfirm
                      title="Delete"
                      description="Are you sure to delete this?"
                      onConfirm={() => deleteHandle(val.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <button type='button' className='btn btn-outline-danger fs-12px py-1 px-2'>
                        <i className='far fa-trash-alt'></i>
                      </button>
                    </Popconfirm>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <div className='d-flex justify-content-center'>
          <Pagination
            total={total}
            current={paginationParam.currentPage}
            pageSize={paginationParam.perPage}
            defaultPageSize={1000}
            pageSizeOptions={[20, 50, 100, 200, 500, 1000]}
            onChange={(page, pageSize) =>
              onChangePagination(page, pageSize)
            }
            showSizeChanger
            showQuickJumper
          />
        </div>
      </>
  );
}

export default List2;