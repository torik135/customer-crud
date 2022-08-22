import axios from 'axios';

// const baseURL = 'http://localhost:8000/';
const baseURL = 'https://mitramas-test.herokuapp.com/'

export default axios.create({
  baseURL: baseURL,
  headers: {
    'Content-type': 'application/json',
    'Authorization': `bearer ${process.env.REACT_APP_TOKEN}`,
  },
});
