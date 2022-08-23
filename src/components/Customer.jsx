import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../services/useFetch';

const Customer = (props) => {
  const { id } = useParams();
  let navigate = useNavigate();

  const initialCustomerState = {
    id: null,
    name: '',
    address: '',
    country: '',
    phone_number: '',
    status: false,
  };

  const [currentCustomer, setCurrentCustomer] = useState(initialCustomerState);
  const [message, setMessage] = useState('');

  const DATA = useFetch();

  const getCustomer = (id) => {
    DATA.get(id)
      .then((response) => {
        setCurrentCustomer(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id) getCustomer(id);
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentCustomer({ ...currentCustomer, [name]: value });
  };

  const updateStatus = (status) => {
    var data = {
      id: currentCustomer.id,
      name: currentCustomer.name,
      address: currentCustomer.address,
      country: currentCustomer.country,
      phone_number: currentCustomer.phone_number,
      job_title: currentCustomer.job_title,
      status: currentCustomer.status,
    };

    DATA.update(currentCustomer.id, data)
      .then((response) => {
        setCurrentCustomer({ ...currentCustomer, status: status });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateCustomer = () => {
    DATA.update(currentCustomer.id, currentCustomer)
      .then((response) => {
        console.log(response.data);
        setMessage('The data was updated successfully!');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteCustomer = () => {
    DATA.remove(currentCustomer.id)
      .then((response) => {
        console.log(response.data);
        navigate('/customers');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentCustomer ? (
        <div className='edit-form'>
          <h4>Customer</h4>
          <form>
            <div className='form-group'>
              <label htmlFor='name'>Name</label>
              <input
                type='text'
                className='form-control'
                id='name'
                name='name'
                value={currentCustomer.name}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='address'>Address</label>
              <input
                type='text'
                className='form-control'
                id='address'
                name='address'
                value={currentCustomer.address}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='country'>Country</label>
              <input
                type='text'
                className='form-control'
                id='country'
                name='country'
                value={currentCustomer.country}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='phone_number'>Phone</label>
              <input
                type='text'
                className='form-control'
                id='phone_number'
                name='phone_number'
                value={currentCustomer.phone_number}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='job_title'>Job</label>
              <input
                type='text'
                className='form-control'
                id='job_title'
                name='job_title'
                value={currentCustomer.job_title}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='status'>Status</label>
              <input
                type='text'
                className='form-control'
                id='status'
                name='status'
                value={currentCustomer.status}
                onChange={handleInputChange}
              />
            </div>

            <div className='form-group mt-3'>
              <label>
                <strong>Status:</strong>
              </label>
              {currentCustomer.status ? 'aktif' : 'non aktif'}
            </div>
          </form>

          {currentCustomer.status ? (
            <button
              className='badge badge-primary me-2'
              onClick={() => updateStatus(false)}
            >
              Non-aktifkan
            </button>
          ) : (
            <button
              className='btn btn-secondary me-2'
              onClick={() => updateStatus(true)}
            >
              Aktifkan
            </button>
          )}

          <button className='btn btn-warning me-2' onClick={deleteCustomer}>
            Delete
          </button>

          <button
            type='submit'
            className='btn btn-info'
            onClick={updateCustomer}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Customer...</p>
        </div>
      )}
    </div>
  );
};

export { Customer };
