import React, { useState } from 'react';
import useFetch from '../services/useFetch';

const AddCustomer = () => {
  const initialCustomerState = {
    id: '',
    name: '',
    address: '',
    country: '',
    phone_number: '',
    status: false,
  };
  const [customer, setCustomer] = useState(initialCustomerState);
  const [submitted, setSubmitted] = useState(false);

  const DATA = useFetch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomer({ ...customer, [name]: value });
  };

  const saveCustomer = () => {
    var data = {
      id: customer.id,
      name: customer.name,
      address: customer.name,
      country: customer.country,
      phone_number: customer.phone_number,
      job_title: customer.job_title,
      status: customer.status,
    };

    DATA.create(data)
      .then((response) => {
        setCustomer({
          // id: response.data.id,
          name: customer.name,
          address: customer.name,
          country: customer.country,
          phone_number: customer.phone_number,
          status: customer.status,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newCustomer = () => {
    setCustomer(initialCustomerState);
    setSubmitted(false);
  };

  return (
    <div className='submit-form'>
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className='btn btn-success' onClick={newCustomer}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              className='form-control'
              id='name'
              required
              value={customer.name}
              onChange={handleInputChange}
              name='name'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='address'>Address</label>
            <input
              type='text'
              className='form-control'
              id='address'
              required
              value={customer.address}
              onChange={handleInputChange}
              name='address'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='country'>Country</label>
            <input
              type='text'
              className='form-control'
              id='country'
              required
              value={customer.country}
              onChange={handleInputChange}
              name='country'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='phone_number'>Phone</label>
            <input
              type='text'
              className='form-control'
              id='phone_number'
              required
              value={customer.phone_number}
              onChange={handleInputChange}
              name='phone_number'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='job_title'>Job Title</label>
            <input
              type='text'
              className='form-control'
              id='job_title'
              required
              value={customer.job_title}
              onChange={handleInputChange}
              name='job_title'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='status'>Status</label>
            <input
              type='text'
              className='form-control'
              id='status'
              required
              value={customer.status}
              onChange={handleInputChange}
              name='status'
            />
          </div>

          <button onClick={saveCustomer} className='btn btn-success mt-3'>
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export { AddCustomer };
