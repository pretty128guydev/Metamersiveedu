import React, {useEffect, useState, useCallback} from 'react';
import { Link } from 'react-router-dom';
import RandomColorBadge from '../../../components/common/RandomColorBadge';
import UploadApi from '../../../api-clients/UploadApi';
import { Pagination, Spin, Empty, Popconfirm } from 'antd';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const List4 = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 1000,
  });
  const [total, setTotal] = useState(0);

  const getAllData = useCallback(() => {
    setIsLoading(true);
    UploadApi.getAllData(3, 4, {
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
    UploadApi.deleteData(3, 4, id)
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
              <th scope='col'>Prompt (Incorrect Version)</th>
              <th scope='col'>Answer</th>
              <th scope='col'>Mistakes</th>
              <th scope='col'>Hint</th>
              <th scope='col'>Coaching</th>
              <th scope='col'></th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {
              data && data.map((val, idx) => (
                <tr key={val.id}>
                  <td>{idx + 1 + (paginationParam.currentPage - 1) * paginationParam.perPage}</td>
                  <td dangerouslySetInnerHTML={{ __html: val.prompt }}></td>
                  <td dangerouslySetInnerHTML={{ __html: val.answer }}></td>
                  <td>{val.mistakes}</td>
                  <td>
                    {
                      val.hint && val.hint.map((hint, idx1) => (
                        <RandomColorBadge key={hint + idx1} value={hint} />
                      ))
                    }
                  </td>
                  <td dangerouslySetInnerHTML={{ __html: val.coaching }}></td>
                  <td>
                    <Link to={'/upload-data/writing/update?level=4&id='+val.id}>
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

export default List4;