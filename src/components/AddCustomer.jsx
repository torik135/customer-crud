import React, { useState } from 'react';
import DataService from '../services/Service';

const AddCustomer = () => {
  const initialCustomerState = {
    id: null,
    name: '',
    address: '',
    country: '',
    phone_number: '',
    status: false,
  };
  const [customer, setCustomer] = useState(initialCustomerState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomer({ ...customer, [name]: value });
  };

  const saveCustomer = () => {
    var data = {
      name: customer.name,
      address: customer.name,
      country: customer.country,
      phone_number: customer.phone_number,
      status: customer.status,
    };

    DataService.create(data)
      .then((response) => {
        setCustomer({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published,
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
            <label htmlFor='title'>Name</label>
            <input
              type='text'
              className='form-control'
              id='title'
              required
              value={customer.name}
              onChange={handleInputChange}
              name='title'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='description'>Address</label>
            <input
              type='text'
              className='form-control'
              id='description'
              required
              value={customer.address}
              onChange={handleInputChange}
              name='description'
            />
          </div>

          <button onClick={saveCustomer} className='btn btn-success'>
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddCustomer;
