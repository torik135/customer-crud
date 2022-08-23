import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../services/useFetch';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [currentCustomers, setCurrentCustomers] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState('');

  const DATA = useFetch();

  useEffect(async () => {
    await retrieveCustomers();
    return () => setCustomers([]);
  }, []);

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrieveCustomers = async () => {
    const data = await DATA.getAll();
    setCustomers(data.data);
  };

  const refreshList = () => {
    retrieveCustomers();
    setCurrentCustomers(null);
    setCurrentIndex(-1);
  };

  const setActiveCustomers = (customer, index) => {
    setCurrentCustomers(customer);
    setCurrentIndex(index);
  };

  const removeAllCustomers = () => {
    DATA.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByName = () => {
    DATA.findByName(searchName)
      .then((response) => {
        setCustomers(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className='list row'>
      <div className='col-md-8'>
        <div className='input-group mb-3'>
          <input
            type='text'
            className='form-control'
            placeholder='Search by name'
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className='input-group-append'>
            <button
              className='btn btn-outline-secondary'
              type='button'
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className='col-md-6'>
        <h4>Customers List</h4>

        <ul className='list-group'>
          {customers &&
            customers.map((customer, index) => (
              <li
                className={
                  'list-group-item ' + (index === currentIndex ? 'active' : '')
                }
                onClick={() => setActiveCustomers(customer, index)}
                key={index}
              >
                {customer.name}
              </li>
            ))}
        </ul>

        <button
          className='m-3 btn btn-sm btn-danger'
          onClick={removeAllCustomers}
        >
          Remove All
        </button>
      </div>
      <div className='col-md-6'>
        {currentCustomers ? (
          <div>
            <h4>Customers</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{' '}
              {currentCustomers.name}
            </div>
            <div>
              <label>
                <strong>Address:</strong>
              </label>{' '}
              {currentCustomers.address}
            </div>
            <div>
              <label>
                <strong>Country:</strong>
              </label>{' '}
              {currentCustomers.country}
            </div>
            <div>
              <label>
                <strong>Phone:</strong>
              </label>{' '}
              {currentCustomers.phone_number}
            </div>
            <div>
              <label>
                <strong>Job:</strong>
              </label>{' '}
              {currentCustomers.job_title}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{' '}
              {currentCustomers.status ? 'Aktif' : 'Non aktif'}
            </div>

            <div>
              <Link
                // to={'/customers/' + currentCustomers.id}
                to={'/edit'}
                state={{ data: currentCustomers }}
                // to={{pathname: '/edit', state: currentCustomers}}
                className='btn btn-primary'
              >
                Edit
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Customer's name...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export { CustomerList };
