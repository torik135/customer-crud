import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DataService from '../services/Service';

const Tutorial = (props) => {
  const { id } = useParams();
  let navigate = useNavigate();

  const initialTutorialState = {
    id: null,
    name: '',
    address: '',
    country: '',
    phone_number: '',
    status: false,
  };

  const [currentCustomer, setCurrentCustomer] = useState(initialTutorialState);
  const [message, setMessage] = useState('');

  const getCustomer = (id) => {
    DataService.get(id)
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
      status: currentCustomer.status,
    };

    DataService.update(currentCustomer.id, data)
      .then((response) => {
        setCurrentCustomer({ ...currentCustomer, status: status });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateCustomer = () => {
    DataService.update(currentCustomer.id, currentCustomer)
      .then((response) => {
        console.log(response.data);
        setMessage('The tutorial was updated successfully!');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteTutorial = () => {
    DataService.remove(currentCustomer.id)
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
          <h4>Tutorial</h4>
          <form>
            <div className='form-group'>
              <label htmlFor='title'>Name</label>
              <input
                type='text'
                className='form-control'
                id='title'
                name='title'
                value={currentCustomer.name}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='description'>Address</label>
              <input
                type='text'
                className='form-control'
                id='description'
                name='description'
                value={currentCustomer.address}
                onChange={handleInputChange}
              />
            </div>

            <div className='form-group'>
              <label>
                <strong>Status:</strong>
              </label>
              {currentCustomer.status ? 'aktif' : 'non aktif'}
            </div>
          </form>

          {currentCustomer.status ? (
            <button
              className='badge badge-primary mr-2'
              onClick={() => updateStatus(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className='badge badge-primary mr-2'
              onClick={() => updateStatus(true)}
            >
              Publish
            </button>
          )}

          <button className='badge badge-danger mr-2' onClick={deleteTutorial}>
            Delete
          </button>

          <button
            type='submit'
            className='badge badge-success'
            onClick={updateCustomer}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  );
};

export default Tutorial;
